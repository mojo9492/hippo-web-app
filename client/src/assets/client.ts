import axios from "axios";
import { authHeader } from "../services/auth.service";

function hippoClient() {
  return axios.create({
    headers: authHeader(),
  });
}

export default hippoClient();
