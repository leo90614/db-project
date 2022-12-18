import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'deleteFeature';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      const deleteTable = arg[0];
      const col = arg[1];
      const sqlStr = 'ALTER TABLE ';
      const deleteSQL = sqlStr.concat(deleteTable,' DROP COLUMN ', col, ';');
      const res = await dbClient.sql(deleteSQL);
      return success(0, 'delete succeed');
    } catch {
      return error('delete fail');
    }
  });
}
