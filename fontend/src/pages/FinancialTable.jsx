import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFinancialRecords } from "../contexts/Financial.context";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const FinancialRecordTable = () => {
  const { fetchRecords, records, deleteRecord } = useFinancialRecords();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Get current records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  //
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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className=" flex flex-col justify-between ">
      <div className="overflow-x-auto rounded-lg ">
        <table className="table-auto w-full bg-white ">
          <thead>
            <tr className="bg-cyan-100 ">
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
            {currentRecords &&
              currentRecords.map((record) => (
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
                      className="btn btn-warning btn-sm mx-1 btn-outline  hover:bg-lime-500 "
                      onClick={() => handleEdit(record.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="btn btn-error btn-sm mx-1 btn-outline  hover:bg-red-600 "
                      onClick={() => handleDelete(record.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Btn Prev-Next page */}
        <div className="join flex justify-center items-center rounded-lg mt-6">
          <button
            className="join-item btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">Page {currentPage}</button>
          <button
            className="join-item btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialRecordTable;
