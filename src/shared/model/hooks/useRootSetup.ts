import { useEffect } from "react";

type UseRootSetupParams = {
    setIsMobile: (value: boolean) => void;
    setIsGameVisible: (value: boolean) => void;
};

export const useRootSetup = ({
    setIsMobile,
    setIsGameVisible,
}: UseRootSetupParams) => {
    useEffect(() => {
        const rootElement = document.getElementById("root");
        const device = rootElement?.dataset.device;
        const isMobileDevice = device === "mobile";

        setIsMobile(isMobileDevice);

        if (isMobileDevice) {
            setIsGameVisible(true);
        }

        if (device === "desk") {
            document.documentElement.classList.add("font-desk");
        } else {
            document.documentElement.classList.remove("font-desk");
        }

        if (device === "mobile") {
            document.documentElement.classList.add("font-mobile");
        } else {
            document.documentElement.classList.remove("font-mobile");
        }
    }, [setIsMobile, setIsGameVisible]);
};
