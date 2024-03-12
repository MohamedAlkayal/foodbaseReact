import axios from "axios";

export let ax = axios.create({
  baseURL: "https://foodbaseapi.onrender.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("accessToken")}`,
  },
});

export function resetAxiosConfig() {
  ax = axios.create({
    baseURL: "https://foodbaseapi.onrender.com",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
  });
}
