import Select from 'react-select'
import {z} from 'zod'

function Form() {

    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    //Schema Validation
    const schema = z.object({
        name: z.string({required_error: "Name is required"})
            .min(3, {message: 'Name must be 3 character or long'}),
        email: z.string({required_error: 'Email is required'})
            .email({message: "Invalid Email address"}),
        username: z.string({required_error: "Username is required"})
            .min(3, {message: "Username must be 3 character or long"}),
        password: z.string({required_error: "Password is required"})
            .regex(passwordRegex,"Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."),
        date: z.string({required_error: 'Date is required'}).date(),

    })


    const option = [
        { value: 'java', label: 'Java' },
        { value: 'javascript', label: 'JavaScript'},
        { value: 'python', label: 'Python' },
        { value: 'c++', label: 'C++' },
    ]
    return (
        <form>
            <div className='flex flex-col'>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type='text'
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type='date'
                    />
                </div>
                <div>
                    <label>City</label>
                    <select>
                        <option value='Karachi'>Karachi</option>
                        <option value='Lahore'>Lahore</option>
                        <option value='Islamabad'>Islamabad</option>
                    </select>
                </div>
                <div>
                    <Select 
                        options={option}
                        isMulti
                    />
                </div>
            </div>
        </form>
    )
}

export default Form