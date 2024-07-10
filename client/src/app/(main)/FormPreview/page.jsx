'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewForm = () => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchForm();
  }, [id]);

  useEffect(() => {
    let timer;
    if (timeLeft !== null && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const fetchForm = async () => {
    try {
      const res = await fetch("http://localhost:5000/form/getbyid/" + id);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
        if (data.duration) {
            setTimeLeft(data.duration * 60); // Convert minutes to seconds
          }
        // Initialize responses state
        const initialResponses = {};
        data.questions.forEach(q => {
          initialResponses[q._id] = q.type === 'multiple' ? '' : [];
        });
        setResponses(initialResponses);
      } else {
        toast.error("Failed to fetch form");
      }
    } catch (error) {
      console.error("Error fetching form:", error);
      toast.error("An error occurred while fetching the form");
    }
  };

  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/form/submit' +id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: id,
          responses: responses
        }),
      });

      if (res.ok) {
        toast.success("Form submitted successfully");
        // Reset responses
        const resetResponses = {};
        form.questions.forEach(q => {
          resetResponses[q._id] = q.type === 'multiple' ? '' : [];
        });
        setResponses(resetResponses);
      } else {
        toast.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'short':
        return (
          <input
            type="text"
            value={responses[question._id]}
            onChange={(e) => handleInputChange(question._id, e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        );
      case 'paragraph':
        return (
          <textarea
            value={responses[question._id]}
            onChange={(e) => handleInputChange(question._id, e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        );
      case 'multiple':
        return (
          <div>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`${question._id}-${index}`}
                  name={question._id}
                  value={option}
                  checked={responses[question._id] === option}
                  onChange={(e) => handleInputChange(question._id, e.target.value)}
                  className="mr-2"
                  required
                />
                <label htmlFor={`${question._id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (!form) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
      {timeLeft !== null && (
        <div className="text-xl font-semibold mb-4">
          Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {form.questions.map((question, index) => (
          <div key={question._id} className="mb-6 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              {index + 1}. {question.name}
              </h2>
            {renderQuestion(question)}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ViewForm;