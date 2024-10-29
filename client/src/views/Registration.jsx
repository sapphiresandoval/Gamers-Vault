import React, {useContext, useState} from 'react';
import { userContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

const Registration = (props) => {
    // const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [userErrors, setUserErrors] = useState({})

    const changeHandler = e => {
        const {name, value} = e.target
        setUserData(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()

        
        // set user in use context instead of user data.
        // axios.post('', JSON.stringify(user),{ headers: { 'Content-Type': 'application/json' } })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center items-center h-screen">
        <div className="xl:w-[700px] px-10 h-[500px] rounded-3xl xl:shadow-xl">
            <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Register</h1>
            <hr/>
            <div className='flex justify-center mt-10'>
                <form onSubmit={submitHandler}> 
                    <input 
                        type="text"
                        name='username'
                        value={userData.username}
                        onChange={changeHandler}
                        placeholder='Username'
                        className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                    />
                    <p className='text-red-500'>{userErrors.username}</p>
                    <br></br>
                    <input 
                        type="email"
                        name='email'
                        value={userData.email}
                        onChange={changeHandler} 
                        placeholder='Email'
                        className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                    />
                    
                    <p className='text-red-500'>{userErrors.email}</p>
                    <br></br>
                    <input 
                        type="password"
                        name='password'
                        value={userData.password}
                        onChange={changeHandler} 
                        placeholder='Password'
                        className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                    />
                    
                    <p className='text-red-500'>{userErrors.password}</p>
                    <br></br>
                    <input 
                        type="password"
                        name='confirmPassword'
                        value={userData.confirmPassword}
                        onChange={changeHandler} 
                        placeholder='Confirm Password'
                        className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                    />
                    
                    <p className='text-red-500'>{userErrors.confirmPassword}</p>
                    <br></br>
                    <input type="submit" value="Register" className='py-3 bg-purple-800 text-black w-full rounded-md font-bold text-black' />
                </form>
            </div>
            <div className='flex justify-center mt-3 mb-4'>
                <Link to={'/'}>Have an account?</Link>
            </div>
        </div>
    </div>
)}

export default Registration;