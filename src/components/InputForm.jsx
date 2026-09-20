import React from 'react';

export default function InputForm({ inputA, inputB, setInputA, setInputB }) {
    return (
        <div className="input-form-container">
            <label className="input-group">
                <span>Entrée A :</span>
                <div className="toggle-buttons">
                    <button 
                        className={`btn-val ${inputA === 0 ? 'active' : ''}`}
                        onClick={() => setInputA(0)}
                    >
                        0
                    </button>
                    <button 
                        className={`btn-val ${inputA === 1 ? 'active' : ''}`}
                        onClick={() => setInputA(1)}
                    >
                        1
                    </button>
                </div>
            </label>

            <label className="input-group">
                <span>Entrée B :</span>
                <div className="toggle-buttons">
                    <button 
                        className={`btn-val ${inputB === 0 ? 'active' : ''}`}
                        onClick={() => setInputB(0)}
                    >
                        0
                    </button>
                    <button 
                        className={`btn-val ${inputB === 1 ? 'active' : ''}`}
                        onClick={() => setInputB(1)}
                    >
                        1
                    </button>
                </div>
            </label>
        </div>
    );
}