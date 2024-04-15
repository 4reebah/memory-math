import { useEffect, useState } from "react";

const Tiles = () => {
    const [showNumber, setshowNumber] = useState(true)
    const [numberSelected, setnumberSelected] = useState(0);
    const [currentIndexes, setCurrentIndexes] = useState([]);
    const [tiles, setTiles] = useState([
        { id: 1, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 2, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 3, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 4, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 5, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 6, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 7, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 8, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 9, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 10, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 11, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 12, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 13, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 14, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 15, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
        { id: 16, number: Math.floor(Math.random() * 20) + 1, stateOfTile: false },
    ]);
    const [answers, setAnswers] = useState();

    const onClickTileHandler = (index) => {
        if (numberSelected < 0) {
            setnumberSelected(0)
        }
        if (numberSelected < 2) {
          setnumberSelected(prevState => (prevState + 1))
          setshowNumber(prevState => ({
            ...prevState,
            [index]: true
          }));
          setCurrentIndexes(prevState => {
            return [...prevState, index]; 
        });
          setTimeout(() => {
           
            setshowNumber(prevState => ({
              ...prevState,
              [index]: false
            }));
            setCurrentIndexes(prevState => {
                const newState = [...prevState]; 
                const indexToRemove = newState.indexOf(index);
                if (indexToRemove !== -1) {
                    newState.splice(indexToRemove, 1); 
                }
                return newState; 
            });
            setnumberSelected(prevState => (prevState - 1))
          }, 1750);
        }
      }

    useEffect(() => {
        const timeout = setTimeout(() => {
          setshowNumber(false); 
        }, 3000);
        
        return () => clearTimeout(timeout); 
      }, []);
      useEffect(() => {
        setAnswers(createAnswers(tiles))
      }, [tiles])
    
    console.log(currentIndexes)
    console.log(numberSelected)
    console.log(answers)

    if (numberSelected === 2) {
        if (tiles[currentIndexes[0]].number + tiles[currentIndexes[1]].number === answers) {
            setTiles(prevTiles => {
                const updatedTiles = [...prevTiles]; 
                updatedTiles[currentIndexes[0]] = { ...updatedTiles[currentIndexes[0]], stateOfTile: true }; // Update stateOfTile to true for the specified tile
                updatedTiles[currentIndexes[1]] = { ...updatedTiles[currentIndexes[1]], stateOfTile: true }; // Update stateOfTile to true for the specified tile
                return updatedTiles;
              });
            setnumberSelected(0)
            setAnswers(createAnswers(tiles))
        } 
    }
    console.log(tiles)
    
    return (
        <div>
            {answers && <h2 className="mb-5 text-4xl text-center"> Find the two tiles that sum up to {answers}!</h2>}
            <div className="container">
                {tiles.map((tile, index) => (
                    <div key={index} className={`${tile.stateOfTile ? 'bg-[#4caf50]' : 'bg-gray-200'} flex justify-center items-center rounded-md text-7xl`} onClick={() => onClickTileHandler(index)}>
                    <p className={tile.stateOfTile ? 'visible' : (showNumber[index] ? 'visible' : 'hidden')}>{tile.number}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Tiles;

function createAnswers(tiles) {
    console.log(tiles)
    let numbers = []
    let answer = 0
    const count = tiles.length
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].stateOfTile) {
            numbers.push(tiles[i].number)
        }
    }
    while (true) {
        const firstNumber =  Math.floor(Math.random() * (numbers.length))
        const secondNumber =  Math.floor(Math.random() * (numbers.length))
        if (firstNumber !== secondNumber) {
            console.log("firstNumber" + firstNumber)
            console.log("second " + secondNumber)
            let valOne = numbers[firstNumber]
            let valTwo = numbers[secondNumber]
            answer = valOne + valTwo
            break
        }
    }
    console.log(answer)
    return answer
}
