import React from 'react'
import './Home.css'
import TextField from '@mui/material/TextField';
import Categories from '../../../Data/Categories'
import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import ErrorMessage from '../../Error/ErrorMessage';

function Home({name,setName, fetchQuestion}) {
  
  const [category, setCategory]=useState("")
  const [difficulty, setDifficulty]=useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handlesubmit = ()=>{
   if(!category || !name || !difficulty){
    setError(true)
   }
   else{
    setError(false)
    fetchQuestion(category,difficulty)
    navigate("/quiz")
   }
  }
  return (
    <div className='content'>
     <div className="settings">
      <span>Quiz Settings</span>
      <div className="settings-select">
      {/* to show the error message above all textfields */}
      {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
      <TextField id="outlined-basic" label="Enter Your Name" variant="outlined" style={{marginBottom: 30}} onChange={(event)=>{setName(event.target.value)}}/>
      
      <TextField select label="Select Category" varient="outlined" style={{marginBottom: 30}} onChange={(event)=>{setCategory(event.target.value)}}>
        {
          Categories.map((element,index)=>{
            return(<MenuItem key={element.category} value={element.value}>
              {element.category}
            </MenuItem>)
            
          })
        }
      </TextField>

      <TextField select label="Select Difficulty" varient="outlined" style={{marginBottom: 30}} onChange={(event)=>{setDifficulty(event.target.value)}}>
      <MenuItem key={"Easy"} value="easy">Easy</MenuItem>
      <MenuItem key={"Medium"} value="medium">Medium</MenuItem>
      <MenuItem key={"Hard"} value="hard">Hard</MenuItem>
      </TextField>

      <Button variant='contained' color='primary' size='large' onClick={handlesubmit}>
      Start Quiz
      </Button>
      </div>
     </div>
     <img src='quiz.svg' className='banner' />
    </div>
  )
}

export default Home
//second text area me , map() se each Categories object ko access kruske category property ko (return ke through) show kra rhe hai
// to save the user-entered name , category and difficulty values , we have use state