import {CheckOutlined, ClockCircleOutlined, UserAddOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Modal} from "antd";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import React from "react";

function HeaderUserFriend(props) {
    return <div className="col-lg-12">
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                <img
                    src={props.viewProfile.background || "https://via.placeholder.com/1500x500"}
                    style={{height: "170px", width: "100%", objectFit: "cover"}}
                    alt="background"
                />
            </div>
            <div className="card-body p-0 position-relative">
                <figure className="avatar position-absolute w100 z-index-1" style={{top: "-40px", left: "30px"}}>
                    <img
                        src={props.viewProfile.avatar || "https://via.placeholder.com/75"}
                        alt="avatar"
                        className="float-right p-1 bg-white rounded-circle w-100"
                    />
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                    {props.viewProfile.fullName || "No name"}
                    <div className="d-flex pt-2 pb-0">
                        <span className="fw-500 font-xssss text-grey-500 mt-1 mb-2 d-block">
                            Số bạn bè: {props.viewProfile.friendCount}
                        </span>
                        <span className="fw-500 font-xssss text-grey-500 mt-1 mb-2 d-block ps-1">
                            - Số bạn chung: {props.viewProfile.mutualFriendCount}
                        </span>
                    </div>
                    <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block ">
                            username: {props.viewProfile.username}
                        </span>
                </h4>
                <div
                    className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                    {!props.viewProfile.friend && !props.viewProfile.youSendRequest && !props.viewProfile.yourSendRequest ? (
                        <button
                            className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-red"
                            onClick={props.onClick}
                        >
                            <UserAddOutlined style={{marginRight: "5px"}}/> Kết Bạn
                        </button>
                    ) : props.viewProfile.friend && !props.viewProfile.youSendRequest && !props.viewProfile.yourSendRequest ? (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item onClick={props.onClick1}>
                                    Hủy kết bạn
                                </Menu.Item>
                            </Menu>
                        }>
                            <button
                                className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-success">
                                <UsergroupAddOutlined style={{marginRight: "5px"}}/> Bạn bè
                            </button>
                        </Dropdown>
                    ) : props.viewProfile.youSendRequest ? (
                        <button
                            className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-ornage"
                            onClick={props.onClick2}>
                            <ClockCircleOutlined style={{marginRight: "5px"}}/> Đã gửi
                        </button>
                    ) : (
                        <button
                            className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-warning"
                            onClick={props.onClick3}>
                            <CheckOutlined style={{marginRight: "5px"}}/> Xác nhận
                        </button>
                    )}
                    <a href="#"
                       className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i
                        className="feather-mail font-md">N</i></a>

                </div>
            </div>

            <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4" id="pills-tab"
                    role="tablist">
                    <li className="active list-inline-item me-5">
                        <Link className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                              to="/home" data-toggle="tab">About</Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" to="/home"
                              data-toggle="tab">Membership</Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" to="/home"
                              data-toggle="tab">Discussion</Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" to="/home"
                              data-toggle="tab">Video</Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" to="/home"
                              data-toggle="tab">Group</Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" to="/home"
                              data-toggle="tab">Events</Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                              to="/home" data-toggle="tab">Media</Link>
                    </li>
                </ul>
            </div>
        </div>
        <Modal
            title="Hủy kết bạn"
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText="Hủy kết bạn"
            cancelText="Đóng"
        >
            <p>Bạn có chắc muốn hủy kết bạn với <strong>{props.userToUnfriendFullName}</strong> không?</p>
        </Modal>
    </div>;
}

HeaderUserFriend.propTypes = {
    viewProfile: PropTypes.shape({
        birthday: PropTypes.string,
        address: PropTypes.string,
        friendCount: PropTypes.number,
        mutualFriendCount: PropTypes.number,
        fullName: PropTypes.string,
        username: PropTypes.string,
        avatar: PropTypes.string,
        youSendRequest: PropTypes.bool,
        phoneNumber: PropTypes.string,
        yourSendRequest: PropTypes.bool,
        background: PropTypes.string,
        friend: PropTypes.bool,
        interests: PropTypes.string,
        email: PropTypes.string
    }),
    onClick: PropTypes.func,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func,
    onClick3: PropTypes.func,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    userToUnfriendFullName: PropTypes.any
};
export default HeaderUserFriend