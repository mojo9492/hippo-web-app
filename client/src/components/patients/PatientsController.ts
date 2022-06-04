import axios from "axios";
import { PATIENTBYUSER_URL } from "../../assets/constants";
import { Patient } from '@/models'
import { authHeader } from "../../services/auth.service";

// todo only pull users that match userId
export default async function getPatients(userId: number) {
    const response = await axios.get(`${PATIENTBYUSER_URL}/${userId}`, {
        headers: authHeader(),
    });

    if (!response.data) {
        throw new Error(response.data);
    }

    return response.data as Patient[];
}
