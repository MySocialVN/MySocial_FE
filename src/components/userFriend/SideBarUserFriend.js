import * as PropTypes from "prop-types";
import React from "react";
import {EnvironmentOutlined, GiftOutlined, PhoneOutlined, SmileOutlined, StarOutlined} from "@ant-design/icons";

function SideBarUserFriend(props) {
    return <>
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-block p-4 d-flex">

                <StarOutlined className="feather-lock text-grey-500 me-3 font-lg "></StarOutlined>
                <h4 className="fw-700 mb-3 font-xsss text-grey-900">Sở thích</h4>
                <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">{props.viewProfile.interests}</p>
            </div>
            <div className="card-body border-top-xs d-flex">
                <EnvironmentOutlined className="feather-lock text-grey-500 me-3 font-lg"></EnvironmentOutlined>
                <h4 className="fw-700 text-grey-900 font-xssss mt-0">Địa chỉ: <span
                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{props.viewProfile.address}</span>
                </h4>
            </div>

            <div className="card-body d-flex pt-0">
                <PhoneOutlined className="feather-eye text-grey-500 me-3 font-lg"></PhoneOutlined>
                <h4 className="fw-700 text-grey-900 font-xssss mt-0">Số điện thoại: <span
                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{props.viewProfile.phoneNumber}</span>
                </h4>
            </div>
            <div className="card-body d-flex pt-0">
                <GiftOutlined className="feather-eye text-grey-500 me-3 font-lg"></GiftOutlined>
                <h4 className="fw-700 text-grey-900 font-xssss mt-0">Ngày sinh: <span
                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">  {props.viewProfile.birthday ? props.s : ""}</span>
                </h4>
            </div>

        </div>
        ;
    </>;
}

SideBarUserFriend.propTypes = {
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
    s: PropTypes.string
}; export default SideBarUserFriend