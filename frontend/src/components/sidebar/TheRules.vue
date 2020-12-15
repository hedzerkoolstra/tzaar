<template>
  <div>
    <h2>How To Play</h2>
    <div class="rules">
      <h3>GOAL</h3>
      <p>
        1. Players have 3 types of pieces: Tzaars, Tzarras and Totts. These 3
        types represent a trinity: they cannot exist without each other. You
        must keep at least one piece of each type on the board at all times. In
        other words, the first way to win is to make your opponent run out of
        either Tzaars, Tzarras or Totts.
      </p>
      <p>
        2. Each turn, players are obligated to capture at least one opponent’s
        piece. So the second way to win is to put your opponent in a position
        where he cannot capture any of your remaining pieces on the board.
      </p>

      <h3>STARTING POSITION</h3>
      If you do not like random start positions, you can press the randomizer
      button to randomize the board.

      <h3>GAMEPLAY</h3>
      <p>
        To begin the game, White makes one move. White must use this move to
        make a capture. The rules for capturing are very simple: pick one of
        your pieces (of any type) and move it to an adjacent space with an
        opponent’s piece (of any type). Take the opponent’s piece from the board
        and put your piece in that space. The opponent’s piece goes out of the
        game. After White has started the game with only one move, players
        always have two moves per turn.
      </p>

      <h3>THE FIRST MOVE OF A TURN</h3>
      <p>
        1. The first move is always a “forced capture”. You must capture! You
        can capture a piece in an adjacent space, but during the course of the
        game more and more spaces will become vacant. You may also capture by
        moving a piece in a straight line over any number of vacant spaces, to
        the first space occupied by an opponent’s piece. Take the opponent’s
        piece from the board and put your piece in that space. (See diagram 2.)
        The opponent’s piece goes out of the game.
      </p>
      <p>
        2. As far as capturing goes, there’s no difference between Tzaars,
        Tzarras and Totts. Each piece can capture any other piece, as long as
        the piece is at least equally strong as the piece it wants to capture.
      </p>
      <p>
        3. The strength of a piece is not determined by its type, but by its
        height. In the beginning there are only single pieces, which means that
        all pieces on the board are equally strong. But you can make your pieces
        stronger during the game by stacking them on top of each other. A stack
        of two pieces can capture any single piece and any two-piece stack of
        the opposite color; a stack of three pieces can capture any single
        piece, any two-piece stack, and any three-piece stack of the opposite
        color, and so on.
      </p>
      <p>
        4. All pieces on the board move the same way. A single piece is as
        movable as a stack of two, three or more pieces.
      </p>

      <h3>THE SECOND MOVE OF A TURN</h3>
      <p>
        For the second move, you must choose between 3 possibilities: a) make a
        second capture, b) make one of your pieces (or stacks) stronger, or c)
        pass.
      </p>

      <p>
        a) To make a second capture, the rules are the same as
        for the capture with your first move.
      </p>

      <p>
        You may make the second capture with the same piece (or stack) that made
        the first capture, or with a different piece (or stack).
      </p>

      b) Making a piece stronger
      <p>
        1. To make a piece (or stack) stronger, you just have to jump with it on
        top of another piece (or stack) of your color. You may jump on one of
        your pieces (or stacks) in an adjacent space or in a space that you can
        reach by moving in a straight line over any number of vacant spaces. So
        to make a piece stronger, you have exactly the same movement
        possibilities as for capturing.
      </p>
      <p>
        2. There is no limit to the number of pieces that can be in a stack. No
        matter how high, a stack is always considered as “one entity.” It must
        always be moved as a whole and captured as a whole.
      </p>
      <p>
        3. Any of your pieces or stacks can jump on any of your other pieces or
        stacks. For example, a single Tzaar can jump onto a stack with a Tott on
        top and vice versa. (See diagram 3 below.)
      </p>
      <p>
        4. Only the top piece of a stack counts for the different types of
        pieces in play. For example, if you put a Tott on top of a Tzaar, the
        stack counts only as a Tott (although the Tzaar is still in play as part
        of the stack).
      </p>

      c) Pass
      <p>
        You are not obligated to use your second move. If you decide to pass,
        you just tell your opponent that it is his turn again.
      </p>
      <h3>For the sake of clarity</h3>
      <p>
        1. A piece (or stack) can never be moved to an empty space. Once a space
        is empty, it remains empty until the end of the game.
      </p>
      <p>
        2. A piece (or stack) can never jump over one or more other pieces (or
        stacks). It can only be moved over vacant spaces.
      </p>
      <p>
        3. The board has no central space. Pieces may not be moved across the
        center.
      </p>
      <p>4. Stacks can only consist of pieces of one and the same color.</p>
      <p>
        5. You must respect the order of moves: always the forced capture first,
        then a choice between three possibilities for the second move.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.rules h3 {
  margin-top: 2rem;
}
p {
  line-height: 2;
}
</style>