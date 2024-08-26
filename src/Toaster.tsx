import * as React from "react";
import { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom";
import "./toast.css";
import {
  toastManager,
  Toast as ToastType,
  ToastPosition,
} from "./ToastManager";

interface ToasterProps {
  position?: ToastPosition;
  duration?: number;
  styleVariant?: "normal" | "sharp";
}

interface ToastProps extends ToastType {
  duration: number;
  styleVariant?: "normal" | "sharp";
  onRemove: () => void;
}

const Toast: React.FC<ToastProps> = React.memo(
  ({ message, variant, duration, styleVariant = "normal", onRemove }) => {
    const [animationState, setAnimationState] = useState<
      "enter" | "idle" | "exit"
    >("enter");
    const removeTimeoutRef = useRef<number>();

    useEffect(() => {
      const enterTimeout = window.setTimeout(() => {
        setAnimationState("idle");
      }, 10);

      removeTimeoutRef.current = window.setTimeout(() => {
        setAnimationState("exit");
      }, duration);

      return () => {
        window.clearTimeout(enterTimeout);
        if (removeTimeoutRef.current) {
          window.clearTimeout(removeTimeoutRef.current);
        }
      };
    }, [duration]);

    useEffect(() => {
      if (animationState === "exit") {
        const exitTimeout = window.setTimeout(onRemove, 400);
        return () => window.clearTimeout(exitTimeout);
      }
    }, [animationState, onRemove]);

    const baseClass = styleVariant === "sharp" ? "toast-sharp" : "toast";
    const variantClass =
      styleVariant === "sharp" ? `toast-${variant}-sharp` : `toast-${variant}`;
    const animationClass =
      animationState === "enter"
        ? "toast-enter"
        : animationState === "exit"
        ? "toast-exit"
        : "";

    return (
      <div className={`${baseClass} ${variantClass} ${animationClass}`}>
        <span>{message}</span>
      </div>
    );
  },
);

export const Toaster: React.FC<ToasterProps> = ({
  position = "top-right",
  duration = 3000,
  styleVariant = "normal",
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const toasterRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!toasterRoot.current) {
      const root = document.createElement("div");
      root.id = "toaster-root";
      document.body.appendChild(root);
      toasterRoot.current = root;
    }

    toastManager.setDefaultPosition(position);
    toastManager.setDefaultDuration(duration);

    const handleToastsChange = (newToasts: ToastType[]) => {
      setToasts(newToasts);
    };

    toastManager.subscribe(handleToastsChange);

    return () => {
      toastManager.unsubscribe(handleToastsChange);
    };
  }, [position, duration]);

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toasterContent = (
    <div className={`toaster-container toaster-${position}`}>
      <div className="toast-stack">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            duration={duration}
            styleVariant={styleVariant}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );

  return toasterRoot.current
    ? ReactDOM.createPortal(toasterContent, toasterRoot.current)
    : null;
};

export const toast = {
  success: (message: string, timeout?: number) =>
    toastManager.success(message, timeout),
  error: (message: string, timeout?: number) =>
    toastManager.error(message, timeout),
  info: (message: string, timeout?: number) =>
    toastManager.info(message, timeout),
  warning: (message: string, timeout?: number) =>
    toastManager.warning(message, timeout),
};
