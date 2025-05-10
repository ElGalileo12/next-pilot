import User from "@/app/model/user";
import bcrypt from "bcryptjs";

export async function createUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  return user.save();
}
