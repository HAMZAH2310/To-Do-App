import Axios from "axios";

const axios = Axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-API-Key": "",
  },
});

export const todoService = {
  getAll: async () => {
    const res = await axios.get("/todos");
    return res.data.data; 
  },

  create: async (name: string) => {
    const res = await axios.post("/todos", { name });
    return res.data.data; 
  },

  update: async (id: number, name: string) => {
    const res = await axios.put(`/todos/${id}`, { name });
    return res.data.data; 
  },

  delete: async (id: number) => {
    const res = await axios.delete(`/todos/${id}`);
    return res.data.data; 
  }
};
