import React from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div onClick={() => props.holdDice(props.id)} className="die-face" style={styles}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}