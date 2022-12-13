import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'downloadResult';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      return success();
    } catch {
      return error('');
    }
  });
}
