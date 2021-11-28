export function shuffle(target, duration = 1500, X = 800) {
  return {
    targets: target,
    duration: duration,
    translateX: X,
  };
}

export function enterProc(target, duration = 1500, X = 800, scale = 0.8) {
  return {
    targets: target,
    duration: duration,
    translateX: X,
    scale: scale,
  };
}

export function inProc(target, time = 1) {
  return {
    targets: target + " #proces-body",
    direction: "alternate",
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

export function shiftinQueue(target, duration = 1500, X = 120) {
  return {
    targets: target,
    duration: duration,
    translateX: X,
    easing: "easeInQuad",
  };
}
