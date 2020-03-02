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

    return {
        boardUpdate: (index) => {
            if(board[index] === '') {
                board[index] = player;
                winnerChecking();
                actualPlayer();
            }
            console.log(board);
        },
        player: () => {

            return player;
        },
        win: () => {
            return win;
        }
    }

})();

const UIcontroller = ( (TTTCtrl) => {

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

    return {
        DOMArrayStrings: () => {
            return DOMBoardArray;
        },
        boardMovement: (domElem) => {
            boardMovement(domElem);
        },
        winnerUI: (player) => {
            winnerUI(player);
        }
    };

})(ticTacTouController);

const controller = ( (UICtrl,TTTCtrl) => {

    DOMArrayStrings = UICtrl.DOMArrayStrings();

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
        
    };

    return {
        init: () => {
            console.log('App Start!');
            setupEventListeners();
        }
    }
})(UIcontroller, ticTacTouController);

controller.init();