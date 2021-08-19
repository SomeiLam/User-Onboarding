import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import UserCards from './components/UserCards';
import schema from './validation/formSchema'
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;
  background-color: #E6E2DD;
  padding-top: 5px;
  font-size: 62.5%;
  font-family: Verdana, Geneva, sans-serif;
  height: 100%;
  padding-bottom: 50%;

  h1 {
    font-size: 3rem;
    color: #373A36;
  }

  .form {
    margin-bottom: 5%;
  }

  .userCard {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    max-width: 80vw;
    margin: 0 auto;
  }
`

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  terms: false
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  terms: ''
}

const initialUsers = []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
      setUsers(res.data.data);
    }).catch(err => console.error(err))
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users]);
      }).catch(err => console.error(err))

    setFormValues(initialFormValues);
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const checkEmailAvailability = (email => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        console.log('true', users[i].email, email)
        return false;
      }
    }
    return true;
  })

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role,
      terms: formValues.terms
    }
    if (!checkEmailAvailability(newUser.email)) {
      setFormErrors({ ...formErrors, email: 'Email address already in use'});
    } else {
      postNewUser(newUser);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])
 
  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <StyledApp>
      <header><h1>User Onboarding</h1></header>

      <div className='form'>
        <Form
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        />
      </div>

      <div className='userCard'>
        {
          users.map(user => {
            return (
              <UserCards key={user.id} details={user} />
            )
          })
        }
      </div>

    </StyledApp>
  );
}

export default App;
