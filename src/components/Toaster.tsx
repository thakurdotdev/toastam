import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/toast.css";
import {
  toastManager,
  Toast as ToastType,
  ToastPosition,
} from "../context/ToastManager";

interface ToasterProps {
  position?: ToastPosition;
  duration?: number;
  styleVariant?: "normal" | "sharp";
}

const Toast: React.FC<
  ToastType & { duration: number; styleVariant?: "normal" | "sharp" }
> = React.memo(({ message, variant, styleVariant = "normal" }) => {
  return (
    <div
      className={`${styleVariant === "sharp" ? "toast-sharp" : "toast"} ${
        styleVariant === "sharp" ? `toast-${variant}-sharp` : `toast-${variant}`
      }`}
    >
      <span>{message}</span>
    </div>
  );
});

export const Toaster: React.FC<ToasterProps> = ({
  position = "top-right",
  duration = 3000,
  styleVariant = "normal",
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const toasterRoot = React.useRef<HTMLDivElement | null>(null);

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

    return () => {
      toastManager.subscribe(handleToastsChange);
    };
  }, [position, duration]);

  const toasterContent = (
    <div className={`toaster-container toaster-${position}`}>
      <TransitionGroup className="toast-stack">
        {toasts.map((toast) => (
          <CSSTransition key={toast.id} timeout={400} classNames="toast">
            <Toast {...toast} duration={duration} styleVariant={styleVariant} />
          </CSSTransition>
        ))}
      </TransitionGroup>
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
};
