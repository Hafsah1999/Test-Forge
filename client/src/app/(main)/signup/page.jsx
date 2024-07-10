"use client"
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignupPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const signupForm = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
      createdAt:""
    },

    onSubmit: async (values, action) => {
      // values.image = selFile;
      console.log(values);
      const res = await fetch("http://localhost:5000/user/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.status);
      if (res.status === 200) {
        action.resetForm();
        toast.success("User added successfully");
        res.json().then((data) => {
          console.log(data);
          sessionStorage.setItem("user", JSON.stringify(data));
          router.push("/form");
        });
      } else if (res.status === 401){
        toast.error("Something went wrong");
      }
      
    },
  });

  return (
    <div>
      {/* Button to open the popup */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Up
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Sign Up</h3>
              <div className="mt-2 px-7 py-3">
                <form onsubmit={signupForm.handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={signupForm.values.name}
                    onChange={signupForm.handleChange}
                    required
                    placeholder="Full Name"
                    className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                  <input
                    type="email"
                    name="email"
                    value={signupForm.values.email}
                    onChange={signupForm.handleChange}
                    required
                    placeholder="Email"
                    className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                  <input
                    type="password"
                    name="password"
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    required
                    placeholder="Password"
                    className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPopup;