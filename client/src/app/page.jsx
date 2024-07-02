import React from 'react'
import Navbar from './(main)/navbar'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Navbar />
   <div className="h-3/4">
    <div className="grid grid-cols-2 md:grid-cols">
      <div className=" pl-24 pt-24">
        <p className="text-6xl font-serif">
        Create and Share Forms in Minutes
        </p>
        <p className="py-6 text-gray-500">
        Create, share, and analyze forms in minutes with Test Forge. From surveys to quizzes, turn your ideas into powerful online forms. Simple for you, engaging for your audience. 
        </p>
        <Link href="/admin/form" className="bg-purple-600 transition duration-300 delay-150 hover:delay-300 text-white px-8 py-1 rounded text-2xl font-serif">Go to Forms</Link>
      </div>
      <div className="">
        <img className='w-1/2 p-5  mx-auto pt-16 object-cover' src="https://st.formdesigner.pro/images/themes/new/main_en.png" alt="" />
      </div>
    </div>
   </div>
    </>
  )
}

export default Home