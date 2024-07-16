import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ username: '', password: '' });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const response = await fetch('/api/admin/teachers');
    if (response.ok) {
      const data = await response.json();
      setTeachers(data);
    }
  };

  const addTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/admin/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher),
    });

    if (response.ok) {
      setNewTeacher({ username: '', password: '' });
      fetchTeachers();
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Add New Teacher</h2>
      <form onSubmit={addTeacher}>
        <input
          type="text"
          value={newTeacher.username}
          onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={newTeacher.password}
          onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
          placeholder="Password"
          required
        />
        <button type="submit">Add Teacher</button>
      </form>
      <h2>Teacher List</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>{teacher.username}</li>
        ))}
      </ul>
    </div>
  );
}