export const schedulingAlgorithms = [
  {
    text: "First Come First Served",
    value: "fcfs",
  },
  {
    text: "Priority Scheduling",
    value: "priority_scheduling",
  },
  {
    text: "Round Robin",
    value: "round_robin",
  },
  {
    text: "Shortest Job First",
    value: "shortest_job",
  },
];

export const algorithmDetails = {
  fcfs: {
    name: "First Come First Served",
    description: `For this algorithm as the name suggests, processes are executed in the order in which they enter the ready queue no matter what their priority is or their burst time. This algorithm is a non-preemptive algorithm meaning that once a process enters the processor for execution it will keep the processor busy until the process is terminated. This algorithm is implemented with the use of a First In First Out (FIFO) queue and is very easy to implement`,
    pros: ["Simple and easy to Understand"],
    cons: [
      "The process with less execution time suffers because waiting time is long.",
      "The first process will get the CPU first, other processes can get the CPU only after the current process has finished its execution. Now, suppose the first process has large burst time, and other processes have less burst time, then the processes will have to wait more unnecessarily, this will result in more average waiting time.This effect results in lower CPU and device utilization.",
      "The FCFS algorithm is particularly troublesome for time-sharing systems, where it is important that each user get a share of the CPU at regular intervals",
    ],
    gif: "../assets/FSFS.gif",
  },

  priority_scheduling: {
    name: "Priority Scheduling",
    description: `This scheduling algorithm ensures that each process has a priority associated with it and based on the priority, the processor will execute the highest priority process in the ready queue. However,if two processes in the ready queue have the same priority, the processor then executes these processes on a first come first serve basis. Priorities can be represented in both ascending and descending order. This type of algorithm is non-preemptive. `,
    pros: ["The importance of each process may be precisely defined."],
    cons: [
      "If high priority processes use up a lot of CPU time, lower priority processes may starve and be postponed indefinitely. ",
      "Deciding which process gets which priority level assigned to it can be problematic.",
    ],
    gif: "../assets/Priority.gif",
  },

  round_robin: {
    name: "Round Robin",
    description: `This type of scheduling algorithm executes in a cycle. In this technique a fixed time is given, known as a quantum, for which the processor will be allocated for the execution of a process only for that set quantum amount of time. Each process is allowed the opportunity to be executed as the processes take turns processing for that set quantum. If the burst time of the running process exceeds the quantum time, that process will execute for the quantum time then re-enter the ready queue for processing again. This is a type of preemptive algorithm in which context switching takes place to allow for the saving of a process state.`,
    pros: [
      "Each process receives equal shares of the CPU and due to the cyclic nature of the Round Robin, there is no starvation",
    ],
    cons: [
      "The average waiting time while using a Round Robin is often times long.",
      "By making the quantum too short, this can lead to an increase in the overhead and a decrease in the CPU's efficiency. Likewise, by making it too long can cause poor responses to short processes",
    ],
    gif: "../assets/RoundRobin.gif",
  },

  shortest_job_first: {
    name: "Shortest Job First",
    description: `Also known as Shortest Job Next, in the scheduling algorithm the process with the lowest burst time in the ready queue will be executed first by the processor. This is a type of non-preemptive algorithm meaning that, like the FCFS algorithm, once a process enters the processor for execution, it will keep the processor busy until the process terminates.`,
    pros: [
      "Shortest jobs are favored.",
      "It gives the minimum average waiting time for a given set of processes.",
    ],
    cons: [
      "SJF may cause starvation, if shorter processes keep coming.",
      "It cannot be implemented at the level of short term CPU scheduling.",
    ],
    gif: "../assets/SJF.gif",
  },
};
