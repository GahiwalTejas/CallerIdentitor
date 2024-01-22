import React from 'react'

import { Link,useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Container from '../Container/Container'
import Logo from '../Logo/Logo'

export default function Header() {
const authStatus=false
const navigate=useNavigate()
const navItems=[
  {
    name: 'Home',
    slug: "/",
    active: true
  }, 
  {
    name: 'Login',
    slug: "/login",
    active: true
  }, 

  

]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
    
  )
}
