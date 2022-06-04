import { PatientRecord } from "../../models";
import { API_END, RECORDBYPATIENT_URL } from "../../assets/constants";
import axios from "axios";
import { authHeader } from "@/services/auth.service";

export async function getEntriesByPatientId(patientId: number): Promise<PatientRecord[]> {
  const response = await axios.get<PatientRecord[]>(`${RECORDBYPATIENT_URL}/${patientId}`, {
    headers: authHeader()
  });
  if (!response) {
    throw new Error("could not find posts");
  }
  return response.data;
}

export async function postEntry(post: PatientRecord) {
  const response = await fetch(`${API_END}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error("could not add post: " + data.body);
  }
  return await response.json();
}

export async function deleteEntry(id: string) {
  const deleteResult = await fetch(`${API_END}/post/${id}`, {
    method: "DELETE",
  });
  if (!deleteResult.ok) {
    const { body } = await deleteResult.json();
    const error = new Error();
    error.name = "Delete Post" + id;
    error.message = "could not delete post" + body;
    throw error;
  }
  return await deleteResult.json();
}
