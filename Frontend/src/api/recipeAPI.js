import axios from "axios";
const RECIPE_API = "http://localhost:3000/Recipe";
const USER_API = "http://localhost:3000";

/* ------------------------------- RECIPE_APIS ------------------------------ */
export const fetchRecipe = () => axios.get(RECIPE_API); //GetAllRecipe

export const fetchRecipeById = (id) => axios.get(`${RECIPE_API}/${id}`); //GetRecipeById

export const addRecipe = (recipe) =>
  axios.post(`${RECIPE_API}/addRecipe`, recipe); //AddRecipe

export const deleteRecipeById = (id) =>
  axios.delete(`${RECIPE_API}/deleteById/${id}`); //DeleteRecipeById

export const updateRecipe = (id) => {
  axios.put(`${RECIPE_API}/updateRecipe/${id}`);
}; //EditRecipe

/* -------------------------------- USER_APIS ------------------------------- */
export const login = (data) => axios.post(`${USER_API}/login`, data); //Login
export const signup = (data) => axios.post(`${USER_API}/signup`, data); //Signup
export const getUserById = (id) => axios.get(`${USER_API}/getuser/${id}`); //GetUserById
