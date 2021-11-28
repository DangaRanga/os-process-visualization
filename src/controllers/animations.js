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
    targets: target,
    direction: "alternate",
    rotate: {
      value: 360 * time,
      duration: 500 * time,
      easing: "linear",
    },
    borderRadius: 50,
  };
}

export function leaveProcDisperse(target, duration = 1500, X = 900) {
  return {
    targets: target,
    translateX: X,
    direction: "alternate",
    opacity: 0,
    duration: duration,
  };
}

export function shiftinQueue(target, duration = 1500, X = 120) {
  return {
    targets: target,
    duration: duration,
    translateX: X,
  };
}
