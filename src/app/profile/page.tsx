"use client";

import ProfileCard from "@/components/ProfileCard";
import { useUserStore } from "@/store/userStore";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  return user ? <ProfileCard user={user} /> : null;
};

export default ProfilePage;
