import { CloseArrow } from "@/shared/icons/closeArrow";

export const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <button
            onClick={handleClose}
            className="absolute w-[0.875rem] aspect-square top-[0.5rem] right-[0.5rem] flex transition-colors duration-200 hover:opacity-70 hover:cursor-pointer scale-x-90"
            aria-label="Close application">
            <CloseArrow className="-mr-0.5" />
            <CloseArrow />
        </button>
    );
};
