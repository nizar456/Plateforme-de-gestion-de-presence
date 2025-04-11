"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const ChangePasswordModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading,
  studentId
}) => {
  const [newPassword, setNewPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(studentId, newPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50">
      <motion.div
        className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-md w-full p-6 dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              New Password for Student #{studentId}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
              minLength="6"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-400"
            >
              {isLoading ? "Saving..." : "Change Password"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePasswordModal;