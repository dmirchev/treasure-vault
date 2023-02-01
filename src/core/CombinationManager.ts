import { Debug } from "../utils/debug";
import { randomIntFromInterval } from "../utils/mathmisc";

enum Direction {
  CW = 1,
  CCW = -1,
}

type Combination = {
  direction: number;
  segments: number;
};

export default class CombinationManager {
  private sequence: Array<Combination>;
  private sequenceLength: number;
  private combinationRangeMin: number;
  private combinationRangeMax: number;

  constructor(length: number, rangeMin: number, rangeMax: number) {
    this.sequence = new Array<Combination>();
    this.sequenceLength = length;

    this.combinationRangeMin = rangeMin;
    this.combinationRangeMax = rangeMax;
  }

  public setSequence() {
    this.sequence.splice(0);
    for (let i = 0; i < this.sequenceLength; i++) {
      this.sequence.push({
        direction: Math.round(Math.random()) == 0 ? 1 : -1,
        segments: randomIntFromInterval(
          this.combinationRangeMin,
          this.combinationRangeMax
        ),
      });
    }

    this.displayCombinationSequences();
  }

  public checkSequence(
    direction: number,
    onFail: () => void,
    onSuccess: () => void
  ) {
    const currentSequence = this.sequence.at(0);

    if (currentSequence?.direction != direction) {
      onFail();
      return false;
    }

    if (currentSequence?.segments) {
      currentSequence.segments--;
      if (currentSequence.segments <= 0) this.sequence.shift();
    }

    if (this.sequence.length == 0) {
      onSuccess();
      return true;
    } else {
      return false;
    }
  }

  displayCombinationSequences() {
    let sequenceText = "";
    this.sequence.forEach((element, index) => {
      sequenceText += `${element.segments} ${Direction[element.direction]} ${
        index < this.sequenceLength - 1 ? "/ " : ""
      }`;
    });
    Debug.log(sequenceText);
  }
}
