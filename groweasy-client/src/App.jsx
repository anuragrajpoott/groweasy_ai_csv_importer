import { useState } from "react";
import Papa from "papaparse";

import UploadZone from "./components/UploadZone";
import PreviewTable from "./components/PreviewTable";

function App() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        console.log(results.data);

        setCsvData(results.data);
      },

      error: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1>GrowEasy CSV Importer</h1>

      <div style={{ marginTop: "20px" }}>
        <UploadZone onFileSelect={handleFileSelect} />
      </div>

      {file && (
        <div style={{ marginTop: "20px" }}>
          <strong>Selected File:</strong> {file.name}
        </div>
      )}

      {csvData.length > 0 && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            CSV Preview ({csvData.length} rows)
          </h2>

          <PreviewTable data={csvData.slice(0, 20)} />
        </>
      )}
    </div>
  );
}

export default App;