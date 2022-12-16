import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchQuestions = (order) => {
  return axios.get(
    `https://tessverso.io/answer/answer/api/v1/question/page?order=${order}`
  );
};

const fetchSingleQuestion = (id) => {
  return axios.get(
    `https://tessverso.io/answer/answer/api/v1/question/info?id=${id}`
  );
};

const addQuestion = (data) => {
  const { accessToken, body } = data;
  return axios.post(
    `https://tessverso.io/answer/answer/api/v1/question`,
    body,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

const deleteQuestion = ({ accessToken, id }) => {
  return axios.delete(`https://tessverso.io/answer/answer/api/v1/question`, {
    headers: {
      Authorization: accessToken,
    },
    data: { id },
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

export const useDeleteQuestion = (onSuccess) => {
  return useMutation(deleteQuestion, {
    onSuccess,
  });
};
