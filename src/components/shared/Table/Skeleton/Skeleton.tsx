const TableSkeleton = () => {
  const rows = Array(5).fill(0);
  const cols = Array(7).fill(0);

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto w-full animate-pulse">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left font-semibold text-black">
          <tr>
            {cols.map((_, index) => (
              <th key={index} className="py-3 px-6 uppercase">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {cols.map((_, colIndex) => (
                <td key={colIndex} className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;

