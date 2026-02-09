import { useFloatingButton } from "./widgets/floating-button/model/hooks/useFloatingButton";
import { useIsMobile } from "./shared/model/hooks/useIsMobile";
import { AppContent } from "./AppContent";
import { useEffect } from "react";
import { FloatingButton } from "./widgets/floating-button/ui/FloatingButton";

export const App = () => {
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

    const { isMobile } = useIsMobile();

    useEffect(() => {
        if (isMobile) {
            setIsGameVisible(true);
        }
    }, [setIsGameVisible, isMobile]);

    return (
        <div className="min-h-screen flex items-center">
            {!isMobile && !isGameVisible && !isOpen && (
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
