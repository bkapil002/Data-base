import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const headerSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      setLoggedIn(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='full flex justify-center'>
      <div className='drop-shadow-xl w-80 h-full bg-slate-400 rounded-lg text-center mt-20'>
        <h1 className='font-bold text-2xl'>LOGIN</h1>
        <form onSubmit={headerSubmit}>
          <div className='mt-5 font-semibold'>
            <h1>Email</h1>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='pl-1 outline-none w-56 font-semibold rounded-lg h-7'
              placeholder=''
            />
          </div>
          <div className='mt-4 font-semibold'>
            <h1>Password</h1>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='pl-1 outline-none w-56 font-semibold rounded-lg h-7'
              placeholder=''
            />
          </div>
          <button
            type='submit'
            className='mt-5 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold w-28 h-8 rounded-full'
          >
            Login
          </button>
          {error && <p className='text-red-500'>{error}</p>}
          {loggedIn && <p className='text-red-800 font-semibold'>Login successfully</p>}
        </form>
        <h1 className='mb-1'>Create an account <Link to='/signup' className='text-blue-600'>Sign Up</Link></h1>
      </div>
    </div>
  )
}

export default Login
