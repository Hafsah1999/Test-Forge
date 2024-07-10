'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("short");
  const [questionList, setQuestionList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Form title is required");
      return;
    }
    if (questionList.length === 0) {
      toast.error("At least one question is required");
      return;
    }
    console.log(questionList);
    try {
      const res = await fetch('http://localhost:5000/form/add', {
        method: 'POST',
        body: JSON.stringify({ title, questions: questionList, createdAt: new Date() }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
     
      if (res.ok) {
        console.log(res);
        toast.success("Form submitted successfully");
        setTitle("");
        setNewQuestion("");
        setNewQuestionType("short");
        setQuestionList([]);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestionList([...questionList, {
        name: newQuestion,
        type: newQuestionType,
        options: newQuestionType === 'multiple' ? ['Option 1'] : [],
      }]);
      setNewQuestion("");
      setNewQuestionType("short");
    }
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[questionIndex].options.push('New Option');
    setQuestionList(updatedQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestionList(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestionList(updatedQuestions);
  };

  const handleQuestionTypeChange = (questionIndex, newType) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[questionIndex].type = newType;
    if (newType === 'multiple' && updatedQuestions[questionIndex].options.length === 0) {
      updatedQuestions[questionIndex].options = ['Option 1'];
    }
    setQuestionList(updatedQuestions);
  };

  const getResponseType = (question, questionIndex) => {
    switch (question.type) {
      case 'short':
        return <input placeholder='Short answer' className='w-full py-2 border-2 ps-3 mb-3 border border-gray-200 rounded' />;
      case 'paragraph':
        return <textarea placeholder='Long answer' className='w-full py-2 border-2 ps-3 mb-3 border border-gray-200 rounded' rows="3"></textarea>;
      case 'multiple':
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Create a New Form</h1>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className='w-full py-2 border-2 ps-3 border border-gray-200 rounded' 
            placeholder="Form title" 
          />
        </div>

        <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className='flex-grow py-2 border-2 ps-3 border border-gray-200 rounded'
              placeholder="Enter new question"
            />
          
            <button 
              type="button" 
              onClick={addQuestion}
              className='bg-green-500 text-white py-2 px-4 rounded'
            >
              Add Question
            </button>
          </div>
        </div>

        {questionList.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 bg-white shadow-lg rounded-lg p-6">
            <h3 className='text-lg font-semibold mb-3'>{questionIndex + 1}. {question.name}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(questionIndex, e.target.value)}
                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              >
                <option value="short">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </div>
            <div className="options">
              {getResponseType(question, questionIndex)}
            </div>
          </div>
        ))}

        <button type="submit" className='bg-purple-600 text-white py-2 px-6 rounded-lg text-lg font-semibold'>
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
