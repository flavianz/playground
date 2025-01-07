import styles from "./UnitConverter.module.css";
import { useState } from "react";

const grossen: {
    [key: string]: [string, number][];
} = {
    Area: [
        ["Square Meter", 1],
        ["Square Kilometer", 1e-6],
        ["Square Centimeter", 1e4],
        ["Square Mile", 3.861e-7],
        ["Square Yard", 3.19599],
        ["Square Foot", 10.7639],
        ["Square Inch", 1550],
    ],
    "Data Transfer Rate": [],
    "Digital Storage": [],
    Energy: [],
    Frequency: [],
    Length: [],
    Mass: [],
    "Plane Angle": [],
    Pressure: [],
    Speed: [],
    Temperature: [],
    Time: [],
    Volume: [],
};

function round(number: number): number {
    return Math.round(number * 1e9) / 1e9;
}

export default function UnitConverter() {
    const [grosse, setGrosse] = useState("Area");
    const [fromUnit, setFromUnit] = useState<[string, number]>(
        grossen["Area"][0],
    );
    const [fromValue, setFromValue] = useState<number>(1);
    const [toUnit, setToUnit] = useState<[string, number]>(grossen["Area"][1]);
    const [toValue, setToValue] = useState<number>(
        (fromValue / fromUnit[1]) * toUnit[1],
    );

    return (
        <div id={styles.container}>
            <div id={styles.grossenContainer}>
                {Object.keys(grossen).map((name, key) => {
                    return (
                        <div
                            key={key}
                            className={styles.grosse + " " + ()}
                            onClick={() => {
                                let id = name
                                    .toLowerCase()
                                    .replaceAll(" ", "-");
                                setGrosse(id);
                                setFromUnit(grossen[id][0]);
                                setToUnit(grossen[id][1]);
                            }}
                        >
                            <p>{name}</p>
                        </div>
                    );
                })}
            </div>
            <label>
                From
                <input
                    type="number"
                    value={isNaN(fromValue) ? "" : fromValue}
                    onChange={(e) => {
                        setFromValue(round(parseFloat(e.target.value)));
                        setToValue(
                            round(
                                (parseFloat(e.target.value) / fromUnit[1]) *
                                    toUnit[1],
                            ),
                        );
                    }}
                />
                <select
                    name="from"
                    onChange={(e) => {
                        setFromUnit([
                            e.target.value.split("#")[0],
                            parseFloat(e.target.value.split("#")[1]),
                        ]);
                        setToValue(
                            (fromValue /
                                parseFloat(e.target.value.split("#")[1])) *
                                toUnit[1],
                        );
                    }}
                    defaultValue={fromUnit[0] + "#" + fromUnit[1]}
                >
                    {grossen[grosse].map((units, key) => {
                        return (
                            <option key={key} value={units[0] + "#" + units[1]}>
                                {units[0]}
                            </option>
                        );
                    })}
                </select>
            </label>
            <label>
                To
                <input
                    type="number"
                    value={isNaN(toValue) ? "" : toValue}
                    onChange={(e) => {
                        setToValue(round(parseFloat(e.target.value)));
                        setToValue(
                            round(
                                (parseFloat(e.target.value) / toUnit[1]) *
                                    fromUnit[1],
                            ),
                        );
                    }}
                />
                <select
                    name="to"
                    onChange={(e) => {
                        setToUnit([
                            e.target.value.split("#")[0],
                            parseFloat(e.target.value.split("#")[1]),
                        ]);
                        setToValue(
                            (fromValue / fromUnit[1]) *
                                parseFloat(e.target.value.split("#")[1]),
                        );
                    }}
                    defaultValue={toUnit[0] + "#" + toUnit[1]}
                >
                    {grossen[grosse].map((units, key) => {
                        return (
                            <option key={key} value={units[0] + "#" + units[1]}>
                                {units[0]}
                            </option>
                        );
                    })}
                </select>
            </label>
        </div>
    );
}
