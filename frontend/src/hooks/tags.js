import { useQuery } from "react-query";
import axios from "axios";

const fetchTags = (order) => {
  return axios.get(
    `http://tessverso.io:9080/answer/api/v1/tags/page?query_cond=${order}`
  );
};

export const useGetTags = (order) => {
  return useQuery(["tags", order], () => fetchTags(order));
};
