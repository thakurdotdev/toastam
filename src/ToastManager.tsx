export type ToastVariant = "success" | "error" | "info" | "warning";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

type ToastListener = (toasts: Toast[]) => void;

class ToastManager {
  private static instance: ToastManager;
  private toasts: Toast[] = [];
  private listeners: Set<ToastListener> = new Set();
  public defaultDuration: number = 3000;
  public defaultPosition: ToastPosition = "top-right";
  private maxToasts: number = 5;

  private constructor() {}

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  unsubscribe(listener: ToastListener) {
    this.listeners.delete(listener);
  }

  private notify() {
    const toasts = [...this.toasts];
    this.listeners.forEach((listener) => listener(toasts));
  }

  private addToast(message: string, variant: ToastVariant, timeout?: number) {
    const id = Date.now();
    const duration = timeout || this.defaultDuration;

    if (this.toasts.length >= this.maxToasts) {
      this.toasts.shift();
    }

    this.toasts.push({ id, message, variant });
    this.notify();

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  success(message: string, timeout?: number) {
    this.addToast(message, "success", timeout);
  }

  error(message: string, timeout?: number) {
    this.addToast(message, "error", timeout);
  }

  info(message: string, timeout?: number) {
    this.addToast(message, "info", timeout);
  }

  warning(message: string, timeout?: number) {
    this.addToast(message, "warning", timeout);
  }

  setDefaultPosition(position: ToastPosition) {
    this.defaultPosition = position;
  }

  setMaxToasts(max: number) {
    this.maxToasts = max;
  }

  setDefaultDuration(duration: number) {
    this.defaultDuration = duration;
  }
}

export const toastManager = ToastManager.getInstance();
