"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/src/components/toast";
import { useToast } from "@/src/hooks/use-toast";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

export function NotificationToast() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        // Determine icon based on variant
        let Icon = Info;
        let iconColor = "text-blue-500";

        if (props.variant === "destructive") {
          Icon = XCircle;
          iconColor = "text-red-500";
        } else if (props.variant === "success") {
          Icon = CheckCircle;
          iconColor = "text-green-500";
        } else if (props.variant === "warning") {
          Icon = AlertCircle;
          iconColor = "text-amber-500";
        }

        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-3">
              <div className={`${iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
