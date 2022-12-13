import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

export default function makeConnection(ipcMain: Electron.IpcMain): void {
  const channelName = 'makeConnection';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      await dbClient.connect(arg[0]);
      return success('db연결 성공');
    } catch {
      return error('db연결 실패');
    }
  });
}
