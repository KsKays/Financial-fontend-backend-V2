import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFinancialRecords } from "../contexts/Financial.context";
import FinancialService from "../services/Financial.service";

const EditFinancial = () => {
  const { records, updateRecord } = useFinancialRecords();
  const { id } = useParams();
  const navigate = useNavigate();

  const [financials, setFinancials] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  //useEffect
  useEffect(() => {
    FinancialService.getAllFinancialRecordsByUserId(id).then((response) => {
      if (response.status === 200) {
        setFinancials(response.data);
      }
    });
  }, [id, records]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecord(id, financials);
      Swal.fire({
        title: "Record Updated",
        text: "Your financial record has been updated successfully.",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error?.message || "An error occurred while updating the record.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-10 p-8 rounded-lg space-y-6 text-start ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 ">
        <div className="relative">
          <span className="block  text-lg  font-medium text-gray-700 mt-3">
            Description
          </span>
          <input
            type="text"
            className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Description"
            name="description"
            value={financials.description}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <span className="block text-lg  font-medium text-gray-700 mt-3 ">
            Amount
          </span>
          <input
            type="text"
            className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Amount"
            name="amount"
            value={financials.amount}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <span className="block  text-lg font-medium text-gray-700 mt-3">
            Date
          </span>
          <input
            type="Date"
            className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Date"
            name="date"
            value={financials.date}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 mt-3"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={financials.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Lunch">Lunch</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dinner">Dinner</option>
            <option value="Dink">Dink</option>
          </select>
        </div>

        <div className="relative">
          <label
            htmlFor="paymentMethod"
            className="block text-lg font-medium text-gray-700 mt-3"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={financials.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>

        <div className="mb-6 text-center pt-5">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            ส่งข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFinancial;
