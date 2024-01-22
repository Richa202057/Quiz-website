import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer'
import Home from './components/pages/Home/Home'
import Quiz from './components/pages/Quiz/Quiz';
import Result from './components/pages/Result/Result';
import { useState } from 'react';
import axios from 'axios';
function App() {

  const [name,setName]=useState("")
  const [questions,setQuestions]=useState("")
  const [score,setScore]=useState(0)
  const fetchQuestion =async(category,difficulty)=>{
   
    const {data} = await axios.get(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
    setQuestions(data.results)
  }
  return (
    <Router>
    <div className="app">
      <Header/>
      <Routes>
      <Route path="/" element={<Home name={name} setName={setName} fetchQuestion={fetchQuestion} />}/>  
      <Route path="/quiz" element={<Quiz name={name} questions={questions} score={score} setQuestions={setQuestions} setScore={setScore}/>}/>  
      <Route path="/result" exact element={<Result name={name} score={score} />}/>  
      </Routes>
    </div>
    <Footer />
    </Router>
  );
}

export default App;
