// Base class for all processor scheduling algorithms
export class ProcessorSchedulingAlgorithm {
  // processes = [{}, {}, {}]
  processes = [];

  constructor(processes) {
    this.processes = processes;
  }

  getNextProcess() {}
}

/**
 * Class for the first come first serve algorithm
 */
export class FCFS extends ProcessorSchedulingAlgorithm {}

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
