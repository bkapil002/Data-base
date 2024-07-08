import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'


const Signup = () => {
    const[name , setName] = useState('')
    const[password , setPassword] = useState('')
    const[email , setEmail] = useState('')
    const[error , setError] = useState('')
    const navigate = useNavigate()
  
    const headerSubmit = async(e)=>{
      e.preventDefault()
       try{
          const response = await fetch('http://localhost:5000/api/signup',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
          })
          if (!response.ok) {
            throw new Error('Something went wrong')
          }
          navigate('/')
       }catch(err){
        setError(err.message)
       }
    }
  return (
    <div className='full flex justify-center'>
      <div className='drop-shadow-xl w-80 h-full bg-slate-400 rounded-lg text-center mt-20'>
        <h1 className='font-bold text-2xl'>SIGN UP</h1>
       <form onSubmit={headerSubmit}>
       <div className='mt-5 font-semibold'>
          <h1>Name</h1>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}  className='pl-1 w-56 outline-none rounded-lg h-7' placeholder='' />
        </div>
        <div className='mt-4 font-semibold'>
          <h1>Email</h1>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='pl-1 w-56 outline-none rounded-lg h-7' placeholder='' />
        </div>
        <div className='mt-4 font-semibold'>
          <h1>Password</h1>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}  className='  outline-none pl-1 w-56  rounded-lg h-7' placeholder='' />
        </div>
        <button onSubmit={headerSubmit} className='mt-5 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold w-28 h-8 rounded-full'>Sign Up</button>
        {error && <p className='text-red-600'>{error}</p>}
        <h1 className='mb-1'>
          Already have an account? <Link to='/' className='text-blue-600'>Login</Link>
        </h1>
       </form>
      </div>
    </div>
  )
}

export default Signup
