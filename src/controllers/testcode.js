import { FCFS } from "./processorAlgos.js";

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
  let queue = new FCFS(processes);
  let mytest = queue.generateTimeline();
  console.log(processes);
  console.log(mytest);
  return "Just a test";
};

const bob = testing();
console.log(bob);
