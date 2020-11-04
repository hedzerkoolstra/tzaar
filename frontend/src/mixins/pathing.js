export const Pathing = {
  methods: {
    determinPathOptions(board, field, x) {
      let y = field.y;
      this.checkedX = x;
      this.checkedY = y;
      if (this.checkingWin == true) {
        this.checkedColor = field.color;
        this.checkedHeight = field.height;
      }
      this.scanPath(board, this.leftUp, x, y);
      this.scanPath(board, this.leftDown, x, y);
      this.scanPath(board, this.straightUp, x, y);
      this.scanPath(board, this.straightDown, x, y);
      this.scanPath(board, this.rightUp, x, y);
      this.scanPath(board, this.rightDown, x, y);
    },
    scanPath(board, moveOneStep, x, y) {
      moveOneStep();
      let pathOption = board.data[this.checkedX].row[this.checkedY];
      if (pathOption.empty != true && pathOption.id != "510") {
        this.checkIfOccupied(board, pathOption, moveOneStep, x, y);
      } else {
        this.checkedX = x;
        this.checkedY = y;
      }
    },
    checkIfOccupied(board, pathOption, moveOneStep, x, y) {
      if (pathOption.occupied == false) {
        this.scanPath(board, moveOneStep, x, y);
      } else {
        if (this.checkingWin == true) {
          this.checkIfLegalMove(pathOption);
        } else {
          this.addOption(pathOption);
        }
        this.checkedX = x;
        this.checkedY = y;
      }
    },
    checkIfLegalMove(pathOption) {
      if (
        this.checkedColor != pathOption.color &&
        this.checkedHeight >= pathOption.height
      ) {
        this.movesPossible = true;
      }
    },
    addOption(pathOption) {
      this.pathOptions.push(pathOption.id);
    },
    checkIfValidOption(id) {
      if (!this.ai) {
        return this.pathOptions.includes(id);
      } else {
          return true
      }
    },
    leftUp() {
      this.checkedX--;
      this.checkedY--;
    },
    leftDown() {
      this.checkedX--;
      this.checkedY++;
    },
    straightUp() {
      this.checkedY = this.checkedY - 2;
    },
    straightDown() {
      this.checkedY = this.checkedY + 2;
    },
    rightUp() {
      this.checkedX++;
      this.checkedY--;
    },
    rightDown() {
      this.checkedX++;
      this.checkedY++;
    }
  }
};
