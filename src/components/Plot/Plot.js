import React, {useEffect, useRef} from 'react'
import styles from './Plot.module.css'
import {useCoordinates} from "../../hooks/useCoordinates";

const buildPlot = (canvas, coordinates) => {
    const ctx = canvas.getContext('2d');
    const canvasSize = (canvas.width >= canvas.height) ? canvas.width : canvas.height;
    const plotSize = canvasSize - 40;
    const plotMin = canvas.width - plotSize - 20;
    const plotMax = canvas.width - 20;
    const plotCenter = canvas.width / 2;
    const labelIndent = 15;
    const hatch = 3;

    const getPoints = (pointFrom, pointTo) => {
        let x = (Math.abs(pointFrom.x) >= Math.abs(pointTo.x)) ? Math.abs(pointFrom.x) : Math.abs(pointTo.x);
        let y = (Math.abs(pointFrom.y) >= Math.abs(pointTo.y)) ? Math.abs(pointFrom.y) : Math.abs(pointTo.y);
        return (x >= y) ? x + 1 : y + 1;
    }

    const pointsOnAxis = getPoints(coordinates[0], coordinates[coordinates.length - 1]);
    const step = (pointsOnAxis > 11) ? (pointsOnAxis > 51) ? 10 : 2 : 1;
    const scale = 200 / pointsOnAxis;

    const buildHelpLines = () => {
        ctx.strokeStyle = "#c4c4c4";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(plotCenter + coordinates[0].x * scale, plotCenter);
        ctx.lineTo(plotCenter + coordinates[0].x * scale, plotCenter - coordinates[0].y * scale);
        ctx.moveTo(plotCenter + coordinates[coordinates.length - 1].x * scale, plotCenter );
        ctx.lineTo(plotCenter + coordinates[coordinates.length - 1].x * scale, plotCenter - coordinates[coordinates.length - 1].y * scale);

        ctx.moveTo(plotCenter, plotCenter - coordinates[0].y * scale);
        ctx.lineTo(plotCenter + coordinates[0].x * scale, plotCenter - coordinates[0].y * scale);

        ctx.moveTo(plotCenter, plotCenter - coordinates[coordinates.length - 1].y * scale);
        ctx.lineTo(plotCenter + coordinates[coordinates.length - 1].x * scale, plotCenter - coordinates[coordinates.length - 1].y * scale);
        ctx.stroke();
    }

    const buildAxes = () => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.strokeStyle = "#c4c4c4";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(plotCenter, plotMin);
        ctx.lineTo(plotCenter, plotMax);
        ctx.moveTo(plotMin, plotCenter);
        ctx.lineTo(plotMax, plotCenter);
        ctx.stroke();

        ctx.beginPath();
        for(let i = 1; i < pointsOnAxis; i += step) {
            ctx.moveTo(plotCenter + i * scale, plotCenter);
            ctx.lineTo(plotCenter + i * scale, plotCenter - hatch);
            ctx.moveTo(plotCenter - i * scale, plotCenter);
            ctx.lineTo(plotCenter - i * scale, plotCenter - hatch);
            ctx.moveTo(plotCenter, plotCenter - i * scale);
            ctx.lineTo(plotCenter + hatch, plotCenter - i * scale);
            ctx.moveTo(plotCenter, plotCenter + i * scale);
            ctx.lineTo(plotCenter + hatch, plotCenter + i * scale);
        }
        ctx.stroke();

        ctx.fillText(`${coordinates[0].y}`, plotCenter - labelIndent, plotCenter - scale * coordinates[0].y);
        ctx.fillText(`${coordinates[coordinates.length - 1].y}`, plotCenter - labelIndent, plotCenter - scale * coordinates[coordinates.length - 1].y);
        ctx.fillText(`${coordinates[0].x}`, plotCenter + scale * coordinates[0].x, plotCenter + labelIndent);
        ctx.fillText(`${coordinates[coordinates.length - 1].x}`, plotCenter + scale * coordinates[coordinates.length - 1].x, plotCenter + labelIndent);
    }

    const buildLine = () => {
        ctx.strokeStyle = "#4154b3";
        ctx.beginPath();
        for (let i = 0; i < coordinates.length; i += 1) {
            ctx.moveTo(plotCenter + coordinates[i].x * scale, plotCenter - coordinates[i].y * scale);
            if (i + 1 < coordinates.length) {
                ctx.lineTo(plotCenter + coordinates[i + 1].x * scale, plotCenter - coordinates[i + 1].y * scale);
            }
        }
        ctx.stroke();
        buildHelpLines();
    }

    buildAxes();
    buildLine();
}

export const Plot = (props) => {
    const {parameters} = props;
    const coordinates = useCoordinates(parameters)
    const canvasRef = useRef(null);

    useEffect(() => {
        buildPlot(canvasRef.current, coordinates);
    }, [coordinates])

    return(
        <canvas ref={canvasRef} className={styles.root} width="440" height="440"/>
    )
}