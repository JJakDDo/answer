import create from "zustand";

const useStore = create((set) => ({
  accessToken: "",
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));

export default useStore;
