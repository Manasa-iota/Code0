import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isSigninUp: false,
      isLoggingIn: false,
      isCheckingAuth: false,

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check", {
            withCredentials: true,
          });
          console.log("return from /check");
          console.log(res)
          set({ authUser: res.data.data.user });
        } catch (error) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigninUp: true });
        try {
          const res = await axiosInstance.post("/auth/register", data, {
            withCredentials: true,
          });
          await useAuthStore.getState().checkAuth();

          return true;
        } catch (error) {
          return false;
        } finally {
          set({ isSigninUp: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data, {
            withCredentials: true,
          });
          await useAuthStore.getState().checkAuth();
          return true;
        } catch (error) {
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout", {}, {
            withCredentials: true,
          });
          set({ authUser: null });
        } catch (error) {
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
