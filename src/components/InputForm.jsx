
function BinaryToggle({ label, value, onChange }){
    return (
        <div className="binary-toggle">
        <span className="binaryToggle-label">{label}</span>
            <button
                onClick={() => onChange(value === 0 ? 1 : 0)}
                >
                {value}
            </button>
        </div>
    );
}


function InputForm({ inputA, inputB, setInputA, setInputB, onSubmit }){
    return (
        <div className="input-form">
            <BinaryToggle label="A" value={inputA} onChange={setInputA} /> 
            <BinaryToggle label="B" value={inputB} onChange={setInputB} /> 
            <button>Prediction
            </button>
        </div>
    );
}

export default InputForm;