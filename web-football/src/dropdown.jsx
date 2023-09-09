import { useState } from "react"

export default function Dropdown(props){
    const [visible, setVisible] = useState(false)
    const divStyle = {
        display: visible ? "block" : "none"
    }
    return (
    <>
    <button onClick={() => setVisible(!visible)}>{props.buttonText}</button>
    <div style={divStyle}>
        {props.children}
    </div>
    
    
    </>
    )
}