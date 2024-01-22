import { useEffect,useState } from 'react'
import { CircularProgress } from '@mui/material';
import './Quiz.css'
import Question from '../../Question/Question';

function Quiz({name, questions , score, setQuestions, setScore}) {
  // options state is created to store the options
  // currentQuestion is created to store the index of current question to be visible in Quiz page

  const [currQuestion, setCurrQuestion]=useState(0)
  const [options,setOptions]=useState("")

  useEffect(()=>{
    // created suffleOptions function to fetch correct and all incorrect answers and shuffle all.
    // then passed shuffled options to option state 

    setOptions(
      questions && shuffleOptions([questions[currQuestion]?.correct_answer, ...questions[currQuestion]?.incorrect_answers])
    )
  console.log(options);
  console.log(questions)
  },[currQuestion, questions])
  // useEffect will be called when this Quiz component will be rendered and also when the value of questions changes
  
  const shuffleOptions =(all_options)=>{
    //  in argument it takes all options (values) then shuffle all values
    return all_options.sort(() => Math.random() - 0.5)
  }
  return (
    <div className='quiz'>
    {/* UI for Quiz page */}
    <span className='subtitle'>Welcome, {name}</span>

    {/* checking if there is something inside the questions state variable , if questions variable is truthy i.e 
    if there is some value inside questions state variable , render the other component to show the quiz 
    while if no value inside questions i.e questions is falsy the render the loader component, to show a loader on user interface.   */}

   {
    questions?(
        <>
          <div className="quizInfo">
            <span>{questions[currQuestion].category}</span>
            <span>Score : {score}</span>
          </div>

          <Question 
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            questions={questions}
            score={score}
            setScore={setScore}
            options={options}
            correct_option={questions[currQuestion]?.correct_answer}
          />
        </>
    ):(
      <CircularProgress style={{margin:100 , marginLeft:200}} color='inherit' size={150} thickness={1} />
    )
   }

    </div>
  )
}

export default Quiz