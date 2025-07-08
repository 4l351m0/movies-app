import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = "success", visible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="w-[200px] bg-[#f0f8ff46] mx-auto my-5 p-2.5 rounded-[7px] top-[15px] text-center">
      <span>{message}</span>
    </div>
  );
} 