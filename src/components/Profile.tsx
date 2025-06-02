import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  console.log("Session data:", session);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not signed in</div>;

  return <div>Hi {session.user?.name}</div>;
}
