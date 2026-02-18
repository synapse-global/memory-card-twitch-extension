import { useState, useEffect, useRef } from "react";
import { ViewerApi, ViewerData, TwitchAuth } from "@/shared/model/types/twitch";
import { useUiStore } from "@/shared/stores/useUiStore";
import { useUserStore } from "@/shared/stores/useUserStore";
import { parseJwt } from "../../../lib/utils/twitch/parseJwt";

export const useTwitchAuth = (enabled: boolean = true) => {
  const [twitchData, setTwitchData] = useState<ViewerApi | null>(null);
  const [viewerData, setViewerData] = useState<ViewerData | null>(null);
  const setBroadcasterLanguage = useUiStore(
    (state) => state.setBroadcasterLanguage,
  );
  const {
    setIsRealUser,
    setIsRealUserId,
    setIsChannelId,
    setUserData,
    setJwt,
    jwt,
  } = useUserStore((state) => ({
    setIsRealUser: state.setIsRealUser,
    setIsRealUserId: state.setIsRealUserId,
    setIsChannelId: state.setIsChannelId,
    setUserData: state.setUserData,
    setJwt: state.setJwt,
    jwt: state.jwt,
  }));

  const isProcessingRef = useRef(false);
  const hasRegistered = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setTwitchData(null);
      setBroadcasterLanguage("en");
      setJwt(null);
      return;
    }

    if (hasRegistered.current) {
      return;
    }

    const onAuthorized = async (auth: TwitchAuth) => {
      if (isProcessingRef.current) {
        return;
      }
      isProcessingRef.current = true;

      const { channelId, clientId, helixToken } = auth;

      // const token = auth.token;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODE0MDc3NjEsIm9wYXF1ZV91c2VyX2lkIjoiVTE5Njg1MTQ3OCIsInVzZXJfaWQiOiIxOTY4NTE0NzgiLCJjaGFubmVsX2lkIjoiMTk2ODUxNDc4Iiwicm9sZSI6ImJyb2FkY2FzdGVyIiwiaXNfdW5saW5rZWQiOmZhbHNlLCJwdWJzdWJfcGVybXMiOnsibGlzdGVuIjpbImJyb2FkY2FzdCIsIndoaXNwZXItVTQ0ODUwMzgwOCIsImdsb2JhbCJdLCJzZW5kIjpbImJyb2FkY2FzdCIsIndoaXNwZXItKiJdfX0.3U0T_y3otYG6FApLhmc5HiZnFQdmpvB-ZSlU_ad4byo";

      setJwt(token);

      const parsedJwt = parseJwt(token);
      const realUserId = parsedJwt?.user_id || parsedJwt?.opaque_user_id;
      const isRealUser = !!parsedJwt?.user_id;

      setIsRealUser(isRealUser);
      setIsChannelId(channelId);
      setIsRealUserId(realUserId);

      let username: string | null = null;
      let profileImageUrl: string | null = null;
      let createdAt: string | null = null;
      let login: string | null = null;
      let channelName: string | null = null;
      let description: string | null = null;
      let broadcasterLanguage: string | null = null;

      try {
        const channelResp = await fetch(
          `https://api.twitch.tv/helix/channels?broadcaster_id=${channelId}`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Extension ${helixToken}`,
            },
          },
        );

        if (channelResp.ok) {
          const channelData = await channelResp.json();
          channelName = channelData.data[0]?.broadcaster_name || null;
          broadcasterLanguage =
            channelData.data[0]?.broadcaster_language || null;
        } else {
          console.error(
            "Ошибка Helix API (channels):",
            channelResp.status,
            await channelResp.text(),
          );
        }
      } catch (err) {
        console.error("Ошибка fetch channels:", err);
      }

      if (isRealUser && realUserId) {
        try {
          const userResp = await fetch(
            `https://api.twitch.tv/helix/users?id=${realUserId}`,
            {
              headers: {
                "Client-ID": clientId,
                Authorization: `Extension ${helixToken}`,
              },
            },
          );

          if (userResp.ok) {
            const userData = await userResp.json();
            username = userData.data[0]?.display_name || null;
            profileImageUrl = userData.data[0]?.profile_image_url || null;
            createdAt = userData.data[0]?.created_at || null;
            login = userData.data[0]?.login || null;
            description = userData.data[0]?.description || null;
          }
        } catch (err) {
          console.error("useTwitchAuth: Ошибка fetch users:", err);
        }
      }

      const viewerData: ViewerApi = {
        version: window.Twitch?.ext?.version || "",
        userId: realUserId,
        channelId: channelId || "",
        username: username || "",
        login: login || "",
        profileImageUrl: profileImageUrl || "",
        createdAt: createdAt || "",
        channelName: channelName || "",
        description: description || "",
        broadcasterLanguage: broadcasterLanguage || "",
      };

      setTwitchData(viewerData);
      setBroadcasterLanguage(broadcasterLanguage || "en");
      setUserData(login, username, profileImageUrl);

      setViewerData({
        streamer: {
          broadcaster_id: channelId || "",
          broadcaster_language: broadcasterLanguage || "en",
          broadcaster_login: channelName || "",
          broadcaster_name: channelName || "",
        },
        viewer: {
          user_created_at: createdAt || new Date().toISOString(),
          description: description || "",
          display_name: username || "",
          viewer_id: realUserId,
          login: login || "",
          profile_image_url: profileImageUrl || "",
        },
      });

      isProcessingRef.current = false;
    };

    if (window.Twitch?.ext) {
      hasRegistered.current = true;
      window.Twitch.ext.onAuthorized(onAuthorized);
    } else {
      const checkInterval = setInterval(() => {
        if (window.Twitch?.ext && !hasRegistered.current) {
          hasRegistered.current = true;
          clearInterval(checkInterval);
          window.Twitch.ext.onAuthorized(onAuthorized);
        }
      }, 100);

      return () => {
        clearInterval(checkInterval);
        isProcessingRef.current = false;
      };
    }

    return () => {
      isProcessingRef.current = false;
    };
  }, []);

  return { twitchData, jwt, viewerData };
};
