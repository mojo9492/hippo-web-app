const SER_END = "/api/v1";
const MBP_END = "http://192.168.50.192:3000/api/v1";

export const API_END = process.env.NODE_ENV === "production" ?  SER_END : MBP_END;
