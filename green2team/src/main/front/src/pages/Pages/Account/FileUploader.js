import React, { useState } from 'react';

function FileUploader() {
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      readFile(uploadedFile);
    }
  };

  const readFile = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  return (
    <div>
      <input type="file" id="input-file" name="input-file" accept="image/*" onChange={handleChange} />
      {preview && (
        <div className="preview-box">
          <img className="preview-content" src={preview} alt="Preview" />
        </div>
      )}
    </div>
  );
}

  export default FileUploader;