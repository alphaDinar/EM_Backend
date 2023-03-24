import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import styles from '../main.module.css'

export default function GetQuiz({prop_dash,prop_main}){
  if(prop_dash.sideBar === 0){
    var main_style = styles.main
  }else{
    var main_style = `${styles.main} ${styles.change}`
  }
  const changeMain = () => {
    if (prop_dash.mainLow === 0) {
      prop_dash.setMainLow(1)
    } else {
      prop_dash.setMainLow(0)
    }
  }
  var mTop_style = `${styles.mTop} ${styles.change}`
  var mLow_style = `${styles.mLow} ${styles.change}`
  var low_tag_style = `${styles.low_h_tag} ${styles.change}`

  const {slug} = useParams()
  const {id} = useParams()
  const [scheme, setScheme] = useState('')
  const [schemeSlug, setSchemeSlug] = useState('')
  const [quizes, setQuizes] = useState([{}])

  useEffect(()=>{
    axios.get(`/get_quiz_api/${id}`)
    .then(data => handleData(data.data))
    .catch(error => console.log(error))
  },[setQuizes])

  const handleData =(data)=>{
    setScheme(data.scheme)
    setSchemeSlug(data.scheme_slug)
    setQuizes(data.quizes)
  }

  return(
    <section className={main_style}>
      <div className={mLow_style}>
        <div className={styles.low_h}>
          <p><span className="material-symbols-outlined">blur_on</span>| <span className={styles.lp}> {scheme} Quizes</span></p>
          <select name="" id="">
            <option selected hidden value="">All</option>
            <option value="">pending</option>
            <option value="">active</option>
            <option value="">completed</option>
          </select>
          <form>
            <input type="text" placeholder='Search Here' />
            <button><i className="material-symbols-outlined">search</i></button>
          </form>
          <div className={low_tag_style} onClick={changeMain}>
            <i className="material-symbols-outlined">expand_less</i>
          </div>
        </div>
        <div className={styles.low_con_box}>
          {quizes.map((quiz,index)=>(
            <div key={index} className={styles.resource} style={{background:'#2a2a46'}}>
              {
                quiz.status === 'pending' ? <div className={styles.resource_tag} style={{background:'#ff6364'}}></div> : 
                quiz.status === 'active'  ? <div className={styles.resource_tag} style={{background:'#00acea'}}></div> : 
                                            <div className={styles.resource_tag} style={{background:'#aeecc1'}}></div>
              }
              <div className={styles.s_top}>
                <i style={{color:'white'}} className="material-symbols-outlined">{prop_main.box_icon}</i>
                <span style={{color:'white'}}>{quiz.level}</span>
              </div>
              <div className={styles.s_mid} style={{flexDirection:'column'}}>
                <p style={{color:'white'}}>{quiz.name}</p>
                <span style={{color:'white'}}>{quiz.duration} mins</span>
              </div>
              
              <div className={styles.s_low}> <Link to={`/start_quiz/${quiz.slug}`}>Start</Link> <a>Edit</a></div>
            </div>
          ))}
          <div className={styles.resource} style={{background:'white',gap:'10px', border:'2px dotted #2a2a46',justifyContent:'center'}}>
            <div className={styles.s_top} style={{justifyContent:'center'}}>
              <i style={{color:'#2a2a46'}} className="material-symbols-outlined">{prop_main.box_icon}</i>
              <span style={{color:'white'}}></span>
            </div>            
            <div className={styles.s_low} style={{justifyContent:'center'}}><Link to={`/create_quiz/${schemeSlug}`}>Create Quiz</Link></div>
          </div>
        </div>
      </div>
    </section>
  )
}