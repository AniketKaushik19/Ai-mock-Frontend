import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


const initialState = {
  user: null,
  interviewLimit: null,
};

const useAuthStore = create(
  persist(
    immer((set, get) => ({
      user: null,
      interviewLimit: null,

      login:(data) => {
        set((state) => {
          state.user = {
            name: data.name,
            userId: data.id,
            email: data.email,
            isOnboarding:data.isBoarding,
            img: data?.img || null
            
          };
          
        });
      },

      setInterviewLimit: (data) => {
        set((state) => {
          state.interviewLimit = data;
        });
      },

     logout: () => {
        set((state) => {
          state.user = null;
          state.interviewLimit = null;
        });
        useAuthStore.persist.clearStorage();
      },


      isLoggedIn: () => {
        const { user } = get();
        return !!user;
      },

    
      isAuthenticated: async () => {
        if (!useAuthStore.persist.hasHydrated()) {
          await new Promise((resolve) => {
            const unsub = useAuthStore.persist.onFinishHydration(() => {
              unsub();
              resolve();
            });
          });
        }
        return !!get().user;
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useAuthStore;