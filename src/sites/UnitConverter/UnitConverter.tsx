import styles from "./UnitConverter.module.css";
import { useState } from "react";

const grossen: {
    [key: string]: {
        [unit: string]:
            | number
            | [(number: number) => number, (number: number) => number];
    };
} = {
    Area: {
        "Square Meter": 1,
        "Square Kilometer": 1e-6,
        "Square Centimeter": 1e4,
        "Square Mile": 3.861e-7,
        "Square Yard": 3.19599,
        "Square Foot": 10.7639,
        "Square Inch": 1550,
    },
    "Data Transfer Rate": {
        "Bit per second": 1,
        "Byte per second": 1 / 8,
        "Kilobit per second": 1 / 1000,
        "Kibibit per second": 1 / 1024,
        "Kilobyte per second": 1 / 8000,
        "Megabit per second": 1e-6,
        "Mebibit per second": 9.5367e-7,
        "Megabyte per second": 1.25e-7,
        "Gigabit per second": 1e-9,
        "Gibibit per second": 9.3132e-10,
        "Gigabyte per second": 1.25e-10,
        "Terabit per second": 1e-12,
        "Tebibit per second": 9.0949e-13,
        "Terabyte per second": 1.25e-13,
    },
    "Digital Storage": {
        Bit: 1,
        Kilobit: 0.001,
        Kibibit: 0.000976563,
        Megabit: 1e-6,
        Mebibit: 9.5367e-7,
        Gigabit: 1e-9,
        Gibibit: 9.3132e-10,
        Terabit: 1e-12,
        Tebibit: 9.0949e-13,
        Petabit: 1e-15,
        Pebibit: 8.8818e-16,
        Byte: 1,
        Kilobyte: 0.000125,
        Kibibyte: 0.00012207,
        Megabyte: 1.25e-7,
        Mebibyte: 1.1921e-7,
        Gigabyte: 1.25e-10,
        Gibibyte: 1.1642e-10,
        Terabyte: 1.25e-13,
        Tebibyte: 1.1369e-13,
        Petabyte: 1.25e-16,
        Pebibyte: 1.1102e-16,
    },
    Energy: {
        Joule: 1,
        Kilojoule: 0.001,
        Calorie: 0.239006,
        Kilocalorie: 0.000239006,
        "Watt hour": 0.00027777,
        "Kilowatt-hour": 2.7777e-7,
        Electronvolt: 6.242e18,
        "British thermal unit": 0.00094817,
        "US therm": 9.48049e-9,
        "Foot-pound": 0.737562,
    },
    Frequency: {
        Hertz: 1,
        Kilohertz: 1e-3,
        Megahertz: 1e-6,
        Gigahertz: 1e-9,
    },
    Length: {
        Nanometer: 1e9,
        Micrometer: 1e6,
        Millimeter: 1e3,
        Centimeter: 1e2,
        Meter: 1,
        Kilometer: 1e-3,
        Inch: 39.3701,
        Foot: 3.28084,
        Yard: 1.09361,
        Mile: 0.000621371,
        "Nautical Mile": 0.000539957,
    },
    Mass: {
        Microgram: 1e6,
        Milligram: 1e3,
        Gram: 1,
        Kilogram: 1e-3,
        Tonne: 1e-6,
        Ounce: 0.035274,
        Pound: 0.00220462,
        "US Ton": 1.1023e-6,
        Stone: 0.000157473,
        "Imperial Ton": 9.8421e-7,
    },
    "Plane Angle": {
        Degree: 1,
        Radian: Math.PI / 180,
        Gradian: 200 / 180,
        Arcsecond: 3600,
        "Minute of Arc": 60,
        Milliradian: (1000 * Math.PI) / 180,
    },
    Pressure: {
        Pascal: 1,
        Bar: 1e5,
        "Pound per square inch": 0.000145038,
        Torr: 0.00750062,
    },
    Speed: {
        "Meters per second": 1,
        "Kilometers per hour": 3.6,
        "Foots per second": 3.28084,
        "Miles per hour": 2.23694,
        Knots: 1.94384,
    },
    Temperature: {
        Celsius: 1,
        Fahrenheit: [(x) => (x - 32) * (5 / 9), (x) => x * (9 / 5) + 32],
        Kelvin: [(x) => x - 273.15, (x) => x + 273.15],
    },
    Time: {
        Second: 1,
        Nanosecond: 1e9,
        Microsecond: 1e6,
        Millisecond: 1e3,
        Minute: 1 / 60,
        Hour: 1 / 3600,
        Days: 1 / (3600 * 24),
        Months: 1 / ((3600 * 24 * 365.24) / 12),
        Years: 1 / (3600 * 24 * 365.24),
        Decades: 1 / (3600 * 24 * 365.24 * 10),
        Centuries: 1 / (3600 * 24 * 365.24 * 100),
        Millennia: 1 / (3600 * 24 * 365.24 * 1000),
    },
    Volume: {
        Liter: 1,
        Deciliter: 10,
        Centiliter: 1e2,
        Milliliter: 1e3,
        "Cubic Meter": 1e-3,
        "Cubic Centimeter": 1e3,
        "US Teaspoon": 202.884,
        "US Tablespoon": 67.628,
        "US fluid ounce": 33.814,
        "US legal cup": 4.16667,
        "US liquid pint": 2.11338,
        "US liquid quart": 1.05669,
        "US liquid gallon": 0.264172,
        "Cubic inch": 61.0237,
        "Cubic foot": 0.0353137,
        "Imperial Teaspoon": 168.936,
        "Imperial Tablespoon": 56.3121,
        "Imperial fluid ounce": 35.1951,
        "Imperial cup": 3.51951,
        "Imperial pint": 1.75975,
        "Imperial quart": 0.879877,
        "Imperial gallon": 0.219969,
    },
};

function round(number: number): number {
    return Math.round(number * 1e18) / 1e18;
}

function toBase(
    x: number,
    unit: number | [(number: number) => number, (number: number) => number],
): number {
    if (typeof unit === "number") {
        return round(x / unit);
    } else {
        return round(unit[0](x));
    }
}

function fromBase(
    x: number,
    unit: number | [(number: number) => number, (number: number) => number],
): number {
    if (typeof unit === "number") {
        return round(x * unit);
    } else {
        return round(unit[1](x));
    }
}

export default function UnitConverter() {
    const [grosse, setGrosse] = useState("Area");
    const [fromUnit, setFromUnit] = useState<
        [
            string,
            number | [(number: number) => number, (number: number) => number],
        ]
    >(["Square Meter", grossen["Area"]["Square Meter"]]);
    const [fromValue, setFromValue] = useState<number>(1);
    const [toUnit, setToUnit] = useState<
        [
            string,
            number | [(number: number) => number, (number: number) => number],
        ]
    >(["Square Kilometer", grossen["Area"]["Square Kilometer"]]);
    const [toValue, setToValue] = useState<number>(
        (fromValue / (fromUnit[1] as number)) * (toUnit[1] as number),
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
                                setFromUnit([
                                    Object.keys(grossen[name])[0],
                                    Object.values(grossen[name])[0],
                                ]);
                                setToUnit([
                                    Object.keys(grossen[name])[1],
                                    Object.values(grossen[name])[1],
                                ]);
                                setToValue(
                                    fromBase(
                                        toBase(fromValue, fromUnit[1]),
                                        Object.values(grossen[name])[1],
                                    ),
                                );
                            }}
                        >
                            <p>{name}</p>
                        </div>
                    );
                })}
            </div>
            <div id={styles.converterContainer}>
                <div className={styles.unitContainer}>
                    <p className={styles.fromTo}>FROM</p>
                    <input
                        type="number"
                        value={isNaN(fromValue) ? "" : fromValue}
                        onChange={(e) => {
                            setFromValue(parseFloat(e.target.value));
                            setToValue(
                                fromBase(
                                    toBase(
                                        parseFloat(e.target.value),
                                        fromUnit[1],
                                    ),
                                    toUnit[1],
                                ),
                            );
                        }}
                        className={styles.input}
                    />
                    <select
                        name="from"
                        onChange={(e) => {
                            setFromUnit([
                                e.target.value,
                                grossen[grosse][e.target.value],
                            ]);
                            setToValue(
                                fromBase(
                                    toBase(
                                        fromValue,
                                        grossen[grosse][e.target.value],
                                    ),
                                    toUnit[1],
                                ),
                            );
                        }}
                        className={styles.selector}
                        defaultValue={fromUnit[0]}
                    >
                        {Object.keys(grossen[grosse]).map((unit, key) => {
                            return (
                                <option key={key} value={unit}>
                                    {unit}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <p id={styles.equal}>=</p>
                <div className={styles.unitContainer}>
                    <p className={styles.fromTo}>TO</p>
                    <input
                        type="number"
                        value={isNaN(toValue) ? "" : toValue}
                        onChange={(e) => {
                            setToValue(parseFloat(e.target.value));
                            setFromValue(
                                fromBase(
                                    toBase(
                                        parseFloat(e.target.value),
                                        toUnit[1],
                                    ),
                                    fromUnit[1],
                                ),
                            );
                        }}
                        className={styles.input}
                    />
                    <select
                        name="to"
                        onChange={(e) => {
                            setToUnit([
                                e.target.value,
                                grossen[grosse][e.target.value],
                            ]);
                            setToValue(
                                fromBase(
                                    toBase(fromValue, fromUnit[1]),
                                    grossen[grosse][e.target.value],
                                ),
                            );
                        }}
                        className={styles.selector}
                        defaultValue={toUnit[0]}
                    >
                        {Object.keys(grossen[grosse]).map((unit, key) => {
                            return (
                                <option key={key} value={unit}>
                                    {unit}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
}
