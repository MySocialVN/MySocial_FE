import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import {AuthProvider} from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import 'bootstrap/dist/css/bootstrap.css'
import Register from "./components/account/Register";

const LoginLayout = () => (
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
                  <Route element={<LoginLayout />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register/>}/>
                  </Route>
              </Routes>
          </Router>
      </AuthProvider>
                      );
}

export default App;
