import React from 'react';
import styles from './panel.module.css'
import {Routes,Route} from 'react-router-dom'
import Home from '../Home/Home'
import Course from '../Course/course';
import Dashboard from '../Dashboard/Dashboard';
import UseScheme from '../Scheme/UseScheme';
import StartQuiz from '../Quiz/StartQuiz';
import CreateQuiz from '../Quiz/CreateQuiz';
import SetQuiz from '../Quiz/SetQuiz';


export default function Panel(){
  return(
    <section className={styles.panel}>
      <Routes>
        <Route path='' element={<Home/>} />
        <Route path='/course' element={<Course/>} />
        <Route path='/use_scheme/:slug/*' element={<UseScheme/>} />

        <Route path='/dashboard/:slug/*' element={<Dashboard/>} />
        <Route path='/start_quiz/:slug' element={<StartQuiz/>} />
        <Route path='/create_quiz/:slug' element={<CreateQuiz/>} />
        <Route path='/set_quiz/:slug' element={<SetQuiz/>} />
        
        {/* <Route path={`/dashboard/:{id}`} element={<Dashboard/>} /> */}
      </Routes>
    </section>
  )
}
