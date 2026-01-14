import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'

const Register = () => {
  return (
    <div>
        <main className="flex items-center justify-center w-full px-4">
        <form className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        
            <input id="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" required />
            <input id="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" required />
            <input id="email" className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Password" required />
        
            <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Create Account</button>
            
            <p className="text-center mt-4">Already have an account? <Link to='/Login' className="text-blue-500 underline">Log In</Link></p>
        </form>
        </main>
    </div>
  )
}

export default Register
