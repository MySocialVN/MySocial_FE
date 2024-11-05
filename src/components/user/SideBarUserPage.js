import * as PropTypes from "prop-types";

function SidebarUserPage(props) {
    return <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
        <div className="card-body d-block p-4">
            <h4 className="fw-700 mb-3 font-xsss text-grey-900">Sở thích</h4>
            <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">{props.userProfile.interests}</p>
        </div>
        <div className="card-body border-top-xs d-flex">
            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
            <h4 className="fw-700 text-grey-900 font-xssss mt-0">Địa chỉ: <span
                className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{props.userProfile.address}</span>
            </h4>
        </div>

        <div className="card-body d-flex pt-0">
            <i className="feather-eye text-grey-500 me-3 font-lg"></i>
            <h4 className="fw-700 text-grey-900 font-xssss mt-0">Số điện thoại: <span
                className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{props.userProfile.phoneNumber}</span>
            </h4>
        </div>
        <div className="card-body d-flex pt-0">
            <i className="feather-eye text-grey-500 me-3 font-lg"></i>
            <h4 className="fw-700 text-grey-900 font-xssss mt-0">Ngày sinh: <span
                className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">  {props.userProfile.birthday ? props.s : ""}</span>
            </h4>
        </div>

    </div>;
}

SidebarUserPage.propTypes = {
    userProfile: PropTypes.shape({
        birthday: PropTypes.string,
        phoneNumber: PropTypes.string,
        address: PropTypes.string,
        background: PropTypes.string,
        fullName: PropTypes.string,
        avatar: PropTypes.string,
        interests: PropTypes.string,
        email: PropTypes.string
    }),
    s: PropTypes.string
};
export default SidebarUserPage