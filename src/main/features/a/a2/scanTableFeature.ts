import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

// Show features of the table
// arg[0] : table name
//

/**
 * this function is used to scan the table attributes
 * format is as follows
 * ["attribute_name" : {"attribute_type", "number of records", "number of nulls", "number of unique values", {
 * depends on the attribute type(numeric or categorical))}}]
 * if the attribute is a number type
 * {"min", "max", "the amount of 0 records"}
 * if the attribute is a string type
 * {"the amount of records that contains special characters"}
 * special character means all the characters except for alphabets, korean, numbers
 * we can get those values using ./lib/*.ts (ex. ./lib/findDataType.ts)
 */
export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'scanTableFeature';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      const tableName = arg[0];
      const table = await dbClient.sql(`SELECT * FROM ${tableName}`);
      const res = [];

      return success();
    } catch {
      return error('');
    }
  });
}
