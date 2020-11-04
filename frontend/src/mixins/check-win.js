export const CheckWin = {
    methods: {
        async checkWin() {
            this.$store.commit('changePlayer');
            this.checkingWin = true;
            this.jacksAlive = false;
            this.queensAlive = false;
            this.kingsAlive = false;
            this.movesPossible = false;
            await this.board.data.forEach(row => {
              row.row.forEach(element => {
                // Check if there is at least one piece of every role alive
                if (element.color == this.player) {
                  if (element.occupied == true) {
                    if (element.role == "Tzaar") {
                      this.kingsAlive = true;
                    } else if (element.role == "Tzarra") {
                      this.queensAlive = true;
                    } else if (element.role == "Tott") {
                      this.jacksAlive = true;
                    }
                  }
                }
                // Check if there are any options left
                if (this.action == 2) {
                  if (element.empty != true && element.color == this.player) {
                    this.determinPathOptions(element, row.x);
                  }
                }
              });
            });
            if (
              this.kingsAlive == false ||
              this.queensAlive == false ||
              this.jacksAlive == false
            ) {
              this.winGame();
            } else if (this.action == 2 && this.movesPossible == false) {
              this.winGame();
            } else {
              this.$store.commit('changePlayer');
              this.checkingWin = false;
            }
          },
          winGame() {
            this.gameWon = true;
            this.$store.commit('changePlayer');
            let msg = `${this.player} Wins`;
            this.$store.state.commit("ADD_MESSAGE", msg)
          }
    }
}