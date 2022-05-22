import { User } from "../../models";
import { MBP_END } from "../../models/Core";

export default async function login(
  email: string,
  password: string
): Promise<User | undefined> {
  const response = await fetch(`${MBP_END}/user/${email}`, {
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
