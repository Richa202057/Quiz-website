import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import './Result.css'
function Result({name, score}) {

  const navigate = useNavigate()
  useEffect(()=>{
      if(!name){
        // if nothing will be inside name state , it will bring to home page
        navigate("/")
      }

  },[name,navigate]) // on changing the name or changing the url, this useEffect will be called
  return (
    <div className='result'>
       <span className='title'>Final Score : {score}</span> 
       <Button variant="contained" color='secondary' size="large" style={{alignSelf: "center", marginTop:20}} href="/">Go To HomePage</Button>
    </div>
  )
}

export default Result