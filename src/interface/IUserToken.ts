export interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ISession {
  email: string;
  password: string;
}

export interface IReset {
  token: string;
  password: string;
}

export interface IUserTokensRepository {
  findByToken(token: string);
  generate(user_id: string);
}
