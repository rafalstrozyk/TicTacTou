const ticTacTouController = ( () => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    const players = ['X', 'O'];
    let player = players[0];
    let win = false;

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
                board[0],
                board[1],
                board[2]
            ],
            [
                board[3],
                board[4],
                board[5]
            ],
            [
                board[6],
                board[7],
                board[8]
            ],
            [
                board[0],
                board[3],
                board[6]
            ],
            [
                board[1],
                board[4],
                board[7]
            ],
            [
                board[2],
                board[5],
                board[8]
            ],
            [
                board[0],
                board[4],
                board[8]
            ],
            [
                board[2],
                board[4],
                board[6]
            ]
        ];
        winnerBoards.forEach((el) => {
            if(
                el[0] === player &&
                el[1] === player &&
                el[2] === player) {
                win = true;
                actualPlayer();
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
        }
    };

})();

const UIcontroller = ( (TTTCtrl) => {

    const DOMclassesAndId = {
        resetButon: 'btn-reset'
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
        document.getElementById('winner').textContent = 'Winner: ' + player;
    }

    newGameUI = () => {
        DOMBoardArray.forEach((domElem) => {
            document.getElementById(domElem).textContent = '';
            document.getElementById('winner').textContent = 'Winner: '
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