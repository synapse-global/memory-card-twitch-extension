import { Board } from "./Board";
import { Card } from "./Card";
import { GameFooter } from "./GameFooter";
import { useMemoryGame } from "../model/hook/useMemoryGame";
import { GameOver } from "./GameOver";

export const MemoryGame = () => {
    const { gameState, flipCard, startNewGame, isCardFlipped } =
        useMemoryGame();
    return (
        <div className="mx-auto w-100 flex flex-col items-center select-none">
            <Board>
                {Object.values(gameState.cards).map((cardDetails) => {
                    const isFlipped = isCardFlipped(cardDetails.id);
                    const isDisabled =
                        gameState.status === "checking" ||
                        cardDetails.isMatched;

                    return (
                        <Card
                            key={cardDetails.id}
                            cardDetails={cardDetails}
                            isFlipped={isFlipped}
                            isDisabled={isDisabled}
                            onClick={() => flipCard(cardDetails.id)}
                        />
                    );
                })}
            </Board>

            <GameFooter moves={gameState.moves} reset={startNewGame} />

            {gameState.status === "completed" && <GameOver />}
        </div>
    );
};
