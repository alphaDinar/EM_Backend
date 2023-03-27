import React, { useState } from 'react';
import { Routes,Route,useParams } from 'react-router-dom';
import DashMain from '../DashMain';
import GetQuiz from './GetQuizScheme';
import QuizChart from './QuizChart';

const QuizMain =({prop_dash})=>{
  const {slug} = useParams()
  const prop_main = {
    'url' : `quiz_api/${slug}`,
    'box_icon' : 'psychology_alt',
    'chart' : <QuizChart/>,
    'header' : 'Quizes',
  } 
  return(
    <Routes>
      <Route path='/' element={<DashMain prop_dash={prop_dash} prop_main={prop_main} />} />
      <Route path='get_quiz_scheme/:id' element={<GetQuiz prop_dash={prop_dash} prop_main={prop_main} />} />
    </Routes>
  )
}

export default QuizMain