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
          const res = await axiosInstance.get("/auth/check");
          console.log("✅ checkAuth response:", res.data);
          set({ authUser: res.data.user });
        } catch (error) {
          console.log("❌ Error checking auth:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigninUp: true });
        try {
          const res = await axiosInstance.post("/auth/register", data);
          set({ authUser: res.data.user });
          toast.success(res.data.message || "Sign up successful");
        } catch (error) {
          console.error("❌ Error signing up:", error);
          toast.error(error.response?.data?.message || "Error signing up");
        } finally {
          set({ isSigninUp: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data.user });
          toast.success(res.data.message || "Login successful");
        } catch (error) {
          console.error("❌ Error logging in:", error);
          toast.error(error.response?.data?.message || "Error logging in");
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logout successful");
        } catch (error) {
          console.error("❌ Error logging out:", error);
          toast.error("Error logging out");
        }
      },
    }),
    {
      name: "auth-store", 
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
