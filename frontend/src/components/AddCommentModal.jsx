import React, { useState, useEffect } from "react";

const AddCommentModal = ({ isOpen, onClose, onSubmit, docId, reportType, existingComment }) => {
  const [comment, setComment] = useState("");

  // Prefill if updating
  useEffect(() => {
    if (isOpen) {
      setComment(existingComment || "");
    }
  }, [isOpen, existingComment]);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(docId, comment, reportType); // same API
    setComment("");
    onClose();
  };

  if (!isOpen) return null;

  const isUpdate = Boolean(existingComment);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4">
          {isUpdate ? "Update Comment" : "Add Comment"}
        </h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder={isUpdate ? "Update your comment..." : "Write your comment..."}
          rows={4}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded hover:opacity-90 ${isUpdate ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isUpdate ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCommentModal;
