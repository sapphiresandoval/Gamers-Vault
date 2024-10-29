import React, {useState} from 'react';

const RatingForm = (props) => {
    const [rating, setRating] = useState({
        comment: '',
        number: ''
    })

    const changeHandler = e => {
        const {name : value} = e.target
        setRating(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        // axios.post()
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[300px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Rate</h1>
                <hr/>
                    <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="number"
                            name="number"
                            value={rating.number}
                            onChange={changeHandler}
                            placeholder='Rate 1-5'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                        />
                        <br></br>
                        <input 
                            type="text" 
                            name="comment"
                            value={rating.comment}
                            onChange={changeHandler}
                            placeholder='Add A comment'
                            className='mt-3 py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                            />
                        <br></br>

                        <input type="submit" value="Rate" className='mt-3 py-3 bg-purple-800 text-black w-full rounded-md font-bold text-black' />
                        
                    </form>
                </div>
            </div>
        </div>
)}

export default RatingForm;