"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role?.roleName === "vendor") {
      router.push("/myOrders");
    } else if (session?.user?.role?.roleName === "customer") {
      router.push("/explore");
    }
  }, [session, router]);

  return <main className="h-screen"></main>;
}
