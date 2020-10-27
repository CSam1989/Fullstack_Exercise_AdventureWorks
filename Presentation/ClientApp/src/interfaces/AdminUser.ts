export interface IAdminUser {
  userId: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export const UsersColumns = [
  { name: "username", title: "Username" },
  { name: "email", title: "Email" },
  { name: "isAdmin", title: "Admin?" },
];
