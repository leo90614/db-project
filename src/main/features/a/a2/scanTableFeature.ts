import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

// Show features of the table
// arg[0] : table name
//
export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'scanTableFeature';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      return success();
    } catch {
      return error('');
    }
  });
}
