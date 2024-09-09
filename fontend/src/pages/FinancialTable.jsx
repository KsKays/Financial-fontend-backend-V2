import React from "react";
import { useNavigate } from "react-router-dom";
import {useFinancialRecords} from "../contexts/Financial.context"
import Swal from "sweetalert2";

const FinancialRecordTable = () => {
  const { records , deleteRecord} = useFinancialRecords()
  const navigate = useNavigate();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete record with ID: ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(id);
        Swal.fire(
          "Deleted!",
          `Record with ID: ${id} has been deleted.`,
          "success"
        );
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="table-auto w-full bg-white shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Payment Method</th>
            <th className="py-3 px-4">Edit</th>
            <th className="py-3 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{record.description}</td>
                <td className="py-2 px-4 border-b">{record.amount}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(record.date)}
                </td>
                <td className="py-2 px-4 border-b">{record.category}</td>
                <td className="py-2 px-4 border-b">{record.paymentMethod}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="btn btn-warning btn-sm mx-1 bg-yellow-500 text-white hover:bg-yellow-600 rounded"
                    onClick={() => handleEdit(record.id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="btn btn-error btn-sm mx-1 bg-red-500 text-white hover:bg-red-600 rounded"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRecordTable;
