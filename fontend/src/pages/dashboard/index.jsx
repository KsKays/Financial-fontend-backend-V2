import { useUser } from "@clerk/clerk-react";
import AddFinancial from "../AddFinancial";
import FinancialTable from "../FinancialTable";
import EditFinancial from "../EditFinancial";

function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  return (
    <div className="max-w-screen-2xl container mx-auto px-4">
      <div className="text-center text-4xl md:text-3xl md:leading-snug font-bold my-2 p-5">
        Welcome <span className="underline">{user?.firstName}!</span> Here are
        your financial details:
      </div>

      <div className="flex justify-center mx-auto">
        <div className="overflow-x-auto flex mr-4">
          <AddFinancial />
          <FinancialTable />
        </div>
      </div>

      <div> Tatal Monthly: 000 ฿</div>
    </div>
  );
}

export default index;
