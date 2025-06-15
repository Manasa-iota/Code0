import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";



export const useExecutionStore = create((set)=>({
    isExecuting:false,
    submission:null,

       executeCode:async ( source_code, language_id, stdin, expected_outputs, problemId)=>{
        try {
            set({isExecuting:true});
            console.log("Submission:",JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs,
                problemId
            }));
            const res = await axiosInstance.post("/execute-code" , { source_code, language_id, stdin, expected_outputs, problemId });

            set({submission:res.data.data.submission});
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error executing code",error);
            toast.error("Error executing code");
        }
        finally{
            set({isExecuting:false});
        }
    },
    submitCode: async (source_code, language_id, stdin, expected_outputs, problemId) => {
    try {
      set({ isSubmitting: true });
      const res = await axiosInstance.post("/submission/submit", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      
      set({ submission: res.data.data.submission });
      toast.success("Code submitted successfully");
    } catch (error) {
      console.error("Error submitting code", error);
      toast.error("Error submitting code");
    } finally {
      set({ isSubmitting: false });
    }
  },
}))