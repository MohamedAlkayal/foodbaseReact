import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const ax = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${accessToken}`,
  },
});
