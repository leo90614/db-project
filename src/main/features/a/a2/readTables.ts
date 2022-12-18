import dbClient from '../../../instance/dbClient';
import { error, success } from '../../../lib/status';

// Show list of tables in the database
// it should contain the table name and the number of records in the table, and the names of attributes of each table
// arg[0] : database name

/**
 * return of sql is like this
 * +-------------------+------------+---------------+
 *     -> | table_name        | table_rows | column_name   |
 *     -> +-------------------+------------+---------------+
 *     -> | continents        |          7 | continent_id  |
 *     -> | continents        |          7 | name          |
 *     -> | countries         |        239 | country_id    |
 *     -> | countries         |        239 | name          |
 *     -> | countries         |        239 | area          |
 *     -> | countries         |        239 | national_day  |
 *     -> | countries         |        239 | country_code2 |
 *     -> | countries         |        239 | country_code3 |
 *     -> | countries         |        239 | region_id     |
 *     -> | country_languages |        984 | country_id    |
 *     -> | country_languages |        984 | language_id   |
 *     -> | country_languages |        984 | official      |
 *     -> | country_stats     |       9514 | country_id    |
 *     -> | country_stats     |       9514 | year          |
 *     -> | country_stats     |       9514 | population    |
 *     -> | country_stats     |       9514 | gdp           |
 *     -> | guests            |          5 | guest_id      |
 *     -> | guests            |          5 | name          |
 *     -> | languages         |        457 | language_id   |
 *     -> | languages         |        457 | language      |
 *     -> | regions           |         25 | region_id     |
 *     -> | regions           |         25 | name          |
 *     -> | regions           |         25 | continent_id  |
 *     -> | region_areas      |         25 | region_name   |
 *     -> | region_areas      |         25 | region_area   |
 *     -> | vips              |          5 | vip_id        |
 *     -> | vips              |          5 | name          |
 *     -> +-------------------+------------+---------------+
 *
 *     this is refined to the form of objects
 *     ==> [{"table_name":"continents","table_rows":7,"column_name":["continent_id","name"]}, ...]
 */
export default function (ipcMain: Electron.IpcMain): void {
  const channelName = 'readTables';
  ipcMain.handle(channelName, async (event, arg) => {
    const databaseName = arg[0];
    try {
      const sqlStr = `SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = ${databaseName};`;
      const res = await dbClient.sql(sqlStr);
      const resList = [];
      if (res.length !== 0) {
        resList.push({ table_name: res[0].table_name, table_rows: res[0].table_rows, column_name: [res[0].column_name] });
      }
      for (let i = 1; i < res.length; i += 1) {
        const prevRow = res[i - 1];
        const row = res[i];
        if (row.table_name === prevRow.table_name) {
          resList[resList.length - 1].column_name.push(row.column_name);
        } else {
          resList.push({
            table_name: row.table_name,
            table_rows: row.table_rows,
            column_name: [row.column_name],
          });
        }
      }
      return success(res, 'read succeeded');
    } catch {
      return error('read failed');
    }
  });
}
