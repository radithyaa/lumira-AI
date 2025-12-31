import { Toaster as HeroToaster, useThemeColor } from "heroui-native";
export function Toaster() {
  const { theme } = useThemeColor();
  return (
    <HeroToaster
      position="top-center"
      theme={theme}
      toastOptions={{
        style: {
          // You can add general inline styles here if needed
        },
        className: "bg-card border-border shadow-lg rounded-lg",
        titleClassName: "text-card-foreground font-semibold",
        descriptionClassName: "text-muted-foreground",
        actionButtonClassName: "bg-primary text-primary-foreground",
        cancelButtonClassName: "bg-secondary text-secondary-foreground",
        closeButtonClassName: "text-muted-foreground",
        // Custom variant styles
        success: {
          className: "bg-green-100 border-green-500",
          titleClassName: "text-green-900",
          descriptionClassName: "text-green-800",
        },
        error: {
          className: "bg-red-100 border-red-500",
          titleClassName: "text-red-900",
          descriptionClassName: "text-red-800",
        },
        info: {
          className: "bg-blue-100 border-blue-500",
          titleClassName: "text-blue-900",
          descriptionClassName: "text-blue-800",
        },
        warning: {
          className: "bg-yellow-100 border-yellow-500",
          titleClassName: "text-yellow-900",
          descriptionClassName: "text-yellow-800",
        },
      }}
    />
  );
}
