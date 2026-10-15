"use client";

import ProfileCard from "@/components/ProfileCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserStore } from "@/store/userStore";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <ProtectedRoute>
      {user ? <ProfileCard user={user} /> : null};
    </ProtectedRoute>
  );
};

export default ProfilePage;
