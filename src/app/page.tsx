import { redirect } from "next/navigation";

export default function Page() {
  return redirect("/auth/sign-in");
}
