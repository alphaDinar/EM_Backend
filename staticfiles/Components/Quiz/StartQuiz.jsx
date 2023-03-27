import React, { useEffect, useState, useRef, useMemo } from 'react';
import styles from './quiz.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";
import baseAxios from '../Auth/baseAxios';

const StartQuiz =()=>{  
  const {slug} = useParams()
  const navigate = useNavigate() 
  
  const [quiz, setQuiz] = useState({})
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  const [timer,setTimer] = useState('')
  useEffect(()=>{
    baseAxios.get(`start_quiz_api/${slug}`)
    .then(data => {
      setQuiz(data.data.quiz)
      setQuestions(data.data.questions)
      setAnswers(data.data.answers)
      sessionStorage.setItem('seconds', parseInt(data.data.quiz.duration) * 60)
      sessionStorage.setItem('q_count', parseInt(data.data.questions.length))
      setTimer(data.data.quiz.duration + ' minutes')
    })
    .catch(error => console.log(error))
  }, [])
  
  let obj = ['A', 'B', 'C', 'D'] 
  
  const prev_slide = useRef()
  const next_slide = useRef()


  const [choiceList, setChoiceList] = useState(()=>{
    const cb = []
    for (var i = 0; i < sessionStorage.getItem('q_count'); i++) {
      cb.push('')
    }
    return cb
  });

  
  const startTimer =()=>{
    var val = 0
    var s = 0
    var m = 0
    var h = 0
    setInterval(()=>{
      val = sessionStorage.getItem('seconds')
      sessionStorage.setItem('seconds',val - 10)
      s = Math.floor(val%60)
      m = Math.floor(val/60%60)
      h = Math.floor(val/60/60%60)
      setTimer(`${h} : ${m} : ${s}`)
      if(val < 1){
        navigate('/')
      }
    },1000)
  }

  const [quizInfo_styles, setQuizInfo_styles] = useState(styles.quiz_info)

  const toggleQuizInfo =()=>{
    {quizInfo_styles === styles.quiz_info ? setQuizInfo_styles(`${styles.quiz_info} ${styles.change}`) 
    : setQuizInfo_styles(styles.quiz_info)
    }
  }
  
  const addChoices =(ai,value)=>{
    let choiceListTemp = [...choiceList]
    choiceListTemp[ai] = value
    setChoiceList(choiceListTemp)
  }



  const sendChoices =()=>{
    baseAxios.post(`assess_quiz/${quiz.id}`,{
      'quiz_id' : quiz.id,
      'choiceList' : choiceList
    })
    .then(res => {
      navigate(`/quiz_results/${res.data.score}`)
    })
    .catch(error => console.log(error))
  }

  return(
    <>
      <span onClick={toggleQuizInfo} id={styles.info_tag} className="material-symbols-outlined">info</span>
      <div className={quizInfo_styles}>
        <span>{quiz.name}</span>
        <span>{quiz.scheme_subject}</span>
        <span>{quiz.level}</span>
        <span>{quiz.duration} minutes</span>
        <span>{quiz.scheme_grade}</span>
        <span>{quiz.id}</span>
      </div>
      <button className={styles.prev_slide} ref={prev_slide} >Prev</button>
      <button className={styles.next_slide} ref={next_slide}>Next</button>
      <div className={styles.time_box}>
      <i className="material-symbols-outlined">timer</i>
      <span>{timer}</span> 
      <button onClick={startTimer}>Play</button>
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
                    <label key={ai} className={styles.ans_label} onClick={e=>addChoices(qi,ans.content)}>
                      <input type="radio" name={'a' + eval(qi+1)} />
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
          <SwiperSlide>
            <button onClick={sendChoices}>submit</button>
          </SwiperSlide>

      </Swiper>  
    </>
  )
}

export default StartQuiz