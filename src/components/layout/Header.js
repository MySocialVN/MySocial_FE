import React, { useEffect } from 'react';
import './layout.css';
import {
    HomeOutlined, SearchOutlined,
    ShoppingOutlined,
    ThunderboltOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
    const { user, roles, logout, login } = useAuth();
    const navigate = useNavigate();

    const handleUpgradeRequest = async () => {
        if (!user || !user.id) {
            console.error('User is not defined or user ID is missing.');
            toast.error('Bạn cần đăng nhập để thực hiện yêu cầu này.');
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.put('http://localhost:8080/api/users/request-upgrade', null, {
                params: { userId: user.id },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                toast.success('Yêu cầu nâng cấp của bạn đã được gửi thành công!');
                navigate('/success-page');
            }
        } catch (error) {
            console.error('Error sending upgrade request:', error.response ? error.response.data : error.message);
            toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRoles = localStorage.getItem('roles');
        const storedUserId = localStorage.getItem('userId');

        if (storedUsername && storedRoles && !user) {
            try {
                login(storedUsername, JSON.parse(storedRoles), storedUserId);
            } catch (error) {
                console.error('Error parsing roles from localStorage:', error);
            }
        }
    }, [login, user]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            toast.success('Đăng xuất thành công!');

            setTimeout(() => {
                logout();
                navigate('/login');
            }, 1500);
        } catch (error) {
            console.error('Logout failed', error);
            toast.error('Đăng xuất không thành công.');
        }
    };

    const renderDropdownMenu = () => {
        if (!user) {
            return (
                <>
                    <li>
                        <Link to="/login" className="dropdown-item">Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to="/register" className="dropdown-item">Đăng ký</Link>
                    </li>
                </>
            );
        }

        const userRoles = Array.isArray(roles) ? roles : [];

        if (userRoles.includes('ROLE_ADMIN')) {
            return (
                <>
                    <li className="text-center my-3">
                        <span className="font-weight-bold">{`Chào mừng, ${user.username}!`}</span>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/admin/dashboard">Trang quản trị</Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button type="button" className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
                    </li>
                </>
            );
        }


        return (
            <>
                <li className="text-center my-3">
                    <span className="font-weight-bold">{`Chào mừng, ${user.username}!`}</span>
                </li>
                <li>
                    <Link className="dropdown-item" to="/user/view-profile">Quản lý tài khoản</Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/user/history-booking">Lịch sử thuê nhà</Link>
                </li>
                <li>
                    <button type="button" className="dropdown-item" onClick={handleUpgradeRequest}>
                        Trở thành chủ nhà
                    </button>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <button type="button" className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
                </li>
            </>
        );
    };

    return (
        <div className="color-theme-blue mont-font ">
            <div className="main-wrapper container-head">
                <div className="nav-header bg-white shadow-xs border-0">
                    <div className="nav-top avatar-logo">
                        <a href="index.html">
                            <img src="https://firebasestorage.googleapis.com/v0/b/home-dn.appspot.com/o/favicon.png?alt=media&token=a8879899-7304-4fc7-a67a-656e1f8acb67" alt="icon" className="icon-class me-2 ms-0" />
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                            Sociala
                        </span>
                        </a>
                    </div>

                    {/* Icon và form tìm kiếm */}
                    <form action="#" className="float-left header-search">
                        <div className="form-group mb-0 icon-input">
                            <SearchOutlined style={{ paddingLeft: "15px" }} className="position-absolute left-3 top-50 translate-middle-y text-grey-500 font-sm" />
                            <input
                                type="text"
                                placeholder="Start typing to search..."
                                className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
                            />
                        </div>
                    </form>

                    {/* Các icon chính */}
                    <a href="default.html" className="p-2 text-center ms-3 menu-icon center-menu-icon">
                        <HomeOutlined className="font-lg alert-primary btn-round-lg theme-dark-bg text-current" />
                    </a>
                    <a href="default-storie.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <ThunderboltOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>
                    <a href="default-video.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <VideoCameraOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>
                    <a href="default-group.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <UserOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>
                    <a href="shop-2.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <ShoppingOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>

                    {/* Dropdown */}
                    <div className="d-flex m-5  ms-auto avatar-user">
                        <Dropdown overlay={<Menu>{renderDropdownMenu()}</Menu>} trigger={['click']}>
                            <a href="# " onClick={(e) => e.preventDefault()} className="nav-link text-red">
                                <UserOutlined className="font-lg text-red" /> {/* Đồng bộ icon */}
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>

    );
};

export default Header;
