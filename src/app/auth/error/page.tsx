"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div>
      <h1>Hiba történt!</h1>
      <p>Kód: {error}</p>
      {error === "CredentialsSignin" && <p>Hibás email vagy jelszó.</p>}
    </div>
  );
}
