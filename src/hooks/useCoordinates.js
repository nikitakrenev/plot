import { useMemo } from 'react'

const operations = ['+', '-', '*', '/', '(', ')', '.', ' '];

const getVariable = (str) => {
    for (let i = 0; i < str.length; i += 1) {
        if (!operations.includes(str[i]) && isNaN(str[i]) ) {
            return str[i]
        }
    }
}

export const useCoordinates = (parameters) => {
    const variable = getVariable(parameters.expression);
    const Coordinates = useMemo(() => {
        let coords = [];
        for (let i = +parameters.rangeX.from; i <= +parameters.rangeX.to; i += 1) {
            let expression = parameters.expression.replace(variable, `${i}`);
            let y = Function('"use strict"; return '+expression)();
            coords.push({
                x: i,
                y: y,
            })
        }

        return coords;
    }, [parameters, variable])

    return Coordinates
}