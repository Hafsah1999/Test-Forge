import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SubmitForm = ({ formId }) => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/forms/${formId}`);
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };
    fetchForm();
  }, [formId]);

  const handleResponseChange = (questionIndex, value) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/forms/submit/${formId}`, {
        method: 'POST',
        body: JSON.stringify({ responses }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        toast.success("Responses submitted successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error('Error submitting responses:', error);
      toast.error('An error occurred while submitting the responses');
    }
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
        </div>
        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 bg-white shadow-lg rounded-lg p-6">
            <h3 className='text-lg font-semibold mb-3'>{questionIndex + 1}. {question.name}</h3>
            <div className="options">
              <input
                type="text"
                className='w-full py-2 border-2 ps-3 border border-gray-200 rounded'
                placeholder="Your answer"
                onChange={(e) => handleResponseChange(questionIndex, e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="submit" className='bg-purple-600 text-white py-2 px-6 rounded-lg text-lg font-semibold'>
          Submit Responses
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;
