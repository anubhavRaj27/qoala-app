import React, {useMemo} from 'react';
import { useDropzone } from 'react-dropzone';

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
  cursor: 'pointer'
};
const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const MyDropzone = () => {
  const { acceptedFiles, getRootProps, getInputProps,isFocused,
    isDragAccept,
    isDragReject } = useDropzone({
    acceptedFiles: '.jpg, .jpeg, .png',
    multiple: false,
    maxSize: 2 * 1024 * 1024, // 2MB in bytes
  });
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  return (
    <div>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyDropzone;
