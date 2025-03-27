import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AuthForm = ({ mode, setJsonOutput, formData, setFormData }) => {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [mode, formData]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);

    const endpoint = mode === "login"
      ? "http://127.0.0.1:8000/api/users/login"
      : "http://127.0.0.1:8000/api/users/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setJsonOutput({
        timestamp: new Date().toISOString(),
        status: res.status,
        data
      });
      
    } catch (err) {
      setJsonOutput({ 
        timestamp: new Date().toISOString(),
        error: "Network Error",
        message: "Failed to connect to server"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
      <motion.input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1 ml-1"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      <div>
      <motion.input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1 ml-1"
          >
            {errors.password}
          </motion.p>
        )}
      </div>
      

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={sending}
        className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all relative overflow-hidden"
      >
        <div className="relative z-10">
          {sending ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : mode === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </div>
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-10 transition-opacity" />
      </motion.button>
    </motion.form>
  );
};

export default AuthForm;