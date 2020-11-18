export const VirtualGameplay = {
  methods: {
    makeMove(newBoard, field, x, firstAction) {
      // console.log('Play?, firsAction?', action, this.chipSelected, this.selectedChip)
        if (firstAction) {
          // console.log('firstAction');
          this.firstAction(newBoard, field, x);
        } else {
          // console.log('secondAction');
          this.secondAction(newBoard, field, x);
        }
    },
    async selectChip(newBoard, field, x) {
      this.selectedChip = field;
      newBoard.data[x].row[field.y].occupied = false;
      // this.chipSelected = true;
      // console.log('selectedChip', this.selectedChip.id);
    },
    firstAction(newBoard, field, x) {
      if (field.color != this.selectedChip.color) {
        this.attackPlayer(newBoard, field, x);
      }
    },
    secondAction(newBoard, field, x) {
      if (field.color == this.selectedChip.color) {
        this.stackTower(newBoard, field, x);
        // console.log('stack')
      } else {
        this.attackPlayer(newBoard, field, x);
        // console.log('attack', this.selectedChip, field)
      }
    },
    ////////////////////////////////////
    // Actions
    async attackPlayer(newBoard, field, x) {
      if (this.selectedChip.height < field.height) {
        console.log("Attack error", this.selectedChip.id, 'to', field.id);
      } else {
        newBoard.data[x].row[field.y].role = this.selectedChip.role;
        newBoard.data[x].row[field.y].color = this.selectedChip.color;
        newBoard.data[x].row[field.y].height = this.selectedChip.height;
        // console.log("attack field:", x, field.y);
      }
      // this.updateTurnInfo();
    },
    stackTower(newBoard, field, x) {
      newBoard.data[x].row[field.y].role = this.selectedChip.role;
      let newHeight = newBoard.data[x].row[field.y].height + this.selectedChip.height;
      newBoard.data[x].row[field.y].height = newHeight;
      // console.log('Stacked', newHeight)
      // this.updateTurnInfo();
    },
    ////////////////////////////////////
    // Utility Functions
    resetBoard() {
      this.chipSelected = false;
      this.activePlayer = "black";
    },
    updateTurnInfo() {
      this.chipSelected = false;
    },
    undoMove(newBoard, move) {
      // console.log( newBoard.data[move.originX].row[move.origin.y], move.origin)
      newBoard.data[move.originX].row[move.origin.y].height = move.origin.height;
      newBoard.data[move.originX].row[move.origin.y].color = move.origin.color;
      newBoard.data[move.originX].row[move.origin.y].role = move.origin.role;
      newBoard.data[move.originX].row[move.origin.y].occupied = move.origin.occupied;
      newBoard.data[move.destX].row[move.dest.y].height = move.dest.height;
      newBoard.data[move.destX].row[move.dest.y].color = move.dest.color;
      newBoard.data[move.destX].row[move.dest.y].role = move.dest.role;
      newBoard.data[move.destX].row[move.dest.y].occupied = move.dest.occupied;
      // console.log( newBoard.data[move.originX].row[move.origin.y], move.origin)
    }
  }
};
