"use client";
import Image from "next/image";
import { AuthUser } from "@/types/authUser";

interface UserProp {
  user: AuthUser;
}

const ProfileCard = ({ user }: UserProp) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {user.avatar && (
        <Image src={user.avatar} alt="user avatar" height="20" width="20" />
      )}
      <p>role: {user.role}</p>
    </div>
  );
};

export default ProfileCard;
