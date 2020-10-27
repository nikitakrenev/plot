import React, { useEffect, useState } from 'react'
import styles from './WolframPlot.module.css'

export const WolframPlot = () => {
    const [wolfram, setWolfram] = useState(false)

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//www.wolframalpha.com/widget/widget.jsp?id=a5dd2a74fb266e82a4bf229eb38c5409";
        document.body.appendChild(script);
    },[])

    return (
        <div className={styles.root}>
            <span>WolframAplha</span>
            <script type="text/javascript" id="WolframAlphaScripta5dd2a74fb266e82a4bf229eb38c5409" src="//www.wolframalpha.com/widget/widget.jsp?id=a5dd2a74fb266e82a4bf229eb38c5409"/>
        </div>
    )
}
