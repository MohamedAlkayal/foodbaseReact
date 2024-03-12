import axios from "axios";

export let ax = axios.create({
  baseURL: "http://localhost:4040",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("accessToken")}`,
  },
});

export function resetAxiosConfig() {
  ax = axios.create({
    baseURL: "http://localhost:4040",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
  });
}
