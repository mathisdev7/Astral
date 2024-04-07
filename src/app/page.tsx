"use client";
import { ModeToggle } from "@/components/ui/toogle-mode";
import AOS from "aos";
import "aos/dist/aos.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (sessionStatus === "loading") return;
    if (sessionStatus === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [sessionStatus, session]);

  React.useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center h-screen justify-between dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Anta&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
        rel="stylesheet"
      />
      <div className="absolute right-4 z-10 top-4">
        <ModeToggle />
      </div>
      <div className="relative top-6 z-50">
        {isAuthenticated ? (
          <ul
            className="relative rounded-full bg-[#181818] text-[#eee] shadow-xl flex flex-row space-x-8 p-3 w-64 justify-center items-center"
            style={{ fontFamily: "Jetbrains Mono" }}
          >
            <li onClick={() => router.push("/feed")}>Feed</li>
            <li onClick={() => signOut()}>Logout</li>
          </ul>
        ) : (
          <ul
            className="relative rounded-full bg-[#181818] text-[#eee] shadow-xl flex flex-row space-x-8 p-3 w-64 justify-center items-center"
            style={{ fontFamily: "Jetbrains Mono" }}
          >
            <li onClick={() => router.push("/register")}>Register</li>
            <li onClick={() => router.push("/login")}>Login</li>
          </ul>
        )}
      </div>
      <div className="justify-center items-center z-50 h-1/2">
        <div className="flex flex-col items-center justify-center z-50">
          <h1
            data-aos="fadeup"
            className="text-6xl font-bold dark:text-[#eee] text-[#181818] font-anta"
          >
            Welcome to Astra
          </h1>
          <p
            data-aos="fadeup"
            className="text-lg dark:text-[#eee] text-[#181818] font-roboto-condensed"
          >
            The best place to chat with your friends
          </p>
        </div>
      </div>
    </main>
  );
}
