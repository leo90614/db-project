import { atom } from 'recoil';

interface DBstatus {
  user: string;
  host: string;
  database: string;
  password: string;
  port: string;
}

const defaultDBinfo =
  process.env.NODE_ENV === 'development'
    ? {
        user: 'root',
        host: 'localhost',
        database: 'test',
        password: '123',
        port: '5432',
      }
    : { user: '', host: '', database: '', password: '', port: '' };

const DBstate = atom<DBstatus>({
  key: 'DBstate',
  default: defaultDBinfo,
});

export default DBstate;
