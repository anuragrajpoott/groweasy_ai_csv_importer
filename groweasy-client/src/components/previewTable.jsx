function PreviewTable({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <div
      style={{
        marginTop: "30px",
        overflow: "auto",
        maxHeight: "400px",
        border: "1px solid #ddd",
        background: "white",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            background: "#f0f0f0",
          }}
        >
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td
                  key={header}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviewTable;