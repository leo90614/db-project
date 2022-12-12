import { Client } from 'pg';
import instance from '../../instance/dbClient';
import { error, success } from '../../lib/status';

export default function makeConnection(ipcMain: Electron.IpcMain): void {
  const channelName = 'makeConnection';
  ipcMain.handle(channelName, async (event, arg) => {
    instance.client = new Client(arg[0]);
    try {
      await instance.client.connect();
      return success('db연결 성공');
    } catch {
      return error('db연결 실패');
    }
  });
}
