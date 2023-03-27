import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Auth =()=>{
  const [auth, setAuth] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('refresh_token')){
      console.log('auth')
    }else{
      setAuth(false)
      navigate('')
    }
  }, [auth])
}

export default Auth