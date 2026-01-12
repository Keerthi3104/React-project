import { useState } from "react";
import "../styles/Visualizer.css";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Visualizer() {
  const [array, setArray] = useState([]);
  const [colors, setColors] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(300);

  const generateArray = () => {
    if (isSorting) return;

    const size = Math.floor(Math.random() * 11) + 10;
    const newArray = [];
    const newColors = [];

    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 200) + 20);
      newColors.push("blue");
    }

    setArray(newArray);
    setColors(newColors);
  };

  const bubbleSort = async () => {
    setIsSorting(true);

    let arr = [...array];
    let col = [...colors];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        col[j] = "red";
        col[j + 1] = "red";
        setColors([...col]);
        await delay(speed);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);
          await delay(speed);
        }

        col[j] = "blue";
        col[j + 1] = "blue";
      }

      col[arr.length - i - 1] = "green";
    }

    setColors([...col]);
    setIsSorting(false);
  };

  return (
    <div className="container">
      <div className="controls">
        <button onClick={generateArray} disabled={isSorting}>
          Generate New Array
        </button>

        <button onClick={bubbleSort} disabled={isSorting}>
          Start Sorting
        </button>

        <input
          type="range"
          min="50"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={isSorting}
        />
        <span> Speed </span>
      </div>

      <div className="bars">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              height: `${value}px`,
              backgroundColor: colors[idx],
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Visualizer;
