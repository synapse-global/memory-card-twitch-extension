import { useState, useEffect, useCallback, useRef } from "react";
import { AnimationState, ButtonPosition } from "../../../../shared/model/types";

export const useFloatingButton = () => {
    const [isGameVisible, setIsGameVisible] = useState(false);
    const [isAppAnimating, setIsAppAnimating] = useState(true);
    const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
        x: -100,
        y: 0,
    });
    const [savedButtonPosition, setSavedButtonPosition] =
        useState<ButtonPosition>({ x: 20, y: 0 });
    const [relativePosition, setRelativePosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0.5 });
    const [buttonExitDirection, setButtonExitDirection] = useState<
        "left" | "right" | "top" | "bottom"
    >("left");
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [buttonAnimation, setButtonAnimation] = useState<AnimationState>({
        isAnimating: false,
        opacity: 1,
    });
    const [isOpen, setIsOpen] = useState(false);

    const hasAnimatedRef = useRef(false);

    const [viewport, setViewport] = useState({
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight,
    });
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if (window.Twitch && window.Twitch.ext) {
            window.Twitch.ext.onContext((context: any) => {
                if (
                    context?.viewport &&
                    context.viewport.width > 0 &&
                    context.viewport.height > 0
                ) {
                    setViewport({
                        width: context.viewport.width,
                        height: context.viewport.height,
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsGameVisible(true);
            setIsAppAnimating(true);
        }
        setIsOpen(false);
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        if (
            viewport.height === 0 ||
            viewport.width === 0 ||
            hasAnimatedRef.current
        ) {
            return;
        }

        hasAnimatedRef.current = true;

        const startX = -100;
        const targetX = 20;
        const targetY = viewport.height / 2 - 25;
        const startTime = performance.now();
        const duration = 500;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            const newPosition = {
                x: startX + (targetX - startX) * easeOutCubic,
                y: targetY,
            };

            setButtonPosition(newPosition);

            if (progress >= 1) {
                setSavedButtonPosition({ x: targetX, y: targetY });
                setRelativePosition({
                    x: targetX / viewport.width,
                    y: targetY / viewport.height,
                });
            }

            setButtonAnimation({
                isAnimating: progress < 1,
                opacity: Math.min(progress * 2, 1),
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setButtonAnimation({
                    isAnimating: false,
                    opacity: 1,
                });
            }
        };

        requestAnimationFrame(animate);
    }, [viewport.width, viewport.height]);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            setViewport({
                width: newWidth,
                height: newHeight,
            });

            if (hasAnimatedRef.current && !isGameVisible) {
                const btnSize = 50;
                const padding = 0;

                const newX = Math.max(
                    padding,
                    Math.min(
                        newWidth - btnSize - padding,
                        newWidth * relativePosition.x,
                    ),
                );
                const newY = Math.max(
                    padding,
                    Math.min(
                        newHeight - btnSize - padding,
                        newHeight * relativePosition.y,
                    ),
                );

                setButtonPosition({ x: newX, y: newY });
                setSavedButtonPosition({ x: newX, y: newY });
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [relativePosition, isGameVisible]);

    const handleMouseDown = () => {
        if (!isGameVisible) {
            setIsDragging(true);
            setHasDragged(false);
        }
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging && !isGameVisible) {
                const btnSize = 50;
                const padding = 0;

                let newX = e.clientX - btnSize / 2;
                let newY = e.clientY - btnSize / 2;

                newX = Math.max(
                    padding,
                    Math.min(viewport.width - btnSize - padding, newX),
                );
                newY = Math.max(
                    padding,
                    Math.min(viewport.height - btnSize - padding, newY),
                );

                setButtonPosition({ x: newX, y: newY });
                setRelativePosition({
                    x: newX / viewport.width,
                    y: newY / viewport.height,
                });

                setHasDragged(true);
            }
        },
        [isDragging, isGameVisible, viewport],
    );

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging && !isGameVisible) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isGameVisible, handleMouseMove]);

    const handleClick = () => {
        if (!hasDragged && !isAnimating) {
            setSavedButtonPosition(buttonPosition);
            setIsAnimating(true);

            const { x, y } = buttonPosition;

            const distances = {
                left: x,
                right: viewport.width - x,
                top: y,
                bottom: viewport.height - y,
            };

            const minDistance = Math.min(...Object.values(distances));
            let targetX = x;
            let targetY = y;
            let exitDirection: "left" | "right" | "top" | "bottom" = "left";

            if (minDistance === distances.left) {
                targetX = -100;
                exitDirection = "left";
            } else if (minDistance === distances.right) {
                targetX = viewport.width + 100;
                exitDirection = "right";
            } else if (minDistance === distances.top) {
                targetY = -100;
                exitDirection = "top";
            } else if (minDistance === distances.bottom) {
                targetY = viewport.height + 100;
                exitDirection = "bottom";
            }

            setButtonExitDirection(exitDirection);

            const startTime = performance.now();
            const duration = 400;

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeInOutQuad = progress * (2 - progress);

                setButtonPosition({
                    x: x + (targetX - x) * easeInOutQuad,
                    y: y + (targetY - y) * easeInOutQuad,
                });

                setButtonAnimation({
                    isAnimating: true,
                    opacity: 1 - progress,
                });

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsAppAnimating(false);
                    setIsGameVisible(true);
                    setIsAnimating(false);

                    setButtonPosition({
                        x: -100,
                        y: viewport.height / 2 - 25,
                    });

                    setButtonAnimation({ isAnimating: false, opacity: 1 });

                    setTimeout(() => setIsAppAnimating(true), 50);
                }
            };

            requestAnimationFrame(animate);
        }
    };

    const handleClose = () => {
        setIsAppAnimating(false);

        setTimeout(() => {
            setIsGameVisible(false);

            const { x: targetX, y: targetY } = savedButtonPosition;
            let startX = targetX;
            let startY = targetY;

            switch (buttonExitDirection) {
                case "left":
                    startX = targetX - 100;
                    break;
                case "right":
                    startX = targetX + 100;
                    break;
                case "top":
                    startY = targetY - 100;
                    break;
                case "bottom":
                    startY = targetY + 100;
                    break;
            }

            setButtonPosition({ x: startX, y: startY });
            setButtonAnimation({ isAnimating: true, opacity: 0 });

            const startTime = performance.now();
            const duration = 500;

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);

                setButtonPosition({
                    x: startX + (targetX - startX) * easeOutCubic,
                    y: startY + (targetY - startY) * easeOutCubic,
                });

                setButtonAnimation({
                    isAnimating: progress < 1,
                    opacity: Math.min(progress * 2, 1),
                });

                if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        }, 400);
    };

    return {
        isOpen,
        isGameVisible,
        isAppAnimating,
        buttonPosition,
        isDragging,
        handleMouseDown,
        handleClick,
        handleClose,
        setIsGameVisible,
        buttonAnimation,
        isImageLoaded,
        setIsImageLoaded,
    };
};
