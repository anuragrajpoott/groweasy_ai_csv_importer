import { useDropzone } from "react-dropzone";

function UploadZone({ onFileSelect }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #999",
        padding: "40px",
        textAlign: "center",
        background: "white",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag & Drop CSV Here</p>
      <p>or Click to Browse</p>
    </div>
  );
}

export default UploadZone;