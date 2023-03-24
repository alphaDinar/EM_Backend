import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './quiz.module.css'

function SetQuiz() {
  const {slug} = useParams()
  const [token, setToken] = useState('')

  useEffect(()=>{
    axios.get(`/set_quiz_api/${slug}`)
    .then(data => setToken(data.data.token))
    .catch(error => console.log(error))
  },[setToken])

  const [inputValues, setInputValues] = useState(()=>{
    const ins = []
    for (var i = 0; i < 2; i++) {
      ins.push({content:'', answers:['','','',''], cor_ans:''})
    }
    return ins
  });

  const handleQuestions =(qi,value)=>{
    const in_temp = [...inputValues]
    in_temp[qi].content = value
    setInputValues(in_temp)
    console.log(inputValues)
  }

  const handleAnswers =(qi,ai,value)=>{
    const in_temp = [...inputValues]
    in_temp[qi].answers[ai] = value
    setInputValues(in_temp)
    console.log(inputValues)
  }

  const handleCorAns =(qi,value)=>{
    const in_temp = [...inputValues]
    in_temp[qi].cor_ans = value
    setInputValues(in_temp)
    console.log(inputValues)
  }

  // axios
  const sendQuestions =()=>{
    axios.post(`/set_quiz_api/${slug}`,{
      'quiz' : slug,
      'quiz_box' : inputValues
    },{
      headers:{
        'X-CSRFToken' : token
      }
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  let boxes = []
  for (let qi = 0; qi < 2; qi++) {
    boxes.push(
      <div key={qi} className={styles.black_box}>
        <input type="text" value={inputValues[qi].content} placeholder={'q' + eval(qi+1)} onChange={e=>handleQuestions(qi,e.target.value)} required /> 
          { 
            Array.from({length: 4}, (_, ai) => {
            return <div key={ai}>
              {ai+1 < 3 ?
              <>
                <input type="text" required value={inputValues[qi].answers[ai]} onChange={e=> handleAnswers(qi,ai,e.target.value)}  placeholder={'a' + eval(qi+1) + eval(ai+1)} />
                <input type="radio" required name={eval(qi+1)} value={inputValues[qi].answers[ai]} onChange={e=>handleCorAns(qi,e.target.value)}/>
              </>
              :
              <>
                <input type="text" value={inputValues[qi].answers[ai]} onChange={e=> handleAnswers(qi,ai,e.target.value)}  placeholder={'a' + eval(qi+1) + eval(ai+1)} />
                <input type="radio" name={eval(qi+1)} value={inputValues[qi].answers[ai]} onChange={e=>handleCorAns(qi,e.target.value)}/>
              </>
              }
            </div>
            })
          }
      </div>
    )
  }
  
  // console.log(inputValues)
  

  // const handleInputChange = (index, value) => {
  //   const newInputValues = [...inputValues];
  //   newInputValues[index] = value;
  //   setInputValues(newInputValues);
  //   console.log(inputValues)
  // };

  // const inputs = [];
  // for (let i = 0; i < 5; i++) {
  //   inputs.push(
  //     <input
  //       key={i}
  //       type="text"
  //       value={inputValues[i]}
  //       onChange={(e) => handleInputChange(i, e.target.value)}
  //     />
  //   );
  // }

  return (
    <form className={styles.quiz_form} onSubmit={e=>e.preventDefault()}>
      {boxes}
      {/* <button>Send</button> */}
      <button onClick={sendQuestions}>Send</button>
    </form>
  );
}

export default SetQuiz
