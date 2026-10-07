

import axios from "axios";

const API_URL = "https://localhost:7237/api/CrudOperation";


export const getDetails = () => {
    debugger;
   // return axios.get(API_URL);
    return axios.get(`${API_URL}/GetDetals`);
};

export const getEmployeeById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createDetails = (employee) => {
    return axios.post(`${API_URL}/Create`, employee);
};

export const updateDetails = ( employee) => {
    return axios.put(`${API_URL}/Update`, employee);
     
};

export const deleteDetails = (id) => {
    //return axios.delete(`${API_URL}/Delete${id}`);
       return axios.delete(`${API_URL}/Delete/${id}`);
};