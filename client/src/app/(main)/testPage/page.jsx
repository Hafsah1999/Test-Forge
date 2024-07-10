'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FormDisplay = () => {
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       fetchFormData(id);
//     }
//   }, [id]);

  const fetchFormData = async (formId) => {
    try {
      const res = await fetch(`http://localhost:5000/test/${formId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
        initializeResponses(data.questions);
      } else {
        console.error('Failed to fetch form data');
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const initializeResponses = (questions) => {
    const initialResponses = {};
    questions.forEach((question, index) => {
      initialResponses[index] = question.type === 'multiple' ? '' : '';
    });
    setResponses(initialResponses);
  };

  const handleInputChange = (questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/responses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: id,
          responses: responses,
        }),
      });
      if (res.ok) {
        alert('Form submitted successfully');
        router.push('/thank-you'); // Redirect to a thank you page
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{formData.title}</h1>
      <form onSubmit={handleSubmit}>
        {formData.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-lg font-medium mb-2">
              {index + 1}. {question.name}
            </label>
            {question.type === 'short' && (
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={responses[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
            {question.type === 'paragraph' && (
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                value={responses[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
              ></textarea>
            )}
            {question.type === 'multiple' && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={responses[index] === option}
                      onChange={() => handleInputChange(index, option)}
                      className="mr-2"
                    />
                    <label htmlFor={`question-${index}-option-${optionIndex}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormDisplay;