import { API_END } from "../../assets/constants";

// todo only pull users that match userId
export default async function getPatients(userId: number) {
  const response = await fetch(`${API_END}/users`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const patients = await response.json();
  return patients;
}
