"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { Search, Tv } from "lucide-react";

const AdminNavbar = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex flex-0.5 gap-6 justify-between self-start py-4 px-10 border-b border-gray-300 w-full h-fit ml-0">
      <div className="flex gap-2 flex-1 border rounded-xl border-gray-300 p-1.5 w-10">
        <Search className="w-6 h-6 text-gray-500" />
        <input type="text" placeholder="Search in admin ..." />
      </div>
      <div className="flex gap-5 justify-center items-center">
        <Tv />
        <div className="flex gap-3 flex-1 px-2 justify-center items-center">
          <Link href="/profile" className="flex gap-2">
            {user?.avatar && (
              <Image
                src={user.avatar}
                alt="user avatar"
                width="30"
                height="10"
                className="object-contain rounded-full"
              />
            )}

            <span className="text-gray-500">Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
