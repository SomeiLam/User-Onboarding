import React from 'react'
import styled from 'styled-components';

const StyledUserCards = styled.div`
    .user {
        border: 3px dotted #7DA2A9;
        border-radius: 50%;
        width: 30vw;
        margin: 10%;
        display: flex;
    }

    .user img {
        width: 20%;
        height: 20%;
        margin: 1%;
    }

    .info {
        font-size: 0.8rem;
        margin: 0 auto;
    }
`

function UserCards({ details }) {
  if (!details) {
    return <h3>Working fetching your User&apos;s details...</h3>
  }

  return (
    <StyledUserCards>
        <div className='user'>
            <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"/>
            <div className='info'>
                <h2>{details.first_name} {details.last_name}</h2>
                <p>Email: {details.email}</p>
                <p>Role: {details.role}</p>                
            </div>

        </div>
    </StyledUserCards>

  )
}

export default UserCards
