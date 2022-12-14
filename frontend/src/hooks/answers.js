import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchAnswers = (order, id) => {
  return axios.get(
    `https://tessverso.io:9080/answer/api/v1/answer/page?order=${order}&question_id=${id}`
  );
};

const addAnswer = (data) => {
  const { accessToken, body } = data;
  return axios.post(`https://tessverso.io:9080/answer/api/v1/answer`, body, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const useGetAnswers = (order, id) => {
  return useQuery(["answers", id], () => fetchAnswers(order, id));
};

export const useAddAnswer = (onSuccess) => {
  return useMutation(addAnswer, {
    onSuccess,
  });
};
