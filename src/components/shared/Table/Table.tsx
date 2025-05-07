type Header = {
  label: string;
  key: string;
}

type TableProps = {
  headers: Header[];
  data: Record<string, any>[];
  rowKey?: string;
}

const Table: React.FC<TableProps> = ({ headers, data, rowKey = "id" }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left font-semibold text-black">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-6 uppercase">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, rowIndex) => (
            <tr key={row[rowKey] || rowIndex} className="border-b border-gray-200">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="py-4 px-6">
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
