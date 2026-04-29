import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Provider from "./pages/Provider";
import Booking from "./pages/Booking";
import SearchResults from "./pages/SearchResults";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login"; 
import Register from "./pages/Register";  
import { AuthProvider } from "./context/AuthContext"; 
import Profile from "./pages/Profile";      
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ 引入 Google Maps API Loader
import { LoadScript } from "@react-google-maps/api";

// 路由保護元件
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY" // 🔑 換成你的 Google Maps API Key
        libraries={["places"]}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* ✅ 修正這裡，把 :id 改成 :categoryId */}
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/provider/:id" element={<Provider />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route path="/category/search" element={<SearchResults />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/profile" element={<Profile />} /> 
          </Routes>
        </Router>
      </LoadScript>
    </AuthProvider>
  );
}

export default App;
