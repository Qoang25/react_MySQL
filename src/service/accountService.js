import axios from "axios";
const URL_BASE = "http://localhost:8080/api/v1/account"

export const getAllAccount = () => axios.get(URL_BASE)

export const createAccount = (account) => axios.post(URL_BASE , account)

export const deleteAccount = (key) => axios.delete(URL_BASE + '/' + key);

export const updateAccount = (key, account) => axios.put(URL_BASE + '/' + key, account);
