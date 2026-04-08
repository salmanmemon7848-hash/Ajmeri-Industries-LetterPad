import { useState } from 'react';
import { uploadImage } from '../utils/supabase';

function StampManager({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploading(true);
    try {
      const url = await uploadImage(file, 'stamps');
      onUpload(url);
      alert('Stamp uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload stamp. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Company Stamp</h3>
      
      {preview ? (
        <div className="mb-4">
          <img
            src={preview}
            alt="Stamp Preview"
            className="max-w-full h-24 object-contain border rounded p-2"
          />
        </div>
      ) : (
        <div className="mb-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400">
          <p>No stamp uploaded</p>
        </div>
      )}

      <label className="block">
        <span className="sr-only">Choose stamp image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50"
        />
      </label>

      {uploading && (
        <p className="text-sm text-blue-600 mt-2">Uploading...</p>
      )}
    </div>
  );
}

export default StampManager;
