import React, { useState } from "react";

const MatrixSumCalculator = () => {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [resultMatrix, setResultMatrix] = useState([]);

  const handleMatrixASetup = () => {
    setMatrixA(Array.from({ length: rowsA }, () => Array(colsA).fill(0)));
  };
  const handleMatrixBSetup = () => {
    setMatrixB(Array.from({ length: rowsB }, () => Array(colsB).fill(0)));
  };

  const handleMatrixChange = (setter, r, c, v) => {
    setter(prev => {
      const copy = prev.map(row => [...row]);
      copy[r][c] = parseInt(v) || 0;
      return copy;
    });
  };

  const calculateSum = () => {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      alert("Matrix sizes must match!");
      return;
    }
    setResultMatrix(matrixA.map((row,i)=> row.map((v,j)=> v+matrixB[i][j])));
  };

  const renderMatrix = (matrix, setter) => (
    <table className="matrix-table">
      <tbody>
        {matrix.map((row, i)=>(
          <tr key={i}>
            {row.map((col,j)=>(
              <td key={j}>
                <input type="number" value={col}
                  onChange={e=>handleMatrixChange(setter,i,j,e.target.value)}
                  style={{width:"50px",textAlign:"center"}}/>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="section">
        <h3>Matrix A Dimensions</h3>
        <input type="number" value={rowsA} onChange={e=>setRowsA(+e.target.value)} />
        <input type="number" value={colsA} onChange={e=>setColsA(+e.target.value)} />
        <button onClick={handleMatrixASetup}>Set A</button>
      </div>

      {matrixA.length>0 && renderMatrix(matrixA,setMatrixA)}

      <div className="section">
        <h3>Matrix B Dimensions</h3>
        <input type="number" value={rowsB} onChange={e=>setRowsB(+e.target.value)} />
        <input type="number" value={colsB} onChange={e=>setColsB(+e.target.value)} />
        <button onClick={handleMatrixBSetup}>Set B</button>
      </div>

      {matrixB.length>0 && renderMatrix(matrixB,setMatrixB)}

      {(matrixA.length>0 && matrixB.length>0 &&
        matrixA.length===matrixB.length && matrixA[0].length===matrixB[0].length) &&
        <button onClick={calculateSum}>Calculate Sum</button>}

      {resultMatrix.length>0 && (
        <table className="matrix-table">
          <tbody>
            {resultMatrix.map((row,i)=>(
              <tr key={i}>{row.map((col,j)=><td key={j}>{col}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatrixSumCalculator;
