export default function validateForm(
  email: string,
  password: string,
  lastName: string,
  firstName: string
) {
  try {
    if (email.length) {
      throw new Error("Email is required");
    }
    if (password.length) {
      throw new Error("Password is required");
    }
    if (lastName.length) {
      throw new Error("Last name is required");
    }
    if (firstName.length) {
      throw new Error("First name is required");
    }
    return true;
  } catch (error) {
    return false;
  }
}
