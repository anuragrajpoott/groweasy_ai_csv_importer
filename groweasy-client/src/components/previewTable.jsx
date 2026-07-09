function PreviewTable({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="overflow-auto max-h-100">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 border-b">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="
                    px-4
                    py-3
                    text-left
                    font-semibold
                    text-gray-700
                    whitespace-nowrap
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="
                      px-4
                      py-3
                      text-gray-600
                      whitespace-nowrap
                    "
                  >
                    {row[header] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PreviewTable;