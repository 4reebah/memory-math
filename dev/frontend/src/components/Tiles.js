import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Timer from "../components/Timer.js";
import Instructions from "./Instructions.js";

const Tiles = () => {
  const [showNumber, setshowNumber] = useState(true);
  const [mistakes, setMistakes] = useState(0);
  const [numberSelected, setnumberSelected] = useState(0);
  const [currentIndexes, setCurrentIndexes] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  const [answers, setAnswers] = useState();

  const [tiles, setTiles] = useState([
    { id: 1, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 2, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 3, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 4, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 5, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 6, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 7, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 8, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 9, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 10, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 11, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 12, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 13, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 14, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 15, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
    { id: 16, number: Math.floor(Math.random() * 20) + 1, stateOfTile: true },
  ]);
  
  useEffect(() => {
    const setAllToFalse = () => {
      const updatedTiles = tiles.map(tile => ({
        ...tile,
        stateOfTile: false
      }));
      setTiles(updatedTiles);
      while (true) {
        const firstNumber = Math.floor(Math.random() * tiles.length);
        const secondNumber = Math.floor(Math.random() * tiles.length);
        if (firstNumber !== secondNumber) {
        let valOne = tiles[firstNumber].number
        let valTwo = tiles[secondNumber].number
          setAnswers(valOne + valTwo)
          break;
        }
      }
    }
    const timer = setTimeout(() => {
      setAllToFalse();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const onClickReset = (event) => {
    setRunning(false);
    showAllTiles();
    setMistakes(0);
    setRunning(true);
    setTime(0);
  };

  const [running, setRunning] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const onClickTileHandler = (index) => {
    if (numberSelected < 0) {
      setnumberSelected(0);
    }
    if (numberSelected < 2) {
      setnumberSelected((prevState) => prevState + 1);
      setshowNumber((prevState) => ({
        ...prevState,
        [index]: true,
      }));
      setCurrentIndexes((prevState) => {
        return [...prevState, index];
      });
      setTimeout(() => {
        setshowNumber((prevState) => ({
          ...prevState,
          [index]: false,
        }));
        setCurrentIndexes((prevState) => {
          const newState = [...prevState];
          const indexToRemove = newState.indexOf(index);
          if (indexToRemove !== -1) {
            newState.splice(indexToRemove, 1);
          }
          return newState;
        });
        setnumberSelected((prevState) => prevState - 1);
      }, 1750);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setshowNumber(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  console.log(currentIndexes);
  console.log(numberSelected);

  if (numberSelected === 2) {
    if (
      tiles[currentIndexes[0]].number + tiles[currentIndexes[1]].number ===
      answers
    ) {
      setTiles((prevTiles) => {
        const updatedTiles = [...prevTiles];
        updatedTiles[currentIndexes[0]] = {
          ...updatedTiles[currentIndexes[0]],
          stateOfTile: true,
        }; // Update stateOfTile to true for the specified tile
        updatedTiles[currentIndexes[1]] = {
          ...updatedTiles[currentIndexes[1]],
          stateOfTile: true,
        }; // Update stateOfTile to true for the specified tile
        return updatedTiles;
      });
      setnumberSelected(0);
      setAnswers(createAnswers(tiles));
      checkTrue(tiles);

      if (checkTrue(tiles)) {
        console.log("DONEEE");
      }
    } 
  }

  const showAllTiles = (e) => {
    e.preventDefault();
    const currentShowNumber = showNumber;
    console.log(currentShowNumber)
    let temp = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
      13: true,
      14: true,
      15: true
    }
    setshowNumber(temp);
    const timer = setTimeout(() => {
      setshowNumber(currentShowNumber)
    }, 10000);
  }

  return (
    <div>
      {showInstructions && (
        <Instructions close={handleCloseInstructions}></Instructions>
      )}
      {answers && (
        <h2 className="mb-5 text-4xl text-center">
          {" "}
          Find the two tiles that sum up to {answers}!{" "}
        </h2>
      )}
      {!answers && (
        <h2 className="mb-5 text-4xl text-center">
          {" "}
          Remember the numbers on the tiles!{" "}
        </h2>
      )}
      <div className="container">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`${
              tiles[index].stateOfTile ? "bg-[#4caf50]" : "bg-gray-200"
            } flex justify-center items-center rounded-md text-7xl`}
            onClick={() => onClickTileHandler(index)}
          >
            <p
              className={
                tile.stateOfTile
                  ? "visible"
                  : showNumber[index]
                  ? "visible"
                  : "hidden"
              }
            >
              {" "}
              {tile.number}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{ fontFamily: "Delius Unicase, cursive" }}
        className="flex flex-row justify-between"
      >
        <p className="mt-3 text-lg">
          <div><b>TIMER:</b> {formatTime(time)}</div>
        </p>
        <p className="mt-3 text-lg">
          <b>Number of Mistakes:</b> {mistakes}
        </p>
      </div>
      <div className="flex flex-row text-center justify-center items-center space-x-3">
        <Button
          className=" text-black text-lg mt-3 bg-[#F2D13A]"
          style={{ fontFamily: "Delius Unicase, cursive" }}
          onClick={onClickReset}
        >
          Reset Game
        </Button>
        <Button
          className=" text-black text-lg mt-3 bg-[#F2D13A]"
          style={{ fontFamily: "Delius Unicase, cursive" }}
         onClick={showAllTiles}
        >
          Hint
        </Button>
        <Button
          className=" text-black text-lg mt-3 bg-[#F2D13A]"
          style={{ fontFamily: "Delius Unicase, cursive" }}
        >
          Solve
        </Button>
        <button
          className="mt-10 flex justify-end"
          onClick={handleShowInstructions}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Tiles;

function createAnswers(tiles) {
  let numbers = [];
  let answer = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].stateOfTile) {
      numbers.push(tiles[i].number);
    }
  }
  while (true) {
    const firstNumber = Math.floor(Math.random() * numbers.length);
    const secondNumber = Math.floor(Math.random() * numbers.length);
    if (firstNumber !== secondNumber) {
      console.log("firstNumber" + firstNumber);
      console.log("second " + secondNumber);
      let valOne = numbers[firstNumber];
      let valTwo = numbers[secondNumber];
      answer = valOne + valTwo;
      break;
    }
  }
  console.log(answer);
  return answer;
}

function checkTrue(tiles) {
  let numbers = [];
  let count = 14;
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].stateOfTile) {
      count--;
      return false;
    }
  }
  if (count === 0)
    return true;
}
      
    

