'use client'
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CreateForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    questions: [],
    duration: 0
  });
  const [formStatus, setFormStatus] = useState(id ? 'published' : 'draft');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchForm();
    } else {
      setForm({
        title: "Untitled Form",
        questions: [],
        duration: 0
      });
      setIsLoading(false);
    }
  }, [id]);

  const fetchForm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/form/getbyid/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
        setFormStatus(data.status || 'draft');
      } else {
        toast.error("Failed to fetch form");
      }
    } catch (error) {
      console.error("Error fetching form:", error);
      toast.error("An error occurred while fetching the form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Form title is required");
      return;
    }

    const updatedForm = { ...form, status: action };

    try {
      const url = id 
        ? `http://localhost:5000/form/update/${id}`
        : 'http://localhost:5000/form/add';

      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(updatedForm),
        headers: {
          'Content-Type': 'application/json'
        }
      });
     
      if (res.ok) {
        toast.success(action === 'draft' ? "Form saved as draft" : "Form published successfully");
        router.push("/forms");
      } else {
        toast.error("Failed to save form");
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("An error occurred while saving the form");
    }
  };

  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, {
        name: "",
        type: "short",
        options: [],
      }]
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleAddOption = (questionIndex) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options.push('New Option');
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{id ? "Edit Form" : "Create a New Form"}</h1>
          <div className="mb-4">
            <span className={`px-2 py-1 rounded ${formStatus === 'draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
              {formStatus === 'draft' ? 'Draft' : 'Published'}
            </span>
          </div>
          <input 
            type="text" 
            value={form.title} 
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} 
            className='w-full py-2 mb-5 border-2 ps-3 border border-gray-200 rounded' 
            placeholder="Form title" 
          />
          <div className="flex items-center justify-end">
            <label className="mr-2">Duration (minutes):</label>
            <input 
              type="number" 
              value={form.duration} 
              onChange={(e) => setForm(prev => ({ ...prev, duration: Math.max(0, parseInt(e.target.value)) }))} 
              className='w-24 py-2 border-2 ps-3 border border-gray-200 rounded' 
              min="0"
            />
          </div>
        </div>

        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 bg-white shadow-lg rounded-lg p-6">
            <h3 className='text-lg font-semibold mb-3'>{questionIndex + 1}. {question.name}</h3>
            <input 
              type="text"
              value={question.name}
              onChange={(e) => handleQuestionChange(questionIndex, 'name', e.target.value)}
              className='w-full py-2 border-2 ps-3 mb-3 border border-gray-200 rounded'
              placeholder="Question text"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              >
                <option value="short">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </div>
            {question.type === 'multiple' && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      className='flex-grow py-2 border-2 ps-3 border border-gray-200 rounded-l'
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                    />
                    {optionIndex > 0 && (
                      <button type="button" className='bg-red-500 text-white py-2 px-2 rounded-r' onClick={() => handleDeleteOption(questionIndex, optionIndex)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  className='bg-blue-500 text-white py-1 px-4 rounded my-2' 
                  onClick={() => handleAddOption(questionIndex)}
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <button 
          type="button" 
          onClick={addQuestion}
          className='bg-green-500 text-white py-2 px-4 rounded mb-4'
        >
          Add Question
        </button>

        <div className="flex justify-between mt-4">
          <button 
            type="button" 
            onClick={(e) => handleSubmit(e, 'draft')}
            className='bg-gray-500 text-white py-2 px-6 rounded-lg text-lg font-semibold'
          >
            Save as Draft
          </button>
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, 'published')}
            className='bg-purple-600 text-white py-2 px-6 rounded-lg text-lg font-semibold'
          >
            {id ? "Update and Publish" : "Publish Form"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;