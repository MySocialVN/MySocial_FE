import React, { useEffect, useRef, useState } from 'react';
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
import {API_URL} from "../config/Constant";

const Header = () => {
    const { user, roles, logout, login } = useAuth();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

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
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
                setUserProfile(response.data);
            } catch (err) {
                setError(prev => ({...prev, fetch: 'Error fetching user profile'}));
                console.error('Error fetching user profile:', err);
            }
        };
        fetchUserProfile();
    }, []);

    const handleSearch = async (term) => {
        let jwtToken = localStorage.getItem("jwtToken");
        try {
            const response = await axios.get(`http://localhost:8080/api/users/search?name=${term}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });
            setSearchResults(response.data);
            setDropdownVisible(response.data.length > 0); // Hiện dropdown nếu có kết quả
        } catch (error) {
            console.error('Search failed', error);
            toast.error('Tìm kiếm không thành công.');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            handleSearch(value);
        } else {
            setDropdownVisible(false); // Ẩn dropdown nếu trường tìm kiếm bị xóa
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/user?query=${encodeURIComponent(searchTerm)}`);
    };

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

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false); // Ẩn dropdown khi click ra ngoài
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderDropdownMenu = () => {
        if (!user) {
            return (
                <>
                    <li><Link to="/login" className="dropdown-item">Đăng nhập</Link></li>
                    <li><Link to="/register" className="dropdown-item">Đăng ký</Link></li>
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
                    <li><Link className="dropdown-item" to="/admin/dashboard">Trang quản trị</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button type="button" className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                </>
            );
        }

        return (
            <>
                <li className="text-center my-3">
                    <span className="font-weight-bold">{`Chào mừng, ${user.username}!`}</span>
                </li>
                <li><Link className="dropdown-item" to="/user/view-profile">Quản lý tài khoản</Link></li>
                <li><Link className="dropdown-item" to="/user/me">Trang cá nhân</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button type="button" className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
            </>
        );
    };

    return (
        <div className="color-theme-blue mont-font">
            <div className="main-wrapper container-head">
                <div className="nav-header bg-white shadow-xs border-0">
                    <div className="nav-top avatar-logo">
                        <Link to="/home">
                            <img src="https://firebasestorage.googleapis.com/v0/b/home-dn.appspot.com/o/favicon.png?alt=media&token=a8879899-7304-4fc7-a67a-656e1f8acb67" alt="icon" className="icon-class me-2 ms-0" />
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                                Sociala
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="position-relative" ref={dropdownRef}>
                        <form onSubmit={handleSubmit} className="float-left header-search">
                            <div className="form-group mb-0 icon-input">
                                <SearchOutlined style={{ paddingLeft: "15px" }} className="position-absolute left-3 top-50 translate-middle-y text-grey-500 font-sm" />
                                <input
                                    type="text"
                                    placeholder="Start typing to search..."
                                    className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl theme-dark-bg"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>

                        {/* Dropdown for search results */}
                        {isDropdownVisible && (
                            <div className="dropdown-menu show position-absolute w-100 bg-white shadow" style={{ top: '40px', zIndex: 1000 }}>
                                {searchResults.map((result) => (
                                    <Link key={result.id} to={`/user/profile/${result.id}`} className="dropdown-item d-flex align-items-center">
                                        <img
                                            src={result.avatar || 'https://via.placeholder.com/30'}
                                            alt="avatar"
                                            className="rounded-circle me-2"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        <span>{result.fullName}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main Icons */}
                    <Link to="default.html" className="p-2 text-center menu-icon center-menu-icon" style={{ marginLeft: "70px" }}>
                        <HomeOutlined className="font-lg alert-primary btn-round-lg theme-dark-bg text-current" />
                    </Link>
                    <a href="default-storie.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <ThunderboltOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>
                    <a href="default-video.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <VideoCameraOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>
                    <Link to="/search/user" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <UserOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </Link>
                    <a href="shop-2.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                        <ShoppingOutlined className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500" />
                    </a>

                    {/* User Dropdown */}
                    <div className="d-flex m-5 ms-auto avatar-user">
                        <Dropdown overlay={<Menu>{renderDropdownMenu()}</Menu>} trigger={['click']}>
                            <img
                                src={userProfile?.avatar || 'https://via.placeholder.com/30'}
                                alt="User Avatar"
                                className="rounded-circle ms-auto me-3"
                                style={{ width: '40px', height: '40px' }}
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Header;
