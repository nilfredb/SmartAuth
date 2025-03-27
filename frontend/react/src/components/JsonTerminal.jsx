// JsonTerminal.jsx
import { motion, AnimatePresence } from "framer-motion";
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { useEffect } from 'react';

const JsonTerminal = ({ data, liveData }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [data, liveData]);

  return (
    <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-sm border-l border-gray-700/50 shadow-2xl">
      <div className="flex items-center px-6 py-4 border-b border-gray-700/50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm text-gray-400 ml-3">API Inspector</span>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Live JSON Preview */}
        <div className="border-b border-gray-700/50 p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
            <span className="text-xs text-blue-400 font-semibold">REQUEST PREVIEW</span>
          </div>
          <pre className="flex-1 overflow-auto max-h-[40vh]">
            <code className="language-json block whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(liveData, null, 2)}
            </code>
          </pre>
        </div>

        {/* Server Response */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <span className="text-xs text-green-400 font-semibold">SERVER RESPONSE</span>
          </div>
          <pre className="flex-1 overflow-auto max-h-[40vh]">
            <AnimatePresence mode="wait">
              {!data ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 flex items-center animate-pulse"
                >
                  <span className="blink-cursor">_</span>
                </motion.div>
              ) : (
                <motion.code
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="language-json block whitespace-pre-wrap break-words"
                >
                  {JSON.stringify(data, null, 2)}
                </motion.code>
              )}
            </AnimatePresence>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JsonTerminal;