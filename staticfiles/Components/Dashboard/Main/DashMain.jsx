import styles from './main.module.css'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import baseAxios from '../../Auth/baseAxios';

const DashMain =({prop_dash,  prop_main})=>{
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
  if(prop_dash.mainLow == 1){
    var mTop_style = `${styles.mTop} ${styles.change}`
    var mLow_style = `${styles.mLow} ${styles.change}`
    var low_tag_style = `${styles.low_h_tag} ${styles.change}`
  }else{
    var mTop_style = styles.mTop
    var mLow_style = styles.mLow
    var low_tag_style = styles.low_h_tag
  }

  const [resources, setResources] = useState([{}])
  const [pendCount, setPendCount] = useState(0)
  const [actCount, setActCount] = useState(0)
  const [compCount, setCompCount] = useState(0)
  const [resourceCount, setResourceCount] = useState(0)
  const [resource_counter, setResourceCounter] = useState([])
  // const [statusValue, setStatusValue] = useState('')
  const status = {'all':'all','pending':'pending','active':'active','completed':'completed'}

  useEffect(()=>{
    baseAxios.get(prop_main.url)
    .then(data => handleData(data.data))
    .catch(error => console.log(error))
  }, [setResources])

  const handleData =(data)=>{
    setResources(data.resources)
    setPendCount(data.status[0])
    setActCount(data.status[1])
    setCompCount(data.status[2])
    setResourceCount(data.resource_count)
    if(data.resource_counter){
      setResourceCounter(data.resource_counter)
    }
  }

  const sendStatus =(e)=>{
    axios.post(prop_main.url,{
      'status' : e.target.value
    },{
      headers: {
        'X-CSRFToken': prop_dash.token
      }
    })
    .then(res => setResources(res.data.resources))
    .catch(error => console.log(error))
  }

  return(
    <section className={main_style}>
      <div className={mTop_style}>
        <div className={styles.mTop_box} >
          <div className={styles.box_top}>
            <i className="material-symbols-outlined">history</i>
            <p>Recent</p>
          </div>
          <div className={styles.box_mid}>
            <p>History</p>
          </div>
          <div className={styles.box_low}>
            <button>Use</button>
            <button>Add</button>
          </div>
        </div>
        <div className={styles.mTop_box} >
          <div className={styles.mp}><span>Pending <i className="material-symbols-outlined">pending</i></span> <div>{pendCount}</div> </div>
          <div className={styles.mp}><span>Active <i className="material-symbols-outlined">bolt</i></span> <div>{actCount}</div> </div>
          <div className={styles.mp}><span>Completed <i className="material-symbols-outlined">verified</i></span> <div>{compCount}</div> </div>
        </div>
        <div className={`${styles.mTop_box} ${styles.add}`} style={{background:'white'}} >
          <div>
            <i className="material-symbols-outlined" style={{color:'#ff6364'}}>pending</i>
            <i className="material-symbols-outlined" style={{color:'#00acea'}}>bolt</i>
            <i className="material-symbols-outlined" style={{color:'#aeecc1'}}>verified</i>
          </div>
          
          {React.cloneElement(prop_main.chart, { pendCount: pendCount, actCount : actCount, compCount : compCount})}
        </div>
        <div className={styles.mTop_box} style={{background:'#1a1a1a'}} >
          <div className={styles.box_top}>
            <i className="material-symbols-outlined">favorite</i>
            <p>Favorite</p>
          </div>
          <div className={styles.box_mid}>
            <p>Astronomy</p>
          </div>
          <div className={styles.box_low}>
            <button>Use</button>
            <button>Add</button>
          </div>
        </div>
      </div>

      <div className={mLow_style}>
        <div className={styles.low_h}>
          <p><span className="material-symbols-outlined">blur_on</span>{prop_main.header} | <span className={styles.lp}> {resourceCount} </span></p>
          <select onChange={e=>sendStatus(e)}>
            <option value={status.all}>All</option>
            <option value={status.pending}>pending</option>
            <option value={status.active}>active</option>
            <option value={status.completed}>completed</option>
          </select>
          <form>
            <input type="text" placeholder='Search Here' />
            <button type='button'><i className="material-symbols-outlined">search</i></button>
          </form>
          <div className={low_tag_style} onClick={changeMain}>
            <i className="material-symbols-outlined">expand_less</i>
          </div>
        </div>
        <div className={styles.low_con_box}>
          {resources.map((resource,index)=>(
            <div key={index} className={styles.resource}>
              {
                prop_main.header === 'Schemes' &&
                <>
                {
                  resource.status === 'pending' ? <div className={styles.resource_tag} style={{background:'#ff6364'}}></div> : 
                  resource.status === 'active'  ? <div className={styles.resource_tag} style={{background:'#00acea'}}></div> : 
                                                  <div className={styles.resource_tag} style={{background:'#aeecc1'}}></div>
                }
                </>
              }
              <div className={styles.s_top}>
                <i className="material-symbols-outlined">{prop_main.box_icon}</i>
                <div>
                  <p><span>5</span> <span className="material-symbols-outlined">image</span></p>
                  <p><span>5</span> <span className="material-symbols-outlined">article</span></p>
                  <p><span>5</span> <span className="material-symbols-outlined">videocam</span></p>
                </div>

                {/* {prop_main.header == 'Quizes' &&  } */}
                <i className="material-symbols-outlined">more_vert</i>
              </div>
              <div className={styles.s_mid}>
                <p>{resource.topic}</p>
              </div>
              {
                prop_main.header === 'Schemes' ?  <div className={styles.s_low}> <Link to={`/use_scheme/${resource.slug}`}>Use</Link> <a>Edit</a></div>:
                                                  <>
                                                  <div className={styles.s_low}> 
                                                    { resource_counter[index] === 0 ? 
                                                    <>
                                                      <a style={{backgroundColor:'#2a2a46', color:'white'}}>{resource_counter[index]}</a>  
                                                      <a>Add</a>
                                                    </>:
                                                    <>
                                                      <a style={{backgroundColor:'#2a2a46', color:'white'}}>{resource_counter[index]}</a>  
                                                      <Link to={`get_quiz_scheme/${resource.id}`}>view</Link>
                                                    </>
                                                    }
                                                  </div>
                                                  </>                          
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DashMain