import { create } from "zustand";
import { UserStore } from "../model/types/stores/user";

export const useUserStore = create<UserStore>((set) => ({
  isRealUser: false,
  userLogin: null,
  userDisplayName: null,
  userProfileImage: null,
  isUserId: null,
  channelId: null,
  jwt: null,
  setIsRealUser: (isRealUser) => set(() => ({ isRealUser })),
  setUserData: (login, displayName, profileImage) =>
    set(() => ({
      userLogin: login,
      userDisplayName: displayName,
      userProfileImage: profileImage,
    })),
  setIsRealUserId: (isUserId) => set(() => ({ isUserId })),
  setIsChannelId: (channelId) => set(() => ({ channelId })),
  setJwt: (jwt) => set(() => ({ jwt })),
}));

