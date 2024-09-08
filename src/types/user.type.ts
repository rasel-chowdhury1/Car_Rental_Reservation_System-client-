export type TUser = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: "admin" | "user";
    isActive: boolean;
  }