'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditForm = () => {
  const [form, setForm] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const res = await fetch("http://localhost:5000/form/getbyid/" + id);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      } else {
        toast.error("Failed to fetch form");
      }
    } catch (error) {
      console.error("Error fetching form:", error);
      toast.error("An error occurred while fetching the form");
    }
  };

  // ... (keep all the existing functions)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/form/update/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Form updated successfully");
      } else {
        toast.error("Failed to update form");
      }
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("An error occurred while updating the form");
    }
  };

  const handlePublish = async () => {
    try {
      const res = await fetch('http://localhost:5000/form/update/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, status: 'published' }),
      });

      if (res.ok) {
        toast.success("Form published successfully");
        router.push('/forms'); // Redirect to the forms list page
      } else {
        toast.error("Failed to publish form");
      }
    } catch (error) {
      console.error("Error publishing form:", error);
      toast.error("An error occurred while publishing the form");
    }
  };



  const handleTitleChange = (e) => {
    setForm(prev => ({ ...prev, title: e.target.value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      const updatedOptions = [...updatedQuestions[questionIndex].options];
      updatedOptions[optionIndex] = value;
      updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options: updatedOptions };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, { name: '', type: 'short', options: [] }]
    }));
  };

  const removeQuestion = (index) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const addOption = (questionIndex) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options.push('');
      return { ...prev, questions: updatedQuestions };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setForm(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
      return { ...prev, questions: updatedQuestions };
    });
  };

 

  if (!form) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.title}
          onChange={handleTitleChange}
          className="text-3xl font-bold mb-4 w-full p-2 border rounded"
        />
        
        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-6 bg-white shadow-lg rounded-lg p-6">
            <input
              type="text"
              value={question.name}
              onChange={(e) => handleQuestionChange(questionIndex, 'name', e.target.value)}
              className="text-xl font-semibold mb-3 w-full p-2 border rounded"
            />
            <select
              value={question.type}
              onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
              className="mb-3 p-2 border rounded"
            >
              <option value="short">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="multiple">Multiple Choice</option>
            </select>
            {question.type === 'multiple' && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="mr-2 p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  className="bg-green-500 text-white py-1 px-2 rounded mt-2"
                >
                  Add Option
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2"
            >
              Remove Question
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addQuestion}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Question
        </button>
        
        <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {/* ... (keep all the existing form fields) */}
        
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Publish Form
          </button>
        </div>
      </form>
    </div>
      </form>
    </div>
  );
};

export default EditForm;