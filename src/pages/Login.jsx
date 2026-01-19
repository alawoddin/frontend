import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const [loading , setloading] = useState(false);

     // route

    const negivate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        setMessage("");
     

        try {
             const response = await api.post('/login', {
                email: email,
                password: password
             });

             const token = response.data.token;
             localStorage.setItem('token', token);
             const user = response.data.user;
             localStorage.setItem('user', JSON.stringify(user));

             setMessage(response.data.message);
             negivate('/dashboard');
             
            
        } catch (error) {
            if(error.response && error.response.data.message){
                setMessage(error.response.data.message);
           
        } else {
                    setMessage("An error occurred. Please try again.");
                }
            } finally {
                setloading(false);
            }
        

    }
  return (
    <div>
       <main className="flex items-center justify-center w-full px-4">
            <form onSubmit={handleSubmit} className="flex w-full flex-col max-w-96">
        
                <a href="https://prebuiltui.com" className="mb-8" title="Go to PrebuiltUI">
                    <svg className="size-10" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                            stroke="#1d293d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
        
                <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>
        
                <p className="mt-4 text-base text-gray-500/90">
                    Please enter email and password to access.
                </p>
        
                <div className="mt-10">
                    <label className="font-medium">Email</label>
                    <input
                        placeholder="Please enter your email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />
                </div>
        
                <div className="mt-6">
                    <label className="font-medium">Password</label>
                    <input
                        placeholder="Please enter your password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                    />
                </div>
        
                <button
                    type="submit"
                    className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                {message && <p className='text-red-500 text-center mt-4'>{message}</p>}
                <p className='text-center py-8'>
                    Don't have an account? <Link to="/register"  className="text-indigo-600 hover:underline">Sign up</Link>
                </p>
            </form>
        </main>
    </div>
  )
}

export default Login