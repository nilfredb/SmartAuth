// App.jsx
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import JsonTerminal from "./components/JsonTerminal";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [mode, setMode] = useState("login");
  const [jsonOutput, setJsonOutput] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white font-mono overflow-hidden relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/20 animate-gradient-rotate" />
      
      {/* Auth Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative z-10"
      >
        <div className="w-full max-w-md space-y-8 backdrop-blur-sm bg-gray-900/80 rounded-2xl p-8 shadow-2xl border border-gray-700/50">
          <div className="flex space-x-2 bg-gray-800 p-1 rounded-xl">
            {["login", "register"].map((opt) => (
              <button
                key={opt}
                className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  mode === opt
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                    : "hover:bg-gray-700/50"
                }`}
                onClick={() => setMode(opt)}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <AuthForm 
              key={mode}
              mode={mode} 
              setJsonOutput={setJsonOutput}
              formData={formData}       
              setFormData={setFormData} 
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Terminal Panel */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-gray-900/90 border-l border-gray-700/50 relative z-10 flex flex-col"
      >
        <JsonTerminal 
          data={jsonOutput} 
          liveData={{
            [mode]: {
              email: formData.email,
              password: formData.password
            }
          }}
        />
      </motion.div>
    </div>
  );
}

export default App;