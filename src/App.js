import { React, useState, useEffect } from "react"
import Die from "./components/Die"

export default function App() {
    
    const [dice, setDice] = useState(allNewDice())
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(Math.ceil(Math.random() * 6))
        }
        return newDice
    }
    
    const diceElements = dice.map((die, index) => <Die key={index} value={die} />)
    
    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
        </main>
    )
}
