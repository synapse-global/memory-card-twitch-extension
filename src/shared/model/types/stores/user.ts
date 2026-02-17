export type UserState = {
  isRealUser: boolean;
  userLogin: string | null;
  userDisplayName: string | null;
  userProfileImage: string | null;
  isUserId: string | null;
  channelId: string | null;
  jwt: string | null;
};

export type UserActions = {
  setIsRealUser: (isRealUser: boolean) => void;
  setUserData: (
    login: string | null,
    displayName: string | null,
    profileImage: string | null
  ) => void;
  setIsRealUserId: (isUserId: string | null) => void;
  setIsChannelId: (channelId: string | null) => void;
  setJwt: (jwt: string | null) => void;
};

export type UserStore = UserState & UserActions;

export type JwtPayload = {
  user_id?: string;
  opaque_user_id?: string;
  channel_id: string;
  role: string;
  [key: string]: unknown;
};

