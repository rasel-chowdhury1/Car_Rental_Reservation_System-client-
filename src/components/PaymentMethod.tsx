
import masterCard from "../assets/master-card.jpg";
import paypal from "../assets/paypal.jpg";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

const PaymentMethod = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-[#000d6b] font-semibold">
          <input type="radio" />
          Direct Bank Transfer
        </label>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <label className="flex items-center gap-2 text-[#000d6b] font-semibold">
          <input type="radio" />
          Cheque Payment
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-[#000d6b] font-semibold">
          <input type="radio" />
          Master Card
        </label>
        <img src={masterCard} alt="Master Card" className="w-24" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-[#000d6b] font-semibold">
          <input type="radio" />
          Paypal
        </label>
        <img src={paypal} alt="Paypal" className="w-24" />
      </div>

      <div className="mt-5 text-right">
        <button className="py-2 px-4 bg-[#000d6b] text-white rounded-md border-none outline-none">
          Reserve Now
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
