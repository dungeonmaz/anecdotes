import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { modes } from './colorModes';
import { CssBaseline } from '@mui/material';

import Cards from './components/cards/Cards';
import NewNavbar from './components/NewNavbar';
import UserProfile from './components/profile/UserProfile'
import AddAnecdotePage from './components/AddAnecdotePage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

import axios from 'axios';
import { API_URL } from '.';
axios.defaults.withCredentials = true

const App = () => {
  const [mode, setMode] = useState(0);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (m) => {
        setMode(m);
      },
    }),
    [],
  );

  const [user, setUser] = useState()

  const sendRequest = async () => {
    const res = await axios.get(API_URL + "users/user", {
      withCredentials: true
    }).catch(err => console.log(err))
    const data = await res.data
    return data
  }

  const sendLogoutRequest = async () => {
    const res = await axios.post(API_URL + "users/logout", null, {
      withCredentials: true
    })
    if (res.status === 200) {
      return res
    }
    return new Error("Unable to logout")
  }

  useEffect(() => {
    sendRequest().then(data => {
      setUser(data.user)
    })
  }, [])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          ...(modes[mode]),
        },
      }), [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NewNavbar colorMode={colorMode} sendLogoutRequest={sendLogoutRequest} />
        <Routes>
          <Route path={"/signup"} element={<Signup user={user} />} />
          <Route path={"/login"} element={<Login user={user} />} />
          <Route path={"/"} element={<Cards user={user}/>} />
          <Route path={"/profile/*"} element={<UserProfile />} />
          <Route path={"/add_anecdote"} element={<AddAnecdotePage user={user}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
