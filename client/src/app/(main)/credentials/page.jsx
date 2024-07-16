'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const StudentCredentials = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: '',
    contact: '',
    email: '',
    studentId: '',
    course: '',
    batch: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    for (const [key, value] of Object.entries(credentials)) {
      if (!value.trim()) {
        toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:5000/student/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Failed to submit credentials');
      }

      const data = await response.json();
      
      // Store credentials in localStorage
      localStorage.setItem('studentCredentials', JSON.stringify(data));
      
      toast.success('Credentials submitted successfully');
      // Redirect to the test page
      router.push('/test');
    } catch (error) {
      console.error('Error submitting credentials:', error);
      toast.error('Failed to submit credentials. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Credentials</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Form fields remain the same */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={credentials.contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-gray-700 text-sm font-bold mb-2">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={credentials.studentId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 text-sm font-bold mb-2">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            value={credentials.course}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="batch" className="block text-gray-700 text-sm font-bold mb-2">Batch</label>
          <input
            type="text"
            id="batch"
            name="batch"
            value={credentials.batch}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit and Start Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentCredentials;