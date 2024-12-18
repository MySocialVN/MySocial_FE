import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import {AuthProvider} from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import 'bootstrap/dist/css/bootstrap.css'
import Register from "./components/account/Register";
import Header from "./components/layout/Header";
import ViewUserProfile from "./components/user/ViewUserProfile";
import SideBar from "./components/layout/SideBar";
import ChangePassword from "./components/user/ChangePassword";
import './App.css'
import UserSearchResults from "./components/user/UserSearchResults";
import MyUserPage from "./components/user/MyUserPage";
import MyFriend from "./components/user/MyFriend";
import HeaderUserFriend from "./components/userFriend/HeaderUserFriend";
import UserFriend from "./components/userFriend/UserFriend";
import CommonFriend from "./components/userFriend/CommonFriend";
import Home from "./components/home/Home";
const LoginLayout = () => (
    <>
      <Outlet /> {/* Không có Header và Footer */}
    </>
);
const LoginMain = () => (
    <>
        <Header></Header>
        <SideBar/>
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
                  <Route element={<LoginMain />}>
                      <Route path="/ha" element={<Home />} />

                      <Route path="/home" element={<Home />} />
                      <Route path="/user/view-profile" element={<ViewUserProfile />} />
                      <Route path="/me/change-password" element={<ChangePassword />} />
                      <Route path="/search/user" element={<UserSearchResults />} />
                      <Route path="/user/me" element={<MyUserPage />} />
                      <Route path="/user/me/my-friend" element={<MyFriend />} />
                      <Route path="/user/profile" element={<MyFriend />} />
                      <Route path="/user/profile/:id" element={<UserFriend />} />
                      <Route path="/user/common-friend/:friendId" element={<CommonFriend />} />
                  </Route>
              </Routes>
          </Router>
      </AuthProvider>
                      );
}

export default App;
