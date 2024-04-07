"use client";
import PostButtonAndForm from "@/components/feed/postButtonAndForm";
import Aos from "aos";
import "aos/dist/aos.css";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";
import Astrals from "./astrals";

export default function Feed({
  astrals,
  users,
  likes,
  dislikes,
}: {
  astrals: any[];
  users: any[];
  likes: any[];
  dislikes: any[];
}) {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  React.useEffect(() => {
    if (sessionStatus === "loading") return;
    if (sessionStatus === "unauthenticated") redirect("/login");
  }, [sessionStatus, session]);

  React.useEffect(() => {
    Aos.init({ duration: 1200 });
  });

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <React.Fragment>
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

      <div className="absolute top-6 z-50" data-aos="fadeup">
        <ul
          className="relative rounded-full bg-[#181818] text-[#eee] shadow-xl flex flex-row space-x-8 p-3 w-64 justify-center items-center"
          style={{ fontFamily: "Jetbrains Mono" }}
        >
          <li onClick={() => router.push("/feed")}>Feed</li>
          <li onClick={() => signOut()}>Logout</li>
        </ul>
      </div>
      <PostButtonAndForm />
      <Astrals
        likes={likes}
        astrals={astrals}
        users={users}
        dislikes={dislikes}
        session={session}
      />
    </React.Fragment>
  );
}
