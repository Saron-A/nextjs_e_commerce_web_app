import Link from "next/link";
import Image from "next/image";
import { fetchAllUsers } from "@/Lib/usersApi";
import { AdminUser } from "@/types/user";

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
    <main>
      <header>
        <h1>Users</h1>
        <p>Registered accounts from the EscuelaJS API.</p>
      </header>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div>
                  {/* {user.avatar && (
                    <Image
                      src={user.avatar}
                      alt="user avatar"
                      width="21"
                      height="7"
                    />
                  )} */}

                  <span>{user.name}</span>
                </div>
              </td>
              <td>
                <p>{user.email}</p>
              </td>
              <td>
                <p>${user.role}</p>
              </td>
              <td>
                <p>{user.creationAt}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default UsersPage;
