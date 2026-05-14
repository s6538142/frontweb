import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LoadScript } from "@react-google-maps/api";
import { AuthProvider } from "./context/AuthContext"; 

import Home from "./pages/Home";
import Category from "./pages/Category";
import Provider from "./pages/Provider";
import Booking from "./pages/Booking";
import SearchResults from "./pages/SearchResults";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AppLayout from "./layout/AppLayout"; // ✅ 新增 Layout

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
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
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
              <Route path="/profile" element={<Profile />} /> 
            </Route>
          </Routes>
        </Router>
      </LoadScript>
    </AuthProvider>
  );
}

export default App;
