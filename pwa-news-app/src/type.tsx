
export type ProfileProps = {
  id?: string;
  username?: string | null;
  email?: string | null;
  image?: string | null;
};

export type Token = {
  id: string,
  username: string,
  email: string
};
