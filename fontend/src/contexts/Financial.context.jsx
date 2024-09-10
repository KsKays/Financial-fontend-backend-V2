import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import FinancialService from "../services/Financial.service";

export const FinancialRecordContext = createContext();

export const FinancialRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();

  // fetchRecords เป็นฟังก์ชันสำหรับ ดึงข้อมูล
  const fetchRecords = async () => {
    if (!user) return; //เช็คว่ามี user ทำการ login อยู่หรือไม่ ถ้าไม่ ฟังก์ชันจะหยุดทำงานทันที
    // เช็คข้อผิดพลาดด้วย try/catch
    try {
      const response = await FinancialService.getAllFinancialRecordsByUserId(
        user.id
      );
      //console.log(response.data);
      if (response.status === 200) {
        setRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [user]);

  //addRecord
  //รับพารามิเตอร์ record
  const addRecord = async (record) => {
    try {
      const response = await FinancialService.createFinancialRecord(record);
      if (response.status === 200) {
        setRecords((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = async (id, newRecord) => {
    try {
      const response = await FinancialService.updateFinancialRecord(
        id,
        newRecord
      );
      if (response.status === 200) {
        setRecords((prev) =>
          prev.map((record) => (record.id === id ? newRecord : record))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await FinancialService.deleteFinancialRecord(id);
      if (response.status === 200) {
        setRecords((prev) => prev.filter((record) => record.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord, fetchRecords }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => useContext(FinancialRecordContext);
