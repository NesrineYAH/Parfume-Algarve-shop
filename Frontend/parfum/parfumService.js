import axios from "axios";

const API_URL = "http://localhost:5000/data/products";

export async function getParfums() {
  const res = await axios.get(API_URL);
  return res.data;
}
