import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      accessToken: "",
      username: "",
      avatar: "",
      setAccessToken: (token) => set(() => ({ accessToken: token })),
      setUsername: (name) => set(() => ({ username: name })),
      setAvatar: (url) => set(() => ({ avatar: url })),
    }),
    {
      name: "answers",
      getStorage: () => sessionStorage,
    }
  )
);

export default useStore;
