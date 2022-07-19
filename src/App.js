import { React, useState, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState({
        won: false,
        rollCount: 0
    })

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    useEffect(() => {
        const firstValue = dice[0].value;
        const allHeld = dice.every(die => die.isHeld === true)
        const sameValue = dice.every(die => die.value === firstValue)

        if (sameValue && allHeld) {
            setTenzies(prevState => ({
                ...prevState,
                won: true
            }))
        }
    }, [dice])

    useEffect(() => {
        console.log(tenzies.rollCount)
    }, [tenzies])

    function holdDice(id) {
        setDice(prevDice => prevDice.map(
            (die) => die.id === id
                ? { ...die, isHeld: !die.isHeld }
                : die
        )
        )
    }

    const diceElements = dice.map((die, index) =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )

    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
        setTenzies(prevState => ({
            ...prevState,
            rollCount: prevState.rollCount+1
        }))
    }

    function resetGame() {
        setTenzies(prevState => ({
            won: false,
            rollCount: 0
        }))
        setDice(allNewDice())
    }

    return (
        <main>
            { tenzies.won && <Confetti /> }
            <p className="roll-counter">{tenzies.won ? "You won with " : "Counter : "} {tenzies.rollCount} {tenzies.won ? "rolls!" : ""}</p>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div>
                {tenzies.won ? <button onClick={resetGame}>New Game</button> : <button onClick={rollDice}>Roll</button>}
            </div>
        </main>
    )
}
