import Link from 'next/link'
import React from 'react'

const Signup = () => {
  return (
    <>
    <div className="">
    <div className="grid grid-cols-3 h-full  ">
<div className="col-span-1 bg-purple-500 flex items-center justify-center flex-col h-screen">
<p className="text-5xl mb-4 text-white font-bold">Hello Friend</p>
<p className="text-white text-2xl">Enter your personal details</p>
<div className="flex">
              <p className="text-md text-white">Already a customer? Login</p>
              <Link href="/login" className="bg-white text-purple-700 px-2 ms-2 rounded">Login</Link>
            </div>
</div>
<div className="col-span-2  h-screen flex items-center justify-center flex-col">
<form className="w-full max-w-sm">
  <div className="text-purple-500 text-4xl font-bold">Create Account</div>
  <div className="flex items-center border-b border-purple-500 py-2">
    <input
      className="appearance-none bg-transparent border-none w-full text-purple-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="text"
      placeholder="Full name"
      aria-label="Full name"
      required
    />
   
  </div>
  <div className="flex items-center border-b border-purple-500 py-2">
    <input
      className="appearance-none bg-transparent border-none w-full text-purple-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="email"
      placeholder="email"
      aria-label="email"
      required
    />
   
  </div>
  <div className="flex items-center border-b border-purple-500 py-2">
    <input
      className="appearance-none bg-transparent border-none w-full text-purple-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="password"
      placeholder="Password"
      aria-label="Password"
    />
   
  </div>
  <div className="flex items-center border-b border-purple-500 py-2">
    <input
      className="appearance-none bg-transparent border-none w-full text-purple-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="password"
      placeholder="Confirm Password"
      aria-label="Confirm Password"
    />
   


  </div>

  <button
    className="flex-shrink-0 bg-purple-500 my-5 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-lg font-serif border-4 text-white py-1 px-4 rounded"
    type="button"
  >
    Sign Up
  </button>
  <button
    className="flex-shrink-0 border-transparent border-4 text-purple-500 hover:text-purple-800 text-lg py-1 px-4 rounded"
    type="button"
  >
    Cancel
  </button>

</form>

</div>
    </div>
    </div>
    </>
  )
}

export default Signup