import React, { useEffect, useState } from 'react';
import styles from './course.module.css'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import baseAxios from '../Auth/baseAxios';


const Course =({base_url})=>{
  const [user, setUser] = useState('')
  const [courses, setCourses] = useState([{}])

  useEffect(()=>{
    baseAxios.post('http://127.0.0.1:8000/course_api',{
      'token' : localStorage.getItem('access_token')
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    },
    )
    .then(data => {
      setUser(data.data.user)
      setCourses(data.data.courses)
    })
    .catch(error => console.log(error))
  }, [setCourses])

  return(
      <section className={styles.course_box_holder}>
        <div className={styles.course_box_h}>
          <p>Choose A Course</p>
          <div>
            <span>Welcome Back,</span>
            <span><i className="material-symbols-outlined">self_improvement</i>{user}</span>
          </div>
          <form>
            <input type="text" placeholder='Search Here' />
            <button><i className="material-symbols-outlined">search</i></button>
          </form>
        </div>
        <section className={styles.course_box}>
          {courses.map((course,index)=>(
            <Link to={`/dashboard/${course.slug}`} key={index} className={styles.course}>
              <div className={styles.top}>
                <p>{index + 1}</p>
              </div>
              <div className={styles.mid}>
                <i className="material-symbols-outlined">school</i>
                <p><span>{course.subject}</span> <span>{course.grade}</span></p>
              </div>
              <div className={styles.low}>
                <p>3 days ago</p>
              </div>
            </Link>
          ))}
        </section>
      </section>
  )
}

export default Course