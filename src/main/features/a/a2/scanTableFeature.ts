import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';
import findDataType from './lib/findDataType';
import findFKcandidate from './lib/findFKcandidate';
import minMax from './lib/minMax';
import nullCount from './lib/nullCount';
import specialCharCount from './lib/specialCharCount';
import uniqueCategoryCount from './lib/uniqueCategoryCount';
import uniqueValueCount from './lib/uniqueValueCount';
import zeroValueCount from './lib/zeroValueCount';

// Show features of the table
// arg[0] : table name
//

/**
 * this function is used to scan the table attributes
 * it will return two lists, one is for number type, the other is for string type
 *
 * if the attribute is a number type
 * ["attribute_name" : {"attribute_type", "number of records", "number of nulls",
 * "number of unique values", "min", "max", "the amount of 0 records", "mappingPK", "mappingFK"}]
 * if the attribute is a string type
 * ["attribute_name" : {"attribute_type", "number of records", "number of nulls",
 * "number of unique values", "number of records including special characters", "mappingPK", "mappingFK"}]
 *
 * special characters means the characters except for alphabets, numbers, and korean characters
 * the information about mappingPK and mappingFK is written on json file in src/main/resources/tableMapping.json
 * format in json is
 * [{"table_name" : {"mappingPK" : {"attribute_name" : "representative_PK_name"}, "mappingFK" : {"attribute_name" : "representative_FK_name"}}}]
 * if the attribute is not mapped, the value of mappingPK and mappingFK is null
 * if the attribute is mapped, the value of mappingPK and mappingFK is the representative name of PK and FK
 *
 * we can get those values using ./lib/*.ts (ex. ./lib/findDataType.ts)
 */
export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'scanTableFeature';
  ipcMain.handle(channelName, async (event, arg) => {
    try {
      const tableName = arg[0];
      const sqlStr = `SELECT * FROM ${tableName}`;
      const res = await dbClient.sql(sqlStr);

      const numberType = [];
      const stringType = [];
      //const tableMapping = require('../../../resources/tableMapping.json');
      // if (res.length === 0) {
      //   return error('해당 테이블에 데이터가 없습니다.');
      // }
      // else {
      //
      // }

      return success([numberType, stringType], '테이블 특성 스캔 성공');
    } catch {
      return error('테이블 특성 스캔 실패');
    }
  });
}
