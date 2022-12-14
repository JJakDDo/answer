import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      accessToken: "",
      username: "",
      setAccessToken: (token) => set(() => ({ accessToken: token })),
      setUsername: (name) => set(() => ({ username: name })),
    }),
    {
      name: "answers",
      getStorage: () => sessionStorage,
    }
  )
);

export default useStore;
