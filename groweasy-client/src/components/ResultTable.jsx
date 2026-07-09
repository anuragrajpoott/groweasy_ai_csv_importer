function ResultTable({ data }) {
  if (!data?.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div
      className="
        border
        border-gray-200
        dark:border-gray-700
        rounded-xl
        overflow-hidden
        bg-white
        dark:bg-gray-800
        shadow-sm
      "
    >
      <div className="overflow-auto max-h-125">
        <table className="w-full text-sm">
          <thead
            className="
              sticky
              top-0
              bg-gray-50
              dark:bg-gray-700
              border-b
              border-gray-200
              dark:border-gray-600
            "
          >
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
                    dark:text-gray-200
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
                className="
                  border-b
                  border-gray-200
                  dark:border-gray-700
                  last:border-b-0
                  hover:bg-gray-50
                  dark:hover:bg-gray-700/50
                "
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="
                      px-4
                      py-3
                      text-gray-600
                      dark:text-gray-300
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

export default ResultTable;
