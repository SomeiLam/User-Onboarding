import React from 'react'
import styled from 'styled-components';

const StyledForm = styled.div`
    width: 50%;
    margin: 0 auto;
    border: 3px dotted #7DA2A9;
    border-radius: 10%;

    .errors {
        color: red;
        font-size: 0.8rem;
        margin-bottom: 1%;
    }

    .form-group{
        display: flex;
        flex-direction: column;
    }

    .form-group h2 {
        font-size: 1.5rem;
        color: #1F3044;
    }

    label {
        margin: 0 auto;
        width: 50%;
        padding-bottom: 1%;
        display:flex;
        justify-content: space-between;
        font-size: 1rem;
    }

    .submit button {
        display: inline-block;
        padding: 0.7em 1.7em;
        margin: 1em;
        border-radius: 0.2em;
        box-sizing: border-box;
        text-decoration: none;
        font-family: 'Roboto',sans-serif;
        font-weight: 400;
        box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
        color: #000000;
        background-color: #CCCCCC;
    }

    .submit button:disabled,
    button[disabled] {
        color: grey;
    }

`

export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return (
        <StyledForm>
            <form className='form container' onSubmit={onSubmit}>
                <div className='form-group'>
                    <h2>Create an User</h2>

                    <div className='errors'>
                        <div>{errors.first_name}</div>
                        <div>{errors.last_name}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.terms}</div>
                    </div>
                </div>

                <div className='form-group inputs'>
                    <label>First Name
                        <input
                            value={values.first_name}
                            onChange={onChange}
                            name='first_name'
                            type='text'
                        />
                    </label>

                    <label>Last Name
                        <input
                            value={values.last_name}
                            onChange={onChange}
                            name='last_name'
                            type='text'
                        />
                    </label>

                    <label>Email
                        <input
                            value={values.email}
                            onChange={onChange}
                            name='email'
                            type='text'
                        />
                    </label>

                    <label>Password
                        <input
                            value={values.password}
                            onChange={onChange}
                            name='password'
                            type='password'
                        />
                    </label>

                    <label>Role:
                        <select
                            value={values.role}
                            name="role"
                            onChange={onChange}>
                            <option value=''>-- Select a Role --</option>
                            <option value='Software Developer'>Software Developer</option>
                            <option value='Software Engineer'>Software Engineer</option>
                            <option value='Web Developer'>Web Developer</option>
                            <option value='DevOps Developer'>DevOps Developer</option>
                            <option value='Front-end Developer'>Front-end Developer</option>
                            <option value='Back-end Developer'>Back-end Developer</option>
                            <option value='Full Stack Developer'>Full Stack Developer</option>
                        </select>
                    </label>

                    <label>Terms of Service
                        <input
                            type="checkbox"
                            name="terms"
                            checked={values.terms}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <div className="submit">
                    <button disabled={disabled}>submit</button>
                </div>
            </form>
        </StyledForm>

    )
}
