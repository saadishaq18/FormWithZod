import Select from 'react-select'
import { z } from 'zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'



function Form() {

    //Defining types for Input Values
    type Input = {
        name: string
        email: string
        username: string
        password: string
        date: string
        city: string
        skills: Array<{ value: string, label: string }>

    }



    //Defining Password Regex
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    //Schema Validation
    const schema = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, { message: 'Name must be 3 character or long' }),
        email: z.string({ required_error: 'Email is required' })
            .email({ message: "Invalid Email address" }),
        username: z.string({ required_error: "Username is required" })
            .min(3, { message: "Username must be 3 character or long" }),
        password: z.string({ required_error: "Password is required" })
            .regex(passwordRegex, "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."),
        date: z.string({ required_error: 'Date is required' }).date(),
        city: z.string({ required_error: "City is required" }),
        skills: z.array(z.object({
            value: z.string(),
            label: z.string()
        })).min(1, { message: "Atleast one skill should be selected" })

    })

    //destructing from useForm
    const { register, handleSubmit, formState: { errors }, control } = useForm<Input>({
        resolver: zodResolver(schema)
    })


    //handle input submit
    const onSubmit: SubmitHandler<Input> = (data) => console.log(data)


    // Defining option for multi select
    const option = [
        { value: 'java', label: 'Java' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'c++', label: 'C++' },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-center'>
                <div className='flex flex-col'>
                    <label>Name</label>
                    <input
                        {...register("name")}
                        type='text'
                    />
                    {
                        errors.name && (
                            <span className='text-red-500'>{errors.name.message}</span>
                        )
                    }
                </div>
                <div>
                    <label>Email</label>
                    <input
                        {...register("email")}
                        type='email'
                    />
                    {
                        errors.email && (
                            <span className='text-red-500'>{errors.email.message}</span>
                        )
                    }
                </div>
                <div>
                    <label>Username</label>
                    <input
                        {...register("username")}
                        type='text'
                    />
                    {
                        errors.username && (
                            <span className='text-red-500'>{errors.username.message}</span>
                        )
                    }
                </div>
                <div>
                    <label>Password</label>
                    <input
                        {...register("password")}
                        type='password'
                    />
                    {
                        errors.password && (
                            <span className='text-red-500'>{errors.password.message}</span>
                        )
                    }
                </div>
                <div>
                    <label>Date</label>
                    <input
                        {...register("date")}
                        type='date'
                    />
                    {
                        errors.date && (
                            <span className='text-red-500'>{errors.date.message}</span>
                        )
                    }
                </div>
                <div>
                    <label>City</label>
                    <select
                        {...register("city")}
                    >
                        <option value='Karachi'>Karachi</option>
                        <option value='Lahore'>Lahore</option>
                        <option value='Islamabad'>Islamabad</option>
                    </select>
                    {
                        errors.city && (
                            <span className='text-red-500'>{errors.city.message}</span>
                        )
                    }
                </div>
                <div>
                    <Controller
                        control={control}
                        name='skills'
                        render={({field})=>(

                            <Select
                                {...field}
                                isMulti
                                options={option}
                                classNamePrefix="select"
                                value={field.value}
                                onChange={(selected)=>field.onChange(selected)}
                             />
                        )}
                
                    />
                    {
                        errors.skills && (
                            <span className='text-red-500'>{errors.skills.message}</span>
                        )
                    }
                </div>
                <button type='submit'>
                    Submit
                </button>
            </div>
        </form>
    )
}

export default Form