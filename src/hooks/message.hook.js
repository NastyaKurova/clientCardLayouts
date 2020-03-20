import {useCallback} from "react";

export const useMessage = () => {
  return useCallback((text, styleMessage) => {
    if (window.M && text) {
      window.M.toast({html: text, classes: styleMessage})
    }
  }, [])
};