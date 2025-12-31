import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { isFirstLaunch, markLaunched } from "@/lib/first-launch";

export default function Index() {
  const { data: session, isPending } = authClient.useSession();
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) {
      return;
    }

    (async () => {
      try {
        const first = await isFirstLaunch();
        // onboarding
        if (first) {
          console.log("first launch");
          await markLaunched();
          setTarget("/onboarding");
          return;
        }

        if (!session) {
          setTarget("/home");
          return;
        }

        setTarget("/home");
        return;

        // 🔐 Auth routing
      } catch (e) {
        console.error("index routing error", e);
        setTarget("/home");
      }
    })();
  }, [isPending, session]);

  if (!target) {
    return null; // splash / loading
  }

  return <Redirect href={target} />;
}
