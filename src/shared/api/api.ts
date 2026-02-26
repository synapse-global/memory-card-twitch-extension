import { ROUTES } from "../config/const/backend";
import { CombinedResponse } from "../model/types/api";
import { CreateViewerResponse, ViewerData } from "../model/types/twitch";
import { createFetchInstance } from "./createFetchInstance";

export const api = {
  fetchCombined: async (jwt: string | null) => {
    return createFetchInstance<CombinedResponse>({
      url: ROUTES.combined,
      method: "POST",
      jwt,
    });
  },

  createViewer: async (viewerData: ViewerData, jwt: string | null) => {
    return createFetchInstance<CreateViewerResponse, ViewerData>({
      url: ROUTES.viewer,
      method: "POST",
      body: viewerData,
      jwt,
    });
  },
};

