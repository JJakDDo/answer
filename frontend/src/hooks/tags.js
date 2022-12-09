import { useQuery } from "react-query";
import axios from "axios";

const fetchTags = (order, accessToken) => {
  return axios.get(
    `http://tessverso.io:9080/answer/api/v1/tags/page?query_cond=${order}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

const fetchFollowingTags = (accessToken) => {
  return axios.get(`http://tessverso.io:9080/answer/api/v1/tags/following`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

export const useGetTags = (order, accessToken) => {
  return useQuery(["tags", order], () => fetchTags(order, accessToken));
};

export const useFetchFollowingTags = (accessToken) => {
  return useQuery(["followingTags"], () => fetchFollowingTags(accessToken));
};
