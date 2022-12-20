import dbClient from '../instance/dbClient';
import { error, success } from '../lib/status';

export default function (ipcMain: Electron.IpcMain): void {
  //
  const channelName = 'isDBConnected';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      if (dbClient.isDBconnected()) return success();
      return error('db연결이 되어있지 않습니다.');
    } catch {
      return error('db연결이 되어있지 않습니다.');
    }
  });
}
