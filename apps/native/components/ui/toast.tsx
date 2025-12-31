import { Image } from "expo-image";
import {
  Toast,
  type ToastProps,
  type ToastShowOptions,
  useToast,
} from "heroui-native";
import { X } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

const iconSource = require("@/assets/images/icon.png");

// Extract the props that are passed to custom component
type ToastComponentProps = Parameters<
  NonNullable<Extract<ToastShowOptions, { component?: any }>["component"]>
>[0];

// Props for custom toast content
interface CustomToastContentProps {
  title: string;
  description?: string;
}

// Complete props including all Toast props and hide function
type CustomToastProps = CustomToastContentProps &
  ToastComponentProps &
  Partial<ToastProps>;

// Reusable function to render custom toast UI
const renderCustomToast = ({
  title,
  description,
  hide,
  variant = "default",
  placement = "top",
  isSwipeable = true,
  animation,
  isAnimatedStyleActive = true,
  className,
  ...restProps
}: CustomToastProps) => {
  return (
    <Toast
      animation={animation}
      className={`w-full rounded-2xl border border-[#EBEBEB] bg-white p-4 shadow-lg ${className || ""}`}
      isAnimatedStyleActive={isAnimatedStyleActive}
      isSwipeable={isSwipeable}
      placement={placement}
      variant={variant}
      {...restProps}
    >
      <View className="flex flex-row items-center gap-3">
        {/* App Icon */}
        <Image
          contentFit="cover"
          source={iconSource}
          style={{ height: 47, width: 47, borderRadius: 7 }}
        />

        {/* Text Content */}
        <View className="flex-1">
          <Toast.Title className="font-semibold text-black">
            {title}
          </Toast.Title>
          {description && (
            <Toast.Description className="text-gray-500 text-sm">
              {description}
            </Toast.Description>
          )}
        </View>

        {/* Close Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-1"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            if (hide && typeof hide === "function") {
              hide();
            }
          }}
        >
          <X className="text-gray-400" size={18} />
        </TouchableOpacity>
      </View>
    </Toast>
  );
};

// Options for showing custom toast
interface ShowCustomToastOptions extends CustomToastContentProps {
  // Allow all Toast props to be passed
  toastProps?: Partial<ToastProps>;
  // Duration and callbacks from ToastShowOptions
  duration?: number | "persistent";
  onShow?: () => void;
  onHide?: () => void;
}

export function useAppToast() {
  const { toast, isToastVisible } = useToast();

  /**
   * Show a custom toast with your app's design
   * @param options - Toast configuration including title, description, and all Toast props
   * @returns Toast ID
   */
  const showCustomToast = (options: ShowCustomToastOptions): string => {
    const {
      title,
      description,
      toastProps = {},
      duration,
      onShow,
      onHide,
    } = options;

    return toast.show({
      duration,
      onShow,
      onHide,
      component: (componentProps) => {
        return renderCustomToast({
          title,
          description,
          ...componentProps,
          ...toastProps, // Allow override of Toast props
        });
      },
    });
  };

  /**
   * Show a success toast
   */
  const success = (
    title: string,
    description?: string,
    options?: Omit<ShowCustomToastOptions, "title" | "description">
  ): string => {
    return showCustomToast({
      title,
      description,
      ...options,
      toastProps: {
        variant: "success",
        ...options?.toastProps,
      },
    });
  };

  /**
   * Show an error toast
   */
  const error = (
    title: string,
    description?: string,
    options?: Omit<ShowCustomToastOptions, "title" | "description">
  ): string => {
    return showCustomToast({
      title,
      description,
      ...options,
      toastProps: {
        variant: "danger",
        ...options?.toastProps,
      },
    });
  };

  /**
   * Show an info toast
   */
  const info = (
    title: string,
    description?: string,
    options?: Omit<ShowCustomToastOptions, "title" | "description">
  ): string => {
    return showCustomToast({
      title,
      description,
      ...options,
      toastProps: {
        variant: "default",
        ...options?.toastProps,
      },
    });
  };

  /**
   * Show a warning toast
   */
  const warning = (
    title: string,
    description?: string,
    options?: Omit<ShowCustomToastOptions, "title" | "description">
  ): string => {
    return showCustomToast({
      title,
      description,
      ...options,
      toastProps: {
        variant: "warning",
        ...options?.toastProps,
      },
    });
  };

  /**
   * Hide toast(s)
   * @param ids - Optional ID(s) to hide. No argument hides last toast, 'all' hides all toasts
   */
  const hide = (ids?: string | string[] | "all") => {
    toast.hide(ids);
  };

  /**
   * Show toast using native API (for advanced usage)
   */
  const show = (options: string | ToastShowOptions): string => {
    return toast.show(options);
  };

  return {
    // Custom methods
    showCustomToast,
    success,
    error,
    info,
    warning,

    // Native toast methods
    show,
    hide,

    // State
    isToastVisible,

    // Raw toast manager (for advanced usage)
    toast,
  };
}
