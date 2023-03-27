import React, { useEffect, useRef, useState } from 'react';
import baseAxios from '../Components/Auth/baseAxios';

function New(){
  const [images, setImages] = useState([])
  useEffect(()=>{
    baseAxios.get('get_images')
    .then(res => {
      setImages(res.data)
    })
    .catch(error => console.log(error))
  }, [setImages])

  return (
    <div>
      {images.map((image,key)=>(
        <img key={key} src={image.image} alt="" />
      ))}
    </div>
  );
}

export default New





