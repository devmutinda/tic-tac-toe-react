const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  
  export default function GameBoard({ onSelectSquare, gameBoard }) {
    //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  
    //   const handleSelectSquare = (rowIndex, colIndex) => {
    //     if (!gameBoard[rowIndex][colIndex]) {
    //       setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [
    //           ...prevGameBoard.map((innerArray) => [...innerArray]),
    //         ];
    //         updatedBoard[rowIndex][colIndex] = activePlayer;
    //         return updatedBoard;
    //       });
    //       onSelectSquare();
    //     }
    //   };
    return (
      <ol id="game-board">
        {gameBoard.map((row, rowIdx) => (
          <li key={rowIdx}>
            <ol>
              {row.map((col, colIdx) => (
                <li key={colIdx}>
                  <button
                    onClick={() => onSelectSquare(rowIdx, colIdx)}
                    disabled={col}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }
  