import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const Login = (props) => {
    const { user, setUser } = useContext(userContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [userErrors, setUserErrors] = useState({})
    const [loginError, setLoginError] = useState('')

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 8
    }

    const validateForm = () => {
        const errors = {};

        if (!validateEmail(userData.email)) {
            errors.email = 'Please enter a valid email address.'
        }

        if (!validatePassword(userData.password)) {
            errors.password = 'Password must be at least 8 characters.'
        }

        setUserErrors(errors);
        return Object.keys(errors).length === 0
    };

    const changeHandler = (e) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))

        setUserErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
        setLoginError('')
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        axios
            .post('http://localhost:5000/api/login', userData, {
                headers: { 'Content-Type': 'application/json' },
                credentials
            })
            .then((res) => {
                setUser(res.data)
                setCredentials(res.data)
                navigate('/games/list')
            })
            .catch((err) => {
                if (err.response?.status === 404) {
                    setLoginError('Login failed')
                } else {
                    setLoginError(err.response?.data?.message || 'User does not exist')
                }
            })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Login</h1>
                <hr />
                <div className="flex justify-center mt-10">
                    <form onSubmit={submitHandler}>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={changeHandler}
                            placeholder="Email"
                            className="py-3 p-5 rounded-md bg-zinc-50 md:w-[500px] w-[300px] text-black"
                        />
                        <p className="text-red-500">{userErrors.email}</p>
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={changeHandler}
                            placeholder="Password"
                            className="py-3 p-5 rounded-md bg-zinc-50 md:w-[500px] w-[300px] text-black"
                        />
                        <p className="text-red-500">{userErrors.password}</p>
                        <br />
                        <input
                            type="submit"
                            value="Login"
                            className="py-3 bg-purple-800 text-black w-full rounded-md font-bold"
                        />
                    </form>
                </div>
                {loginError && <p className="text-red-500 text-center mt-2">{loginError}</p>}
                <div className="flex justify-center mt-3 mb-4">
                    <Link to={'/register'}>Need to register?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;

