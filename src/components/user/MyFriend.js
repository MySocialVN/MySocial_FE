import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config/Constant";

const MyFriend = () => {
    const [myFriends, setMyFriends] = useState([]);
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
                const response = await axios.get(`${API_URL}/api/users/friends`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setMyFriends(response.data);
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

    return <>
        <div className="main-content right-chat-active">

            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                <div className="card-body d-flex align-items-center p-0">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Friends</h2>
                                    <div className="search-form-2 ms-auto">
                                        <i className="ti-search font-xss"></i>
                                        <input type="text"
                                               className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                               placeholder="Search here."/>
                                    </div>
                                    <a href="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i
                                        className="feather-filter font-xss text-grey-500"></i></a>
                                </div>
                            </div>

                            <div className="row ps-2 pe-2">
                                {myFriends.map((myFriend) => (
                                <div className="col-md-6 col-sm-4 pe-2 ps-2">
                                    <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                        <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                            <figure
                                                className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                <img src={myFriend.avatar} alt="image" style={{
                                                    width: "65x",
                                                    height: "65px"

                                                }}
                                                     className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                            </figure>
                                            <div className="clearfix"></div>
                                            <Link to={`/user/profile/${myFriend.id}`}>
                                                <h4 className="fw-700 font-xsss mt-3 mb-1">{myFriend.fullName}</h4>
                                            </Link>
                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">Bạn chung: {myFriend.mutualFriendCount}</p>
                                            <a href="#"
                                               className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">ADD
                                                FRIEND</a>
                                        </div>
                                    </div>
                                </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                            </>
}
export default MyFriend;