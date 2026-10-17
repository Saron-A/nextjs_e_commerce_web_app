"use client";

import ProfileCard from "@/components/ProfileCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserStore } from "@/store/userStore";
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col  min-h-screen space-y-10">
        <Navbar />
        {user ? <ProfileCard user={user} /> : null}
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
