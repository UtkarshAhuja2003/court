'use client'
import  { useState } from 'react'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.prevenDefault();
        console.log(email, password);
    }
    
  return (
    <div>
        <div className="bg-[#04478D2B] h-[100vh] pt-32">
        <div className="bg-white mx-auto rounded-lg w-[50%] md:w-[30%]">
          <div className="w-[90%] mx-auto py-4">
            <form onSubmit={(e)=>{handleLogin(e)}}>
              <p>Email:</p>
              <input
                className="border-2 w-full py-1 rounded-md"
                type="text"
                name="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter the email"
              />

              <p className="mt-3">Password:</p>
              <input
                className="border-2 w-full py-1 rounded-md"
                type="password"
                name="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Password"
              />
              <center className="mt-4">
                <button
                  type="submit"
                  className=" bg-[#1D7ADB] text-white tracking-wider rounded-md px-3 py-[2px]"
                >
                  Log In
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login