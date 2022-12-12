import { Client } from 'pg';
import instance from '../../instance/dbClient';

export default function makeConnection(ipcMain: Electron.IpcMain): void {
  const channelName = 'makeConnection';
  ipcMain.handle(channelName, async (event, arg) => {
    instance.client = new Client(arg[0]);
    try {
      await instance.client.connect();
      return true;
    } catch {
      return false;
    }
  });
}
