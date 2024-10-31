import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {useAuth} from './AuthContext';
import './Login.css';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const Login = () => {
    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const message = localStorage.getItem('authMessage') || localStorage.getItem('loginMessage');
        if (message) {
            setLoginMessage(message);
            localStorage.removeItem('authMessage');
            localStorage.removeItem('loginMessage');
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Vui lòng nhập tên người dùng và mật khẩu');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/login', {username, password});
            const {id, token, authorities} = response.data;
            const roles = authorities.map(auth => auth.authority);

            login(username, roles, id, token);
            setPassword('');

            if (roles.includes('ROLE_ADMIN')) {
                navigate('/admin/dashboard');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 403) {
                setError('Tài khoản đang bị khoá');
                localStorage.setItem('loginMessage', 'Tài khoản đang bị khoá');
            } else {
                setError('Tài khoản hoặc mật khẩu không đúng');
                localStorage.setItem('loginMessage', 'Tài khoản hoặc mật khẩu không đúng');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/v1/SSO/google';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <MDBContainer>
            <div className="nav-header bg-transparent shadow-none border-0">
                <div className="nav-top w-100 d-flex align-items-center justify-content-between">
                    <a href="index.html" className="d-flex align-items-center">
                        <i className="feather-zap text-success display1-size me-2"></i>
                        <span className="fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala</span>
                    </a>
                    <div>
                        <a href="#" className="btn btn-success me-2">Login</a>
                        <a href="#" className="btn btn-info">Register</a>
                    </div>
                </div>
            </div>

            <MDBRow className='g-0 align-items-center'>
                <MDBCol style={{
                    flex: '0 0 66.67%', // Chiếm 2/3 chiều ngang
                    maxWidth: '66.67%', // Giới hạn chiều rộng tối đa
                    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/home-dn.appspot.com/o/login-bg.jpg?alt=media&token=f51f751d-a753-448b-9da6-2bd9deb074db)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh'
                }}></MDBCol>

                {/* Phần form đăng nhập chiếm 4 cột */}
                <MDBCol col='4'>
                    <MDBCard className='cascading-left' style={{
                        background: 'hsla(0, 0%, 100%, 0.55)',
                        backdropFilter: 'blur(10px)',
                        marginTop: '-100px'
                    }}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <a href="index.html">
                                <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                                <span
                                    className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span>
                            </a>

                            {error && <p className="text-danger">{error}</p>}
                            <div className="text-left mb-2">
                                <label htmlFor='username'>Tên tài khoản</label>
                            </div>
                            <MDBInput
                                wrapperClass='mb-4'
                                id='username'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <div className="text-left mb-2">
                                <label htmlFor='password'>Mật khẩu</label>
                            </div>
                            <MDBInput
                                wrapperClass='mb-4'
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className="btn btn-primary w-100" type="button" onClick={handleLogin}>Đăng nhập
                            </button>
                            <div className="text-center">
                                <p>hoặc đăng nhập bằng:</p>
                                <MDBBtn
                                    onClick={handleGoogleLogin}
                                    tag='a'
                                    className='mx-3 btn-lg text-left style2-input text-white fw-600 bg-facebook border-0'
                                    style={{
                                        padding: '5px 10px', // Điều chỉnh padding để nút rộng hơn
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', // Căn giữa nội dung
                                        backgroundColor: '#4285F4', // Màu xanh Google
                                        borderRadius: '5px' // Góc bo tròn
                                    }}
                                >
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/home-dn.appspot.com/o/icon-1.png?alt=media&token=9991f3df-3cdb-4748-b67b-a5df7881e710"
                                        alt="icon"
                                        className="ms-2 w30 mb-1 me-3"
                                    />
                                    Sign in with Google
                                </MDBBtn>
                            </div>
                            <div className="mt-3 text-center">
                                <p>
                                    Bạn chưa có tài khoản?
                                    <button onClick={handleRegister} color='primary' className='btn btn-primary ms-2'>
                                        Tạo tài khoản mới
                                    </button>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>


        </MDBContainer>
    );
};

export default Login;
