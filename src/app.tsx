import { useFloatingButton } from "./widgets/floating-button/model/hooks/useFloatingButton";
import { AppContent } from "./AppContent";
import { FloatingButton } from "./widgets/floating-button/ui/FloatingButton";
import { useTwitchAuth } from "./shared/model/hooks/twitch/useTwitchAuth";
import { useCombinedDataHTTP } from "./shared/model/hooks/api/useCombinedData";
import { api } from "./shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { useUiStore } from "./shared/stores/useUiStore"; 
import { shallow } from "zustand/shallow";
import { useRootSetup } from "./shared/model/hooks/useRootSetup";
import { useCombinedDataStore } from "./shared/stores/useCombinedDataStore";

export const App = () => {
    const { setIsMobile } = useUiStore(
        (state) => ({
            isMobile: state.isMobile,
            setIsMobile: state.setIsMobile,
        }),
        shallow,
    );

    const { isCombinedDataReceived } = useCombinedDataStore((state) => ({
        isCombinedDataReceived: state.isReceived,
    }));

    const { jwt, viewerData } = useTwitchAuth();

    const { isSuccess: viewerCreated } = useQuery({
        queryKey: ["viewer", jwt, viewerData],
        queryFn: () => api.createViewer(viewerData!, jwt),
        enabled: !!jwt && !!viewerData,
        retry: 2,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    });

    useCombinedDataHTTP({ viewerCreated });
  

    const {
        isOpen,
        isGameVisible,
        isAppAnimating,
        buttonPosition,
        isDragging,
        handleMouseDown,
        handleClick,
        handleClose,
        buttonAnimation,
        setIsGameVisible,
    } = useFloatingButton();

    useRootSetup({ setIsMobile, setIsGameVisible });

    if (!isCombinedDataReceived) return null;

    return (
        <div className="min-h-screen flex items-center">
            {!isGameVisible && !isOpen && (
                <FloatingButton
                    buttonAnimation={buttonAnimation}
                    buttonPosition={buttonPosition}
                    handleClick={handleClick}
                    handleMouseDown={handleMouseDown}
                    isDragging={isDragging}
                />
            )}
            {isGameVisible && (
                <AppContent
                    isAppAnimating={isAppAnimating}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};
