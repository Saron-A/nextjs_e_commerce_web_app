import { User } from "@/types/user";

interface UserProps {
  user: User;
}

const fetchAllUsers = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/users");

  if (!response.ok) {
    throw new Error(`HTTP ERROR: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const createUser = async (user: User) => {
  const response = await fetch("https://api.escuelajs.co/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response;
};

const loginUser = async ({ user }: UserProps) => {
  const { email, password } = user;

  const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  // the data is access and refresh token, not the user data

  if (!response.ok) {
    throw new Error(`Invalid Email or Password`);
  }
  console.log("Tokens", data);
  // find the user's full info from the backend

  const allUsers = await fetchAllUsers();

  // user data - store it in userStore and make the other component use it
  const checkUserMatch = allUsers.find((user: User) => user.email === email);
  if (!checkUserMatch) {
    return "User doesn't exist";
  }

  if (checkUserMatch.password !== password) {
    return "Invalid credentials";
  }

  const finalResponseObject = {
    ...checkUserMatch,
    ...data,
  };
  return finalResponseObject;
};

// const getUserByEmail = ({ user }: UserProps) => {};

export { createUser, fetchAllUsers, loginUser };
