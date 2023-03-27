import axios from 'axios';
import React, { useState } from 'react';

const baseAxios = axios.create({
    baseURL:'http://127.0.0.1:8000/',
    withCredentials: true,
    timeout: 10000,
  })

export default baseAxios