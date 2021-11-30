/* eslint-disable no-undef */
import {
  inProc,
  enterProc,
  leaveProcDisperse,
  shiftinQueue,
  shuffle,
  changeState,
  renterQueue,
} from "./animations";

// Base class for all processor scheduling algorithms
export class ProcessorSchedulingAlgorithm {
  // processes = [{}, {}, {}]

  constructor(processes) {
    this.processes = processes;
  }

  enqueue(process) {
    this.processes.push(process);
  }

  dequeue() {
    return this.processes.pop();
  }

  getNextProcess() {}

  sortqueue(array, compare) {
    array.sort(compare);
  }
}

/**
 * Class for the First Come First Serve  algorithm
 */
export class FCFS extends ProcessorSchedulingAlgorithm {
  constructor(processes) {
    super(processes);
    this.processes = processes.slice();
    this.queue = processes.slice();
    this.sortqueue(this.queue, (a, b) => b.position - a.position);
    this.currentposition = {};
    this.sortedposition = {};
    this.relativeposition = {};
  }
  dequeue() {
    let element = this.queue.pop();
    return element;
  }

  enqueue(element) {
    this.queue.unshift(element);
  }

  /**
   * Animates the Initial Shuffling Process for SJF
   * @returns
   */
  assessQueue() {
    // this.queuesort();
    let queueing = [];

    const shift = 90;

    for (let i = 0; i < this.queue.length; i++) {
      let element = this.processes[i];
      let id = String(element.pid);
      this.currentposition[id] = i;
      for (let j = 0; j < this.queue.length; j++) {
        if (element.pid == this.queue[j].pid) {
          this.sortedposition[String(this.queue[j].pid)] = j;
        }
      }
    }
    for (let i of Object.keys(this.currentposition)) {
      let a = this.currentposition[i],
        b = this.sortedposition[i],
        movement = (b - a) * shift;
      if (movement != 0) {
        i != "1"
          ? queueing.push(shuffle(".p" + i, 1500, movement, "-=50"))
          : queueing.push(shuffle(".p" + i, 1500, movement));
      }
      this.relativeposition[i] = movement;
    }

    return queueing;
  }

  generateTimeline() {
    var tmline = [];
    var iteration = 1;
    const distanceTOCPU = 450,
      shift = 92.5;

    let update = this.assessQueue();
    tmline = tmline.concat(update);

    while (this.queue.length != 0) {
      let element = this.dequeue();
      let name = ".p" + String(element.pid);
      let minitl = [];
      minitl.push(enterProc(name, 1500, distanceTOCPU, 0.8));
      for (let i = this.queue.length - 1; i > -1; i--) {
        let prev = this.relativeposition[this.queue[i].pid];
        minitl.push(
          shiftinQueue(
            ".p" + String(this.queue[i].pid),
            500,
            iteration * shift + prev
          )
        );
      }
      minitl.push(inProc(name, element.burstTime));
      minitl.push(leaveProcDisperse(name));
      tmline = tmline.concat(minitl);
      iteration++;
    }

    return tmline;
  }
}

/**
 * Class for the Shortest Job First first algorithm
 */
export class SJF extends ProcessorSchedulingAlgorithm {
  constructor(processes) {
    super(processes);
    this.queue = this.processes.slice();
    this.currentposition = {};
    this.sortedposition = {};
    this.relativeposition = {};
  }

  dequeue() {
    let element = this.queue.pop();
    return element;
  }

  enqueue(element) {
    this.queue.unshift(element);
  }

  /**
   * Animates the Initial Shuffling Process for SJF
   * @returns
   */
  assessQueue() {
    this.sortqueue(this.queue, (a, b) => b.burstTime - a.burstTime);
    let queueing = [];

    const shift = 90;

    for (let i = 0; i < this.queue.length; i++) {
      let element = this.processes[i];
      this.currentposition[String(element.pid)] = i;
      for (let j = 0; j < this.queue.length; j++) {
        if (element.pid == this.queue[j].pid) {
          this.sortedposition[String(this.queue[j].pid)] = j;
        }
      }
    }

    for (let i of Object.keys(this.currentposition)) {
      let a = this.currentposition[i],
        b = this.sortedposition[i],
        movement = (b - a) * shift;
      if (movement != 0) {
        i != "1"
          ? queueing.push(shuffle(".p" + i, 1500, movement, "-=50"))
          : queueing.push(shuffle(".p" + i, 1500, movement));
      }
      this.relativeposition[i] = movement;
    }

    return queueing;
  }

  generateTimeline() {
    var tmline = [];
    var iteration = 1;
    const distanceTOCPU = 450,
      shift = 92.5;

    let update = this.assessQueue();
    tmline = tmline.concat(update);

    while (this.queue.length != 0) {
      let element = this.dequeue();
      let name = ".p" + String(element.pid);
      let minitl = [];
      minitl.push(enterProc(name, 1500, distanceTOCPU, 0.8));
      for (let i = this.queue.length - 1; i > -1; i--) {
        let prev = this.relativeposition[this.queue[i].pid];
        minitl.push(
          shiftinQueue(
            ".p" + String(this.queue[i].pid),
            500,
            iteration * shift + prev
          )
        );
      }
      minitl.push(inProc(name, element.burstTime));
      minitl.push(leaveProcDisperse(name));
      tmline = tmline.concat(minitl);
      iteration++;
    }

    console.log(tmline);

    return tmline;
  }
}

/**
 * Class for the Round Robin algorithm
 */
export class RoundRobin extends ProcessorSchedulingAlgorithm {
  constructor(processes) {
    super(processes);
    this.queue = this.processes.slice();
    this.currentposition = {};
    this.sortedposition = {};
    this.relativeposition = {};
  }

  dequeue() {
    let element = this.queue.pop();
    return element;
  }

  enqueue(element) {
    this.queue.unshift(element);
  }

  assessQueue() {
    this.sortqueue(this.queue, (a, b) => b.pid - a.pid);

    let queueing = [];

    const shift = 90;

    for (let i = 0; i < this.queue.length; i++) {
      let element = this.processes[i];
      this.currentposition[String(element.pid)] = i;
      for (let j = 0; j < this.queue.length; j++) {
        if (element.pid == this.queue[j].pid) {
          this.sortedposition[String(this.queue[j].pid)] = j;
        }
      }
    }

    for (let i of Object.keys(this.currentposition)) {
      let a = this.currentposition[i],
        b = this.sortedposition[i],
        movement = (b - a) * shift;
      if (movement != 0) {
        i != "1"
          ? queueing.push(shuffle(".p" + i, 1500, movement, "-=50"))
          : queueing.push(shuffle(".p" + i, 1500, movement));
      }
      this.relativeposition[i] = movement;
    }

    return queueing;
  }

  generateTimeline() {
    var tmline = [];
    var iteration = 1;
    const distanceTOCPU = 450,
      shift = 90;

    let update = this.assessQueue();
    tmline = tmline.concat(update);

    while (iteration != 10) {
      // while (this.queue.length != 0) {
      let element = this.dequeue();
      let name = ".p" + String(element.pid);
      let minitl = [];
      minitl.push(enterProc(name, 2000, distanceTOCPU, 0.8));
      for (let i = this.queue.length - 1; i > -1; i--) {
        this.relativeposition[this.queue[i].pid] =
          this.relativeposition[this.queue[i].pid] + shift;
        let movement = this.relativeposition[this.queue[i].pid];
        minitl.push(
          shiftinQueue(".p" + String(this.queue[i].pid), 500, movement)
        );
      }
      console.log(this.relativeposition);
      minitl.push(inProc(name, element.burstTime));
      // minitl.push(leaveProcDisperse(name));
      minitl.push(changeState(name));
      this.enqueue(element);
      let move = (0 - this.currentposition[element.pid]) * shift;
      this.relativeposition[element.pid] = move;
      minitl.push(renterQueue(name, 1500, 0, move));
      tmline = tmline.concat(minitl);
      iteration++;
    }

    console.log(tmline);

    return tmline;
  }
}

/**
 * Class for the priority scheduling algorithm
 */
export class PriorityScheduling extends ProcessorSchedulingAlgorithm {
  constructor(processes) {
    super(processes);
    this.processes = processes.slice();
    this.queue = processes.slice();
    this.queue.sort((a, b) => b.priority - a.priority);
    this.currentposition = {};
    this.sortedposition = {};
    this.relativeposition = {};
  }
  dequeue() {
    let element = this.queue.pop();
    return element;
  }

  enqueue(element) {
    this.queue.unshift(element);
  }

  /**
   * Animates the Initial Shuffling Process for SJF
   * @returns
   */
  assessQueue() {
    // this.queuesort();
    let queueing = [];

    const shift = 90;

    for (let i = 0; i < this.queue.length; i++) {
      let element = this.processes[i];
      let id = String(element.pid);
      this.currentposition[id] = i;
      for (let j = 0; j < this.queue.length; j++) {
        if (element.pid == this.queue[j].pid) {
          this.sortedposition[String(this.queue[j].pid)] = j;
        }
      }
    }
    for (let i of Object.keys(this.currentposition)) {
      let a = this.currentposition[i],
        b = this.sortedposition[i],
        movement = (b - a) * shift;
      if (movement != 0) {
        i != "1"
          ? queueing.push(shuffle(".p" + i, 1500, movement, "-=50"))
          : queueing.push(shuffle(".p" + i, 1500, movement));
      }
      this.relativeposition[i] = movement;
    }

    return queueing;
  }

  generateTimeline() {
    var tmline = [];
    var iteration = 1;
    const distanceTOCPU = 450,
      shift = 92.5;

    let update = this.assessQueue();
    tmline = tmline.concat(update);

    while (this.queue.length != 0) {
      let element = this.dequeue();
      let name = ".p" + String(element.pid);
      let minitl = [];
      minitl.push(enterProc(name, 1500, distanceTOCPU, 0.8));
      for (let i = this.queue.length - 1; i > -1; i--) {
        let prev = this.relativeposition[this.queue[i].pid];
        minitl.push(
          shiftinQueue(
            ".p" + String(this.queue[i].pid),
            500,
            iteration * shift + prev
          )
        );
      }
      minitl.push(inProc(name, element.burstTime));
      minitl.push(leaveProcDisperse(name));
      tmline = tmline.concat(minitl);
      iteration++;
    }

    console.log("Timeline is", tmline);
    return tmline;
  }
}

/**
 * Class for the shortest remaining time algorithm
 */
export class ShortestRemainingTime extends ProcessorSchedulingAlgorithm {}
