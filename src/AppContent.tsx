import { Resizable } from "re-resizable";
import { cn } from "@/shared/lib/utils/cn";
import { useIsMobile } from "./shared/model/hooks/useIsMobile";
import { MemoryGame } from "./features/memory-game/ui/MemoryGame";
import { AppHeader } from "./widgets/app-header/ui/AppHeader";
import { useState } from "react";
import { About } from "./features/about/ui/About";
import { ActiveTab, Tabs } from "./shared/model/types/ui";

/*
 * Main component for the Memory Game
 * - Renders the game board, footer, and game-over message
 * - Uses the useMemoryGame hook to manage game state
 */
export const AppContent = ({
    handleClose,
    isAppAnimating,
}: {
    handleClose: () => void;
    isAppAnimating: boolean;
}) => {
    const { isMobile } = useIsMobile();
    const [currentAppSection, setCurrentAppSection] =
        useState<ActiveTab>("about");

    return (
        <div
            className={cn(
                `absolute z-1 flex flex-col justify-center gap-0.5 origin-[left_center] transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`,
                isMobile
                    ? "w-full h-full overflow-auto bg-[#181818]"
                    : `top-1/2 left-0 -translate-y-1/2`,
                isAppAnimating
                    ? "translate-x-[1px] opacity-100"
                    : "translate-x-[-1px] opacity-0",
            )}>
            <Resizable
                defaultSize={{
                    width: isMobile ? "100vw" : "35vw",
                    height: isMobile ? "80vh" : "65vh",
                }}
                minWidth={isMobile ? "100vw" : "35vw"}
                maxWidth={isMobile ? "100vw" : "80vw"}
                minHeight={isMobile ? "80vh" : "50vh"}
                maxHeight={isMobile ? "100vh" : "65vh"}
                enable={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: false,
                    topLeft: false,
                    bottomLeft: false,
                    bottomRight: false,
                }}
                className={cn(
                    `relative overflow-hidden flex flex-col backdrop-blur-xs transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-red-50 rounded-2xl app`,
                    !isMobile && "rounded-[0.375rem]",
                    isMobile && "flex-1 basis-[0vh]!",
                )}>
                <AppHeader
                    currentAppSection={currentAppSection}
                    setCurrentAppSection={setCurrentAppSection}
                    handleClose={handleClose}
                />
                {currentAppSection == Tabs.GAME && <MemoryGame />}
                {currentAppSection == Tabs.ABOUT && <About />}
            </Resizable>
        </div>
    );
};
