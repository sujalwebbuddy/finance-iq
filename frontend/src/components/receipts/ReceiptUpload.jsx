import React, { useRef } from 'react';
import UploadIcon from '../icons/UploadIcon';
import SpinnerIcon from '../icons/SpinnerIcon';

const ReceiptUpload = ({ file, uploading, onFileChange, onSubmit }) => {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFileType(droppedFile)) {
      onFileChange({ target: { files: [droppedFile] } });
    }
  };

  const isValidFileType = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    return validTypes.includes(file.type);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Upload Receipt
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Supported formats: JPG, PNG, PDF (Max 10MB)
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleFileInputClick}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-teal-500 dark:hover:border-teal-400 transition-colors duration-200 bg-gray-50 dark:bg-gray-700/50"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={onFileChange}
            accept=".jpeg,.jpg,.png,.pdf"
            className="hidden"
            disabled={uploading}
          />
          <UploadIcon className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          {file ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG, PNG, or PDF
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <SpinnerIcon className="h-5 w-5 text-white" />
              Processing...
            </>
          ) : (
            <>
              <UploadIcon className="h-5 w-5" />
              Upload & Extract Data
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReceiptUpload;

