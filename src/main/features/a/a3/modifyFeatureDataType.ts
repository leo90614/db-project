import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'modifyFeatureDataType';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      const modTable = arg[0];
      const colName = arg[1];
      const colType = arg[2];
      const sqlStr = 'ALTER TABLE ';
      const modSQL = sqlStr.concat(modTable, ' MODIFY ',colName, ' ', colType, ';');
      const res = await dbClient.sql(modSQL);
      return success();
    } catch {
      return error('');
    }
  });
}
