var ticTacTouController = (function() {
    
    var table = ['','','','','','','','',''];

})();



var UIcontroller = (function() {

    var DOMstrings = {
        one: '#one',
        two: '#two',
        three: '#three',
        four: '#four',
        five: '#five',
        six: '#six',
        seven: '#seven',
        eight: '#eight',
        nine: '#nine'
    };

    return {
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

var controller = (function(UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();


    }

})(UIcontroller);


document.querySelector('#one').addEventListener('click', function() {
    
});