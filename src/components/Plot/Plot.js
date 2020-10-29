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

    const getPoints = (from, to) => {
        const pointsOnAxis = ((Math.abs(from) >= Math.abs(to)) ?  Math.abs(from) + 1 : Math.abs(to) + 1);
        const step = (pointsOnAxis > 11) ? (pointsOnAxis > 51) ? 10 : 2 : 1;
        const scale = (plotSize / 2) / pointsOnAxis;

        return {pointsOnAxis, step, scale}
    }

    const x = getPoints(coordinates[0].x, coordinates[coordinates.length - 1].x);
    const y = getPoints(coordinates[0].y, coordinates[coordinates.length - 1].y);

    const buildHelpLines = () => {
        ctx.strokeStyle = "#c4c4c4";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(plotCenter + coordinates[0].x * x.scale, plotCenter);
        ctx.lineTo(plotCenter + coordinates[0].x * x.scale, plotCenter - coordinates[0].y * y.scale);
        ctx.moveTo(plotCenter + coordinates[coordinates.length - 1].x * x.scale, plotCenter );
        ctx.lineTo(plotCenter + coordinates[coordinates.length - 1].x * x.scale, plotCenter - coordinates[coordinates.length - 1].y * y.scale);
        ctx.moveTo(plotCenter, plotCenter - coordinates[0].y * y.scale);
        ctx.lineTo(plotCenter + coordinates[0].x * x.scale, plotCenter - coordinates[0].y * y.scale);
        ctx.moveTo(plotCenter, plotCenter - coordinates[coordinates.length - 1].y * y.scale);
        ctx.lineTo(plotCenter + coordinates[coordinates.length - 1].x * x.scale, plotCenter - coordinates[coordinates.length - 1].y * y.scale);
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
        for(let i = 1; i < x.pointsOnAxis; i += x.step) {
            ctx.moveTo(plotCenter + i * x.scale, plotCenter);
            ctx.lineTo(plotCenter + i * x.scale, plotCenter - hatch);
            ctx.moveTo(plotCenter - i * x.scale, plotCenter);
            ctx.lineTo(plotCenter - i * x.scale, plotCenter - hatch);
        }

        for(let i = 1; i < y.pointsOnAxis; i += y.step) {
            ctx.moveTo(plotCenter, plotCenter - i * y.scale);
            ctx.lineTo(plotCenter + hatch, plotCenter - i * y.scale);
            ctx.moveTo(plotCenter, plotCenter + i * y.scale);
            ctx.lineTo(plotCenter + hatch, plotCenter + i * y.scale);
        }
        ctx.stroke();

        ctx.fillText(`${coordinates[0].y}`, plotCenter - labelIndent, plotCenter - y.scale * coordinates[0].y);
        ctx.fillText(`${coordinates[coordinates.length - 1].y}`, plotCenter - labelIndent, plotCenter - y.scale * coordinates[coordinates.length - 1].y);
        ctx.fillText(`${coordinates[0].x}`, plotCenter + x.scale * coordinates[0].x, plotCenter + labelIndent);
        ctx.fillText(`${coordinates[coordinates.length - 1].x}`, plotCenter + x.scale * coordinates[coordinates.length - 1].x, plotCenter + labelIndent);
    }

    const buildLine = () => {
        ctx.strokeStyle = "#4154b3";
        ctx.beginPath();
        for (let i = 0; i < coordinates.length; i += 1) {
            ctx.moveTo(plotCenter + coordinates[i].x * x.scale, plotCenter - coordinates[i].y * y.scale);
            if (i + 1 < coordinates.length) {
                ctx.lineTo(plotCenter + coordinates[i + 1].x * x.scale, plotCenter - coordinates[i + 1].y * y.scale);
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