import React, { useMemo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '30px',
  height: '200px',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'black',
  borderStyle: 'dashed',
  backgroundColor: 'white',
  color: 'black',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};
const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const MyDropzone = () => {
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Create a FormData object to append the file
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://fba8-122-172-82-83.ngrok-free.app/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('File uploaded successfully:', response.data);
      toast.success('Upload successful!');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      toast.error('Error uploading file');
    } finally {
      setLoading(false);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    acceptedFiles: '.jpg, .jpeg, .png',
    multiple: false,
    maxSize: 2 * 1024 * 1024,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default MyDropzone;
