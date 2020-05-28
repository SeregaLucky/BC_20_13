import axios from 'axios';

{
  // const axiosMy1 = axios.create({
  //   baseURL: 'http://localhost:4545',
  // });
  // const axiosMy2 = axios.create({
  //   baseURL: 'http://localhost:5656',
  // });
}

axios.defaults.baseURL = 'http://localhost:4545';

export const fetchGetInfo = () => axios.get('/users');

export const fetchPostInfo = objUser => axios.post('/users', objUser);

export const fetchPatchInfo = (objUser, idUser) =>
  axios.patch(`/users/${idUser}`, objUser);

// export const fetchPostInfo = function (objUser) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },

//     body: JSON.stringify(objUser),
//   };

//   return fetch('http://localhost:4545/users', options).then(res => res.json());
// };
