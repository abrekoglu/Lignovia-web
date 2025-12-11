import { redirect } from "next/navigation";

export default function LogoutPage() {
  // Server-side redirect to logout API
  redirect("/api/auth/logout");
}
