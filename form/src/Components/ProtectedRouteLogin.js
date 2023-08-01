import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function ProtectedRouteLogin(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(false);
  const [tokenId, setTokenId] = useState(false);
  
  
  useEffect(() => {
    const cookieArray = document.cookie.split(";").map((cookie) => cookie.trim());
    const cookie = cookieArray.find((cookie) => cookie.startsWith("token"));
    
    if (cookie) {
      setTokenId(cookie.split("=")[1]);
    }else{navigate('/')}
    
    if (tokenId){
      axios.post('http://localhost:8000/users/token', { token:tokenId }).then((response) => {
        if (response && response.data && response.data.success) {
          setUserId(response.data.doc.accessToken)
          console.log(response.data.doc)
        }else{
          navigate('/')
        }
      })
    }
  }, [tokenId,userId]);
  
  return (
    <React.Fragment>{
      userId ?
        props.children : <></>}
    </React.Fragment>
  )
}
