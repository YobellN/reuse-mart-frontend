import { getUser } from "./get-user";

export default async function redirectMenu(): Promise<string> {
  try {
    const user = await getUser();
    switch (user.data?.role) {
      case "Admin":
        return "/admin";
      case "CS":
        return "/cs";
      case "Gudang":
        return "/gudang";
      case "Penitip":
        return "/penitip";
      case "Organisasi":
        return "/organisasi";
      case "Owner":
        return "/owner";
      case "Pembeli":
        return "/home";
      default:
        return "/login";
    }
  } catch (error) {
    return "error";
  }
}
