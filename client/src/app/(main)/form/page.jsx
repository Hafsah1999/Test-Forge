'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik'
import toast from 'react-hot-toast';

const Question = ({ questionNumber, onDelete, onChange }) => {

  const Form = useFormik({
    initialValues: {
    title:"",
    questions:"",
    createdAt:""
    },
    onSubmit: (values) => {
        console.log(values);

        fetch('http://localhost:5000/test/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log(res.status);
        action.resetForm();
        if (res.status === 200) {
          toast.success("Item uploaded successfully");
          // router.push('/seller/manageProduct');
        } else {
          toast.error("Something went wrong");
        }
      },
});

  const [text, setText] = useState('');
  const [options, setOptions] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAnswerChange = (event) => {
    setAnswerIndex(parseInt(event.target.value));
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleDeleteQuestion = () => {
    onDelete(questionNumber);
  };

  return (

    <div className="">
      <form onSubmit={Form.handleSubmit}>
        <div className="flex items-center justify-center">
          <div className="w-1/2 border-t-8 shadow-lg py-8 px-4 rounded-lg border-blue-600 h-48 bg-gray-100">
            <p className="text-2xl mb-2">Untitled Form</p>
            <input type="text" value={Form.values.title} onChange={Form.handleChange} className='w-full py-2 border-2 ps-3 border border-gray-200' placeholder="Form  title" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-1/2 border-t-8 shadow-lg py-8 px-4 rounded-lg border-blue-600 h-48 bg-gray-100">
            <div className="question">
              <p className='mb-3'>Question {questionNumber + 1}</p>
              <input type="text"
                className='w-full py-2 border-2 ps-3 mb-3 border border-gray-200'
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter question text"
                required
              />
              <div className="options">
                {options.map((option, index) => (
                  <div key={index} className="option">
                    <input
                      type="text"
                      value={option}
                      className='w-full py-2 border-2 ps-3 mb-3 border border-gray-200'
                      onChange={(e) => handleOptionChange(e, index)}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    {index > 0 && (
                      <button type="button" className='my-2' onClick={() => handleDeleteOption(index)}>
                        Remove Option
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className='bg-blue-500 text-white py-1 px-4 rounded my-4' onClick={handleAddOption}>
                  Add Option
                </button>
              </div>
              <div className="answer">
                <label htmlFor={`answer-${questionNumber}`}>Correct Answer:</label>
                <select id={`answer-${questionNumber}`} value={answerIndex} onChange={handleAnswerChange}>
                  <option value={null}>Select Answer</option>
                  {options.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {questionNumber > 0 && (
                <button type="button" className='bg-red-800' onClick={handleDeleteQuestion}>
                  Delete Question
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Question;
