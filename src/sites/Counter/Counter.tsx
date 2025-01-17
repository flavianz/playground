import styles from "./Counter.module.css";
import { useEffect, useState } from "react";

export default function Counter() {
    const [counters, setCounters] = useState<[string, number][]>([]);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        let stored = localStorage.getItem("counters");
        if (stored) {
            setCounters(JSON.parse(stored));
        } else {
            setCounters([["New Counter", 0]]);
        }
    }, []);

    function updateCounter(key: number, change: number) {
        counters[key][1] += change;
        setCounters([...counters]);
        localStorage.setItem("counters", JSON.stringify(counters));
    }
    function updateName(key: number, name: string) {
        counters[key][0] = name;
        setCounters([...counters]);
        localStorage.setItem("counters", JSON.stringify(counters));
    }

    function createNewCounter() {
        setCounters([...counters, ["New Counter", 0]]);
        localStorage.setItem(
            "counters",
            JSON.stringify([...counters, ["New Counter", 0]]),
        );
    }

    return (
        <div id={styles.container}>
            <div className="selectorContainer" id={styles.selectorContainer}>
                {counters.map((counter, key) => {
                    return (
                        <div
                            className={
                                styles.selector +
                                " selector " +
                                (selected === key && "selected")
                            }
                            key={key}
                            onClick={() => setSelected(key)}
                        >
                            {counter[0]}
                        </div>
                    );
                })}
                <div
                    onClick={createNewCounter}
                    className={styles.selector + " selector"}
                    style={{ textAlign: "center" }}
                >
                    + New Counter
                </div>
            </div>
            <div id={styles.contentContainer}>
                <input
                    id={styles.input}
                    type="text"
                    value={counters.length > 0 ? counters[selected][0] : ""}
                    onChange={(e) => updateName(selected, e.target.value)}
                />
                <div id={styles.counterContainer}>
                    <div className={styles.modContainer}>
                        <button onClick={() => updateCounter(selected, -1)}>
                            -1
                        </button>
                        <div className={styles.lowerButtonContainer}>
                            <button onClick={() => updateCounter(selected, -5)}>
                                -5
                            </button>
                            <button
                                onClick={() => updateCounter(selected, -25)}
                            >
                                -25
                            </button>
                        </div>
                    </div>
                    <h1 id={styles.value}>
                        {counters.length > 0 && counters[selected][1]}
                    </h1>
                    <div className={styles.modContainer}>
                        <button onClick={() => updateCounter(selected, 1)}>
                            +1
                        </button>
                        <div className={styles.lowerButtonContainer}>
                            <button onClick={() => updateCounter(selected, 5)}>
                                +5
                            </button>
                            <button onClick={() => updateCounter(selected, 25)}>
                                +25
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
