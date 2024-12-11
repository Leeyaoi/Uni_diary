import axios from "axios";
import Cookies from "universal-cookie";

const accessToken = new Cookies().get("accessToken");

let headers = {
  Authorization: accessToken ? `Bearer ${accessToken}` : null,
};

export const client = axios.create({
  baseURL: process.env.API_URL,
  headers,
});
