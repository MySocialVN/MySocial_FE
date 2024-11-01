import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/Constant";
import { toast } from "react-toastify";

const ViewUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState({});
    const navigate = useNavigate();

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

    return (
        <div>
            <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="">
                                    <h3 className="font-xs text-center text-red fw-800 ms-4 mb-0 mt-2">Thông Tin Chi Tiết Tài Khoản</h3>
                                </div>

                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-center">
                                            <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                                                <img
                                                    src={userProfile.avatar}
                                                    alt="Profile"
                                                    className="shadow-sm rounded-3 w-100"
                                                />
                                            </figure>
                                            <h2 className="fw-700 font-sm text-grey-900 mt-3">{userProfile.username}</h2>
                                        </div>
                                    </div>

                                    {error.fullName && <p className="text-danger">{error.fullName}</p>}
                                    {error.phoneNumber && <p className="text-danger">{error.phoneNumber}</p>}

                                    <form onSubmit={handleSubmit}>
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
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUserProfile;
