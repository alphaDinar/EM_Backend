import React, { useEffect, useState } from 'react';
import { Routes,Route,useParams } from 'react-router-dom';
import styles from './dashboard.module.css'
import QuizMain from './Main/QuizMain/QuizMain';
import SideBar from './SideBar.jsx/SideBar';
import SchemeMain from './Main/SchemeMain/SchemeMain';
// import GetQuiz from './Main/QuizMain/GetQuiz';
import baseAxios from '../Auth/baseAxios';

const Dashboard = (props) => {
  const {slug} = useParams()
  const [sideBar,setSideBar] = useState(0)
  const [mainLow, setMainLow] = useState(0)
  const [course, setCourse] = useState('')
  const [courseSlug, setCourseSlug] = useState('')
  const [token, setToken] = useState('')

  useEffect(()=>{
    baseAxios.get(`get_course_api/${slug}`,{
      headers:{
        'X-CSRFToken' : token
      }
    })
    .then(data => {
      setCourse(data.data.course)
      setCourseSlug(data.data.course_slug)
      setToken(data.data.token)
      console.log(data)
    })
    .catch(error => console.log(error))
  }, [setCourse])

  const prop_dash = {
    'token' : token,
    'course' : course,
    'courseSlug' : courseSlug,
    'mainLow' : mainLow,
    'setMainLow' : setMainLow,
    'sideBar' : sideBar,
    'setSideBar' : setSideBar
  }

  return (
    <section className={styles.dashboard_page}>
      <SideBar prop_dash={prop_dash} />
      <Routes>
        <Route path='/*' element={<SchemeMain prop_dash={prop_dash} />} />
        <Route path='/quiz_scheme/*' element={<QuizMain prop_dash={prop_dash} />} />
      </Routes>
    </section>
  )
}

export default Dashboard