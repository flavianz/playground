import styles from "./RandomNumberGenerator.module.css";
import { useRef, useState } from "react";

export default function RandomNumberGenerator() {
    const [min, setMin] = useState("1");
    const [max, setMax] = useState("10");
    const [num, setNum] = useState("");
    const counter = useRef(0);

    function Number({ value }: { value: string }) {
        return (
            <h1 id={styles.number} key={value}>
                {num.split("-")[0]}
            </h1>
        );
    }

    return (
        <div id={styles.container}>
            <div id={styles.inputContainer}>
                <label className={styles.label}>
                    Minimum
                    <input
                        className={styles.input}
                        type="number"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    Maximum
                    <input
                        className={styles.input}
                        type="text"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                    />
                </label>
                <button
                    id={styles.button}
                    onClick={() => {
                        if (min == "") {
                            setMin("0");
                        }
                        if (max === "") {
                            setMax("10");
                        }
                        setNum(
                            getRandomInt(
                                parseInt(min),
                                parseInt(max),
                            ).toString() +
                                "-" +
                                counter.current.toString(),
                        );
                        counter.current++;
                    }}
                >
                    Generate
                </button>
            </div>
            <Number value={num} />
        </div>
    );
}
function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
