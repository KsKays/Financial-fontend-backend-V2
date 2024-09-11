import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFinancialRecords } from "../contexts/Financial.context";
import FinancialService from "../services/Financial.service";
import { useUser } from "@clerk/clerk-react";

const EditFinancial = () => {
  const { user } = useUser();

  const { updateRecord } = useFinancialRecords();
  const { id: recordId } = useParams();
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
    FinancialService.getFinancialByRecordId(recordId).then((response) => {
      if (response.status === 200) {
        setFinancials(response.data);
      }
    });
  }, [recordId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecord(recordId, financials);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-8 rounded-lg space-y-6 text-start ">
      <div className="text-center text-4xl md:text-3xl md:leading-snug font-bold ">
        Welcome <span className="underline">{user?.firstName}!</span> Here are
        your Edit Financial Tracker:
      </div>
      <div className="flex justify-center items-center ">
        <form className="bg-slate-50 shadow-md rounded px-8 pb-8  w-96 mt-5">
          <span className="block text-2xl text-center font-bold text-gray-700 mt-3">
            Edit Financial Tracker
          </span>
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
              value={formatDate(financials.date)}
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

          <div className="mb-6 text-center pt-5 ">
            <button
              className="btn btn-active btn-neutral text-white font-normal text-base"
              type="submit"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFinancial;
