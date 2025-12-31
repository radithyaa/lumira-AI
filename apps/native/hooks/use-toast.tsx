import { useToast as useHeroToast } from "heroui-native";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react-native";

// Helper to extract options type from the original toast.show function
type ToastOptions = NonNullable<
  Parameters<ReturnType<typeof useHeroToast>["toast"]["show"]>[0]
>;
type ToastMessage = string | ToastOptions;

// Define a custom hook that wraps HeroUI's useToast
export function useToast() {
  const { toast: heroToast, ...rest } = useHeroToast();

  const toast = (message: ToastMessage) => {
    if (typeof message === "string") {
      heroToast.show({ label: message });
    } else {
      heroToast.show(message);
    }
  };

  toast.success = (
    label: string,
    options?: Omit<ToastOptions, "variant" | "label">
  ) => {
    heroToast.show({
      ...options,
      label,
      variant: "success",
      icon: <CheckCircle />,
    });
  };

  toast.error = (
    label: string,
    options?: Omit<ToastOptions, "variant" | "label">
  ) => {
    heroToast.show({
      ...options,
      label,
      variant: "danger", // HeroUI uses 'danger' for error
      icon: <AlertCircle className="text-red-500" />,
    });
  };

  toast.info = (
    label: string,
    options?: Omit<ToastOptions, "variant" | "label">
  ) => {
    heroToast.show({
      ...options,
      label,
      variant: "accent", // Using 'accent' for info, as it's a neutral theme color
      icon: <Info className="text-accent" />,
    });
  };

  toast.warning = (
    label: string,
    options?: Omit<ToastOptions, "variant" | "label">
  ) => {
    heroToast.show({
      ...options,
      label,
      variant: "warning",
      icon: <AlertTriangle className="text-yellow-500" />,
    });
  };

  return { toast, ...rest };
}
