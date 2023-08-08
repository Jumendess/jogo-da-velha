const cellElements = document.querySelectorAll("[data-cell]");
    const board = document.querySelector("[data-board]");
    const winnermessagetextElement = document.querySelector('[winner-message-text]');
    const winnermessage = document.querySelector("[data-winning-message]");
    const restartButtom = document.querySelector("[data-restart-button]");

    let isCircleTurn;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const startGame = () => {
      isCircleTurn = false;
      for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.removeEventListener("touchstart", handleClick);
        cell.addEventListener("click", handleClick);
        cell.addEventListener("touchstart", handleClick);
      }
      setBoardHoverClass();
      winnermessage.classList.remove("show-winning-message");
    };

    const endGame = (isDraw) => {
      if (isDraw) {
        winnermessagetextElement.innerText = 'Empate';
      } else {
        winnermessagetextElement.innerText = isCircleTurn ? 'Círculo Venceu!' : 'X Venceu!';
      }
      winnermessage.classList.add("show-winning-message");
    };

    const checkForwin = (currentPlayer) => {
      return winningCombinations.some((combination) => {
        return combination.every((index) => {
          return cellElements[index].classList.contains(currentPlayer);
        });
      });
    };

    const checkForDraw = () => {
      return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
      });
    };

    const placeMark = (cell, clasToAdd) => {
      cell.classList.add(clasToAdd);
    };

    const setBoardHoverClass = () => {
      board.classList.remove("circle");
      board.classList.remove("x");
      if (isCircleTurn) {
        board.classList.add("circle");
      } else {
        board.classList.add("x");
      }
    };

    const swapTurns = () => {
      isCircleTurn = !isCircleTurn;
      setBoardHoverClass();
    };

    const handleClick = (e) => {
      e.preventDefault();
      const cell = e.target;
      const clasToAdd = isCircleTurn ? 'circle' : 'x';

      placeMark(cell, clasToAdd);

      const isWin = checkForwin(clasToAdd);
      if (isWin) {
        endGame(false);
      }

      const isDraw = checkForDraw();
        if(isDraw){
          endGame(true);
        }

      swapTurns();
    };

    const restartGame = () => {
      window.location.href = "index.html";
    };

    startGame();
    restartButtom.addEventListener("click", restartGame);
