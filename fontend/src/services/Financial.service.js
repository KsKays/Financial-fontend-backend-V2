import api from "./api";

const FINANCIAL_API_URL = import.meta.env.VITE_FINANCIAL_API_URL;

//get all financial record
const getAllFinancialRecords = async (userId) => {
  return await api.get(`${FINANCIAL_API_URL}`);
};

//get financial record ByUserId
const getAllFinancialRecordsByUserId = async (userId) => {
  return await api.get(`${FINANCIAL_API_URL}/user/${userId}`);
};

//get financial record ById
const getAllFinancialRecordsById = async (id) => {
  return await api.get(`${FINANCIAL_API_URL}/${id}`);
};

//create a new record
const createFinancialRecord = async (record) => {
  return await api.post(`${FINANCIAL_API_URL}`, record);
};

// update a record
const updateFinancialRecord = async (id, record) => {
  return await api.put(`${FINANCIAL_API_URL}/${id}`, record);
};

//delete restaurants
const deleteFinancialRecord = async (id) => {
  return await api.delete(`${FINANCIAL_API_URL}/${id}`);
};

const FinancialService = {
  getAllFinancialRecords,
  getAllFinancialRecordsByUserId,
  getAllFinancialRecordsById,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
};

export default FinancialService;
