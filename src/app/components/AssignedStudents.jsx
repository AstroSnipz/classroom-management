import { getSession } from "../../../lib/actions";
import React from "react";

async function AssignedStudents() {
  const session = await getSession();

  // Check if session and AssignedStudents exist
  const assignedStudents = session?.assignedStudents || [];

  //   console.log("Assigned Students:", assignedStudents);

  // Group students by teacher name
  const groupedAssignments = assignedStudents.reduce((acc, assignment) => {
    if (!assignment.teacher_name || !assignment.student_name) {
      //   console.warn("Invalid assignment:", assignment);
      return acc;
    }
    if (!acc[assignment.teacher_name]) {
      acc[assignment.teacher_name] = [];
    }
    acc[assignment.teacher_name].push(assignment.student_name);
    return acc;
  }, {});

  //   console.log("Grouped Assignments:", groupedAssignments);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Assigned Students</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Teacher Name</th>
              <th className="px-4 py-2 border">Student Name</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedAssignments).length > 0 ? (
              Object.entries(groupedAssignments).map(
                ([teacherName, students], index) => (
                  <React.Fragment key={index}>
                    {students.map((student, studentIndex) => (
                      <tr key={studentIndex}>
                        {studentIndex === 0 ? (
                          <td
                            className="px-4 py-2 border"
                            rowSpan={students.length}
                          >
                            {teacherName}
                          </td>
                        ) : null}
                        <td className="px-4 py-2 border">{student}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-2 border text-center">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignedStudents;
