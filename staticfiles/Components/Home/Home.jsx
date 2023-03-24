import React, { useEffect, useRef,useState } from 'react';
import styles from './home.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Home(){
  const [home_bg, setHome_bg] = useState('')

  useEffect(()=>{
    axios.get('/asset_api')
    .then(res=> handleImages(res.data))
    .catch(error => console.log(error))
  })
  const handleImages =(data)=>{
    setHome_bg(data.home_bg)
  }
  
  const [logoutRes, setLogoutRes] = useState('')
  useEffect(()=>{
    axios.get('/auth_api')
    .then(res => setLogoutRes(res.data))
    .catch(error => console.log(error))
  },[setLogoutRes])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const login_user =()=>{
    axios.post('/auth_api',{
      username: username,
      password: password
    })
    .then(res => handleError(res))
    .catch(error => console.log(error))
  }
  const [errorInput, setErrorInput] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleError =(res)=>{
    console.log(res)
    if(res['data']['mode'] === 'error'){
      setError(1)
      setErrorInput(res['data']['message'])
    }else{
      navigate('/course')
    }
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
      <section className={styles.right} style={{backgroundImage:`url(${home_bg})`}}>

      </section>
    </section>
  )
}