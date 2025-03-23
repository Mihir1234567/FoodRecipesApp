import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { AddRecipePage } from "./pages/AddRecipePage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import EditRecipePage from "./pages/EditRecipePage";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import PrivateRoutes from "./PrivateRoute/PrivateRoute";

function AppRoutes() {
  const location = useLocation();
  // Array of paths where the NavBar should be hidden
  const hideNavBarPaths = ["/login", "/signup"];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<PrivateRoutes></PrivateRoutes>}>
          <Route path="/add" element={<AddRecipePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/edit/:id" element={<EditRecipePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
