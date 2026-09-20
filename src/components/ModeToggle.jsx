import React from 'react';

export default function ModeToggle({ mode, setMode }) {
    return (
        <div className="mode-toggle-container">
            <button 
                className={mode === 'perceptron' ? 'active' : ''}
                onClick={() => setMode('perceptron')}
            >
                Perceptron
            </button>
            <button 
                className={mode === 'mlp' ? 'active' : ''}
                onClick={() => setMode('mlp')}
            >
                MLP
            </button>
        </div>
    );
} 