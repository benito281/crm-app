import React, {createContext, useState} from 'react'

export const CRMContext = createContext([{}, () => {}]);

export const CRMProvider = (props) => {

  //Definir el state inicial
  const [auth, setAuthToken] = useState({
    token : '',
    auth : false
  })

  return (
    <CRMContext.Provider value={[auth, setAuthToken]}>
      {props.children}
    </CRMContext.Provider>
  )
}

