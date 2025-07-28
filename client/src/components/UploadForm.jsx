import React, { useState } from 'react';
import usePicStore from '../stores/picStore';
import Input from './Input';
import Button from './Button';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const uploadPic = usePicStore((state) => state.uploadPic);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setError('');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
      await uploadPic(formData);
      // Reset form on success
      setFile(null);
      setTitle('');
      e.target.reset(); // Resets the file input
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Upload a New Pic</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" placeholder="Pic Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"/>
        <Button type="submit" fullWidth={true} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
      {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default UploadForm;