import { getUser, redirectMenu } from "@/services/auth/user-services";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user.data) {
    redirect(await redirectMenu(user.data.role));
  }
  return (
    redirect("/home")
  );
}
