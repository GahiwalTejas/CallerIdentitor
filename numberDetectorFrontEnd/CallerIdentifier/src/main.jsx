import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'

const route=createBrowserRouter([
   
  {
      path:'/',
      element:<App/>,
      children:[

          {
              path:"",
              element:<Home/>


          },
          {
            path:"login",
            element:<LoginPage/>


        },
         
         

        

      ]

  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider  router={route}/>

  </React.StrictMode>,
)
