"use client";
import { useState } from "react";
import { updateStudent, deleteStudent } from "../../../lib/actions";

function StudentsList({ session }) {
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  function update(student) {
    setEditingStudent(student.user_id);
    setUpdatedName(student.name);
    setUpdatedEmail(student.email);
  }

  async function handleSave(studentId) {
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("updatedName", updatedName);
    formData.append("updatedEmail", updatedEmail);

    // Call the server action with form data
    await updateStudent(formData);

    setEditingStudent(null);
    setUpdatedName("");
    setUpdatedEmail("");
  }

  async function handleDelete(studentId) {
    // Confirm deletion with the user
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    // Call the server action to delete the student
    await deleteStudent(studentId);

    // Optionally, update the UI to remove the student from the list
    // For example, you might refetch the data or manually update session.students
  }

  function handleCancel() {
    setEditingStudent(null);
    setUpdatedName("");
    setUpdatedEmail("");
  }

  return (
    <tbody>
      {session.students.map((student, index) => (
        <tr key={student.user_id}>
          <td className="px-6 py-4 border-b text-gray-700">{index + 1}</td>
          <td className="px-6 py-4 border-b text-gray-700">
            {editingStudent === student.user_id ? (
              <input
                type="text"
                name="updatedName"
                className="border p-2 rounded"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            ) : (
              student.name
            )}
          </td>
          <td className="px-6 py-4 border-b text-gray-700">
            {editingStudent === student.user_id ? (
              <input
                type="email"
                name="updatedEmail"
                className="border p-2 rounded"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            ) : (
              student.email
            )}
          </td>
          <td className="px-6 py-4 border-b">
            <div className="flex">
              {editingStudent === student.user_id ? (
                <>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() => handleSave(student.user_id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => update(student)}
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
                </>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default StudentsList;
