import { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import Timer from "../components/Timer.js";
import Instructions from "./Instructions.js";
import { useNavigate } from "react-router-dom";

const Tiles = () => {
  const [showNumber, setshowNumber] = useState(true);
  const [mistakes, setMistakes] = useState(0);
  const [numberSelected, setnumberSelected] = useState(0);
  const [currentIndexes, setCurrentIndexes] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isTileDisabled, setTileisDisabled] = useState(false);
  const [answers, setAnswers] = useState();
  const [disableHintButton, setDisableHintButton] = useState();
  const [createNewAnswer, setCreateNewAnswer] = useState(0);
  const navigate = useNavigate();
  const [disableSolve, setDisableSolve] = useState(false);
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

  const handleHintPenalty = () => {
    if (running) {
      setTime((prevTime) => prevTime + 5);
    }
  };

  const handleSolvePenalty = () => {
    if (running) {
      setTime((prevTime) => prevTime + 30);
    }
  };

  useEffect(() => {
    setDisableSolve(true);
    setDisableHintButton(true);
    const setAllToFalse = () => {
      const updatedTiles = tiles.map((tile) => ({
        ...tile,
        stateOfTile: false,
      }));
      setTiles(updatedTiles);
      while (true) {
        const firstNumber = Math.floor(Math.random() * tiles.length);
        const secondNumber = Math.floor(Math.random() * tiles.length);
        if (firstNumber !== secondNumber) {
          let valOne = tiles[firstNumber].number;
          let valTwo = tiles[secondNumber].number;
          setAnswers(valOne + valTwo);
          break;
        }
      }
    };
    const timer = setTimeout(() => {
      setDisableSolve(false);
      setDisableHintButton(false);
      setAllToFalse();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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
  let timeoutId = null;
  const onClickTileHandler = (index) => {
    if (numberSelected < 0) {
      setnumberSelected(0);
    }
    if (numberSelected < 2) {
      setDisableHintButton(true);
      setnumberSelected((prevState) => prevState + 1);
      setshowNumber((prevState) => ({
        ...prevState,
        [index]: true,
      }));
      setCurrentIndexes((prevState) => {
        return [...prevState, index];
      });
      timeoutId = setTimeout(() => {
        setDisableHintButton(false);
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
  const tilesRef = useRef(tiles);
  useEffect(() => {
    tilesRef.current = tiles; 
  }, [tiles]);
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

      setTimeout(() => {}, 10);
      setnumberSelected(0);
      setCreateNewAnswer((prevState) => prevState + 1);
    }
  }

  useEffect(() => {
    if (numberSelected === 2) {
      if (
        tiles[currentIndexes[0]].number + tiles[currentIndexes[1]].number !==
        answers
      ) {
        console.log("hle");
        setMistakes((prevState) => prevState + 1);
      }
    }
  }, [numberSelected]);

  useEffect(() => {
    console.log("createNewAnswer" + createNewAnswer);
    console.log("createNew" + tiles);
    if (tiles && createNewAnswer >= 1) {
      let value = createAnswers(tiles);
      console.log("value" + value);
      setAnswers(value);
      checkTrue(tiles);

      if (checkTrue(tiles)) {
        navigate("/end", { state: { time: time, numberMistakes: mistakes } });
      }
    }
  }, [createNewAnswer, tiles]);

  const showAllTiles = (e) => {
    e.preventDefault();
    setDisableSolve(true);
    clearTimeout(timeoutId);
    const currentShowNumber = showNumber;
    console.log(currentShowNumber);
    setTileisDisabled(true);
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
      15: true,
    };
    setshowNumber(temp);
    const timer = setTimeout(() => {
      setTileisDisabled(false);
      setDisableSolve(false);
      setshowNumber(currentShowNumber);
    }, 10000);
    handleHintPenalty();
  };

  const handleSolve = () => {
    let indexone = 0;
    let indexTwo = 0;
    const numMap = new Map();
    let numbers = [];
    //values that are not green
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i].stateOfTile) {
        numbers.push(tiles[i].number);
      }
    }
    // two sum algo to get those values
    for (let i = 0; i < numbers.length; i++) {
      const complement = answers - numbers[i];
      if (numMap.has(complement)) {
        indexone = complement;
        indexTwo = numbers[i];
      }
      numMap.set(numbers[i], i);
    }

    //set the indexof of those values to green and flipped
    let tileindexOne = 0;
    let tileIndexTwo = 0;
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i].stateOfTile) {
        if (tiles[i].number === indexone) {
          tileindexOne = i;
        }
        if (tiles[i].number === indexTwo) {
          tileIndexTwo = i;
        }
      }
    }
    setTiles((prevTiles) => {
      const updatedTiles = [...prevTiles];
      updatedTiles[tileindexOne] = {
        ...updatedTiles[tileindexOne],
        stateOfTile: true,
      };
      return updatedTiles;
    });
    setTiles((prevTiles) => {
      const updatedTiles = [...prevTiles];
      updatedTiles[tileIndexTwo] = {
        ...updatedTiles[tileIndexTwo],
        stateOfTile: true,
      }; // Update stateOfTile to true for the specified tile
      return updatedTiles;
    });
    // Update stateOfTile to true for the specified tile
    setCreateNewAnswer((prevState) => prevState + 1);
    handleSolvePenalty();
  };

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].stateOfTile) {
        count += 1;
      }
    }
    if (count === 14) {
      setDisableSolve(true);
    }
  }, [tiles]);

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
            onClick={!isTileDisabled ? () => onClickTileHandler(index) : null}
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
          <div>
            <b>TIMER:</b> {formatTime(time)}
          </div>
        </p>
        <p className="mt-3 text-lg">
          <b>Number of Mistakes:</b> {mistakes}
        </p>
      </div>
      <div className="flex flex-row text-center justify-center items-center space-x-3">
        <Button
          className=" text-black text-lg mt-3 bg-[#F2D13A]"
          style={{ fontFamily: "Delius Unicase, cursive" }}
          onClick={showAllTiles}
          disabled={disableHintButton}
        >
          Hint
        </Button>
        <Button
          className=" text-black text-lg mt-3 bg-[#F2D13A]"
          style={{ fontFamily: "Delius Unicase, cursive" }}
          onClick={handleSolve}
          disabled={disableSolve}
        >
          Solve
        </Button>
        <Button
          className=" text-black text-lg mt-3 bg-[#F2D13A]"
          style={{ fontFamily: "Delius Unicase, cursive" }}
          onClick={handleShowInstructions}
        >
          How To Play?
        </Button>
      </div>
    </div>
  );
};
export default Tiles;

function createAnswers(tiles) {
  let numbers = [];
  let answer = 0;
  console.log(tiles);
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].stateOfTile) {
      numbers.push(tiles[i].number);
    }
  }
  if (numbers.length > 0) {
    console.log("valuenumbers" + numbers);
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
  }
  console.log(answer);
  return answer;
}

function checkTrue(tiles) {
  console.log("yo");
  console.log(tiles);
  let numbers = [];
  let count = 14;
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].stateOfTile) {
      return false;
    }
  }
  return true;
}
