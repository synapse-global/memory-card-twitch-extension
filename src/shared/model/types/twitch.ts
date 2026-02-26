export interface TwitchAuth {
  channelId: string;
  clientId: string;
  helixToken: string;
  token: string;
  userId?: string;
}


export type ViewerApi = {
  version: string;
  userId: string | null;
  channelId: string;
  username: string | null;
  login?: string | null;
  profileImageUrl?: string | null;
  createdAt?: string | null;
  channelName?: string | null;
  description?: string | null;
  broadcasterLanguage?: string | null;
};

export type StreamerData = {
  broadcaster_id: string;
  broadcaster_language: string;
  broadcaster_login: string;
  broadcaster_name: string;
};

export type ViewerDataItem = {
  user_created_at: string;
  description: string;
  display_name: string;
  viewer_id: string;
  login: string;
  profile_image_url: string;
};

export type ViewerData = {
  streamer: StreamerData;
  viewer: ViewerDataItem;
};

export type UserEntity = {
  id: number;
  twitch_id: string;
  channel_name: string;
  login: string;
  display_name: string;
  description: string;
  profile_image_url: string;
  user_created_at: string;
  broadcaster_language: string;
  created_at: string;
  modified_at: string;
};

export type CreateViewerResponse = {
  streamer: UserEntity;
  viewer: UserEntity;
};