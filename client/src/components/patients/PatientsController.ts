import { MBP_END } from "../../models/Core";

// todo only pull users that match userId
export default async function getPatients(userId: number) {
  const response = await fetch(`${MBP_END}/users`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const patients = await response.json();
  return patients;
}
