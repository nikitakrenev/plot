import React, { useState } from 'react'
import styles from './Calculator.module.css'
import { Expression } from "../Expression/Expression";
import { Plot }  from "../Plot/Plot"
import {WolframPlot} from "../Wolfram-Plot/WolframPlot";

export const Calculator = () => {
    const [parameters, setParameters] = useState();

    return (
        <div className={styles.root}>
            <Expression setParameters={setParameters}/>
            {parameters && <Plot parameters={parameters}/>}
            <WolframPlot/>
        </div>
    )
}
