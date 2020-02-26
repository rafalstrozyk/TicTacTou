var ticTacTouController = (function() {

    var board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    var players = ['X', 'O'];
    var player = players[0];

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
        nine: 'nine'
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
        var status;
        

        document.getElementById(DOM.one).addEventListener('click', function() {
            UICtrl.boardStatus(input.one, TTTCtrl.player());
            // input.one.textContent = TTTCtrl.player();
            // status = UICtrl.getStatus(input.one);
            // console.log(status);
        });
        document.getElementById(DOM.two).addEventListener('click', function() {
            UICtrl.boardStatus(input.two, TTTCtrl.player());
        });
        document.getElementById(DOM.three).addEventListener('click', function() {
            UICtrl.boardStatus(input.three, TTTCtrl.player());   
        });
        document.getElementById(DOM.four).addEventListener('click', function() {
            UICtrl.boardStatus(input.four, TTTCtrl.player());
        });
        document.getElementById(DOM.five).addEventListener('click', function() {
            UICtrl.boardStatus(input.five, TTTCtrl.player());
        });
        document.getElementById(DOM.six).addEventListener('click', function() {
            UICtrl.boardStatus(input.six, TTTCtrl.player());
        });
        document.getElementById(DOM.seven).addEventListener('click', function() {
            UICtrl.boardStatus(input.seven, TTTCtrl.player());   
        });
        document.getElementById(DOM.eight).addEventListener('click', function() {
            UICtrl.boardStatus(input.eight, TTTCtrl.player());   
        });
        document.getElementById(DOM.nine).addEventListener('click', function() {
            UICtrl.boardStatus(input.nine, TTTCtrl.player());
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

// document.getElementById('one').addEventListener('click', function() {
//     console.log(document.getElementById('one').textContent);
// });