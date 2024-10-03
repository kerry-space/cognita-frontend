import React from 'react';

export function UploadDocumentForm() {
  return (
    <form>
      <h3>Upload Documents</h3>
      <input type="file" name="document" />
      <button type="submit">Upload</button>
    </form>
  );
}