import React, { useEffect, useState } from 'react';
import { Routes,Route,useParams } from 'react-router-dom';
import styles from './dashboard.module.css'
import QuizMain from './Main/QuizMain/QuizMain';
import SideBar from './SideBar.jsx/SideBar';
import axios from 'axios';
import SchemeMain from './Main/SchemeMain/SchemeMain';
// import GetQuiz from './Main/QuizMain/GetQuiz';

const Dashboard = (props) => {
  const {slug} = useParams()
  const [sideBar,setSideBar] = useState(0)
  const [mainLow, setMainLow] = useState(0)
  const [course, setCourse] = useState('')
  const [courseSlug, setCourseSlug] = useState('')
  const [token, setToken] = useState('')

  useEffect(()=>{
    var url = '/get_course_api/' + slug
    axios.get(url)
    .then(data => handleData(data.data))
    .catch(error => console.log(error))
  }, [setCourse])

  const handleData =(data)=>{
    setCourse(data.course)
    setCourseSlug(data.course_slug)
    setToken(data.token)
  }

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
        <Route path='/quiz/*' element={<QuizMain prop_dash={prop_dash} />} />
      </Routes>
    </section>
  )
}

export default Dashboard