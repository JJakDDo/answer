import { useQuery } from "react-query";
import axios from "axios";

const fetchQuestions = (props) => {
  const order = props.order || "newest";
  return axios.get(
    `http://tessverso.io:9080/answer/api/v1/question/page?order=${order}`
  );
};

export const useGetQuestions = () => {
  return useQuery(["questions"], fetchQuestions);
};
