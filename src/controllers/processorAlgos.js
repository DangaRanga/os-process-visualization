// Base class for all processor scheduling algorithms
export class ProcessorSchedulingAlgorithm {
  // processes = [{}, {}, {}]
  processes = [];

  constructor(processes) {
    this.processes = processes;
  }

  getNextProcess() {}

  enqueue(process) {
    this.processes.push(process);
  }

  dequeue() {
    return this.processes.pop();
  }

  sortqueue(compare) {
    this.processes.sort(compare);
  }
}

/**
 * Class for the first come first serve algorithm
 */
export class FCFS extends ProcessorSchedulingAlgorithm {
  super(processes) {
    this.processes = processes;
  }

  generateTimeline() {
    let firstX = 800;
    let testAnimationTimeline = [];
    this.processes.forEach((process) => {
      firstX -= 100;
      testAnimationTimeline.push(
        {
          targets: ".p" + process.pid,
          translateX: firstX,
          scaleY: 0.8,
        },
        {
          targets: ".p" + process.pid,
          direction: "alternate",
          rotate: {
            value: 360 * process.time,
            duration: 500 * process.time,
            easing: "linear",
          },
          borderRadius: 50,
        },
        {
          targets: ".p" + process.pid,
          translateX: 900,
          direction: "alternate",
          opacity: 0,
          duration: 500,
        }
      );
    });
    console.log(testAnimationTimeline);
    return testAnimationTimeline;
  }
}

/**
 * Class for the shortest job first algorithm
 */
export class ShortestJobFirst extends ProcessorSchedulingAlgorithm {}

/**
 * Class for the round robin algorithm
 */
export class RoundRobin extends ProcessorSchedulingAlgorithm {}

/**
 * Class for the priority scheduling algorithm
 */
export class PriorityScheduling extends ProcessorSchedulingAlgorithm {}

/**
 * Class for the shortest remaining time algorithm
 */
export class ShortestRemainingTime extends ProcessorSchedulingAlgorithm {}
