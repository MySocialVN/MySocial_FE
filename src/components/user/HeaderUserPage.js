import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

function HeaderUserPage(props) {
    return <div className="col-lg-12">
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3"><img
                src={props.userProfile ? props.userProfile.avatar : "https://via.placeholder.com/75"}
                style={{height: "170px", width: " 1000px", objectFit: "cover"}} alt="image"/>
            </div>
            <div className="card-body p-0 position-relative">
                <figure className="avatar position-absolute w100 z-index-1"
                        style={{top: "-40px", left: "30px"}}><img
                    src={props.userProfile ? props.userProfile.avatar : "https://via.placeholder.com/75"}
                    alt="image"
                    className="float-right p-1 bg-white rounded-circle w-100"/>
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">{props.userProfile ? props.userProfile.fullName : ""}
                    <span
                        className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{props.userProfile ? props.userProfile.email : ""}</span>
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
                    <li className="active list-inline-item me-5"><Link
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                        to="/home" data-toggle="tab">About</Link></li>
                    <li className="list-inline-item me-5"><Link
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        to="/home" data-toggle="tab">Membership</Link></li>
                    <li className="list-inline-item me-5"><Link
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        to="/home" data-toggle="tab">Discussion</Link></li>
                    <li className="list-inline-item me-5"><Link
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        to="/home" data-toggle="tab">Video</Link></li>
                    <li className="list-inline-item me-5"><Link
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        to="/home" data-toggle="tab">Group</Link></li>
                    <li className="list-inline-item me-5"><Link
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        to="/home" data-toggle="tab">Events</Link></li>
                    <li className="list-inline-item me-5"><Link
                        className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        to="/home" data-toggle="tab">Media</Link></li>
                </ul>
            </div>
        </div>
    </div>;
}

HeaderUserPage.propTypes = {
    userProfile: PropTypes.shape({
        phoneNumber: PropTypes.string,
        background: PropTypes.string,
        fullName: PropTypes.string,
        avatar: PropTypes.string,
        email: PropTypes.string
    })
};
export default HeaderUserPage