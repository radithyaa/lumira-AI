import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native"; // Add ScrollView and Image
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client"; // Import authClient

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [email, setEmail] = useState(""); // Add email state
  const [password, setPassword] = useState(""); // Add password state
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const [confirmPassword, setConfirmPassword] = useState(""); // Add confirm password state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSignUp() {
    setIsLoading(true);
    setError(null);
    const name = email.split("@")[0];

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions.");
      setIsLoading(false);
      return;
    }

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError(err) {
          setError(err.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess() {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          router.replace("/sign-in"); // Redirect to sign-in after successful sign-up
        },
        onFinished() {
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Content Section */}
      <View className="mt-10 flex-1 px-6 pt-8 pb-10">
        <View className="mb-8 items-center">
          <Text className="text-center font-medium text-2xl">
            <Text className="font-medium text-orange" variant={"h3"}>
              One step {""}
            </Text>
            <Text className="font-medium" variant={"h3"}>
              today, a clearer direction tomorrow
            </Text>
          </Text>
        </View>

        {/* Form */}
        <View className="gap-2">
          {/* Email */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Email ID</Label>
            <Input
              autoCapitalize="none"
              className="rounded-2xl px-4 text-base shadow-sm"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Enter Email ID"
              placeholderTextColor="#7e7e7e"
              value={email}
            />
          </View>

          {/* Password */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Password</Label>
            <View className="relative justify-center">
              <Input
                className="rounded-2xl px-4 pr-12 text-base shadow-sm"
                onChangeText={setPassword}
                placeholder="Enter Password"
                placeholderTextColor="#7e7e7e"
                secureTextEntry={!showPassword}
                value={password}
              />
              <Pressable
                className="absolute right-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff color="#ff8225" size={24} />
                ) : (
                  <Eye color="#ff8225" size={24} />
                )}
              </Pressable>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Confirm Password</Label>
            <View className="relative justify-center">
              <Input
                className="rounded-2xl px-4 pr-12 text-base shadow-sm"
                onChangeText={setConfirmPassword}
                placeholder="Enter Password"
                placeholderTextColor="#7e7e7e"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
              />
              <Pressable
                className="absolute right-4"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff color="#ff8225" size={24} />
                ) : (
                  <Eye color="#ff8225" size={24} />
                )}
              </Pressable>
            </View>
          </View>

          {/* Remember Me */}
          <View className="ml-1 flex-row items-center gap-2">
            <Checkbox checked={agreeTerms} onCheckedChange={setAgreeTerms} />
            <Text className="font-regular text-sm">
              I Agree with the Terms and Conditions
            </Text>
          </View>

          {error ? (
            <View className="mb-4 flex h-16 justify-center rounded-lg bg-red-100 p-3">
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          ) : null}

          {/* Sign In Button */}
          <Button
            className="mt-4 w-full rounded-full shadow-inner"
            disabled={
              isLoading ||
              !email ||
              !password ||
              !agreeTerms ||
              !confirmPassword ||
              password !== confirmPassword
            }
            onPress={handleSignUp}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="font-medium text-lg text-white">Sign In</Text>
            )}
          </Button>
        </View>

        {/* Footer Link */}
        <View className="mt-auto flex-row items-center justify-center pt-8">
          <Text className="text-sm">Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="font-medium text-orange text-sm">Sign In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
