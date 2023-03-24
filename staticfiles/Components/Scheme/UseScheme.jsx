import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import styles from './scheme.module.css'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function UseScheme(){
  const {slug} = useParams()
  const [scheme, setScheme] = useState('')
  const [imageBox, setImageBox] = useState([])


  useEffect(()=>{
    axios.get(`/use_scheme_api/${slug}`)
    .then(data => handleData(data.data))
    .catch(error => console.log(error))
  }, [setImageBox])
  const handleData =(data)=>{
    setScheme(data.scheme)
    setImageBox(data.test)
  }

  const tray = useRef(null)

  const [image_box, setImage] = useState(null) 
  const con_action =(name,image, con_len, con)=>{
    if(con_len > 0){
      var el = 
      <>
        <span className={styles.tray_con_tag}>{name}</span>
        <img src={image} className={styles.tray_img_con} />
        <p>{con}</p>
      </>
    }else{
      var el =
      <>
        <span className={styles.tray_con_tag}>{name}</span>
       <img src={image} className={styles.tray_img} />
      </>
    }
    setImage(el)
  }

  return(
    <section className={styles.page_box}>
      <section className={styles.sideBar}>
        <div className={styles.s_top}>
          <span>{scheme}</span>
        </div>
        <Swiper loop={false} centeredSlides={true} direction={'horizontal'} speed={800} pagination={{clickable: true}}
        // onBeforeInit={(swiper) => {
        //   swiper.params.navigation.prevEl = prev_slide.current;
        //   swiper.params.navigation.nextEl = next_slide.current;
        // }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.s_low}
        >
          <SwiperSlide>
            <div className={styles.slide}>
              <p>Images</p>
              {imageBox.map((image, index)=>(
                <div key={index} className={styles.con} onClick={e=>con_action(image.name,image.image,image.content.length,image.content)}>
                  <img src={image.image} alt="" width={100} height={60} />
                  <span>{image.name}</span>
                </div>
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className={styles.slide}>
            <p>Passages</p>

          </div>
          </SwiperSlide>
        </Swiper>
        
      </section>
      <section className={styles.tray} ref={tray}>
        {image_box}
      </section>
    </section>
  )
}