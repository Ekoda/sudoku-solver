const SudokuBoard = [
	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	[6, 0, 0, 1, 9, 5, 0, 0, 0],
	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	[0, 0, 0, 0, 8, 0, 0, 7, 9],
];

//finds and returns the values of a box belonging to a certain row + column
function boxC(r, c, sudokuBoard) {
	let box1 = sudokuBoard[0]
		.slice(0, 3)
		.concat(sudokuBoard[1].slice(0, 3), sudokuBoard[2].slice(0, 3));
	let box2 = sudokuBoard[0]
		.slice(3, 6)
		.concat(sudokuBoard[1].slice(3, 6), sudokuBoard[2].slice(3, 6));
	let box3 = sudokuBoard[0]
		.slice(6, 9)
		.concat(sudokuBoard[1].slice(6, 9), sudokuBoard[2].slice(6, 9));
	let box4 = sudokuBoard[3]
		.slice(0, 3)
		.concat(sudokuBoard[4].slice(0, 3), sudokuBoard[5].slice(0, 3));
	let box5 = sudokuBoard[3]
		.slice(3, 6)
		.concat(sudokuBoard[4].slice(3, 6), sudokuBoard[5].slice(3, 6));
	let box6 = sudokuBoard[3]
		.slice(6, 9)
		.concat(sudokuBoard[4].slice(6, 9), sudokuBoard[5].slice(6, 9));
	let box7 = sudokuBoard[6]
		.slice(0, 3)
		.concat(sudokuBoard[7].slice(0, 3), sudokuBoard[8].slice(0, 3));
	let box8 = sudokuBoard[6]
		.slice(3, 6)
		.concat(sudokuBoard[7].slice(3, 6), sudokuBoard[8].slice(3, 6));
	let box9 = sudokuBoard[6]
		.slice(6, 9)
		.concat(sudokuBoard[7].slice(6, 9), sudokuBoard[8].slice(6, 9));
	if ((r == 0 || r == 1 || r == 2) && (c == 0 || c == 1 || c == 2)) {
		return box1;
	} else if ((r == 0 || r == 1 || r == 2) && (c == 3 || c == 4 || c == 5)) {
		return box2;
	} else if ((r == 0 || r == 1 || r == 2) && (c == 6 || c == 7 || c == 8)) {
		return box3;
	} else if ((r == 3 || r == 4 || r == 5) && (c == 0 || c == 1 || c == 2)) {
		return box4;
	} else if ((r == 3 || r == 4 || r == 5) && (c == 3 || c == 4 || c == 5)) {
		return box5;
	} else if ((r == 3 || r == 4 || r == 5) && (c == 6 || c == 7 || c == 8)) {
		return box6;
	} else if ((r == 6 || r == 7 || r == 8) && (c == 0 || c == 1 || c == 2)) {
		return box7;
	} else if ((r == 6 || r == 7 || r == 8) && (c == 3 || c == 4 || c == 5)) {
		return box8;
	} else if ((r == 6 || r == 7 || r == 8) && (c == 6 || c == 7 || c == 8)) {
		return box9;
	}
}

//n = number placed, r = row position, c = column position, soBo = current sudokuboard.
// returns true if number does not exist in row/column/box or n = 0
function conditions(n, r, c, sudokuBoard) {
	let row = [];
	let column = [];
	let box = boxC(r, c, sudokuBoard);
	for (let i = 0; i < 9; i++) {
		row.push(sudokuBoard[r][i]);
		column.push(sudokuBoard[i][c]);
	}
	if (n == 0) {
		return true;
	} else if (row.includes(n) || column.includes(n) || box.includes(n)) {
		return false;
	} else {
		return true;
	}
}

//finds position of the number needing change, ignores already placed numbers in the original list,
//if none requires change return true. Sudoku finished.
function positionFinder(sudokuBoard) {
	for (let i = 0; i < 9; i++) {
		for (let k = 0; k < 9; k++) {
			let potentialN = numGen(sudokuBoard[i][k], i, k, sudokuBoard);
			let condition = conditions(potentialN, i, k, sudokuBoard);
			if (SudokuBoard[i][k] == 0 && condition == true) {
				return [i, k];
			}
		}
	}
	return true;
}

//generates a number that is valid, starting from n, if n>9 return 0
function numGen(n, r, c, sudokuBoard) {
	const sudokuBoardCopy = sudokuBoard.map(x => x.slice());
	sudokuBoardCopy[r][c] = 0;
	if (n == 0) {
		n = 1;
	} else if (n == 10) {
		return 0;
	}
	if (conditions(n, r, c, sudokuBoardCopy) == false) {
		while (conditions(n, r, c, sudokuBoardCopy) == false) {
			n++;
			if (n == 10) {
				return 0;
			}
		}
	}
	return n;
}

// takes tracker and sodukoboard, returns backtracked sodukoboard
function backTracker(tracker, sudokuBoard) {
	let backTrack = true;
	while (backTrack == true) {
		let backTrackPosition = tracker[tracker.length - 1];
		let row = backTrackPosition[0];
		let col = backTrackPosition[1];
		let potentialN = numGen(
			sudokuBoard[row][col] + 1,
			row,
			col,
			sudokuBoard
		);
		if (potentialN == 0) {
			sudokuBoard[row][col] = potentialN;
			tracker.pop();
			continue;
		} else if (potentialN !== 0) {
			sudokuBoard[row][col] = potentialN;
			backTrack = false;
		}
		return sudokuBoard;
	}
}

// Main solver, input Sudoku. tracks moves, enters valid numbers calls backtracker if needed.
function sudokuSolver(sudokuBoard) {
	let sudokuBoardCopy = sudokuBoard.map(x => x.slice());
	let tracker = [];
	while (positionFinder(sudokuBoardCopy) !== true) {
		let row = positionFinder(sudokuBoardCopy)[0];
		let col = positionFinder(sudokuBoardCopy)[1];
		let potentialN = numGen(
			sudokuBoardCopy[row][col],
			row,
			col,
			sudokuBoardCopy
		);
		tracker.push([row, col]);
		sudokuBoardCopy[row][col] = potentialN;
		if (potentialN == 0) {
			tracker.pop();
			sudokuBoardCopy = backTracker(tracker, sudokuBoardCopy);
		}
	}

	return sudokuBoardCopy;
}

console.log(sudokuSolver(SudokuBoard));

