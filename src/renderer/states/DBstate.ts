import { atom } from 'recoil';

export interface DBstatus {
  user: string;
  host: string;
  database: string;
  password: string;
  port: string;
}

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    // console.log(savedValue);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const DBstate = atom<DBstatus>({
  key: 'DBstate',
  default: { user: '', host: '', database: '', password: '', port: '' },
  effects: [localStorageEffect('dbstatus')],
});

export default DBstate;
