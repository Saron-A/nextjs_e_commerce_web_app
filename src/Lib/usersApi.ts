import { User } from "@/types/user";

interface UserProps {
  user: User;
}

const fetchAllProducts = async () => {
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
  const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Invalid Email or Password`);
  }
  return data;
  //   const checkUserMatch = users.find((user: User) => user.email === email);
  //   if (!checkUserMatch) {
  //     return "User doesn't exist";
  //   }

  //   if (checkUserMatch.password === password) {
  //     return checkUserMatch;
  //   }

  //   return "Invalid credentials";
};

export { createUser, fetchAllProducts, loginUser };
