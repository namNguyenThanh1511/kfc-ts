export interface User {
  username: string;
  email: string;
  fullname: string;
  phone: string;
  role: "ADMIN" | "CUSTOMER" | "MANAGER" | "STAFF";
  id: number;
}
