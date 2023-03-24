import React, { useEffect, useState, useRef } from 'react';
import styles from './quiz.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

const StartQuiz =()=>{  
  const {slug} = useParams()
  
  const [quiz, setQuiz] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [schemeSubject, setSchemeSubject] = useState('')
  const [schemeGrade, setSchemeGrade] = useState('')
  
  useEffect(()=>{
    axios.get(`/start_quiz_api/${slug}`)
    .then(res => handleData(res.data))
    .catch(error => console.log(error))
  }, [setQuestions])

  
  const handleData =(data)=>{
    setQuestions(data.questions)
    setAnswers(data.answers)
    setQuiz(data.quiz)
    setSchemeGrade(data.scheme_grade)
    setSchemeSubject(data.scheme_subject)
    console.log(data.quiz)
  }
  let obj = ['A', 'B', 'C', 'D'] 
  
  const prev_slide = useRef()
  const next_slide = useRef()



  var val = 0
  var s = 0
  var m = 0
  var h = 0
  const [time,setTime] = useState('')


  // const quiz_duration = quiz[0]
  // sessionStorage.setItem('seconds', quiz_duration*60)
  // useEffect(()=>{
  //   setInterval(()=>{
  //     val = sessionStorage.getItem('seconds')
  //     sessionStorage.setItem('seconds',val - 1)
  //     console.log(val)
  //     s = Math.floor(val%60)
  //     m = Math.floor(val/60%60)
  //     h = Math.floor(val/60/60%60)
  //     setTime(`${h} : ${m} : ${s}`)
  //   },1000)
  // }, [setTime])

  return(
    <>
      <button className={styles.prev_slide} ref={prev_slide} >Prev</button>
      <button className={styles.next_slide} ref={next_slide}>Next</button>
      <div className={styles.time_box}>
        <i className="material-symbols-outlined">timer</i>
        <span>{time}</span>
      </div>
      <Swiper loop={false} centeredSlides={true} direction={'horizontal'} speed={800} pagination={{clickable: true}}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prev_slide.current;
          swiper.params.navigation.nextEl = next_slide.current;
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
        >
        {questions.map((question, qi)=>(
          <SwiperSlide key={qi} className={styles.swiper_box}>  
              <section className={styles.question_box}>
                <div className={styles.q_set}>
                  <span className={styles.q_tag}>Q{qi+1}</span>
                  <p>{question.content}</p> 
                  
                </div>
                <div className={styles.a_set}>
                  {answers[qi].map((ans,ai)=>(
                    <label key={ai} className={styles.ans_label}>
                      <input type="radio" name={'a' + eval(qi+1)}  />
                      <div className={styles.ans}>
                        <span className={styles.a_tag}>{obj[ai]}</span>
                        <p>{ans.content} </p> 
                        <div className={styles.rad}></div>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
          </SwiperSlide>
        ))}

      </Swiper>  
    </>
  )
}

export default StartQuiz