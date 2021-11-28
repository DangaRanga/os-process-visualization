export class Process {
  constructor(pid, burstTime, quantum, priority) {
    this.pid = pid;
    this.burstTime = burstTime;
    this.quantum = quantum;
    this.priority = priority;
  }
}
