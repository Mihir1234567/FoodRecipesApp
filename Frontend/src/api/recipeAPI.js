import axios from "axios";
const BASE_API = "http://localhost:3000";

/* ------------------------------- RECIPE_APIS ------------------------------ */
export const fetchRecipe = () => axios.get(BASE_API); //GetAllRecipe

export const fetchRecipeById = (id) => axios.get(`${BASE_API}/${id}`); //GetRecipeById

export const addRecipe = (recipe) =>
  axios.post(`${BASE_API}/addRecipe`, recipe); //AddRecipe

export const deleteRecipeById = (id) =>
  axios.delete(`${BASE_API}/deleteById/${id}`); //DeleteRecipeById

export const updateRecipe = (id , data) => {
  axios.put(`${BASE_API}/updateRecipe/${id}`,data);
}; //EditRecipe

/* -------------------------------- USER_APIS ------------------------------- */
export const login = (data) => axios.post(`${BASE_API}/login`, data); //Login
export const signup = (data) => axios.post(`${BASE_API}/signup`, data); //Signup
export const getUserByEmail = (email) =>
  axios.get(`${BASE_API}/getUserByEmail/${email}`); //GetUserById
