"use client";
import { useState } from "react";
import { updateTeacher, deleteTeacher } from "../../../lib/actions";

function TeachersList({ session }) {
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  function update(teacher) {
    setEditingTeacher(teacher.user_id);
    setUpdatedName(teacher.name);
    setUpdatedEmail(teacher.email);
  }

  async function handleSave(teacherId) {
    const formData = new FormData();
    formData.append("teacherId", teacherId);
    formData.append("updatedName", updatedName);
    formData.append("updatedEmail", updatedEmail);

    // Call the server action with form data
    await updateTeacher(formData);

    setEditingTeacher(null);
    setUpdatedName("");
    setUpdatedEmail("");
  }

  async function handleDelete(teacherId) {
    // Confirm deletion with the user
    const confirmed = confirm("Are you sure you want to delete this teacher?");
    if (!confirmed) return;

    // Call the server action to delete the teacher
    await deleteTeacher(teacherId);

    // Optionally, you could update the local state to remove the teacher from the list
    // For example, you might refetch the data or manually remove the teacher from session.teachers
  }

  function handleCancel() {
    setEditingTeacher(null);
    setUpdatedName("");
    setUpdatedEmail("");
  }

  return (
    <tbody>
      {session.teachers.map((teacher, index) => (
        <tr key={teacher.user_id}>
          <td className="px-6 py-4 border-b text-gray-700">{index + 1}</td>
          <td className="px-6 py-4 border-b text-gray-700">
            {editingTeacher === teacher.user_id ? (
              <input
                type="text"
                name="updatedName"
                className="border p-2 rounded"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            ) : (
              teacher.name
            )}
          </td>
          <td className="px-6 py-4 border-b text-gray-700">
            {editingTeacher === teacher.user_id ? (
              <input
                type="email"
                name="updatedEmail"
                className="border p-2 rounded"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            ) : (
              teacher.email
            )}
          </td>
          <td className="px-6 py-4 border-b">
            <div className="flex">
              {editingTeacher === teacher.user_id ? (
                <>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    onClick={() => handleSave(teacher.user_id)}
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
                    onClick={() => update(teacher)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(teacher.user_id)}
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

export default TeachersList;
