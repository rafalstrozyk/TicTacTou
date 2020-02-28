var ticTacTouController = (function() {

    var board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    var players = ['X', 'O'];
    var player = players[0];
    var win = false;

    var winnerBoards;

    const winner = function() {
        winnerBoards.forEach(function(el,index,array) {
            console.log(player)
            if(
                el[0] === player &&
                el[1] === player &&
                el[2] === player) {
                win = true;
            }
        });
    }

    const winTracking = function() {
        winnerBoards = [
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
        ]
    };

    return {

        whichPlayer: function() {
            if(player === 'X') {
                player = players[1];
            } else {
                player = players[0];
            }
        },
       player: function() {
           return player;
       },
       boardStatus: function() {
           winTracking();
           winner();
       },
       updateBoard: function(index) {
           board[index] = player;
            console.log(board);
       },
       winStatus: function() {
           return win;
       }
    };

})();

var UIcontroller = (function(TTTCtrl) {

    var DOMstrings = {
        one: 'one',
        two: 'two',
        three: 'three',
        four: 'four',
        five: 'five',
        six: 'six',
        seven: 'seven',
        eight: 'eight',
        nine: 'nine',
        resetBtn: 'btn-reset'
    };

    return {
        getStatus: function(input) {
            if(input.textContent !== ''){
                return false;
            } else {
                TTTCtrl.whichPlayer();
                return true;
            }
        },
        getInput: function() {
            return {
                one: document.getElementById(DOMstrings.one),
                two: document.getElementById(DOMstrings.two),
                three: document.getElementById(DOMstrings.three),
                four: document.getElementById(DOMstrings.four),
                five: document.getElementById(DOMstrings.five),
                six: document.getElementById(DOMstrings.six),
                seven: document.getElementById(DOMstrings.seven),
                eight: document.getElementById(DOMstrings.eight),
                nine: document.getElementById(DOMstrings.nine),
                resetBtn: document.querySelector('.'+DOMstrings.resetBtn)
            }
        },
        getDOMstrings: function() {
            return DOMstrings;
        },
        boardStatus: function(input, player) {
            if(this.getStatus(input)) {
                input.textContent = player;
            }
        }
    };

})(ticTacTouController);

var controller = (function(UICtrl,TTTCtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        var input = UICtrl.getInput();
        var win = TTTCtrl.winStatus();

        input.one.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(0);
                UICtrl.boardStatus(input.one, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });
        input.two.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(1);
                UICtrl.boardStatus(input.two, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });
        input.three.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(2);
                UICtrl.boardStatus(input.three, TTTCtrl.player());   
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });
        input.four.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(3);
                UICtrl.boardStatus(input.four, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });
        input.five.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(4);
                UICtrl.boardStatus(input.five, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });
        input.six.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(5);
                UICtrl.boardStatus(input.six, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });
        input.seven.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(6);
                UICtrl.boardStatus(input.seven, TTTCtrl.player());  
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
             
        });
        input.eight.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(7);
                UICtrl.boardStatus(input.eight, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
               
        });
        input.nine.addEventListener('click', function() {
            if(!win) {
                TTTCtrl.updateBoard(8);
                UICtrl.boardStatus(input.nine, TTTCtrl.player());
                TTTCtrl.boardStatus();
                win = TTTCtrl.winStatus();
            }
            
        });

    };

    return {
        init: function() {
            console.log('App start');
            setupEventListeners();
        }
    }

})(UIcontroller,ticTacTouController);

controller.init();
