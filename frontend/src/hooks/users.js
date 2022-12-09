import { useMutation } from "react-query";
import axios from "axios";

const login = ({ e_mail, pass }) => {
  return axios.post(
    `http://tessverso.io:9080/answer/api/v1/user/login/email`,
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
