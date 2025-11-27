// import React, { useCallback, useState, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';

// function DropZone({files, setFiles}) {

//   const onDrop = useCallback((acceptedFiles) => {
//     const filesWithPreviews = acceptedFiles.map((file) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       })
//     );

//     setFiles((prevFiles) => [...prevFiles, ...filesWithPreviews]);
//   }, []);

  

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: 'image/*',
//   });




//   const handleRemoveFile = (fileName) => {
//     setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
//   };

//   useEffect(() => {
//     return () => {
//       // Clean up object URLs
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     };
//   }, [files]);

//   const thumbnails = files.map((file) => (
//     <div key={file.name} className="thumb">
//       <div className="thumbInner">
//         <img
//           src={file.preview}
//           className="thumbImg"
//           alt="Preview"
//         />
//         <button
//           className="removeBtn"
//           onClick={() => handleRemoveFile(file.name)}
//         >
//           x
//         </button>
//       </div>
//     </div>
//   ));

//   return (
//     <div>
//       <div
//         {...getRootProps()}
//         className="dropzone"
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here ...</p>
//         ) : (
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         )}
//       </div>
//       <aside className="thumbsContainer">{thumbnails}</aside>
//     </div>
//   );
// }

// export default DropZone;



import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

function DropZone({ files, setFiles, isRequired, onValidationChange }) {

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreviews = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...filesWithPreviews]);
    
    if (onValidationChange) onValidationChange(acceptedFiles.length > 0);
  }, [setFiles, onValidationChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleRemoveFile = (fileName, filePublicId) => {
    //if it is already a cloudinary img,
    if (filePublicId){
      setFiles((prevFiles) => prevFiles.filter((file) => file.public_id !== filePublicId));
    }
    //else check with name
    else{
      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    }
    if (onValidationChange) onValidationChange(files.length > 1);
  };

  useEffect(() => {
    return () => {
      // Clean up object URLs
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useEffect(() => {
    if (isRequired && files.length === 0) {
      if (onValidationChange) onValidationChange(false);
    }
  }, [files, isRequired, onValidationChange]);

  const thumbnails = files.map((file) => (
    <div key={file.name} className="thumb">
      <div className="thumbInner">
        <img
          src={file.url? file.url : file.preview}
          className="thumbImg"
          alt="Preview"
        />
        <button
          type='button'
          className="removeBtn"
          onClick={() => handleRemoveFile(file.name, file.public_id)}
        >
          x
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <div
        {...getRootProps()}
        className="dropzone"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <aside className="thumbsContainer">{thumbnails}</aside>
    </div>
  );
}

export default DropZone;
