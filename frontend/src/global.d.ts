declare global {
  interface Window {
    toast: (props: ToastProps) => void;
    goto: goto;
    sendNotification: sendNotification;
    setProgress: setProgress;
    rconDisconnected: rconDisconnected;
    updateRcon: updateRcon;
  }
}

export {};
