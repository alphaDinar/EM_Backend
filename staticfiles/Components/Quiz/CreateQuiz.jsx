import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import baseAxios from '../Auth/baseAxios';
import styles from './quiz.module.css'

const CreateQuiz =({slug})=>{
  // const {slug} = useParams()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [level, setLevel] = useState('')

  const navigate = useNavigate()
  const createQuiz =()=>{
    baseAxios.post(`create_quiz_api/${slug}`,
    {
      'name' : name,
      'duration' : duration,
      'level' : level,
      'slug' : slug,
      'token' : localStorage.getItem('access_token')
    })
    .then(res => {
      if(res.data.info === 'exists'){
        console.log('quiz exists')
      }else{
        navigate(`/set_quiz/${name}`)
      }
    })
    .catch(error => console.log(error))
  }

  return(
    <>
      <form onSubmit={e=>e.preventDefault()} className={styles.quiz_form} >
        <div>
          New Quiz
          <i className='material-symbols-outlined'>psychology_alt</i>
        </div>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder='Quiz Name' />
        <input type="text" value={duration} onChange={e=>setDuration(e.target.value)} placeholder='Quiz Duration [minutes]' />
        <select value={level} onChange={e=>setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="difficult">Difficult</option>
        </select>
        <button onClick={createQuiz}>Create Quiz</button>
      </form>
    </>
  )
}

export default CreateQuiz