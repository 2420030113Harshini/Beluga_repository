import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddCGPA from "./components/AddCGPA";
import ViewCGPA from "./components/ViewCGPA";

const App = () => {
  const [studentData, setStudentData] = useState(null);

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#f9f9f9"
        }}
      >
        <nav style={{ marginBottom: "20px" }}>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              gap: "20px"
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  fontWeight: "bold"
                }}
              >
                Add CGPA
              </Link>
            </li>

            <li>
              <Link
                to="/view-cgpa"
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  fontWeight: "bold"
                }}
              >
                View CGPA
              </Link>
            </li>
          </ul>
        </nav>

        <hr
          style={{
            width: "100%",
            maxWidth: "500px",
            border: "1px solid #ccc",
            margin: "10px 0"
          }}
        />

        <div style={{ width: "100%", maxWidth: "500px" }}>
          <Routes>
            <Route path="/" element={<AddCGPA setStudentData={setStudentData} />} />
            <Route path="/view-cgpa" element={<ViewCGPA studentData={studentData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
