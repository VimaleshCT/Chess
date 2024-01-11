class ChessPiece {
  constructor(name, id, isAttacked, color) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.isAttacked = isAttacked;
  }

  setSquare(newSquare) {
    // set the square this piece is sitting top of.
    // on any given piece (on the board), there will always be a piece on top of it.
    // console.log(newSquare)
    if (newSquare === undefined) {
      this.squareThisPieceIsOn = newSquare;
      return;
    }

    if (this.squareThisPieceIsOn === undefined) {
      this.squareThisPieceIsOn = newSquare;
      newSquare.setPiece(this);
    }

    const isNewSquareDifferent =
      this.squareThisPieceIsOn.x != newSquare.x ||
      this.squareThisPieceIsOn.y != newSquare.y;

    if (isNewSquareDifferent) {
      // console.log("set")
      this.squareThisPieceIsOn = newSquare;
      newSquare.setPiece(this);
    }
  }

  getSquare() {
    return this.squareThisPieceIsOn;
  }
}

export default ChessPiece;
