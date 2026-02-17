import { cn } from "@/shared/lib/utils/cn";
import { ActiveTab } from "@/shared/model/types/ui";
import { Button } from "@/shared/ui/Button";
import React from "react";

const NAVBAR_ITEMS: { title: string; link: ActiveTab }[] = [
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
    currentAppSection: ActiveTab;
    setCurrentAppSection: React.Dispatch<
        React.SetStateAction<ActiveTab>
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
                                "no-underline focus:ring-0 focus:ring-offset-0",
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
