import mariadb from 'mariadb';

class DBClient {
  #client: null | mariadb.Connection = null;

  async connect(config: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
  }) {
    this.#client = await mariadb.createConnection(config);
  }

  isDBconnected() {
    return this.#client !== null;
  }

  async sql(query: string) {
    if (this.#client === null) throw new Error('연결된 db가 없습니다.');
    const res = await this.#client.query(query);
    return res;
  }
}

export default new DBClient();
