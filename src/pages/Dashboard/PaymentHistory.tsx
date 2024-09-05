import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { usePaymentHistoryByUserQuery } from "../../redux/features/booking/CarBookingManagementApi";
import { useAppSelector } from "../../redux/hook";
import { TUser } from "../../types/user.type";

const PaymentHistory = () => {
  const user = useAppSelector(useCurrentUser) as TUser || null;
  const { data: paymentData, error, isLoading } = usePaymentHistoryByUserQuery(user._id || "")  ;

  console.log({paymentData})

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: </div>;

  console.log({paymentData})

  return (
    <div>
      <h1>Payment History</h1>
      <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
                </th>
                <th>Car Name</th>
                <th>Transaction Id</th>
                <th>Payment Status</th>
                <th>Payment Amount</th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            {(paymentData?.data || []).map((ele: any) => (
                <tr>
                <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
                </th>
                <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img
                        src={ele?.car?.photo}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                    </div>
                    <div>
                    <div className="font-bold">{ele?.car?.name}</div>
                    <div className="text-sm opacity-50">Color: {ele?.car?.color}</div>
                    </div>
                </div>
                </td>
                <td>
                {ele?.transactionId}
                </td>
                <td>{ele?.paymentStatus}</td>
                <th>
                {ele?.totalCost}
                </th>
            </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
