import Link from "next/link";
import Image from "next/image";
import { fetchAllUsers } from "@/Lib/usersApi";
import { AdminUser } from "@/types/user";
import { Mail, ShieldCheck, Users } from "lucide-react";

const UsersPage = async () => {
  const allUsers: AdminUser[] = await fetchAllUsers();

  const hostnames = [
    ...new Set(
      allUsers
        .map((user) => {
          try {
            return user.avatar ? new URL(user.avatar).hostname : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean),
    ),
  ];

  console.log("This is the users page", hostnames);
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Page Header */}
        <header>
          <p className="mb-1 text-sm font-medium text-slate-500">
            Administration / Users
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Users
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View registered accounts and their account information.
          </p>
        </header>

        {/* Users Table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-base font-semibold text-slate-900">
              All Users
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Registered accounts from the EscuelaJS API.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allUsers.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-600">
                            {user.avatar && (
                              <img
                                src={user.avatar}
                                alt={user.name || "User avatar"}
                                width={44}
                                height={44}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <span className="font-medium text-slate-900">
                            {user.name || "Unnamed user"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail size={15} className="shrink-0 text-slate-400" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(user.creationAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
                {allUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
            Showing {allUsers.length}
            {allUsers.length === 1 ? " user" : " users"}
          </div>
        </section>
      </div>
    </main>
  );
};

export default UsersPage;
