import { PriorityScheduling } from "./processorAlgos.js";

const testing = function testAlgo() {
  const processes = [
    {
      pid: 1,
      time: 5,
    },
    {
      pid: 2,
      time: 4,
    },
  ];
  console.log(processes);
  let queue = new PriorityScheduling(processes);
  queue.sortqueue((a, b) => a.time - b.time);
  console.log(queue.processes);
  let mytest = queue.generateTimeline();
  console.log(mytest);
  return "Just a test";
};

const bob = testing();
console.log(bob);
