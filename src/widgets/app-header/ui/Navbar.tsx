import { cn } from "@/shared/lib/utils/cn";
import { CurrentAppSection } from "@/shared/model/types";
import { Button } from "@/shared/ui/Button";
import React from "react";

const NAVBAR_ITEMS: { title: string; link: CurrentAppSection }[] = [
    {
        title: "Game",
        link: "game",
    },
    {
        title: "About",
        link: "about",
    },
];

type NavbarProps = {
    currentAppSection: CurrentAppSection;
    setCurrentAppSection: React.Dispatch<
        React.SetStateAction<CurrentAppSection>
    >;
};

export const Navbar = ({
    currentAppSection,
    setCurrentAppSection,
}: NavbarProps) => {
    return (
        <nav className="font-system text-sm">
            <ul className="flex items-center gap-5">
                {NAVBAR_ITEMS.map((item) => (
                    <li key={item.link}>
                        <Button
                            className={cn(
                                "no-underline",
                                item.link === currentAppSection && "underline hover:underline",
                            )}
                            onClick={() => setCurrentAppSection(item.link)}>
                            {item.title}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
