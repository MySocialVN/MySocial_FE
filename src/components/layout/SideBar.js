import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Dropdown, Menu} from "antd";
import axios from "axios";
import {API_URL} from "../config/Constant";
import {UsergroupAddOutlined} from "@ant-design/icons";

function SideBar() {
    const [userProfile, setUserProfile] = useState({
        background: '',
        avatar: '',
        fullName: '',
        email:'',
        phoneNumber:'',
        interests: '',
        address: '',
        birthday: ''
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/login'); // Điều hướng đến trang đăng nhập nếu không có token
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setUserProfile(response.data);
            } catch (err) {
                setError(prev => ({ ...prev, fetch: 'Error fetching user profile' }));
                console.error('Error fetching user profile:', err);

                if (err.response && err.response.status === 401) {
                    navigate('/login'); // Điều hướng đến trang đăng nhập nếu token hết hạn hoặc không hợp lệ
                }
            }
        };

        fetchUserProfile();
    }, [navigate]);

    return <nav className="navigation scroll-bar">
        <div className="container ps-0 pe-0">
            <div className="nav-content">
                <div
                    className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                    <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                    <ul className="mb-1 top-content">
                        <li className="logo d-none d-xl-block d-lg-block"></li>
                        <li><Link to="user/me" className="nav-content-bttn open-font">
                            <div className="d-flex avatar-user">

                                <img
                                    src={userProfile?.avatar || 'https://via.placeholder.com/30'}
                                    alt="User Avatar"
                                    className="rounded-circle bg-mini-gradiant me-3"
                                    style={{ width: '40px', height: '40px' }}
                                />

                        </div><span>{userProfile.fullName}</span></Link>
                        </li>
                        <li>
                            <Link
                                to="user/me/my-friend"
                                className="nav-content-bttn open-font"
                            >
                                <UsergroupAddOutlined
                                    className="btn-round-md bg-gold-gradiant me-3"
                                    style={{ fontSize: '18px', padding:'0px' }} // Thay đổi kích thước icon tại đây
                                />                                <span className="friend-text">Bạn bè</span>
                            </Link>
                        </li>
                        <li><a href="default-storie.html" className="nav-content-bttn open-font"><i
                            className="feather-globe btn-round-md bg-gold-gradiant me-3"></i><span>Explore Stories</span></a>
                        </li>
                        <li><a href="default-group.html" className="nav-content-bttn open-font"><i
                            className="feather-zap btn-round-md bg-mini-gradiant me-3"></i><span>Popular Groups</span></a>
                        </li>
                        <li><a href="user-page.html" className="nav-content-bttn open-font"><i
                            className="feather-user btn-round-md bg-primary-gradiant me-3"></i><span>Author Profile </span></a>
                        </li>
                    </ul>
                </div>

                <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
                    <div className="nav-caption fw-600 font-xssss text-grey-500"><span>More </span>Pages</div>
                    <ul className="mb-3">
                        <li><a href="default-email-box.html" className="nav-content-bttn open-font"><i
                            className="font-xl text-current feather-inbox me-3"></i><span>Email Box</span><span
                            className="circle-count bg-warning mt-1">584</span></a></li>
                        <li><a href="default-hotel.html" className="nav-content-bttn open-font"><i
                            className="font-xl text-current feather-home me-3"></i><span>Near Hotel</span></a>
                        </li>
                        <li><a href="default-event.html" className="nav-content-bttn open-font"><i
                            className="font-xl text-current feather-map-pin me-3"></i><span>Latest Event</span></a>
                        </li>
                        <li><a href="default-live-stream.html" className="nav-content-bttn open-font"><i
                            className="font-xl text-current feather-youtube me-3"></i><span>Live Stream</span></a>
                        </li>
                    </ul>
                </div>
                <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                    <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account</div>
                    <ul className="mb-1">
                        <li className="logo d-none d-xl-block d-lg-block"></li>
                        <li><a href="default-settings.html"
                               className="nav-content-bttn open-font h-auto pt-2 pb-2"><i
                            className="font-sm feather-settings me-3 text-grey-500"></i><span>Settings</span></a>
                        </li>
                        <li><a href="default-analytics.html"
                               className="nav-content-bttn open-font h-auto pt-2 pb-2"><i
                            className="font-sm feather-pie-chart me-3 text-grey-500"></i><span>Analytics</span></a>
                        </li>
                        <li><a href="default-message.html"
                               className="nav-content-bttn open-font h-auto pt-2 pb-2"><i
                            className="font-sm feather-message-square me-3 text-grey-500"></i><span>Chat</span><span
                            className="circle-count bg-warning mt-0">23</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>;
}
export default SideBar