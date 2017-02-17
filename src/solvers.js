/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


window.generateRows = function(n) {
  var compilation = []; 
  var choices = _.range(n);
  
  var permutations = function(n, boardSoFar) {
 
    if (n === 0) {
      compilation.push(boardSoFar);
      return;
    }

    for (var i = 0; i < choices.length; i++) {
      var currentChoice = choices[i];
      if (_.uniq(boardSoFar.concat(currentChoice)).length === boardSoFar.concat(currentChoice).length) { 
        permutations(n - 1, boardSoFar.concat(currentChoice));
      }
    }
  
  };
  permutations(n, []);

  return compilation;
};

//generate an empty board using 'n' size
window.generateBoards = function(n) {
   
  //for each of the rows returned from generateRows function
  return generateRows(n).map(function(rowItem) {
    var tempBoard = makeEmptyMatrix(n);

    rowItem.forEach(function(index, row) {
      tempBoard[row][index] = 1;
    });
    return tempBoard;
  });

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) { 
  var possible = generateBoards(n);
  var result;

  for (var i = 0; i < possible.length; i++) {
    tempBoard = new Board(possible[i]);
    if (!tempBoard.hasAnyRooksConflicts()) {
      result = possible[i];
      break;
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {


  var solutionCount = generateBoards(n).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var possible = generateBoards(n);
  var result;

  for (var i = 0; i < possible.length; i++) {
    tempBoard = new Board(possible[i]);
    if (!tempBoard.hasAnyQueensConflicts()) {
      result = possible[i];
      return result;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return makeEmptyMatrix(n);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = generateBoards(n).filter(function(item) {
    var board = new Board(item);
    return board.hasAnyQueensConflicts() === false;
  }).length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
