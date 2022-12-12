import { Client } from 'pg';
import { error, success } from 'main/lib/status';
import instance from 'main/instance/dbClient';

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
