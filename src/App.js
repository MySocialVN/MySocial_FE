import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import {AuthProvider} from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import 'bootstrap/dist/css/bootstrap.css'

const AdminLayout = () => (
    <>
      <Outlet /> {/* Không có Header và Footer */}
    </>
);
function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  {/* Các route dùng MainLayout */}
                  <Route element={<AdminLayout />}>
                      <Route path="/login" element={<Login />} />
                  </Route>
              </Routes>
          </Router>
      </AuthProvider>
                      );
}

export default App;
