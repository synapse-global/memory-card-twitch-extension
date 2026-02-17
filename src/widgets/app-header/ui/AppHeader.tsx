import { CloseButton } from "./CloseButton";
import { useIsMobile } from "@/shared/model/hooks/useIsMobile";
import { Navbar } from "./Navbar";
import { ActiveTab } from "@/shared/model/types/ui";

type AppHeaderProps = {
    handleClose: () => void;
    currentAppSection: ActiveTab;
    setCurrentAppSection: React.Dispatch<
        React.SetStateAction<ActiveTab>
    >;
};

export const AppHeader = ({
    handleClose,
    currentAppSection,
    setCurrentAppSection,
}: AppHeaderProps) => {
    const { isMobile } = useIsMobile();

    return (
        <header className="relative px-5 py-4">
            {!isMobile && <CloseButton handleClose={handleClose} />}
            <Navbar
                currentAppSection={currentAppSection}
                setCurrentAppSection={setCurrentAppSection}
            />
        </header>
    );
};
