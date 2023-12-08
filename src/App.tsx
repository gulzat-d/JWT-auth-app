import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  // const [count, setCount] = useState(0)

  // const getRefresh = async (refreshToken) => {
  //   const { data } = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', {
  //     "refreshToken": `${refreshToken}`
  //   })
  //   // console.log(data);
  //   return data;
  // };

  // const getJwt = async () => {
  //   const { data } = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
  //     "email": "john@mail.com",
  //     "password": "changeme"
  //   })
  //   // console.log(data);
  //   return data;
  // };

  const getToken = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/auth/profile',
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMjA0Nzc3OCwiZXhwIjoxNzAzNzc1Nzc4fQ.48wMyOc6MlBc2as2weCvHJJgaJKOlarn9fwQG8m2xo8' }
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  // const userSession = async () => {
  //   // const token = await getJwt();
  //   const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsI…Dk3fQ.qSMFwiFBsPov_GsYxkWFszk4m46hHwX00cqf_CCkim8';
  //   const userInfo = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
  //     headers: { Authorization: `Bearer ${jwt}` }
  //   });
  //   console.log(userInfo);
  // }

  useEffect(() => {
    getToken();
    // userSession();
    // const refresh = getJwt();
    // const result = getRefresh(refresh.refresh_token);
    // console.log(result);

  }, [])

  return (
    <>

    </>
  )
}

export default App
