import { selector } from 'recoil';
import DBstate from './DBstate';

const isLogin = selector({
  key: 'isLogin',
  get: async ({ get }) => {
    const DBstatus = get(DBstate);
    if (Object.values(DBstatus).some((val) => val === '')) return false;
    if (!(await db.command.request('isDBConnected')).status) return false;
    return true;
  },
});

export default isLogin;
