import client from "@/assets/client";
import { CAREGIVERBYUSER_URL, PATIENTBYCAREGIVER_URL, PATIENTBYUSER_URL } from "../assets/constants";
import { Caregiver, Patient } from "../models";

export const getCaregiverByUserId = async (userId: number) => {
    const response = await client.get<Caregiver>(
        `${CAREGIVERBYUSER_URL}/${userId}`
    );
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return response.data;
};

export const getPatientsByUserId = async (userId: number) => {
    const response = await client.get<Patient[]>(
        `${PATIENTBYUSER_URL}/${userId}`
    );

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return response.data;
};
export interface IAPIPatient {
    user: {
        first: string;
        last: string;
        email: string;
    }
    patient: Patient
}


export const getPatientsByCaregiverId = async (caregiverId: number) => {
    const response = await client.get<IAPIPatient[]>(
        `${PATIENTBYCAREGIVER_URL}/${caregiverId}`
    );

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return response.data;
}
