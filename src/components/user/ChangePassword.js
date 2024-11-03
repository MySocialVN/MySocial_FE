import React, {useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {HomeOutlined} from "@ant-design/icons";
import {Card} from "antd"; // Import CSS của react-toastify

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra độ dài mật khẩu
        if (newPassword.length < 6 || newPassword.length > 32) {
            setError('Mật khẩu phải có độ dài từ 6 đến 32 ký tự.');
            return;
        }

        // Simple validation
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        try {
            // Send password change request to the backend
            await axios.put('http://localhost:8080/api/users/change-password', null, {
                params: {
                    oldPassword,
                    newPassword,
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                }
            });

            // Show success toast and redirect to profile page
            toast.success('Đổi mật khẩu thành công!', {
                position: 'top-right',
            });

            setTimeout(() => {
                navigate('/user/view-profile');
            }, 2000);
        } catch (err) {
            setError('Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ.');
            console.error('Error changing password:', err);
        }
    };

    function handleCancel() {
        navigate('/user/view-profile');
    }

    return (
        <div>
            <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <ToastContainer/>
                            <Card
                                style={{ background: 'blue', border: 'none', borderRadius: '8px', padding: '16px' }}
                                className="d-flex align-items-center"
                            >
                                <Link to="/home" className="p-2 text-center ms-3 menu-icon center-menu-icon">
                                    <HomeOutlined className="font-lg alert-primary btn-round-lg theme-dark-bg text-current" />
                                </Link>
                                <span style={{ color: 'white',  fontSize: '34px' }}>
        Đổi mật khẩu
    </span>
                            </Card>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit} className="form-control">
                        <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label"><strong>Mật khẩu cũ:</strong></label>
                            <input
                                type="password"
                                className="form-control"
                                id="oldPassword"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label"><strong>Mật khẩu mới:</strong></label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label"><strong>Xác nhận mật khẩu mới:</strong></label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary m-1">Đổi mật khẩu</button>
                        <button type="button" className="btn btn-danger m-1" onClick={handleCancel}>Huỷ</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>

    );
};

export default ChangePassword;
