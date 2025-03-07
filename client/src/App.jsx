


import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import { FinanceProvider } from "./context/FinanceContext";


// Components
import Sidebar from "./components/Sidebar";

// Pages
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import Dashboard from "./pages/Dashboard";
import BankAccount from "./pages/BankAccount";
import CreditCard from "./pages/CreditCard";
import DebitCard from "./pages/DebitCard";
import Investment from "./pages/Investment";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Autopay from "./pages/Autopay";
import Register from "./pages/Register";
import Login from "./pages/Login";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ✅ Redirect Logged-in Users Away from Login/Register
const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

// ✅ Main Layout with Sidebar
const AuthenticatedLayout = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 p-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bank-account" element={<BankAccount />} />
        <Route path="/credit-card" element={<CreditCard />} />
        <Route path="/debit-card" element={<DebitCard />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/autopay" element={<Autopay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </div>
);

// ✅ Main App Component
const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    getUser();
  }, []);

  return (
    <Router>
      <FinanceProvider>
        <Routes>
          {/* Public Routes (Restricted for Authenticated Users) */}
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            }
          />

          {/* Other Public Routes */}
          <Route path="/otp-verification/:email/:phone" element={<OtpVerification />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* ✅ Protected Routes with Sidebar */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </FinanceProvider>

      <ToastContainer theme="colored" />



    </Router>
  );
};

export default App;
