import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('Username is required')
        .min(3, 'First name must be 3 characters long'),
    last_name: yup
        .string()
        .trim()
        .required('Username is required')
        .min(3, 'Last name must be 3 characters long'),
    email: yup
        .string()
        .trim()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must be 6 characters long'),
    role: yup
        .string()
        .oneOf(['Software Developer', 'Software Engineer', 'Web Developer', 'DevOps Developer', 
                'Front-end Developer', 'Back-end Developer', 'Full Stack Developer'], 
                'Role is required'),
    terms: yup
        .boolean()
        .oneOf([true], 'You mush accept Terms of Service')
})


export default formSchema