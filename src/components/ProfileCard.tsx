"use client";
import Image from "next/image";
import { AuthUser } from "@/types/authUser";
import { ShieldCheck, UserRound } from "lucide-react";

interface UserProp {
  user: AuthUser;
}

const ProfileCard = ({ user }: UserProp) => {
  return (
    <div className=" w-full max-w-md  overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Card Header */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400" />

      {/* Profile Information */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-12 mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-50 shadow-sm">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              height={80}
              width={80}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={36} className="text-blue-600" />
          )}
        </div>

        {/* Name and Email */}
        <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900">
          {user.name}
        </h1>

        <p className="mt-1 break-all text-sm text-gray-500">{user.email}</p>

        {/* Divider */}
        <div className="my-5 border-t border-gray-100" />

        {/* Role Information */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={18} className="text-blue-600" />
            <span className="font-medium">Account role</span>
          </div>

          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
