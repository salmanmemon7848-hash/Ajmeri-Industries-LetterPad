import { useState, useEffect } from 'react';

function SignatureStampManager({ onUpload }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Load saved signature from localStorage on mount
  useEffect(() => {
    const savedSignature = localStorage.getItem('ajmeri_signature_stamp');
    if (savedSignature) {
      setImageUrl(savedSignature);
      onUpload(savedSignature);
    }
  }, [onUpload]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64 and save to localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageUrl(base64String);
        localStorage.setItem('ajmeri_signature_stamp', base64String);
        onUpload(base64String);
        setUploading(false);
        alert('Signature & Stamp uploaded successfully! It will be used in all letters.');
      };
      reader.onerror = () => {
        alert('Failed to upload image. Please try again.');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (confirm('Are you sure you want to remove the signature & stamp?')) {
      setImageUrl(null);
      localStorage.removeItem('ajmeri_signature_stamp');
      onUpload(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Signature & Stamp</h3>
      
      {!imageUrl ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload your Signature & Stamp image<br />
            <span className="text-xs text-gray-400">(Combined in one image, PNG/JPG)</span>
          </p>
          <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt="Signature & Stamp" 
              className="mx-auto max-h-32 object-contain border border-gray-200 rounded-lg p-2"
            />
          </div>
          <div className="flex gap-3">
            <label className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition text-sm font-semibold">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <button
              onClick={handleRemove}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
            >
              Remove
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ✓ This image will be automatically used in all letters
          </p>
        </div>
      )}
    </div>
  );
}

export default SignatureStampManager;
