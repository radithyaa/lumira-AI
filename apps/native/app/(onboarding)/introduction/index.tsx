import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import { KeyboardScreen } from "@/components/KeyboardScreen";
import { ControlledInput } from "@/components/rhf/controlled-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAppToast } from "@/components/ui/toast";
// import { useToast } from "@/hooks/use-toast";
import { database } from "@/lib/db"; // Import WatermelonDB instance
import { sync } from "@/lib/db/sync"; // Import sync function

// import { Toast, useToast } from 'heroui-native';

// import { KeyboardAvoidingView } from "react-native-keyboard-controller";

// 1. Definisikan skema validasi dengan Zod
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.coerce
    .number({ error: "Age must be a number" })
    .positive("Age must be a positive number")
    .int(),
  interest: z.string().min(5, "Interest must be at least 5 characters"),
  dreamJob: z.string().min(5, "Dream job must be at least 5 characters"),
});

export default function IntroductionPage() {
  const toast = useAppToast();
  const router = useRouter();

  // 2. Setup React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      age: undefined,
      interest: "",
      dreamJob: "",
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  // 3. Buat fungsi untuk handle submit
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // form.formState.isSubmitting = true;
    console.log("Form submitted successfully:", data);
    try {
      await database.write(async () => {
        // Find existing profile for the current user (if any)
        // For simplicity, we assume one profile per user. The server handles upsert.
        // On client, we either create or update a single profile.
        // WatermelonDB automatically generates a local ID.
        const userProfilesCollection =
          database.collections.get("user_profiles");
        const existingProfile = await userProfilesCollection.query().fetch();

        if (existingProfile.length > 0) {
          // Update existing profile
          await existingProfile[0].update((profile) => {
            profile.name = data.name;
            profile.age = data.age;
            profile.interest = data.interest;
            profile.dreamJob = data.dreamJob;
          });
          console.log("Updated existing user profile:", data);
        } else {
          // Create new profile
          await userProfilesCollection.create((profile) => {
            profile.name = data.name;
            profile.age = data.age;
            profile.interest = data.interest;
            profile.dreamJob = data.dreamJob;
          });
          console.log("Created new user profile:", data);
        }
      });

      // Trigger synchronization after local save
      await sync();
      form.reset();
      toast.success("", "Time to take a long break", {
        duration: 10_000,
      });
      router.replace("/mbti");
    } catch (error) {
      console.error("Failed to save to local DB or sync:", error);
      toast.error(
        "Update failed",
        "there was an error saving your profile, please try again later"
      );
    }
  };

  return (
    <KeyboardScreen>
      <ScrollView
        className="flex-1 bg-cream"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <FormProvider {...form}>
          <View className="flex-1 px-6 py-12">
            {/* Header */}
            <View className="mt-4 mb-8 items-center">
              <Text className="text-center">
                <Text className="font-medium text-2xl text-orange">Start</Text>
                <Text className="font-medium text-2xl text-black">
                  {" "}
                  with the basic
                </Text>
              </Text>
              <Text className="mt-2 px-8 text-center text-alternate text-lg">
                Let's personalize everything just for you.
              </Text>
            </View>

            {/* 4. Ganti Input dengan ControlledInput */}
            <View className="mt-4 gap-6">
              {/* Name */}
              <View>
                <Label className="ml-1 font-medium text-lg" nativeID="name">
                  Your Name
                </Label>
                <ControlledInput
                  name="name"
                  nativeID="name"
                  placeholder="Muhammad Sultan"
                />
              </View>

              {/* Age */}
              <View>
                <Label className="ml-1 font-medium text-lg" nativeID="age">
                  Your Age
                </Label>
                <ControlledInput
                  keyboardType="numeric"
                  name="age"
                  nativeID="age"
                  placeholder="17"
                />
              </View>

              {/* Interest */}
              <View>
                <Label className="ml-1 font-medium text-lg" nativeID="interest">
                  Interest
                </Label>
                <ControlledInput
                  name="interest"
                  nativeID="interest"
                  placeholder="Coding and UI/UX Design"
                />
              </View>

              {/* Dream Job */}
              <View>
                <Label className="ml-1 font-medium text-lg" nativeID="dreamJob">
                  Dream Job
                </Label>
                <ControlledInput
                  name="dreamJob"
                  nativeID="dreamJob"
                  placeholder="CEO of IT Company"
                />
              </View>
            </View>

            {/* 5. Hubungkan Tombol Continue dengan handleSubmit */}
            <View className="mt-auto pt-10 pb-6">
              <Button
                className="h-16 w-full rounded-full bg-orange shadow-lg"
                disabled={form.formState.isSubmitting}
                onPress={form.handleSubmit(onSubmit)}
              >
                <Text className="font-medium text-lg text-white">Continue</Text>
              </Button>
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </KeyboardScreen>
  );
}
