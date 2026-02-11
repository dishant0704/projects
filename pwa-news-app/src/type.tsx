import { JwtPayload } from "jsonwebtoken";

export type ProfileProps = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type Token = {
  id: string,
  username: string,
  email: string
};
