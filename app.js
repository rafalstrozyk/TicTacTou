const ticTacTouController = ( () => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    const players = ['X', 'O'];
    let player = players[0];
    let win = false;
    let winningboard = [];
    actualPlayer = () => {
        if(player === 'X') {
            player = players[1];
        } else {
            player = players[0];
        }
    };

    winnerChecking = () => {
        let winnerBoards = [
            [
                0,1,2
            ],
            [
                3,4,5
            ],
            [
                6,7,8
            ],
            [
                0,3,6
            ],
            [
                1,4,7
            ],
            [
                2,5,8
            ],
            [
                0,4,8
            ],
            [
                2,4,6
            ]
        ];
        winnerBoards.forEach((el, index) => {
            if(
                board[el[0]] === player &&
                board[el[1]] === player &&
                board[el[2]] === player) {
                win = true;
                actualPlayer();
                winningboard = el;
            }
        });
    }

    newGame = () => {
        board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];
        win = false;
        player = players[0];
    };

    return {
        boardUpdate: (index) => {
            if(board[index] === '') {
                board[index] = player;
                winnerChecking();
                actualPlayer();
            }
        },
        player: () => {

            return player;
        },
        win: () => {
            return win;
        },
        newGame: () => {
            return newGame();
        },
        winningBoard: () => {
            return winningboard;
        }
    };

})();

const UIcontroller = ( (TTTCtrl) => {

    const DOMclassesAndId = {
        resetButon: 'btn-reset',
        whichPlayer: 'which-player'
    };

    const DOMBoardArray = ['one', 'two', 'three',
                            'four', 'five', 'six', 
                            'seven', 'eight', 'nine'];

    boardMovement = (domElem) => {
        if(document.getElementById(domElem).textContent === '') {
            document.getElementById(domElem).textContent = TTTCtrl.player();
        } 
    }

    winnerUI = (player) => {
        let winnerBoard = TTTCtrl.winningBoard();
        winnerBoard.forEach((el) => {
            document.getElementById(DOMBoardArray[el]).classList.remove('selected');
            document.getElementById(DOMBoardArray[el]).classList.add('winner-board');

        });
        document.getElementById('winner').style.display = 'block';
        document.getElementById('winner').textContent = 'Winner: ' + player;
    }

    newGameUI = () => {
        DOMBoardArray.forEach((domElem) => {
            document.getElementById(domElem).textContent = '';
            document.getElementById('winner').style.display = 'none';
            document.getElementById(DOMclassesAndId.whichPlayer).textContent = 'X';
            document.getElementById(DOMclassesAndId.whichPlayer).classList.remove('right');
            document.getElementById(DOMclassesAndId.whichPlayer).classList.add('lef');
            document.getElementById(domElem).classList.add('unselected');
            document.getElementById(domElem).classList.remove('winner-board');
            document.getElementById(domElem).classList.remove('selected');
        });
    };

    return {
        DOMclassesAndId: () => {
            return DOMclassesAndId;
        },
        DOMArrayStrings: () => {
            return DOMBoardArray;
        },
        boardMovement: (domElem) => {
            boardMovement(domElem);
        },
        winnerUI: (player) => {
            winnerUI(player);
        },
        newGameUI: () => {
            newGameUI();
        }
    };

})(ticTacTouController);

const controller = ( (UICtrl,TTTCtrl) => {

    DOMArrayStrings = UICtrl.DOMArrayStrings();
    DOMclassesAndId = UICtrl.DOMclassesAndId();

    const winerController = DOMArrayStrings.forEach((domElem, index) => {
        document.getElementById(domElem).addEventListener('click', () => {
            let win = TTTCtrl.win();
            if(!win) {
                document.getElementById(domElem).classList.remove('unselected');
                document.getElementById(domElem).classList.add('selected');
                UICtrl.boardMovement(domElem);
                TTTCtrl.boardUpdate(index);
            } 
        });
    });

    setupEventListeners = () => {

        document.querySelector('.tic-tac-tou').addEventListener('click', () =>{
            let player = TTTCtrl.player();
            let win = TTTCtrl.win();
            if(!win) {
                document.getElementById(DOMclassesAndId.whichPlayer).textContent = player;
                document.getElementById(DOMclassesAndId.whichPlayer).classList.toggle('lef');
                document.getElementById(DOMclassesAndId.whichPlayer).classList.toggle('right');
                winerController;
            } else {
                UICtrl.winnerUI(player);
            }
        });  

        document.getElementById(DOMclassesAndId.resetButon).addEventListener('click', () => {
            TTTCtrl.newGame();
            UICtrl.newGameUI();
        });
    };

    return {
        init: () => {
            console.log('App Start!');
            setupEventListeners();
        }
    }
})(UIcontroller, ticTacTouController);

controller.init();