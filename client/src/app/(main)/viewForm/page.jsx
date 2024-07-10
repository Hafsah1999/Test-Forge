import React, { useState, useEffect } from 'react';

const ViewForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/forms`);
        const data = await res.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Forms</h1>
      {forms.map((form) => (
        <div key={form._id} className="mb-4 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold">{form.title}</h2>
          <ul>
            {form.questions.map((question, index) => (
              <li key={index} className="mb-2">{question.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewForms;
