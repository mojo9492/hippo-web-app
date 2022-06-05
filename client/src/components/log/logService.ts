import { PatientRecord } from "../../models";
import { RECORDBYPATIENT_URL, RECORD_URL } from "../../assets/constants";
import client from "../../assets/client";

export async function getEntriesByPatientId(patientId: number) {
  try {
    const response = await client.get<PatientRecord[]>(
      `${RECORDBYPATIENT_URL}/${patientId}`
    );
    if (!response) {
      throw new Error("could not find posts");
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) throw error;
  }
}

export async function postRecord(record: PatientRecord) {
  try {
    const response = await client.post<PatientRecord>(RECORD_URL, record);
    if (response.status !== 200) {
      throw new Error("could not add post: " + response.statusText);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) throw error;
  }
}

export async function deleteEntry(id: string) {
  try {
    const deleteResult = await client.delete(`${RECORD_URL}/${id}/delete`);
    if (deleteResult.status !== 204) {
      throw new Error("could not delete post: " + deleteResult.statusText);
    }

    return deleteResult.data;
  } catch (error) {
    if (error instanceof Error) throw error;
  }
}
