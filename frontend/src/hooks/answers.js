import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchAnswers = (order, id) => {
  return axios.get(
    `https://tessverso.io/answer/answer/api/v1/answer/page?order=${order}&question_id=${id}`
  );
};

const addAnswer = (data) => {
  const { accessToken, body } = data;
  return axios.post(`https://tessverso.io/answer/answer/api/v1/answer`, body, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const deleteAnswer = ({ accessToken, id }) => {
  return axios.delete(`https://tessverso.io/answer/answer/api/v1/answer`, {
    headers: {
      Authorization: accessToken,
    },
    data: { id },
  });
};

const acceptAnswer = ({ accessToken, question_id, answer_id }) => {
  return axios.post(
    `https://tessverso.io/answer/answer/api/v1/answer/acceptance`,
    {
      question_id,
      answer_id,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

export const useGetAnswers = (order, id) => {
  return useQuery(["answers", id], () => fetchAnswers(order, id));
};

export const useAddAnswer = (onSuccess) => {
  return useMutation(addAnswer, {
    onSuccess,
  });
};

export const useDeleteAnswer = (onSuccess) => {
  return useMutation(deleteAnswer, {
    onSuccess,
  });
};

export const useAcceptAnswer = (onSuccess) => {
  return useMutation(acceptAnswer, {
    onSuccess,
  });
};
