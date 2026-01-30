import { UseFloatingButtonProps } from "../types";
import { cn } from "../utils/cn";
import { PlayIcon } from "./icons/playIcon";



export const FloatingButton = ({
  handleClick,
  handleMouseDown,
  buttonPosition,
  buttonAnimation,
  isDragging,
}: UseFloatingButtonProps) => {
  return (
    <button
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      data-ui
      style={{
        left: `${buttonPosition.x}px`,
        top: `${buttonPosition.y}px`,
        opacity: buttonAnimation.opacity,
      }}
      className={cn(
        `outline-none overflow-hidden select-none z-10000 fixed w-[4.4rem] aspect-square flex items-center justify-center border-none text-white rounded-[1.2rem] color-white text-lg hover:cursor-grab active:cursor-grabbing bg-black/60`,
        isDragging
          ? "transition-none"
          : "transition-[background,box-shadow] duration-[300ms,200ms] ease-in"
      )}
    >
      <PlayIcon className="w-5 h-5 text-white" />
    </button>
  );
};
