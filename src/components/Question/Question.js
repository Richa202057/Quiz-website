import React from 'react'
import './Question.css'
import { useState  , useRef , useEffect} from 'react'
import ErrorMessage from "../Error/ErrorMessage"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
function Question({currQuestion,
            setCurrQuestion, questions,
            score,setScore ,options,
             correct_option})
{

    // here creating another 2 state variables
    // selected :- to store the selected option 
    // error :- for storing error state, when next button is clicked, if no option is selected error state should be false , and by rendering a error component , a error message will be show on ui.
    // initially, there is no error so, setting initial state of error to false

   const [selected, setSelected] = useState("")
   const [error, SetError]= useState(false)
   const correctOptionRef = useRef(null);

   const navigate = useNavigate()



  const handleCheck = (ele) => {
    // Set the selected option
    setSelected(ele);

    console.log(ele, "handlecheck");
    if(selected !== correct_option){
      if (correctOptionRef.current) {
        correctOptionRef.current.classList.add('correct');
      }
    }
    // Check if the selected option is correct, and update the score
    // Note: This will increase the score even if the user changes the selection to the correct option later
    if (ele === correct_option) {
      setScore(score + 1);
    }
    SetError(false)
  };


   const handleNext=()=>{
    // selected option is empty for the next button 
    setSelected("")
    if (currQuestion == 9){
      navigate("/result")
    }else if(selected){
      setCurrQuestion(currQuestion+1)
    }
    else {
      SetError("please select an option first"); // if user clicks on next button without selecting any option button
    }
    
   }

   const handleQuit=()=>{
   navigate("/")
   }

  return (
    <div className="question-box">
      
      <h1>Question {currQuestion+1}</h1>

      <div className="single-question">

       <h2>{questions[currQuestion].question}</h2>

       {/* showing options */}

       <div className="options">
       {/* agar yha error truthy hua toh ErrorMessage ke bich me likha hua part display ho jaayega */}
         {error && <ErrorMessage>{error}</ErrorMessage> }

         {/* kya options me values hai, agar hai toh options me rkhe each values ko map krenge  */}
         {options && options.map((ele)=>{
                     {/*to show buttons for each options */}
                     console.log(ele)
          return(
            <button
                onClick={() => handleCheck(ele)}
                key={ele}
                className={`single-option ${
                  selected === ele
                    ? correct_option === ele
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                disabled={selected}
                ref={ele === correct_option ? correctOptionRef : null}
              >
                {ele}
              </button>
          )
         })}

       </div>

       <div className="controls">
       
       <Button  variant="contained" color='primary' size='large' style={{width:185}} onClick={handleNext}>Next Question</Button>
       <Button  variant="contained" color='secondary' size='large' style={{width:185}} href='/' onClick={handleQuit}>Quit</Button>
       </div>

      </div>

    </div>
  )
}

export default Question
// Question {currQuestion+1}:- since here currQuestion is denoting the index value of questions array
// since index is 1 value less than the original question no, so to show question no , adding 1 to index value 

// className={`single-option`} :- here the value returned by this {} braces will be assigned to className of that button
// so, className can be either select or wrong
// based on class different styling will be applied on buttons
// disabled={selected} is used jisse ek button ko select krne pe baki buttons disabled ho jayega

// <Button variant="contained" color='secondary' size='large' style={{width:185}} href='/'>Quit</Button>
//        {/* a link is associated with this button when clicked it will bring to home page */}
//        