import { useQuery, useMutation } from "react-query";
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
    `https://tessverso.io/answer/answer/api/v1/user/login/email`,
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

const getInfo = (accessToken) => {
  return axios.get(`https://tessverso.io/answer/answer/api/v1/user/info`, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const updateUserInfo = ({ accessToken, body }) => {
  return axios.put(
    `https://tessverso.io/answer/answer/api/v1/user/info`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

const signUp = (data) => {
  return axios.post(
    "https://tessverso.io/answer/answer/api/v1/user/register/email",
    data
  );
};

export const useUserInfo = (accessToken) => {
  return useQuery(["info"], () => getInfo(accessToken));
};

export const useLogin = (onSuccess) => {
  return useMutation(login, {
    onSuccess,
  });
};

export const useUpdateUserInfo = (onSuccess, onError) => {
  return useMutation(updateUserInfo, {
    onSuccess,
    onError,
  });
};

export const useSignUp = (onSuccess, onError) => {
  return useMutation(signUp, {
    onSuccess,
    onError,
  });
};
