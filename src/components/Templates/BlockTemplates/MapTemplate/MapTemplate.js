import React, {useEffect, useState} from 'react';
import classesMain from '../../MainTemplate.module.css'
import {Map, Placemark, YMaps} from 'react-yandex-maps';

const MapTemplate = props => {
  const [ymaps, setYmapms] = useState(null);
  const [coord, setCoord] = useState(0);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if(ymaps){geocode(ymaps)}
    setCoordinates(props.coordinates);
  },[props.adresses]);
  useEffect(() => {
    coordinates && coordinates.map((item, index) =>{
      if(coordinates[index].join('') !== props.coordinates[index].join('')){
        setCoord(index)
      }}
    )
  },[props.coordinates]);
  const geocode = ymaps => {
    const coordinates = [];
    let res = props.adresses.map(item => ymaps.geocode(item));
    Promise.all(res).then(mass => {
      mass.map(item => {
        coordinates.push(item.geoObjects.get(0).geometry.getCoordinates());
        return null
      });
      props.onChange('coordinates', coordinates)
    })
  };
  return (
    <div className={classesMain.TempBlock}>
      <div>{props.header}</div>
      <YMaps query={{apikey: 'b97629fa-1231-4bfb-9f04-710332a7898c'}}>
        <Map onLoad={ymaps =>{ setYmapms(ymaps); geocode(ymaps)}} modules={'geocode'} state={{center: props.coordinates[coord], zoom: 12}}>
          {props.coordinates.map((item, index) => <Placemark key={index} geometry={item}/>)}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapTemplate;