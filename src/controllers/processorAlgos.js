// Base class for all processor scheduling algorithms
class ProcessorSchedulingAlgorithm {
  constructor(processes) {
    this.processes = processes;
  }

  getNextProcess() {}
}

/**
 * Class for the first come first serve algorithm
 */
class FCFS extends ProcessorSchedulingAlgorithm {}

/**
 * Class for the shortest job first algorithm
 */
class ShortestJobFirst extends ProcessorSchedulingAlgorithm {}

/**
 * Class for the round robin algorithm
 */
class RoundRobin extends ProcessorSchedulingAlgorithm {}

/**
 * Class for the round robin algorithm
 */
class PriorityScheduling extends ProcessorSchedulingAlgorithm {}
