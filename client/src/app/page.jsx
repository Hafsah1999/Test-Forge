'use client'
import React from 'react'
import Navbar from './(main)/navbar'
import Link from 'next/link'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

const Home = () => {
  return (
    <>
      <Navbar />
   <div className="h-3/4">
    <div className="">
      <div className=" px-32 py-24 bg-gray-300 flex items-center justify-center flex-col">
        <p className="text-6xl font-serif typing-text text-center">
        Create and Share
       Forms in Minutes
        </p>
        <p className="py-6 text-lg text-gray-500 text-center">
        Create, share, and analyze forms in minutes with Test Forge. From surveys to quizzes, turn your ideas into powerful online forms. Simple for you, engaging for your audience. 
        </p>
        <Link href="signup" className="bg-purple-600  transition duration-300 delay-150 hover:delay-300 text-white px-8 py-1 rounded text-2xl font-serif">Go to Forms</Link>
      </div>
      {/* <div className="">
        <img className='w-1/2 p-5  mx-auto pt-16 object-cover' src="https://st.formdesigner.pro/images/themes/new/main_en.png" alt="" />
      </div> */}
    </div>
   </div>

   <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>

    </>
  )
}

export default Home