import { useMutation } from "react-query";
import axios from "axios";

// return axios.post(
//   `https://tessverso.io/sam/api/tess/login`,
//   {
//     email: e_mail,
//     password: pass,
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );
const login = ({ e_mail, pass }) => {
  return axios.post(
    `https://tessverso.io:9080/answer/api/v1/user/login/email`,
    {
      e_mail,
      pass,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const useLogin = (onSuccess) => {
  return useMutation(login, {
    onSuccess,
  });
};
