import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

function UploadZone({ onFileSelect }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
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
      className={`
        border-2
        border-dashed
        rounded-2xl
        p-12
        text-center
        cursor-pointer
        transition-all
        duration-200

        ${
          isDragActive
            ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
            : `
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              hover:border-orange-400
              hover:bg-orange-50
              dark:hover:bg-orange-950/20
            `
        }
      `}
    >
      <input {...getInputProps()} />

      <div className="flex justify-center mb-5">
        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-orange-100
            dark:bg-orange-900/30
            flex
            items-center
            justify-center
          "
        >
          <UploadCloud
            size={30}
            className="text-orange-600"
          />
        </div>
      </div>

      <h3
        className="
          text-xl
          font-semibold
          text-gray-800
          dark:text-white
        "
      >
        {isDragActive
          ? "Drop your CSV file here"
          : "Upload CSV File"}
      </h3>

      <p
        className="
          text-gray-500
          dark:text-gray-400
          mt-2
        "
      >
        Drag & drop your file here or click to browse
      </p>

      <div
        className="
          mt-4
          text-sm
          text-gray-400
          dark:text-gray-500
        "
      >
        Supported format: CSV
      </div>
    </div>
  );
}

export default UploadZone;