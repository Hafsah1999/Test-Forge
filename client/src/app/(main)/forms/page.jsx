'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const FormsPage = () => {
  const router = useRouter()
  const [forms, setForms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/form/getall');
      if (!res.ok) {
        throw new Error('Failed to fetch forms');
      }
      const data = await res.json();
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setError(error.message);
      toast.error("An error occurred while fetching forms");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewForm = async () => {
    try {
      const res = await fetch('http://localhost:5000/form/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can add any initial form data here if needed
        body: JSON.stringify({ title: 'Untitled Form' }),
      });

      if (!res.ok) {
        throw new Error('Failed to create new form');
      }

      const newForm = await res.json();
      // console.log(newForm);
      // return;
      router.push(`/createForm/${newForm._id}`);
    } catch (error) {
      console.error("Error creating new form:", error);
      toast.error("An error occurred while creating a new form");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }



  // Ensure forms is an array before trying to access its length
  const formsArray = Array.isArray(forms) ? forms : [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <button onClick={createNewForm} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
          Create New Form
        </button>
      </div>

      {formsArray.length === 0 ? (
        <p className="text-center text-gray-500">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formsArray.map((form) => (
            <div key={form._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{form.title}</h2>
              <p className="text-gray-600 mb-4">
                {form.questions && Array.isArray(form.questions)
                  ? `${form.questions.length} questions`
                  : 'No questions'}
              </p>
              <div className="flex justify-between">
                <Link href={`/viewForm/${form._id}`} className="text-blue-500 hover:underline">
                  View Form
                </Link>
                <span className="text-gray-500">
                  Created: {new Date(form.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsPage;