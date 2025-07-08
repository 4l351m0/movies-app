import config from "@/config/config";
import axios from "axios";

const API_BASE_URL = config.API_BASE_URL;

const API = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-type': 'application/json'
	},
});

API.interceptors.request.use(
	(config) => {
		if(typeof window !== 'undefined') {
			const token = localStorage.getItem('access_token');
			if(token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default API;