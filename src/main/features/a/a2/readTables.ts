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
      // Get table names, number of records in the table, name of attributes of each table
      // Get column names and number of records by separate sql query and merge them
      const columnSql = `SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = '${databaseName}';`;
      const columnRes = await dbClient.sql(columnSql);
      const rowsSql = `SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = '${databaseName}'`;
      const rowsRes = await dbClient.sql(rowsSql);

      const resList = [];
      for (let i = 0; i < rowsRes.length; i += 1) {
        resList.push({
          table_name: rowsRes[i].table_name,
          table_rows: rowsRes[i].table_rows,
          column_name: [],
        });
      }

      let index = 0;
      for (let i = 0; i < columnRes.length; i += 1) {
        if (resList[index].table_name === columnRes[i].table_name) {
          resList[index].column_name.push(columnRes[i].column_name);
        } else {
          index += 1;
          resList[index].column_name.push(columnRes[i].column_name);
        }
      }
      return success(resList, 'read succeeded');
    } catch {
      return error('read failed');
    }
  });
}
