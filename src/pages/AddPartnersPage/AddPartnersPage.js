import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";
import List from "../../components/List/List";


const AddPartnersPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {request, error, clearError} = useHttp();
  const [partnerRequest, setPartnerRequest] = useState(null);
  const PartnerRequestList = useCallback(async () => {
    try {
      const data = await request('/api/partner/request', 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setPartnerRequest(data);

    } catch (e) {

    }
  }, [auth.token, request]);

  useEffect(() => {
    PartnerRequestList();
  }, [PartnerRequestList]);

  useEffect(() => {
    message(error, 'red');
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);
  const deletePartner = async id => {
    try {
      const data = await request(`/api/partner/delete/${id}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`});
      let newList = partnerRequest.filter(item => item._id !== id);
      setPartnerRequest(newList);
    } catch (e) {
    }
  };
  const headersArr = ['№', 'Название', 'Email', 'Управление'];
  const listItemData = {
    hasHeaderClass: 'PLNavbar',
    hasListClass: 'PLI',
    link: '/add-partners/',
    items: [
      {
        field: 'index'
      },
      {
        field: 'name'
      },
      {
        field: 'email'
      },
      {
        field: 'delete',
        action: id => deletePartner(id)
      }
    ]
  };
  return (
    <div className="row">
      <h3>Заявки компаний для заполнения</h3>
      {partnerRequest ? <List data={partnerRequest} headersArr={headersArr} listItemData={listItemData}/> : null}
    </div>
  );
};

export default AddPartnersPage;