import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useResumeStore = create(

    immer((set, get) => ({
      resume: null,

      setResume: (data) => {
        set((state) => {
          state.resume = data;
        });
      },
    })),
    
);

export default useResumeStore;
