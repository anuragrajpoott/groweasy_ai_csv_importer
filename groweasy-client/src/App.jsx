import { useState } from "react";
import Papa from "papaparse";

import UploadZone from "./components/UploadZone";
import PreviewTable from "./components/PreviewTable";
import ResultTable from "./components/ResultTable";
import ImportCard from "./components/ImportCard";
import ImportHeader from "./components/ImportHeader";

import api from "./services/api";

function App() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [result, setResult] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  const handleImport = async () => {
    try {
      setIsImporting(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Import failed");
    } finally {
      setIsImporting(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setCsvData([]);
    setResult(null);
  };

  return (
    <ImportCard>
      <ImportHeader />

      <div className="p-6">
        {/* Upload Area */}
        {!file && (
          <UploadZone onFileSelect={handleFileSelect} />
        )}

        {/* Selected File */}
        {file && (
          <div className="border rounded-xl p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {file.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Preview */}
        {csvData.length > 0 && (
          <>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                CSV Preview ({csvData.length} rows)
              </h2>

              <PreviewTable data={csvData.slice(0, 10)} />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

              <button
                onClick={handleImport}
                disabled={isImporting}
                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-orange-500
                  text-white
                  hover:bg-orange-600
                  disabled:opacity-50
                "
              >
                {isImporting
                  ? "Processing..."
                  : "Upload File"}
              </button>
            </div>
          </>
        )}

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-8">
            {/* Success Banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-700">
                Import Completed Successfully
              </h3>

              <p className="text-green-600 text-sm mt-1">
                {result.totalImported} records imported successfully.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Successfully Imported
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                  {result.totalImported}
                </h2>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Skipped Records
                </p>

                <h2 className="text-4xl font-bold text-red-600 mt-2">
                  {result.totalSkipped}
                </h2>
              </div>
            </div>

            {/* Mapping */}
            {result.mapping && (
              <div className="bg-white border rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b">
                  <h2 className="font-semibold">
                    Detected Field Mapping
                  </h2>
                </div>

                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">
                        CSV Column
                      </th>

                      <th className="text-left p-3">
                        CRM Field
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(result.mapping).map(
                      ([csv, crm]) => (
                        <tr
                          key={csv}
                          className="border-t"
                        >
                          <td className="p-3">
                            {csv}
                          </td>

                          <td className="p-3">
                            <span
                              className="
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                bg-orange-100
                                text-orange-700
                                text-sm
                                font-medium
                              "
                            >
                              {crm || "-"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Imported Records */}
            {result.imported?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="
                      px-2
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-xs
                      font-medium
                    "
                  >
                    {result.imported.length}
                  </span>

                  <h2 className="text-xl font-semibold">
                    Imported Records
                  </h2>
                </div>

                <ResultTable data={result.imported} />
              </div>
            )}

            {/* Skipped Records */}
            {result.skipped?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="
                      px-2
                      py-1
                      rounded-full
                      bg-red-100
                      text-red-700
                      text-xs
                      font-medium
                    "
                  >
                    {result.skipped.length}
                  </span>

                  <h2 className="text-xl font-semibold">
                    Skipped Records
                  </h2>
                </div>

                <ResultTable data={result.skipped} />
              </div>
            )}
          </div>
        )}
      </div>
    </ImportCard>
  );
}

export default App;