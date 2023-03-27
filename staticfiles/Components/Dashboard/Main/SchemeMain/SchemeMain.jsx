import React, { useState } from 'react';
import { useParams,Routes,Route } from 'react-router-dom';
import UseScheme from '../../../Scheme/UseScheme';
import DashMain from '../DashMain';
import SchemeChart from './SchemeChart';

const SchemeMain =({prop_dash})=>{
  const {slug} = useParams()
  
  const prop_main = {
    'url' : `scheme_api/${slug}`,
    'box_icon' : 'inventory_2',
    'chart' : <SchemeChart />,
    'header' : 'Schemes',
  } 
  return(
    <DashMain prop_dash={prop_dash} prop_main={prop_main} />
  )
}

export default SchemeMain