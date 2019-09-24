import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// const USERS = gql`
//   {
//
//           users{
//               id
//               name
//               surname
//           }
//   }
// `;
//
// function DataFetchComponent() {
//   const { loading, error, data } = useQuery(USERS);
//
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;
//
//   return data.users.map(user => (
//     <div key={`${user.name} ${user.surname}`}>
//       {user.name}
//       {' '}
//       {user.surname}
//     </div>
//   ))
// }


const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                name
                surname
            }
        }
    }
`;

function DataFetchComponent() {
  const [login, { data }] = useMutation(LOGIN);
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      onClick={() => {
        console.log('clicked')
        login('vlad.legkov@gmail.com', 'vova87');
        console.log(data)
      }}
    >
Click
    </button>
  );
}

export { DataFetchComponent };
