import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useAdminAuthStore = create(
  persist(
    immer((set, get) => ({
      admin: null,

      login: (data) => {
        set((state) => {
          state.admin = data;
        });
      },

      logout: () => {
        set((state) => {
          state.admin = null;
        });
        useAdminAuthStore.persist.clearStorage();
      },

      isLoggedIn: () => {
        const { admin } = get();
        return !!admin;
      },

      isAuthenticated: async () => {
        if (!useAdminAuthStore.persist.hasHydrated()) {
          await new Promise((resolve) => {
            const unsub =
              useAdminAuthStore.persist.onFinishHydration(() => {
                unsub();
                resolve();
              });
          });
        }
        return !!get().admin;
      },
    })),
    {
      name: "admin-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAdminAuthStore;
