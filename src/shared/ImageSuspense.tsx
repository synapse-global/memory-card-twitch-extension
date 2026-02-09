
import { cn } from "@/utils/cn";
import React, { useState } from "react";

type ImageSuspenseProps = {
  fallback: React.ReactNode;
} & React.ComponentProps<'img'>;

export const ImageSuspense = ({
  fallback,
  src,
  className,
  ...props
}: ImageSuspenseProps) => {
  const [isImageBroken, setIsImageBroken] = useState(false);
  return (
    <>
      <img
        src={src}
        className={cn(
          "h-full w-full object-cover",
          isImageBroken && "hidden",
          className
        )}
        onError={() => setIsImageBroken(true)}
        draggable={false}
        {...props}
      />
      {isImageBroken && fallback }
    </>
  );
};
