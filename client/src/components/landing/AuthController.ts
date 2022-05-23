import { User } from "../../models";
import { API_END } from "../../assets/constants";

export default async function login(
  email: string,
  password: string
): Promise<User | undefined> {
  const response = await fetch(`${API_END}/user/${email}`, {
    method: "GET",
    headers: {
      // todo will add additional JWT token
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  });
  if (!response.ok) return;

  const user = await response.json();

  if (!user.id) return;

  localStorage.setItem("token", btoa(`${email}:${password}`));
  return user;
}
