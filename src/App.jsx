import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllCategories from './components/navbar/categories/AllCategories'
import Navbar from './components/navbar/hello/Navbar'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Home from "./pages/home/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path='/products/category/:name' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
    </Provider>
  )
}

export default App
