import React, { useState } from 'react';
import styles from './sideBar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SideBar =({prop_dash})=>{
  const changeSide =()=>{
    if(prop_dash.sideBar === 0){
      prop_dash.setSideBar(1)
    }else{
      prop_dash.setSideBar(0)
    }
  }

  if(prop_dash.sideBar === 0){
    var sideBar_style = styles.sideBar
    var sideBar_tag_style = styles.sideBar_tag
    var menu_p_style = styles.menu_p
    var log_span_style = styles.log_span
  }else{
    var sideBar_style = `${styles.sideBar} ${styles.change}`
    var sideBar_tag_style = `${styles.sideBar_tag} ${styles.change}`
    var menu_p_style = styles.menu_p_change
    var log_span_style = `${styles.log_span} ${styles.change}`
  }

  const navigate = useNavigate()
  const logout =()=>{
    axios.post('/logout_api',{
      'test' : 'good'
    },{
      headers:{
        'X-CSRFToken' : prop_dash.token
      }
    }
    )
    .then(res => navigate('/'))
    .catch(error => console.log(error))
  }

  return(
    <section className={sideBar_style}>
      <div className={sideBar_tag_style} onClick={changeSide}>
        <i className="material-symbols-outlined">line_end_square</i>
      </div>
      <div className={styles.top}>
          <i className="material-symbols-outlined">school</i>
          <span>{prop_dash.course}</span>
      </div>
      <div className={styles.mid}>
        <Link to={`/dashboard/${prop_dash.courseSlug}`}>
          <span className="material-symbols-outlined">inventory_2</span> <p className={menu_p_style}>Schemes</p>
        </Link>
        <Link to={`/dashboard/${prop_dash.courseSlug}/quiz`}>
          <span className="material-symbols-outlined">psychology_alt</span> <p className={menu_p_style}>QuizHub</p>
        </Link>
        <a><span className="material-symbols-outlined">stacked_bar_chart</span> <p className={menu_p_style}>Assesment</p></a>
        <a><span className="material-symbols-outlined">admin_panel_settings</span> <p className={menu_p_style}>Manager</p></a>
      </div>
      <div className={styles.low}>
        <Link onClick={logout}><i className="material-symbols-outlined">logout</i><span className={log_span_style}>Logout</span></Link>
      </div>
    </section>
  )
}

export default SideBar