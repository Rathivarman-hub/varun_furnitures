import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api'
});

API.interceptors.request.use((req) => {
    const user = localStorage.getItem('varunUser');
    if (user) {
        req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }
    return req;
});

export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const fetchCategories = () => API.get('/products/categories');

export const fetchReviews = (params) => API.get('/reviews', { params });
export const createReview = (data) => API.post('/reviews', data);

export const createRentalRequest = (data) => API.post('/rentals', data);
export const submitContact = (data) => API.post('/contact', data);


export const loginUser = (data) => API.post('/users/login', data);
export const registerUser = (data) => API.post('/users/register', data);

export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getAllRentals = () => API.get('/rentals');
export const getAllReviews = () => API.get('/reviews/admin');
export const approveReview = (id, data) => API.put(`/reviews/${id}/approve`, data);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);
export const updateRentalStatus = (id, data) => API.put(`/rentals/${id}/status`, data);

export default API;
