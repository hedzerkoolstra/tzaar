export const VirtualPathing = {
  methods: {
    determinPathOptions(board, field, x, firstAction) {
      let y = field.y;
      let height = field.height
      this.checkedX = x;
      this.checkedY = y;
      this.scanPath(board, this.leftUp, x, y, firstAction, height);
      this.scanPath(board, this.leftDown, x, y, firstAction, height);
      this.scanPath(board, this.straightUp, x, y, firstAction, height);
      this.scanPath(board, this.straightDown, x, y, firstAction, height);
      this.scanPath(board, this.rightUp, x, y, firstAction, height);
      this.scanPath(board, this.rightDown, x, y, firstAction, height);
    },
    scanPath(board, moveOneStep, x, y, firstAction, height) {
      moveOneStep();
      let pathOption = board.data[this.checkedX].row[this.checkedY];
      if (pathOption.empty != true && pathOption.id != "510") {
        this.checkIfOccupied(board, pathOption, moveOneStep, x, y, firstAction, height);
      } else {
        this.checkedX = x;
        this.checkedY = y;
      }
    },
    checkIfOccupied(board, pathOption, moveOneStep, x, y, firstAction, height) {
      if (pathOption.occupied == false) {
        this.scanPath(board, moveOneStep, x, y, firstAction);
      } else {
        if (pathOption.height <= height) {
          this.addOption(pathOption, firstAction);
        }
        this.checkedX = x;
        this.checkedY = y;
      }
    },
    addOption(pathOption, firstAction) {
      // console.log('action', firstAction);
      if (firstAction && pathOption.color != this.activePlayer) {
        this.pathOptions.push({ field: pathOption, destX: this.checkedX });
      } else if (!firstAction && this.turnNumber < 2 && pathOption.color == this.activePlayer) {
        this.pathOptions.push({ field: pathOption, destX: this.checkedX });
      } else if (!firstAction && this.turnNumber >= 2) {
        this.pathOptions.push({ field: pathOption, destX: this.checkedX });
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
