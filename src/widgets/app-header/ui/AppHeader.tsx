import { CloseButton } from "./CloseButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Navbar } from "./Navbar";
import { CurrentAppSection } from "@/shared/model/types";

type AppHeaderProps = {
    handleClose: () => void;
    currentAppSection: CurrentAppSection;
    setCurrentAppSection: React.Dispatch<
        React.SetStateAction<CurrentAppSection>
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
            <Navbar currentAppSection={currentAppSection} setCurrentAppSection={setCurrentAppSection} />
        </header>
    );
};
