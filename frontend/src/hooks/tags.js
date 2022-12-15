import { useQuery, useMutation } from "react-query";
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

const followTag = ({ accessToken, object_id, is_cancel }) => {
  return axios.post(
    `http://tessverso.io:9080/answer/api/v1/follow`,
    {
      is_cancel,
      object_id,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
};

const searchTag = (accessToken, tag) => {
  return axios.get(
    `http://tessverso.io:9080/answer/api/v1/question/tags?tag=${tag}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
};

export const useGetTags = (order, accessToken) => {
  return useQuery(["tags", order], () => fetchTags(order, accessToken));
};

export const useFetchFollowingTags = (accessToken) => {
  return useQuery(["followingTags"], () => fetchFollowingTags(accessToken));
};

export const useSearchTag = (accessToken, tag) => {
  return useQuery(["tag", tag], () => searchTag(accessToken, tag), {
    enabled: !!tag,
  });
};

export const useFollowTag = (onSuccess) => {
  return useMutation(followTag, { onSuccess });
};
