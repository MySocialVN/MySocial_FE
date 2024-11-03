import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import {Input, Button, Dropdown, Menu, Modal} from 'antd';
import {
    CheckOutlined,
    ClockCircleOutlined,
    SearchOutlined,
    UserAddOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';

const UserSearchResults = () => {
    const location = useLocation();
    const history = useNavigate();
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('query') || ' ');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userToUnfriendId, setUserToUnfriendId] = useState(null);
    const [userToUnfriendFullName, setUserToUnfriendFullName] = useState(null);

    const fetchSearchResults = async (query) => {
        let jwtToken = localStorage.getItem("jwtToken");
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/users/search?name=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchSearchResults(searchTerm);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchTerm.trim();
        if (query) {
            history.push(`/search/user?query=${encodeURIComponent(query)}`);
            fetchSearchResults(query);
        }
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
            setSearchResults((prevResults) =>
                prevResults.map((user) =>
                    user.id === friendId ? { ...user, youSendRequest: true } : user
                )
            );
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
            setSearchResults((prevResults) =>
                prevResults.map((user) =>
                    user.id === friendId ? { ...user, youSendRequest: false, friend: false } : user
                )
            );
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
            setSearchResults((prevResults) =>
                prevResults.map((user) =>
                    user.id === friendId ? { ...user, yourSendRequest: false, friend: true } : user
                )
            );
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
        <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
            <div className="search-form mb-4">
            </div>
            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <div className="card-body d-flex align-items-center p-0">
                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Search results for: "{searchTerm}"</h2>
                    <div className="sposition-relative float-left header-search ms-auto">
                        <div className="form-group mb-0 icon-input">
                            <SearchOutlined style={{ paddingLeft: "15px" }} className="position-absolute left-3 top-50 translate-middle-y text-grey-500 font-sm" />
                            <input
                                placeholder="Search for users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{marginLeft: '30px', width: '250px'}}
                                className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl theme-dark-bg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="row ps-2 pe-1">
                                {isLoading ? (
                                    <p>Loading results...</p>
                                ) : searchResults.length ? (
                                    searchResults.map((user) => (
                                        <div className="col-md-6 col-sm-6 pe-2 ps-2" key={user.id}>
                                            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                                <Link to={`/user/profile/${user.id}`}>
                                                    <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{backgroundImage: `url(${user.avatar || 'images/bb-16.png'})`}}></div>
                                                </Link>
                                                <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                                                    <Link to={`/user/profile/${user.id}`}>
                                                        <figure className="avatar position-absolute w75 z-index-1" style={{top: '-40px', left: '15px'}}>
                                                            <img src={user.avatar || 'https://via.placeholder.com/75'} alt="avatar" className="float-right p-1 bg-white rounded-circle w-100" />
                                                        </figure>
                                                    </Link>
                                                    <h4 className="fw-700 font-xsss mt-3 mb-1">{user.fullName}</h4>
                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">{user.email}</p>
                                                    <span className="position-absolute right-15 top-0 d-flex align-items-center">
                                                        <Link to="#" className="d-lg-block d-none">
                                                            <i className="feather-video btn-round-md font-md bg-primary-gradiant text-white"></i>
                                                        </Link>
                                                        {!user.friend && !user.youSendRequest && !user.yourSendRequest ? (
                                                            <button
                                                                className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-red"
                                                                onClick={() => sendFriendRequest(user.id)}
                                                            >
                                                                <UserAddOutlined style={{ marginRight: '5px' }} /> Kết Bạn
                                                            </button>
                                                        ) : user.friend && !user.youSendRequest && !user.yourSendRequest ? (
                                                            <Dropdown overlay={
                                                                <Menu>
                                                                    <Menu.Item onClick={() => showModal(user.id, user.fullName)}>
                                                                        Hủy kết bạn
                                                                    </Menu.Item>
                                                                </Menu>
                                                            }>
                                                                <button className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-success">
                                                                    <UsergroupAddOutlined style={{ marginRight: '5px' }} /> Bạn bè
                                                                </button>
                                                            </Dropdown>
                                                        ) : user.youSendRequest ? (
                                                            <button className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-ornage" onClick={() => cancelFriendRequest(user.id)}>
                                                                <ClockCircleOutlined style={{ marginRight: '5px' }} /> Đã gửi
                                                            </button>
                                                        ) : (
                                                            <button className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-warning" onClick={() => acceptFriendRequest(user.id)}>
                                                                <CheckOutlined style={{ marginRight: '5px' }} /> Xác nhận
                                                            </button>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No users found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Hủy kết bạn"
                visible={isModalVisible}
                onOk={handleUnfriend}
                onCancel={handleCancel}
                okText="Hủy kết bạn"
                cancelText="Đóng"
            >
                <p>Bạn có chắc muốn hủy kết bạn với <strong>{userToUnfriendFullName}</strong> không?</p>
            </Modal>
        </div>
    );
};

export default UserSearchResults;
