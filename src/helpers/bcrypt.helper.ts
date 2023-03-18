import * as bcrypt from "bcryptjs";

export async function hashMake(password: any): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function hashCheck(
  password: string,
  comparePassword: string
): Promise<boolean> {
  return bcrypt.compare(password, comparePassword);
}
