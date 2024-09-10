import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../contexts/Financial.context";

const AddFinancial = () => {
  const { addRecord } = useFinancialRecords();
  const { user } = useUser();

  const [financials, SetFinancials] = useState({
    userId: "",
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFinancials({ ...financials, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const updateFinancial = { ...financials, userId: user.id }; //เป็นการเซ็ตค่าให้ userId เป็นตัวของคนที่ login
      console.log(financials);
      await addRecord(updateFinancial);
    } catch (error) {}
  };

  return (
    <div className="max-w-md mx-10 rounded-lg space-y-6 text-start ">
      <form className="bg-slate-50 drop-shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96 ">
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

        <div className="mb-6 text-center pt-5 ">
          <button
            className="btn btn-active btn-neutral text-white font-normal text-base"
            type="submit"
            onClick={handleSubmit}
          >
            Add Financial Tracker
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFinancial;
