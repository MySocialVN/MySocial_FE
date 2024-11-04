import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config/Constant";

const UserPage = () => {
    const [userProfile, setUserProfile] = useState({
        avatar: '',
        fullName: '',
        email:'',
        phoneNumber:''

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


    return (
        <div className="main-content right-chat-active">

            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                                <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3"><img
                                    src={userProfile ? userProfile.avatar : 'https://via.placeholder.com/75'}
                                    style={{height: "170px", width: " 1000px", objectFit: "cover"}} alt="image"/>
                                </div>
                                <div className="card-body p-0 position-relative">
                                    <figure className="avatar position-absolute w100 z-index-1"
                                            style={{top: '-40px', left: '30px'}}><img
                                        src={userProfile ? userProfile.avatar : 'https://via.placeholder.com/75'}
                                        alt="image"
                                        className="float-right p-1 bg-white rounded-circle w-100"/>
                                    </figure>
                                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">{userProfile?userProfile.fullName:''} <span
                                        className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{userProfile?userProfile.email:''}</span>
                                    </h4>
                                    <div
                                        className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                                        <a href="#"
                                           className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3">Add
                                            Friend</a>
                                        <a href="#"
                                           className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i
                                            className="feather-mail font-md">N</i></a>

                                    </div>
                                </div>

                                <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                                    <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                                        id="pills-tab" role="tablist">
                                        <li className="active list-inline-item me-5"><a
                                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                                            href="#navtabs1" data-toggle="tab">About</a></li>
                                        <li className="list-inline-item me-5"><a
                                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                            href="#navtabs2" data-toggle="tab">Membership</a></li>
                                        <li className="list-inline-item me-5"><a
                                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                            href="#navtabs3" data-toggle="tab">Discussion</a></li>
                                        <li className="list-inline-item me-5"><a
                                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                            href="#navtabs4" data-toggle="tab">Video</a></li>
                                        <li className="list-inline-item me-5"><a
                                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                            href="#navtabs3" data-toggle="tab">Group</a></li>
                                        <li className="list-inline-item me-5"><a
                                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                            href="#navtabs1" data-toggle="tab">Events</a></li>
                                        <li className="list-inline-item me-5"><a
                                            className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                            href="#navtabs7" data-toggle="tab">Media</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">

                            </div>
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-block p-4">
                                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                                    <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus</p>
                                </div>
                                <div className="card-body border-top-xs d-flex">
                                    <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Private <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">What's up, how are you?</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0">
                                    <i className="feather-eye text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Visble <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">Anyone can find you</span>
                                    </h4>
                                </div>
                                <div className="card-body d-flex pt-0">
                                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Flodia, Austia </h4>
                                </div>
                                <div className="card-body d-flex pt-0">
                                    <i className="feather-users text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Genarel Group</h4>
                                </div>
                            </div>
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-block pt-0 pb-2">
                                    <div className="row">
                                        <div className="col-6 mb-2 pe-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-block w-100 pt-0">
                                    <a href="#"
                                       className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i
                                        className="feather-external-link font-xss me-2"></i> More</a>
                                </div>
                            </div>

                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-success me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">FEB</span>22</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Meeting with clients <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-warning me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">APR</span>30</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Developer Programe <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-primary me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">APR</span>23</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Aniversary Event <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8">


                            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3">
                                <div className="card-body p-0">
                                    <a href="#"
                                       className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"><i
                                        className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create
                                        Post</a>
                                </div>
                                <div className="card-body p-0 mt-3 position-relative">
                                    <figure className="avatar position-absolute ms-2 mt-1 top-5"><img
                                        src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                        alt="image" className="shadow-sm rounded-circle w30"/>
                                    </figure>
                                    <textarea name="message"
                                              className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                                              cols="30" rows="10" placeholder="What's on your mind?"></textarea>
                                </div>
                                <div className="card-body d-flex p-0 mt-0">
                                    <a href="#"
                                       className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i
                                        className="font-md text-danger feather-video me-2"></i><span
                                        className="d-none-xs">Live Video</span></a>
                                    <a href="#"
                                       className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i
                                        className="font-md text-success feather-image me-2"></i><span
                                        className="d-none-xs">Photo/Video</span></a>
                                    <a href="#"
                                       className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i
                                        className="font-md text-warning feather-camera me-2"></i><span
                                        className="d-none-xs">Feeling/Activity</span></a>
                                    <a href="#" className="ms-auto" id="dropdownMenu8" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                         aria-labelledby="dropdownMenu8">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                <div className="card-body p-0 d-flex">
                                    <figure className="avatar me-3"><img
                                        src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                        alt="image"
                                        className="shadow-sm rounded-circle w45"/>
                                    </figure>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">3 hour ago</span>
                                    </h4>
                                    <a href="#" className="ms-auto" id="dropdownMenu7" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                         aria-labelledby="dropdownMenu7">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0 me-lg-5">
                                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus <a href="#" className="fw-600 text-primary ms-2">See more</a></p>
                                </div>
                                <div className="card-body d-block p-0">
                                    <div className="row ps-2 pe-2">
                                        <div className="col-xs-4 col-sm-4 p-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-4 col-sm-4 p-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-4 col-sm-4 p-1"><a
                                            href="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            data-lightbox="roadtrip"
                                            className="position-relative d-block"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/><span
                                            className="img-count font-sm text-white ls-3 fw-600"><b>+2</b></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-flex p-0 mt-3">
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3"><i
                                        className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>
                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                        Like</a>
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                        Comment</a>
                                    <a href="#"
                                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                        className="d-none-xs">Share</span></a>
                                </div>
                            </div>

                            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                                <div className="card-body p-0 d-flex">
                                    <figure className="avatar me-3"><img src="images/user-8.png" alt="image"
                                                                         className="shadow-sm rounded-circle w45"/>
                                    </figure>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hour ago</span>
                                    </h4>
                                    <a href="#" className="ms-auto" id="dropdownMenu2" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                         aria-labelledby="dropdownMenu2">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0 me-lg-5">
                                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus <a href="#" className="fw-600 text-primary ms-2">See more</a></p>
                                </div>
                                <div className="card-body d-flex p-0">
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3"><i
                                        className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>
                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                        Like</a>
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                        Comment</a>
                                    <a href="#"
                                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                        className="d-none-xs">Share</span></a>
                                </div>
                            </div>


                            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                <div className="card-body p-0 d-flex">
                                    <figure className="avatar me-3"><img src="images/user-8.png" alt="image"
                                                                         className="shadow-sm rounded-circle w45"/>
                                    </figure>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hour ago</span>
                                    </h4>
                                    <a href="#" className="ms-auto" id="dropdownMenu5" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                         aria-labelledby="dropdownMenu5">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                    <a href="#" className="video-btn">
                                        <video autoPlay loop className="float-right w-100">
                                            <source src="images/v-2.mp4" type="video/mp4"/>
                                        </video>
                                    </a>
                                </div>
                                <div className="card-body p-0 me-lg-5">
                                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus <a href="#" className="fw-600 text-primary ms-2">See more</a></p>
                                </div>
                                <div className="card-body d-flex p-0">
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3"><i
                                        className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>
                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                        Like</a>
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                        Comment</a>
                                    <a href="#"
                                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                        className="d-none-xs">Share</span></a>
                                </div>
                            </div>

                            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                                <div className="card-body p-0 d-flex">
                                    <figure className="avatar me-3"><img src="images/user-8.png" alt="image"
                                                                         className="shadow-sm rounded-circle w45"/>
                                    </figure>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hour ago</span>
                                    </h4>
                                    <a href="#" className="ms-auto"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                </div>

                                <div className="card-body p-0 me-lg-5">
                                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus <a href="#" className="fw-600 text-primary ms-2">See more</a></p>
                                </div>
                                <div className="card-body d-block p-0 mb-3">
                                    <div className="row ps-2 pe-2">
                                        <div className="col-xs-6 col-sm-6 p-1"><a href="images/t-21.jpg"
                                                                                  data-lightbox="roadtri"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-6 col-sm-6 p-1"><a href="images/t-22.jpg"
                                                                                  data-lightbox="roadtri"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/></a></div>
                                    </div>
                                    <div className="row ps-2 pe-2">
                                        <div className="col-xs-4 col-sm-4 p-1"><a href="images/t-23.jpg"
                                                                                  data-lightbox="roadtri"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-4 col-sm-4 p-1"><a href="images/t-24.jpg"
                                                                                  data-lightbox="roadtri"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-4 col-sm-4 p-1"><a href="images/t-25.jpg"
                                                                                  data-lightbox="roadtri"
                                                                                  className="position-relative d-block"><img
                                            src="https://ca.slack-edge.com/T062S4QFUJZ-U070UHH75CL-3297140ad074-512"
                                            className="rounded-3 w-100" alt="image"/><span
                                            className="img-count font-sm text-white ls-3 fw-600"><b>+2</b></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-flex p-0">
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3"><i
                                        className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>
                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                        Like</a>
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                        Comment</a>
                                    <a href="#"
                                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                        className="d-none-xs">Share</span></a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserPage;
