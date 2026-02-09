import { Button } from "@/shared/ui/Button";

type GameFooterProps = {
    moves: number;
    reset: () => void;
};

export const GameFooter = ({ moves, reset }: GameFooterProps) => (
    <div className="flex gap-4 p-6 font-system text-sm">
        {moves > 0 && <Button onClick={reset}>Start new game</Button>}
        <span className="text-red-700">Moves: {moves}</span>
    </div>
);
