import { api } from "@/shared/api/api";
import { useCombinedDataStore } from "@/shared/stores/useCombinedDataStore";
import { useUserStore } from "@/shared/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type UseCombinedDataHTTPProps = {
  viewerCreated: boolean;
};

export const useCombinedDataHTTP = ({
  viewerCreated,
}: UseCombinedDataHTTPProps) => {
  const jwt = useUserStore((state) => state.jwt);
  const {
    setIsReceived,
    setAbout,
    setIsOpen
  } = useCombinedDataStore((state) => ({
    setIsReceived: state.setIsReceived,
    setAbout: state.setAbout,
    setIsOpen: state.setIsOpen
  }));

  const response = useQuery({
    queryKey: ["combined", jwt],
    queryFn: () => api.fetchCombined(jwt),
    enabled: !!jwt && viewerCreated,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });
  const { data: combinedData } = response;

  useEffect(() => {
    if (combinedData) {
      setIsReceived(response.isSuccess);
      setAbout(combinedData?.about);
      setIsOpen(combinedData?.is_open || null);
    }
  }, [
    combinedData,
    setAbout,
    setIsOpen
  ]);

  return response;
};