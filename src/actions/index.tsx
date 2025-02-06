import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const logout = () => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
    }
};

export const useGetData = (
    endpoint: any,
    queryKey: any,
    withToken = false,
    params = {},
    options = {}
) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const headers: Record<string, string> = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.get(endpoint, {
                params: params,
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error: any) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            return false;
        },
        ...options,
    });
};

export const usePostData = (endpoint: any, withToken = false) => {
    return useMutation({
        mutationFn: async (data) => {
            const headers: Record<string, string> = {
                "Content-Type": "multipart/form-data",
            };

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.post(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error: any) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            return false;
        },
    });
};

export const usePutData = (endpoint: any, withToken = false) => {
    return useMutation({
        mutationFn: async (data) => {
            const headers: Record<string, string> = {
                "Content-Type": "multipart/form-data",
            };

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.put(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error: any) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            return false;
        },
    });
};

export const useDeleteData = (endpoint: any, withToken = false) => {
    return useMutation({
        mutationFn: async (id) => {
            const headers: Record<string, string> = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.delete(`${endpoint}${id}/`, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error: any) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            return false;
        },
    });
};