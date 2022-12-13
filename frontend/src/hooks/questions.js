import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchQuestions = (order) => {
  return axios.get(
    `http://tessverso.io:9080/answer/api/v1/question/page?order=${order}`
  );
};

const fetchSingleQuestion = (id) => {
  return axios.get(
    `http://tessverso.io:9080/answer/api/v1/question/info?id=${id}`
  );
};

const addQuestion = (data) => {
  const { accessToken, body } = data;
  return axios.post(`http://tessverso.io:9080/answer/api/v1/question`, body, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const useGetQuestions = (order) => {
  return useQuery(["questions", order], () => fetchQuestions(order));
};

export const useGetSingleQuestion = (id) => {
  return useQuery(["question", id], () => fetchSingleQuestion(id));
};

export const useAddQuestion = (onSuccess) => {
  return useMutation(addQuestion, {
    onSuccess,
  });
};
