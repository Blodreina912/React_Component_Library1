import React, { useState, useMemo, useEffect } from "react";
import { DataTableProps, Column } from "./DataTable.types";

const DataTable: React.FC<DataTableProps<any>> = ({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending" | "";
  }>({
    key: "",
    direction: "",
  });

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(selectedRows);
    }
  }, [selectedRows, onRowSelect]);

  const sortedData = useMemo(() => {
    // Return an empty array if data is null or undefined to prevent errors
    if (!data) return [];

    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (row: any) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(row)) {
        return prevSelected.filter((selectedRow) => selectedRow !== row);
      } else {
        return [...prevSelected, row];
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data to display.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={() => {
                    if (selectedRows.length === data.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(data);
                    }
                  }}
                />
              </th>
            )}
            {columns.map((column: Column<any>) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                }`}
                onClick={() => column.sortable && requestSort(column.key)}
              >
                {column.title}
                {column.sortable && (
                  <span>
                    {sortConfig.key === column.key
                      ? sortConfig.direction === "ascending"
                        ? " ▲"
                        : " ▼"
                      : ""}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 ${
                selectable && selectedRows.includes(row) ? "bg-blue-100" : ""
              }`}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                  />
                </td>
              )}
              {columns.map((column: Column<any>) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {String(row[column.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
