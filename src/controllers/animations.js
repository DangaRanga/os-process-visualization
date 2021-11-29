export function shuffle(target, duration = 1500, Y = 800, offset = "0") {
  return {
    targets: target,
    duration: duration,
    translateY: Y,
    offset: offset,
  };
}

export function enterProc(target, duration = 1500, X = 800, scale = 0.8) {
  return {
    targets: target,
    duration: duration,
    translateX: X,
    scale: scale,
    easing: "linear",
  };
}

export function inProc(target, time = 1) {
  return {
    targets: target + " #proces-body",
    rotate: {
      value: 360 * time,
      duration: 1000 * time,
      easing: "linear",
    },
    background: {
      value: "#f96",
      duration: 500,
      easing: "linear",
    },
  };
}

export function leaveProcDisperse(target, duration = 1500) {
  return {
    targets: target,
    // translateX: X,
    direction: "alternate",
    opacity: {
      value: 0,
      duration: duration / 10,
    },
    duration: duration,
    easing: "easeInQuad",
  };
}

export function shiftinQueue(target, duration = 1500, Y = 120) {
  return {
    targets: target,
    duration: duration,
    translateY: Y,
    easing: "easeInQuad",
  };
}

export function changeState(target) {
  return {
    targets: target + " #proces-body",
    background: {
      value: "#df4f4f",
      easing: "linear",
    },
    scale: 1.2,
    duration: 500,
  };
}

export function renterQueue(target, duration = 1500, X = 0, Y = 120) {
  return {
    targets: target,
    duration: duration,
    translateX: X,
    translateY: Y,
    easing: "linear",
  };
}
