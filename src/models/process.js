export class Process {
  constructor(pid, burstTime, quantum) {
    this.pid = pid;
    this.burstTime = burstTime;
    this.quantum = quantum;
  }
}
