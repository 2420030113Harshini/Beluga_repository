import React from "react";
import { jsPDF } from "jspdf";

const ViewCGPA = ({ studentData }) => {
  const handleDownloadPDF = () => {
    if (studentData) {
      const doc = new jsPDF();
      doc.text("Student Details", 20, 20);
      doc.text(`Student Name: ${studentData.studentName}`, 20, 30);
      doc.text(`Roll Number: ${studentData.rollNumber}`, 20, 40);
      doc.text(`CGPA: ${studentData.cgpa}`, 20, 50);
      doc.save("student-details.pdf");
    } else {
      alert("No student data available to download.");
    }
  };

  return (
    <div>
      <h2>View Student CGPA</h2>

      {studentData ? (
        <div>
          <p><strong>Student Name:</strong> {studentData.studentName}</p>
          <p><strong>Roll Number:</strong> {studentData.rollNumber}</p>
          <p><strong>CGPA:</strong> {studentData.cgpa}</p>

          <button onClick={handleDownloadPDF} style={{ marginTop: "20px" }}>
            Download PDF
          </button>
        </div>
      ) : (
        <p>No student data available. Please add CGPA first.</p>
      )}
    </div>
  );
};

export default ViewCGPA;
