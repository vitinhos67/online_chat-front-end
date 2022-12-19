import User from "@/services/user.service";

export default async function (authUser) {

  if (!authUser) {
    return;
  }

  const user = await User.dataUser(authUser);
  return user;
}
