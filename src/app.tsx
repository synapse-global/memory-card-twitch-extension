import { useFloatingButton } from "./hooks/useFloatingButton";
import { useIsMobile } from "./hooks/useIsMobile";
import { MemoryGame } from "./MemoryGame";
import { FloatingButton } from "./components/FloatingButton";
import { useEffect } from "react";

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
        setIsGameVisible
    } = useFloatingButton();

    const { isMobile } = useIsMobile();

    useEffect(() => {
        if (isMobile) {
            setIsGameVisible(true);
        }
    }, [setIsGameVisible, isMobile])

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
                <MemoryGame
                    isAppAnimating={isAppAnimating}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};
