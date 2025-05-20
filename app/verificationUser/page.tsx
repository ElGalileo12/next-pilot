"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMemberRole } from "@/app/lib/actions";
import { useUser } from "@stackframe/stack";

export default function Dashboard() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const checkVerification = async () => {
      const code = getCookie("invitation_code");

      if (code) {
        router.replace(`/auth/verificationTeam?code=${code}`);
        return;
      }
      console.log("User:", user);

      if (user?.id) {
        const memberRole = await getMemberRole(user.id);

        if (memberRole === "admin") {
          router.replace(`/dashboard`);
        } else {
          router.replace("/grandstand");
        }
      }
    };

    checkVerification();
  }, [user]);

  return <div>Redirigiendo...</div>;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
