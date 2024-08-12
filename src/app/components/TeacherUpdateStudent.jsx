"use client";
import { useState } from "react";
import {
  updateStudent,
  deleteStudentFromClassroom,
} from "../../../lib/actions";

function TeacherUpdateStudent({ students }) {
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  function handleUpdate(student) {
    setEditingStudent(student.user_id);
    setUpdatedName(student.name);
    setUpdatedEmail(student.email);
  }

  function handleCancel() {
    setEditingStudent(null);
    setUpdatedName("");
    setUpdatedEmail("");
  }

  async function handleSave(studentId) {
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("updatedName", updatedName);
    formData.append("updatedEmail", updatedEmail);

    try {
      await updateStudent(formData);
      window.location.reload(); // Reload page to reflect changes
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      setEditingStudent(null);
      setUpdatedName("");
      setUpdatedEmail("");
    }
  }

  async function handleDelete(studentId) {
    // Confirm deletion with the user
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    try {
      await deleteStudentFromClassroom(studentId);
      window.location.reload(); // Reload page to reflect changes
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
      <div className="overflow-x-auto">
        {students.length > 0 ? (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.user_id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {editingStudent === student.user_id ? (
                      <input
                        type="text"
                        className="border p-2 rounded"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingStudent === student.user_id ? (
                      <input
                        type="email"
                        className="border p-2 rounded"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                      />
                    ) : (
                      student.email
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingStudent === student.user_id ? (
                      <div className="flex">
                        <button
                          type="button"
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                          onClick={() => handleSave(student.user_id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex">
                        <button
                          type="button"
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                          onClick={() => handleUpdate(student)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => handleDelete(student.user_id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students are assigned to your classroom.</p>
        )}
      </div>
    </div>
  );
}

export default TeacherUpdateStudent;
