import { TCar } from "./car.type";

export type TPayment = {
    _id: string;
    car: TCar;
    createdAt: string;
    date: string;
    endTime: string;
    isBooked: string;
    isDeleted: boolean;
    paymentStatus: string;
    startTime: string;
    totalCost: number;
    transactionId: string;
    updatedAt: string;
    user: string;
  };
  
  export type TPaymentHistoryResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: TPayment[];
  };