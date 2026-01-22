import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


const useAuthStore = create(
  persist(
    immer((set, get) => ({
      user: null,

      login: (data) => {
        set((state) => {
          state.user = {
            name: data.name,
            userId: data.id,
            email: data.email,
            
          };
          
        });
      },

      logout: () => {
        set((state) => {
          state.user = null;
        });
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