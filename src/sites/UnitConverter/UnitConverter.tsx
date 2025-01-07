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
    "Data Transfer Rate": [
        ["Bit per second", 1],
        ["Byte per second", 1 / 8],
        ["Kilobit per second", 1 / 1000],
        ["Kibibit per second", 1 / 1024],
        ["Kilobyte per second", 1 / 8000],
        ["Megabit per second", 1e-6],
        ["Mebibit per second", 9.5367e-7],
        ["Megabyte per second", 1.25e-7],
        ["Gigabit per second", 1e-9],
        ["Gibibit per second", 9.3132e-10],
        ["Gigabyte per second", 1.25e-10],
        ["Terabit per second", 1e-12],
        ["Tebibit per second", 9.0949e-13],
        ["Terabyte per second", 1.25e-13],
    ],
    "Digital Storage": [
        ["Bit", 1],
        ["Kilobit", 0.001],
        ["Kibibit", 0.000976563],
        ["Megabit", 1e-6],
        ["Mebibit", 9.5367e-7],
        ["Gigabit", 1e-9],
        ["Gibibit", 9.3132e-10],
        ["Terabit", 1e-12],
        ["Tebibit", 9.0949e-13],
        ["Petabit", 1e-15],
        ["Pebibit", 8.8818e-16],
        ["Byte", 1],
        ["Kilobyte", 0.000125],
        ["Kibibyte", 0.00012207],
        ["Megabyte", 1.25e-7],
        ["Mebibyte", 1.1921e-7],
        ["Gigabyte", 1.25e-10],
        ["Gibibyte", 1.1642e-10],
        ["Terabyte", 1.25e-13],
        ["Tebibyte", 1.1369e-13],
        ["Petabyte", 1.25e-16],
        ["Pebibyte", 1.1102e-16],
    ],
    Energy: [
        ["Joule", 1],
        ["Kilojoule", 0.001],
        ["Calorie", 0.239006],
        ["Kilocalorie", 0.000239006],
        ["Watt hour", 0.00027777],
        ["Kilowatt-hour", 2.7777e-7],
        ["Electronvolt", 6.242e18],
        ["British thermal unit", 0.00094817],
        ["US therm", 9.48049e-9],
        ["Foot-pound", 0.737562],
    ],
    Frequency: [
        ["Hertz", 1],
        ["Kilohertz", 1e-3],
        ["Megahertz", 1e-6],
        ["Gigahertz", 1e-9],
    ],
    Length: [
        ["Nanometer", 1e9],
        ["Micrometer", 1e6],
        ["Millimeter", 1e3],
        ["Centimeter", 1e2],
        ["Meter", 1],
        ["Kilometer", 1e-3],
        ["Inch", 39.3701],
        ["Foot", 3.28084],
        ["Yard", 1.09361],
        ["Mile", 0.000621371],
        ["Nautical Mile", 0.000539957],
    ],
    Mass: [
        ["Microgram", 1e6],
        ["Milligram", 1e3],
        ["Gram", 1],
        ["Kilogram", 1e-3],
        ["Tonne", 1e-6],
        ["Ounce", 0.035274],
        ["Pound", 0.00220462],
        ["US Ton", 1.1023e-6],
        ["Stone", 0.000157473],
        ["Imperial Ton", 9.8421e-7],
    ],
    "Plane Angle": [],
    Pressure: [],
    Speed: [],
    Temperature: [],
    Time: [],
    Volume: [],
};

function round(number: number): number {
    return Math.round(number * 1e18) / 1e18;
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
                            className={
                                styles.grosse +
                                " " +
                                (grosse === name ? styles.selected : "")
                            }
                            onClick={() => {
                                setGrosse(name);
                                setFromUnit(grossen[name][0]);
                                setToUnit(grossen[name][1]);
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
                            round(
                                (fromValue /
                                    parseFloat(e.target.value.split("#")[1])) *
                                    toUnit[1],
                            ),
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
                            round(
                                (fromValue / fromUnit[1]) *
                                    parseFloat(e.target.value.split("#")[1]),
                            ),
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
