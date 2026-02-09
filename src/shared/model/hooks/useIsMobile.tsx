import { useEffect, useState } from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const rootElement = document.getElementById("root");
        const device = rootElement?.dataset.device;
        setIsMobile(device === "mobile");

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
    }, []);
    return { isMobile };
};
