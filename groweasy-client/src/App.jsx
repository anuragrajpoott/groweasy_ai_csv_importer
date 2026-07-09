import { useState } from "react";
import UploadZone from "./components/UploadZone";

function App() {
  const [file, setFile] = useState(null);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        GrowEasy CSV Importer
      </h1>

      <UploadZone onFileSelect={setFile} />

      {file && (
        <div style={{ marginTop: "20px" }}>
          Selected File:
          <strong> {file.name}</strong>
        </div>
      )}
    </div>
  );
}

export default App;