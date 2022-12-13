import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (token) => set(() => ({ accessToken: token })),
    }),
    {
      name: "answers",
      getStorage: () => sessionStorage,
    }
  )
);

export default useStore;
