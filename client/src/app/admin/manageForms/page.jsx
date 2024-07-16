'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ManageForms = () => {
  const { id } = useParams();
  useEffect(() => {
    fetchForms();
  }, [id]);
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://localhost:5000/form/getall');
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      } else {
        toast.error('Failed to fetch forms');
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast.error('An error occurred while fetching forms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        const response = await fetch(`http://localhost:5000/form/delete/` + id, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.success('Form deleted successfully');
          fetchForms(); // Refresh the list
        } else {
          toast.error('Failed to delete form');
        }
      } catch (error) {
        console.error('Error deleting form:', error);
        toast.error('An error occurred while deleting the form');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/form/update/` +  id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success(`Form ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
        fetchForms(); // Refresh the list
      } else {
        toast.error('Failed to update form status');
      }
    } catch (error) {
      console.error('Error updating form status:', error);
      toast.error('An error occurred while updating form status');
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Forms</h1>
      <button onClick={createNewForm} className="bg-green-500 text-white py-2 px-4 rounded mb-4 inline-block">
        Create New Form
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                  {form.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                  <span className={`px-2 py-1 rounded ${form.status === 'draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {form.status || 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                  <button
                    onClick={() => router.push(`/viewForm/${form._id}`)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleStatusChange(form._id, form.status === 'published' ? 'draft' : 'published')}
                    className={`py-1 px-2 rounded ${form.status === 'published' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                  >
                    {form.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageForms;