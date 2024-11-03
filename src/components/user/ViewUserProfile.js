import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/Constant";
import {toast, ToastContainer} from "react-toastify";
import {uploadImageToFirebase} from "../config/FirebaseUpload";
import 'bootstrap/dist/css/bootstrap.css'
import './header.css'
import {ArrowLeftOutlined, HomeOutlined} from "@ant-design/icons";
import {Button, Card} from "antd";
import Title from "antd/es/skeleton/Title";



const ViewUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);


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
                setError(prev => ({ ...prev, fetch: 'Error fetching user profile' }));
                console.error('Error fetching user profile:', err);
            }
        };

        fetchUserProfile();
    }, []);

    if (error.fetch) {
        return <p>{error.fetch}</p>;
    }

    if (!userProfile) {
        return <p>Loading...</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let errors = {};

        // Kiểm tra họ tên (chỉ chứa chữ cái và số)
        if (/[^a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]/.test(userProfile.fullName)) {
            errors.fullName = 'Họ tên không được chứa ký tự đặc biệt!';
        }

        // Kiểm tra số điện thoại (10 số và bắt đầu bằng số 0)
        if (!/^0\d{9}$/.test(userProfile.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại phải có 10 số và bắt đầu bằng số 0.';
        }

        setError(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.put(`${API_URL}/api/users/update-profile`, userProfile, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });

                toast.success('Cập nhật thông tin thành công!', {
                    position: 'top-right',
                });

                setTimeout(() => {
                    navigate('/home'); // Chuyển hướng về trang hồ sơ sau khi toast hiện xong
                }, 2000);
            } catch (err) {
                toast.error('Có lỗi xảy ra khi cập nhật thông tin!', {
                    position: 'top-right',
                });
                console.error('Error updating user profile:', err);
            }
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];  // Lấy file ảnh được chọn
        setSelectedFile(file);  // Lưu vào state tạm thời

        if (file) {
            try {
                const avatarUrl = await uploadImageToFirebase(file);  // Upload ảnh và lấy URL
                setUserProfile(prevState => ({
                    ...prevState,
                    avatar: avatarUrl  // Cập nhật URL ảnh vào profile
                }));
                toast.success('Upload ảnh thành công!', {position: 'top-right'});
            } catch (err) {
                toast.error('Có lỗi xảy ra khi upload ảnh!', {position: 'top-right'});
                console.error('Error uploading avatar:', err);
            }
        }
    };

    return (
        <div>

            <div className="main-content bg-lightblue theme-dark-bg right-chat-active" >

                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <ToastContainer/>

                                <Card
                                    style={{ background: 'blue', border: 'none', borderRadius: '8px', padding: '16px' }}
                                    className="d-flex align-items-center"
                                >
                                    <a href="default.html" className="p-2 text-center ms-3 menu-icon center-menu-icon">
                                        <HomeOutlined className="font-lg alert-primary btn-round-lg theme-dark-bg text-current" />
                                    </a>
                                    <span style={{ color: 'white',  fontSize: '34px' }}>
        Thông Tin Chi Tiết Tài Khoản
    </span>
                                </Card>

                                <form onSubmit={handleSubmit}>
                                    <div className="card-body p-lg-5 p-4 w-100 border-0">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4 text-center">

                                                <figure
                                                    className="avatar ms-auto me-auto mb-0 mt-2 w100 position-relative">
                                                    <img
                                                        src={userProfile.avatar}
                                                        alt="Profile"
                                                        className="shadow-sm rounded-circle w-100"
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleUpload}
                                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" // Ẩn input nhưng vẫn giữ vị trí
                                                    />
                                                </figure>

                                                <h2 className="fw-700 font-sm text-grey-900 mt-3">{userProfile.username}</h2>
                                            </div>
                                        </div>

                                        {error.fullName && <p className="text-danger">{error.fullName}</p>}
                                        {error.phoneNumber && <p className="text-danger">{error.phoneNumber}</p>}


                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Họ và tên</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="fullName"
                                                        value={userProfile.fullName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={userProfile.email}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Số điện thoại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phoneNumber"
                                                        value={userProfile.phoneNumber}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Địa Chỉ</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="address"
                                                        value={userProfile.address}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">Ngày sinh</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="birthday"
                                                        value={userProfile.birthday}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss">Sở thích</label>
                                                <textarea
                                                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Viết sở thích của bạn..."
                                                    name="interests"
                                                    value={userProfile.interests}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                            <div className="col-lg-12">
                                                <button type="submit" className="btn btn-warning">Lưu thay đổi</button>
                                                <Link to="/me/change-password" className="btn btn-secondary" style={{marginLeft:"20px"}}>
                                                    Đổi mật khẩu
                                                </Link>
                                            </div>

                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUserProfile;
