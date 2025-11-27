import React, { useState, useEffect } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // Handles keyboard input
    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key;
            
            if (key === 'Enter') {
                e.preventDefault();
                handleClick('=');
            } else if (key === 'Escape') {
                e.preventDefault();
                handleClick('C');
            } else if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
                e.preventDefault();
                handleClick(key);
            } else if (key === 'Backspace') {
                e.preventDefault();
                handleClick('DEL');
            }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [input]);

    // Validates expression to prevent multiple operators
    const isValidExpression = (expr) => {
        const operators = ['+', '-', '*', '/'];
        const lastChar = expr[expr.length - 1];
        return !operators.includes(lastChar);
    };

    // Safely evaluates mathematical expression
    const safeEval = (expr) => {
        try {
            // Remove spaces and validate
            const cleanExpr = expr.replace(/\s/g, '');
            
            // Check for empty expression
            if (!cleanExpr) return '';
            
            // Use Function constructor instead of eval for better security
            const result = Function('"use strict"; return (' + cleanExpr + ')')();
            return result;
        } catch (error) {
            console.error('Calculation error:', error);
            return 'Error';
        }
    };

    // Handles button click
    const handleClick = (value) => {
        if (value === '=') {
            if (input && isValidExpression(input)) {
                const calcResult = safeEval(input);
                
                if (calcResult !== 'Error' && calcResult !== '') {
                    setResult(calcResult);
                    
                    // Add to history
                    const historyEntry = `${input} = ${calcResult}`;
                    setHistory([historyEntry, ...history.slice(0, 9)]); // Keep last 10 calculations
                    
                    setInput('');
                } else {
                    setResult('Error');
                }
            }
        } else if (value === 'C') {
            // Clear all
            setInput('');
            setResult('');
        } else if (value === 'DEL') {
            // Delete last character
            setInput(input.slice(0, -1));
        } else if (value === 'H') {
            // Toggle history
            setShowHistory(!showHistory);
        } else if (value === 'CLR_HISTORY') {
            // Clear history
            setHistory([]);
        } else {
            // Add value to input
            const operators = ['+', '-', '*', '/'];
            
            // Prevent multiple operators in a row
            if (operators.includes(value) && input && operators.includes(input[input.length - 1])) {
                return;
            }
            
            // Prevent starting with operator (except minus for negative numbers)
            if (operators.includes(value) && !input && value !== '-') {
                return;
            }
            
            setInput(input + value);
        }
    };

    const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

    return (
        <div style={containerStyle}>
            <div style={calculatorStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>React Calculator</h1>
                    <button 
                        onClick={() => handleClick('H')}
                        style={historyToggleStyle}
                        title="Toggle History"
                    >
                        📋 History
                    </button>
                </div>
                
                <div style={displayStyle}>
                    <div style={inputStyle}>
                        <small style={labelStyle}>Input</small>
                        <div style={inputValueStyle}>{input || '0'}</div>
                    </div>
                    <div style={resultStyle}>
                        <small style={labelStyle}>Result</small>
                        <div style={resultValueStyle}>{result || '0'}</div>
                    </div>
                </div>
                
                <div style={buttonContainerStyle}>
                    {buttons.map((button) => (
                        <button
                            key={button}
                            onClick={() => handleClick(button)}
                            style={{
                                ...buttonStyle,
                                ...(button === '=' ? equalsButtonStyle : {}),
                                ...(['+', '-', '*', '/'].includes(button) ? operatorButtonStyle : {}),
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                            {button}
                        </button>
                    ))}
                    <button
                        onClick={() => handleClick('DEL')}
                        style={{ ...buttonStyle, backgroundColor: '#ff9800' }}
                    >
                        DEL
                    </button>
                    <button
                        onClick={() => handleClick('C')}
                        style={{ ...buttonStyle, backgroundColor: '#f44336', gridColumn: 'span 3' }}
                    >
                        Clear All (C)
                    </button>
                </div>
                
                <div style={infoStyle}>
                    <p>💡 Tip: Use keyboard for faster input (Enter to calculate, Esc to clear)</p>
                </div>
            </div>

            {showHistory && (
                <div style={historyStyle}>
                    <div style={historyHeaderStyle}>
                        <h3 style={historyTitleStyle}>Calculation History</h3>
                        <button
                            onClick={() => handleClick('CLR_HISTORY')}
                            style={clearHistoryButtonStyle}
                        >
                            Clear History
                        </button>
                    </div>
                    <div style={historyListStyle}>
                        {history.length === 0 ? (
                            <p style={noHistoryStyle}>No calculations yet</p>
                        ) : (
                            history.map((entry, index) => (
                                <div key={index} style={historyEntryStyle}>
                                    {entry}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const containerStyle = {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    padding: '30px',
    flexWrap: 'wrap',
};

const calculatorStyle = {
    width: '320px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    padding: '25px',
    backgroundColor: '#2c3e50',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
};

const titleStyle = {
    margin: '0',
    color: '#ecf0f1',
    fontSize: '24px',
    fontWeight: '600',
};

const historyToggleStyle = {
    padding: '8px 12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
};

const displayStyle = {
    marginBottom: '20px',
    textAlign: 'right',
    backgroundColor: '#34495e',
    borderRadius: '10px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
    color: '#95a5a6',
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
};

const inputStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
};

const inputValueStyle = {
    color: '#ecf0f1',
    fontSize: '16px',
    fontWeight: '500',
    minHeight: '20px',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
};

const resultStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
};

const resultValueStyle = {
    color: '#2ecc71',
    fontSize: '28px',
    fontWeight: 'bold',
    minHeight: '35px',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
};

const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '15px',
};

const buttonStyle = {
    padding: '18px 10px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const operatorButtonStyle = {
    backgroundColor: '#e74c3c',
};

const equalsButtonStyle = {
    backgroundColor: '#27ae60',
    gridColumn: 'span 2',
};

const infoStyle = {
    textAlign: 'center',
    color: '#95a5a6',
    fontSize: '12px',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #34495e',
};

const historyStyle = {
    width: '280px',
    maxHeight: '500px',
    backgroundColor: '#ecf0f1',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
};

const historyHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
};

const historyTitleStyle = {
    margin: '0',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600',
};

const clearHistoryButtonStyle = {
    padding: '6px 10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
};

const historyListStyle = {
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const historyEntryStyle = {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#2c3e50',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    fontFamily: 'monospace',
};

const noHistoryStyle = {
    textAlign: 'center',
    color: '#95a5a6',
    fontSize: '14px',
    padding: '20px',
};

export default Calculator;
