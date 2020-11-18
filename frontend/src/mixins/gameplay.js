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
      this.$store.commit("chipSelected", true);
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
        this.$store.commit("UPDATE_SCORE", Object.assign({}, field))

        let msg = `${this.selectedChip.color} Attacked Enemy ${field.role}`;
        this.$store.commit("ADD_MESSAGE", msg)

        field.role = this.selectedChip.role;
        field.color = this.selectedChip.color;
        field.height = this.selectedChip.height;
        this.selectedChip.occupied = false;
        // await this.checkWin();

        if (this.isFirstTurn) {
          this.switchTurn();
          this.$store.commit("FIRST_TURN", false)
        } else {
          if (this.action == 1) {
            this.resetTurn();
            this.$store.commit("changeAction", 2);
          } else {
            // console.log('beforeSwitch')
            this.switchTurn();
          }
        }   
      }
    },
    stackTower(field) {
      this.$store.commit("UPDATE_SCORE", Object.assign({}, field))

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
      this.$store.commit("changePlayer");
      this.$store.commit("changeAction", 1);
      this.resetTurn();
    },
    resetTurn() {
      this.$store.commit("chipSelected", false);
      this.pathOptions.forEach(element => {
        document.getElementById(element).classList.remove("active");
      });
      this.pathOptions = [];
      // console.log('switchEnd', this.board)
    },
    deselectChip() {
      this.selectedChip.occupied = true;
      this.resetTurn();
    },
    showOptions() {
      this.pathOptions.forEach(element => {
        let optionalField = document.getElementById(element);
        this.board.data.forEach(row => {
          row.row.forEach(field => {
            if (field.id == optionalField.id) {
              if (
                this.selectedChip.height >= field.height &&
                this.activePlayer != field.color &&
                this.action == 1
              ) {
                optionalField.classList.add("active");
              } else if (
                this.selectedChip.height >= field.height &&
                this.action == 2
              ) {
                optionalField.classList.add("active");
              }
            }
          });
        });
      });
    }
  }
};
