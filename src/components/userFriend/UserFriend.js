import {Link, useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/Constant";

import HeaderUserFriend from "./HeaderUserFriend";
import SideBarUserFriend from "./SideBarUserFriend";




const UserFriend = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [viewProfile, setViewProfile] = useState({
        background: '',
        avatar: '',
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        interests: '',
        address: '',
        birthday: '',
        friendCount: 0,
        mutualFriendCount: 0,
        yourSendRequest: false,
        friend: false,
        youSendRequest: false,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userToUnfriendId, setUserToUnfriendId] = useState(null);
    const [userToUnfriendFullName, setUserToUnfriendFullName] = useState(null);

    const [error, setError] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            let jwtToken = localStorage.getItem("jwtToken");


            try {
                const response = await axios.get(`${API_URL}/api/users/user/view/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log("data", response.data)
                setViewProfile(response.data);
            } catch (err) {
                setError(prev => ({ ...prev, fetch: 'Error fetching user profile' }));
                console.error('Error fetching user profile:', err);

                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUserProfile();
    }, [navigate, id]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const sendFriendRequest = async (friendId) => {
        const jwtToken = localStorage.getItem("jwtToken");
        try {
            const response = await axios.post(`http://localhost:8080/api/friendships/request`, {
                friendId: friendId
            }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("Friend request sent:", response.data);
            setViewProfile((prevState) => ({
                ...prevState,
                youSendRequest: true,
            }));
        } catch (error) {
            console.error("Error sending friend request", error);
        }
    };

    const cancelFriendRequest = async (friendId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/friendships/request/${friendId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("Xóa nè :", response.data);
            setViewProfile((prevState) => ({
                ...prevState,
                youSendRequest: false,
                friend: false
            }));
        } catch (error) {
            console.error("Error sending friend request", error);
        }
    };
    const acceptFriendRequest = async (friendId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/friendships/accept/${friendId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("Xóa nè :", response.data);
            setViewProfile((prevState) => ({
                ...prevState,
                yourSendRequest: false,
                friend: true
            }));
        } catch (error) {
            console.error("Error accept friend request", error);
        }
    };

    const showModal = (friendId, friendFullName) => {
        setUserToUnfriendId(friendId);
        setIsModalVisible(true);
        setUserToUnfriendFullName(friendFullName);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setUserToUnfriendId(null);
        setUserToUnfriendFullName(null);
    };

    const handleUnfriend = async () => {
        if (userToUnfriendId) {
            await cancelFriendRequest(userToUnfriendId);
            setIsModalVisible(false);
            setUserToUnfriendId(null);
            setUserToUnfriendFullName(null);
        }
    };

    return (
        <div className="main-content right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <HeaderUserFriend viewProfile={viewProfile} onClick={() => sendFriendRequest(viewProfile.id)}
                                          onClick1={() => showModal(viewProfile.id, viewProfile.fullName)}
                                          onClick2={() => cancelFriendRequest(viewProfile.id)}
                                          onClick3={() => acceptFriendRequest(viewProfile.id)} visible={isModalVisible}
                                          onOk={handleUnfriend} onCancel={handleCancel}
                                          userToUnfriendFullName={userToUnfriendFullName}/>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                                <SideBarUserFriend viewProfile={viewProfile} s={formatDate(viewProfile.birthday)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFriend;
