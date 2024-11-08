import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config/Constant";
import PostUserPage from "../user/PostUserPage";
import SidebarUserPage from "../user/SideBarUserPage";

const Home = () => {

    return (<>
            <div className="main-content right-chat-active">

                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">


                                <PostUserPage/>
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
                            </div>
                            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                    <div className="card-body d-flex align-items-center p-4">
                                        <h4 className="fw-700 mb-0 font-xssss text-grey-900">Friend Request</h4>
                                        <a href="default-member.html"
                                           className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                    </div>
                                    <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                                        <figure className="avatar me-3"><img src="images/user-7.png" alt="image"
                                                                             className="shadow-sm rounded-circle w45"/>
                                        </figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                            className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span>
                                        </h4>
                                    </div>
                                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                        <a href="#"
                                           className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                                        <a href="#"
                                           className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
                                    </div>

                                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0">
                                        <figure className="avatar me-3"><img src="images/user-8.png" alt="image"
                                                                             className="shadow-sm rounded-circle w45"/>
                                        </figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">Mohannad Zitoun <span
                                            className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span>
                                        </h4>
                                    </div>
                                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                        <a href="#"
                                           className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                                        <a href="#"
                                           className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
                                    </div>

                                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0">
                                        <figure className="avatar me-3"><img src="images/user-12.png" alt="image"
                                                                             className="shadow-sm rounded-circle w45"/>
                                        </figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">Mohannad Zitoun <span
                                            className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span>
                                        </h4>
                                    </div>
                                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                        <a href="#"
                                           className="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                                        <a href="#"
                                           className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
                                    </div>
                                </div>


                            </div>
                        </div>
            </div>
        </div>

</div>
</>
)
}
export default Home