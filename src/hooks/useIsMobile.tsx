import { useEffect, useState } from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const rootElement = document.getElementById("root");
        const device = rootElement?.dataset.device;
        setIsMobile(device === "mobile");
    }, []);
    return { isMobile };
};
