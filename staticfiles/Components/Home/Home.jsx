import React, { useEffect, useRef,useState } from 'react';
import styles from './home.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import home_bg from './stat.jpg'
import axiosInstance from '../call';
export default function Home(){  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  
  const navigate = useNavigate()

  // const login_user =()=>{
  //   axiosInstance.post('auth_api/get_token/',{
  //     'username' : username,
  //     'password' : password
  //   })
  //   .then(res => {
  //     localStorage.setItem('access_token', res.data.access)
  //     localStorage.setItem('refresh_token', res.data.refresh)
  //     axiosInstance.defaults.headers['Authorization'] = 'JWT' + localStorage.getItem('access_token')
  //     axiosInstance.post('auth_api/',{
  //       'access_token' : localStorage.getItem('access_token'),
  //       'refresh_token' : localStorage.getItem('refresh_token')
  //     })
  //     .then(res=>console.log(res.data))
  //     navigate('/course')
  //   })
  //   .catch(error => console.log(error)) 
  // }

  const login_user =()=>{
    axios.post('auth_api/',{
      'username' : username,
      'password' : password
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  const [cover_styles, setCover_styles] = useState(styles.cover)
  const toggleCover =()=>{
    if(cover_styles === styles.cover){
      setCover_styles(`${styles.cover} ${styles.change}`)
    }else{
      setCover_styles(styles.cover)
    }
  }

  return(
    <section className={styles.home_page}>
      <section className={cover_styles} >
        <form onSubmit={e=>e.preventDefault()}>
          <div className={styles.input_field}>
            <span>Username</span>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required />
          </div>
          <div className={styles.input_field}>
            <span>Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button onClick={login_user}>Login</button>
        </form>
      </section>
      <section className={styles.left}>
        <nav>
          <a href="">Home</a>
          <a onClick={toggleCover}>Login</a>
          <a href="">About</a>
        </nav>
        <div>
          <p> <span>Teaching Has</span> <span> Never Been</span> <span>Made Easier</span></p>
          <small>Try it you will like it</small>
          <button>Take a look <i className="material-symbols-outlined">east</i></button>
        </div>
      </section>
      <section className={styles.prod_box}>
        <div className={styles.prod} >
          <p>25$</p>
        </div>
      </section>
      <section className={styles.right} style={{backgroundImage:`url(https://res.cloudinary.com/dvnemzw0z/image/upload/v1679917217/EduManager/stat_rmymz8.jpg)`}}>

      </section>
    </section>
  )
}