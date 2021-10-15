import axios from 'axios';

const token = '';

export const axiosClient = axios.create({
    baseURL: "https://6166f23813aa1d00170a68d3.mockapi.io/api/v1",
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const apiUpload = axios.create({
    baseURL: "https://6166f23813aa1d00170a68d3.mockapi.io/api/v1/",
    timeout: 15000,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const uploadFile = formData => apiUpload.post("upload_file_endpoint", formData)