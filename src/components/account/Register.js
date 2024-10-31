import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {API_URL} from "../config/Constant";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Register = () => {
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phoneNumber: "",
        birthday: null
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Đăng ký"; // Thay đổi tiêu đề trang
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name] : value
        });
    };
    const handleDateChange = (date) => {
        setFormValues({
            ...formValues,
            birthday: date,
        });
    };

    const validateForm = () => {
        let error = {};


        if (!/^[a-zA-Z0-9]+$/.test(formValues.username)) {
            error.username = "Tên người dùng chỉ được chứa chữ cái hoặc số và không chứa các ký tự đặc biệt. ";
        }
        if (formValues.password.length < 6 || formValues.password.length > 32) {
            error.password = "Mật khẩu chỉ được chứa từ 6 đến 32 ký tự. ";
        }
        if (formValues.confirmPassword !== formValues.password) {
            error.confirmPassword = "Mật khẩu xác nhận không khớp. ";
        }
        if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(formValues.email)) {
            error.email = "Định dạng email không hợp lệ .";
        }
        if (!/^(0[0-9]{9})$/.test(formValues.phoneNumber) && formValues.phoneNumber.length !== 0) {
            error.phoneNumber = "Định dạng số điện thoại phải là 10 số và bắt đầu bằng số 0.";
        }


        if (formValues.birthday) {
            const today = new Date();
            const birthday = new Date(formValues.birthday);
            if (birthday >= today) {
                error.birthday = "Ngày sinh phải nhỏ hơn ngày hiện tại.";
            }
        }

        setFormErrors(error)
        return Object.keys(error).length === 0;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            fetch(`${API_URL}/api/users/register`, {
                method : "POST",
                headers : {"Content-Type" : "application/json "},
                body : JSON.stringify(formValues)
            })
                .then(response => response.ok ? response.text() : response.text().then(text => {throw new Error(text); }))
                .then(data => {
                    toast.success("Đăng ký thành công .")
                    setTimeout(() => navigate("/login"), 1500);
                })
                .catch(error => toast.error(`Đăng ký thất bại: ${error.message}` ));
        }
    };

    return (
        <MDBContainer fluid className="my-5">
            <MDBRow className="g-0 align-items-center">
                <MDBCol style={{
                    flex: '0 0 66.67%', // Chiếm 2/3 chiều ngang
                    maxWidth: '66.67%', // Giới hạn chiều rộng tối đa
                    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/home-dn.appspot.com/o/login-bg.jpg?alt=media&token=a789b352-7a93-4a30-b3f3-83cf12727704)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh'
                }}></MDBCol>                <MDBCol col="6">
                    <MDBCard className="cascading-left" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)', marginTop: '-50px' }}>
                        <MDBCardBody className="p-5 shadow-5 text-center">
                            <h1 className="text-center mb-4">Đăng ký</h1>
                            <form onSubmit={handleSubmit}>
                                {/* Username */}
                                <div className="text-left mb-2">
                                    <label htmlFor='username'>Tên đăng nhập</label>
                                    <MDBInput
                                        wrapperClass='mb-2'
                                        id='username'
                                        type='text'
                                        value={formValues.username}
                                        name="username"
                                        onChange={handleInputChange}
                                        labelClass="small-label"
                                    />
                                    {formErrors.username && <small className="text-danger">{formErrors.username}</small>}
                                </div>

                                {/* Password */}
                                <div className="text-left mb-2">
                                    <label htmlFor='password'>Mật khẩu</label>
                                    <MDBInput
                                        wrapperClass='mb-2'
                                        id='password'
                                        type='password'
                                        value={formValues.password}
                                        name="password"
                                        onChange={handleInputChange}
                                        labelClass="small-label"
                                    />
                                    {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
                                </div>

                                {/* Confirm Password */}
                                <div className="text-left mb-2">
                                    <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
                                    <MDBInput
                                        wrapperClass='mb-2'
                                        id='confirmPassword'
                                        type='password'
                                        value={formValues.confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleInputChange}
                                        labelClass="small-label"
                                    />
                                    {formErrors.confirmPassword && <small className="text-danger">{formErrors.confirmPassword}</small>}
                                </div>


                                {/* Email */}
                                <div className="text-left mb-2">
                                    <label htmlFor='email'>Email</label>
                                    <MDBInput
                                        wrapperClass='mb-2'
                                        id='email'
                                        type='email'
                                        value={formValues.email}
                                        name="email"
                                        onChange={handleInputChange}
                                        labelClass="small-label"
                                    />
                                    {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                                </div>
                                <div className="text-left mb-2">
                                    <label htmlFor='phoneNumber'>Số điện thoại</label>
                                    <MDBInput
                                        wrapperClass='mb-2'
                                        id='phoneNumber'
                                        type='text'
                                        value={formValues.phoneNumber}
                                        name="phoneNumber"
                                        onChange={handleInputChange}
                                        labelClass="small-label"
                                    />
                                    {formErrors.phoneNumber && <small className="text-danger">{formErrors.phoneNumber}</small>}
                                </div>
                                <div className="text-left mb-2">
                                    <label htmlFor='birthday'>Ngày sinh</label>
                                    <DatePicker
                                        selected={formValues.birthday}
                                        onChange={handleDateChange}
                                        dateFormat="dd-MM-yyyy"
                                        maxDate={new Date()} // Giới hạn chọn ngày trong quá khứ
                                        placeholderText="Chọn ngày sinh"
                                        className="form-control"
                                        id="birthday"
                                    />
                                    {formErrors.birthday && <small className="text-danger">{formErrors.birthday}</small>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
                            </form>
                            <div className="mt-3">
                                <span>Bạn đã có tài khoản? </span>
                                <MDBBtn onClick={() => navigate('/login')} color="link" className="text-decoration-none">Đăng nhập</MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <ToastContainer />
        </MDBContainer>
    );

}
export default Register