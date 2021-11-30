export class Process {
  /**
   * Model representing a process
   * @param {number} pid Proces ID
   * @param {number} burstTime Burst time associated with process
   * @param {number} priority Priority value associated with process
   * @param {number} position Position in queue of process
   */
  constructor(pid, burstTime, priority, position) {
    this.pid = pid;
    this.burstTime = burstTime;
    this.priority = priority;
    this.position = position;
  }
}
