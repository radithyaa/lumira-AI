import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// components/Screen.tsx - Custom wrapper
export function KeyboardScreen({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ flexGrow: 1 }}
      enableAutomaticScroll={true}
      enableOnAndroid={true}
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
