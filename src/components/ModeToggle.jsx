// This function allow us to switch between mlp and perceptron 
function ModeToggle({ mode, setMode }){
   return(
       <div className="mode-toggle">
       <button
           className={mode === "perceptron" ? "active" : ""}
           onClick={() => setMode("perceptron")}
           disabled={mode === "perceptron"}
           >
           Perceptron
       </button>
           
           <button
              className={mode === "mlp" ? "active" : ""}
               onClick={() => setMode("mlp")}
               disabled={mode === "mlp"}
               >
           MLP
           </button>
       </div>
   );
}

export default ModeToggle; 