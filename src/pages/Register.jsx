import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import api from "../axios";

const Register = () => {
  
    const [name, setname] = useState("");
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
             const response = await api.post('/register', {
                name: name,
                email: email,
                password: password
             });


             setMessage(response.data.message);
             negivate('/Login');

            
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
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>

          <input
            id="name"
            className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
            value={name}
            onChange={(e) =>setname(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            id="email"
            className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="email"
             value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            id="password"
            className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
            type="text"
             value={password}
            onChange={(e) =>setPassword(e.target.value)}
            placeholder="password"
            required
          />

          <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

           {message && <p className='text-red-500 text-center mt-4'>{message}</p>}

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-500 underline">
              Log In
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;