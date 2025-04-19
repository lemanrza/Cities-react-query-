import axiosInstance from "../../axiosInstance";
import { endpoints } from "../../constants";

export type City = {
  id: number;
  name: string;
  country: string;
  isCapital: boolean;
  imageURL: string;
  crimeRate: number;
};

// Get all cities
export const getAllcities = async (): Promise<City[]> => {
  const { data } = await axiosInstance.get<City[]>(endpoints.cities);
  return data;
};

// Get city by ID
export const getcityById = async (id: number): Promise<City> => {
  const { data } = await axiosInstance.get<City>(`${endpoints.cities}/${id}`);
  return data;
};

// Post new City
export const postcity = async (city: Omit<City, "id">): Promise<City> => {
  const { data } = await axiosInstance.post<City>(endpoints.cities, city);
  return data;
};

// Delete city by ID
export const deletecity = async (id: number): Promise<City> => {
  const { data } = await axiosInstance.delete<City>(`${endpoints.cities}/${id}`);
  return data;
};

// Update city by ID
export const updatecity = async (id: number, city: Partial<Omit<City, "id">>): Promise<City> => {
  const { data } = await axiosInstance.put<City>(`${endpoints.cities}/${id}`, city);
  return data;
};
