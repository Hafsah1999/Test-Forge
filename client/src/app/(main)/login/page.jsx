import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <>
      <div className="">

        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <img src="test forge.jpg" className='w-36' alt="" />
            <div className="flex items-center h-3/4 justify-center flex-col">
              <form className="w-full max-w-sm">
                <div className="text-purple-500 text-4xl font-bold">Sign In</div>
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
          <div className="col-span-1 bg-purple-500 flex items-center justify-center flex-col h-screen">
            <p className="text-4xl text-white font-bold border-b mb-3">Welcome Back</p>
            <p className="text-white text-xl mb-5">Enter your personal details</p>
            <div className="flex">
              <p className="text-md text-white">Not yet registered? Register Here</p>
              <Link href="/signup" className="bg-white text-purple-700 px-2 ms-2 rounded">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login