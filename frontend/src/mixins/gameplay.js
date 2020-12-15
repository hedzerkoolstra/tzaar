export const Gameplay = {
  methods: {
    play(field, x) {
      if (!field.occupied) {
        this.$store.commit('SET_WARNING', "You cannot target empty fields")
      } else {
        if (field.color != this.activePlayer && !this.chipSelected) {
          this.$store.commit('SET_WARNING', `You cannot move ${field.color} pieces`)
        } else {
          if (!this.chipSelected) {
            this.selectChip(field, x);
          } else {
            if (this.checkIfValidOption(field.id)) {
              if (this.action == 1) {
                this.firstAction(field, x);
              } else {
                this.secondAction(field, x);
              }
            } else {
              this.$store.commit('SET_WARNING', "This is not a valid option")
            }
          }
        }
      }
    },
    selectChip(field, x) {
      this.selectedChip = field;
      field.selected = true
      this.$store.commit("SET_CHIP_SELECTED", true);
      this.determinPathOptions(this.board, field, x);
      if (this.$store.state.showHelper) {
        this.showOptions();
      }
    },
    firstAction(field, x) {
      if (field.color == this.selectedChip.color) {
        this.$store.commit('SET_WARNING', "You have to attack first")
      } else {
        this.attackPlayer(field, x);
      }
    },
    secondAction(field, x) {
      if (field.color == this.selectedChip.color) {
        this.stackTower(field, x);
      } else {
        this.attackPlayer(field, x);
      }
    },
    ////////////////////////////////////
    // Actions
    async attackPlayer(field) {
      if (this.selectedChip.height < field.height) {
        this.$store.commit('SET_WARNING', "You can't attack higher towers")
      } else {
        this.$store.commit("SUBTRACT_CHIP", Object.assign({}, field))

        let msg = `${this.selectedChip.color} Attacked Enemy ${field.role}`;
        this.$store.commit("ADD_MESSAGE", msg)

        field.role = this.selectedChip.role;
        field.color = this.selectedChip.color;
        field.height = this.selectedChip.height;
        this.selectedChip.occupied = false;
        // await this.checkWin();

        if (this.isFirstTurn) {
          this.switchTurn();
          this.$store.commit("SET_IS_FIRST_TURN", false)
        } else {
          if (this.action == 1) {
            this.resetTurn();
            this.$store.commit("SET_ACTION_NUMBER", 2);
          } else {
            // console.log('beforeSwitch')
            this.switchTurn();
          }
        }   
      }
    },
    stackTower(field) {
      this.$store.commit("SUBTRACT_CHIP", Object.assign({}, field))

      field.role = this.selectedChip.role;
      let newHeight = field.height + this.selectedChip.height;
      field.height = newHeight;
      this.selectedChip.occupied = false;

      let msg = `${this.selectedChip.color} ${field.role} stacked to ${newHeight}`;
      this.$store.commit("ADD_MESSAGE", msg)

      this.switchTurn();
    },
    ////////////////////////////////////
    // Utility Functions
    async switchTurn() {
      // await this.checkWin();
      this.$store.commit("CHANGE_PLAYER");
      this.$store.commit("SET_ACTION_NUMBER", 1);
      this.resetTurn();
    },
    resetTurn() {
      this.$store.commit("SET_CHIP_SELECTED", false);
      this.$store.commit("EMPTY_PATH_OPTIONS", false);
    },
    deselectChip() {
      this.selectedChip.occupied = true;
      this.resetTurn();
    }
  }
};
