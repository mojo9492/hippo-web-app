import axios from "axios";
import {
  ACCESS_STORAGE_KEY,
  LOGIN_URL,
  REFRESH_TOKEN_KEY,
  REGISTER_URL,
} from "../assets/constants";
import { User } from "../models";

export async function login(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const result = await axios.post(LOGIN_URL, {
      email,
      password,
    });
    const { data } = result;
    if (!data.tokens) return;

    localStorage.removeItem(ACCESS_STORAGE_KEY);
    localStorage.setItem(
      ACCESS_STORAGE_KEY,
      JSON.stringify(data.tokens.accessToken)
    );
    localStorage.setItem(REFRESH_TOKEN_KEY, data.tokens.refreshToken);
    return data.user as User;
  } catch (error) {
    if (error instanceof Error) throw error;
  }

}

export async function logout() {
  localStorage.removeItem(ACCESS_STORAGE_KEY);
}

export async function register(user: {
  email: string;
  password: string;
  last: string;
  first: string;
}): Promise<User | undefined> {
  try {
    const { email, password, last, first } = user;
    const res = await axios.post(REGISTER_URL, {
      email,
      password,
      last,
      first,
    });

    if (!res.data.tokens) return;
    const tokens = res.data.tokens;
    localStorage.setItem("user", JSON.stringify(tokens.accessToken));
    return res.data.user as User;
  } catch (error) {
    if (error instanceof Error) throw error;
  }
}

export function authHeader() {
  const item = localStorage.getItem(ACCESS_STORAGE_KEY);
  const accessToken = item ? JSON.parse(item) : "";

  return {
    Authorization: "Bearer " + accessToken,
  };
}
