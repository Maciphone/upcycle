"use client";

import SignInPage from "@/components/SignInPage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState(null);
  const userSession = useSession();
  console.log("User session:", userSession);

  useEffect(() => {
    console.log("SignIn component mounted");
    // Simulate fetching user data
    const fetchUser = async () => {
      const response = await fetch("/api/userData/profile");
      const data = await response.json();
      setUser(data);
      console.log("Fetched user data:", data);
    };

    fetchUser();
  }, [userSession.status, userSession.data]);

  return <SignInPage />;
}
