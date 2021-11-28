import {
  inProc,
  enterProc,
  leaveProcDisperse,
  shiftinQueue,
} from "./animations";

// Base class for all processor scheduling algorithms
export class ProcessorSchedulingAlgorithm {
  // processes = [{}, {}, {}]
  processes = [];

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

  sortqueue(compare) {
    this.processes.sort(compare);
  }
}

/**
 * Class for the First Come First Serve  algorithm
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
 * Class for the Shortest Job First first algorithm
 */
export class SJF extends ProcessorSchedulingAlgorithm {
  constructor(processes) {
    super(processes);
    this.queue = this.processes.slice();
    this.currentpostion = {};
    this.sortedposition = {};
  }

  dequeue() {
    let element = this.queue.pop();
    return element;
  }

  enqueue(element) {
    this.queue.unshift(element);
  }

  queuesort() {
    this.queue.sort((a, b) => b.burstTime - a.burstTime);
    console.log(this.processes);
    for (let process of this.queue) {
      console.log(process);
    }
  }

  /**
   * Animates the Initial Shuffling Process for SJF
   * @returns
   */
  assessQueue() {
    this.queuesort();
    let queueing = [];

    // const shift = 100;

    for (let i = 0; i < this.queue.length; i++) {
      this.currentpostion["i" + String(i)] = this.processes[i].pid;
      this.sortedposition["i" + String(i)] = this.queue[i].pid;
    }

    // for (let process of this.processes) {
    //   queueing.add(EnterQueue(".p" + process.pid, position));
    // }

    return queueing;
  }

  generateTimeline() {
    var tmline = [];
    var iteration = 1;
    const distanceTOCPU = 350,
      shift = 100;

    this.queuesort();

    while (this.queue.length != 0) {
      let element = this.dequeue();
      let name = ".p" + String(element.pid);

      let minitl = [];
      minitl.push(
        enterProc(name, 1500, distanceTOCPU + (iteration - 1) * shift, 0.8)
      );
      for (let i = 0; i < this.queue.length; i++) {
        minitl.push(
          shiftinQueue(".p" + String(this.queue[i].pid), 500, iteration * shift)
        );
      }
      minitl.push(inProc(name, element.burstTime));
      minitl.push(leaveProcDisperse(name));
      tmline = tmline.concat(minitl);
      iteration++;
      console.log(this.queue);
      for (let process of this.queue) {
        console.log(process);
      }
    }

    return tmline;
  }
}

/**
 * Class for the Round Robin algorithm
 */
// export class RoundRobin extends ProcessorSchedulingAlgorithm {
//   queue = [];
//   finished = [];

//   constructor(processes) {
//     super(processes);
//     this.queue = this.processes;
//   }

//   dequeue() {
//     element = this.queue[0];
//     this.queue = this.queue.slice(1);
//     return element;
//   }

//   enqueue(element) {
//     this.queue.push(element);
//   }

//   queuesort() {
//     this.queue.sort((a, b) => a.burstTime - b.burstTime);
//   }

//   /**
//    * Animates the Initial Queueing Process for SJF
//    * @returns
//    */
//   assessQueue() {
//     let queueing = [];

//     this.queuesort();
//     for (let process of this.processes) {
//       queueing.add(EnterQueue(".p" + process.pid, position));
//     }

//     return queueing;
//   }

//   generateTimeline(duration) {
//     var tmline = timeline({
//       autoplay: false,
//       easing: "linear",
//       duration: duration,
//     });

//     let set_up = assessQueue();

//     for (let i = 0; i < set_up.length; i++) {
//       tmline.add(set_up[i]);
//     }

//     while (this.queue.length != 0) {
//       let element = this.dequeue();
//       tmline.add(GoToCPU(element));
//       tmline.add(ProcessTime(element));
//       tmline.add(LeaveCPU(element));
//     }

//     return tmline;
//   }
// }

/**
 * Class for the priority scheduling algorithm
 */
export class PriorityScheduling extends ProcessorSchedulingAlgorithm {
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

  compare() {
    (a, b) => a.burstTime - b.burstTime;
  }
}

/**
 * Class for the shortest remaining time algorithm
 */
export class ShortestRemainingTime extends ProcessorSchedulingAlgorithm {}
