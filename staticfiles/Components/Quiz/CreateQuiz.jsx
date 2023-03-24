import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './quiz.module.css'

const CreateQuiz =()=>{
  const {slug} = useParams()
  const [token, setToken] = useState('')
  useEffect(()=>{
    axios.get(`/create_quiz_api/${slug}`)
    .then(data => setToken(data.data.token))
    .catch(error => console.log(error))
  }, [setToken])

  const [name, setName] = useState('')
  const [qNum, setQNum] = useState('')
  const [duration, setDuration] = useState('')
  const [level, setLevel] = useState('')


  const navigate = useNavigate()
  const createQuiz =()=>{
    axios.post(`/create_quiz_api/${slug}`,
    {
      'name' : name,
      'q_num' : qNum,
      'duration' : duration,
      'level' : level,
      'slug' : slug
    },
    {
      headers:{
        'X-CSRFToken' : token
      }
    })
    .then(res => handleNav(res.status))
    .catch(error => console.log(error))
  }

  const handleNav =(res)=>{
    if(res === 200){
      navigate(`/set_quiz/${name}`)
    }
  }

  return(
    <section>
      <form onSubmit={e=>e.preventDefault()} className={styles.quiz_form} >
        <input type="text" value={name} onChange={e=>setName(e.target.value)} />
        <input type="text" value={qNum} onChange={e=>setQNum(e.target.value)} />
        <input type="text" value={duration} onChange={e=>setDuration(e.target.value)} />
        <select value={level} onChange={e=>setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="difficult">Difficult</option>
        </select>
        <button onClick={createQuiz}>Onclick</button>
      </form>
    </section>
  )
}

export default CreateQuiz