import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseAxios from '../Auth/baseAxios';


const QuizResults =()=>{
  const {slug} = useParams()
  const [quiz, setQuiz] = useState()
  const [comChoices, setComChoices] = useState([])
  const [userChoices, setUserChoices] = useState([])

  useEffect(()=>{
    baseAxios.get(`assess_quiz/${slug}`)
    .then(data => console.log(data.data))
    .catch(error => console.log(error))
  },[])

  return(
    <section>WIN  {slug} </section>
  )
}

export default QuizResults