import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button, Column, ErrorMessage, Input } from 'renderer/CSScontainers';
import DBstate, { DBstatus } from 'renderer/states/DBstate';

export const defaultDBinfo =
  process.env.NODE_ENV === 'development'
    ? {
        user: 'root',
        host: 'localhost',
        database: 'test',
        password: '123',
        port: '5432',
      }
    : { user: '', host: '', database: '', password: '', port: '' };

const Login = () => {
  const setDBstatus = useSetRecoilState(DBstate);
  const [dbInfo, setInfo] = useState(defaultDBinfo);
  const [error, setError] = useState(false);
  const fields: ['user', 'host', 'database', 'password', 'port'] = [
    'user',
    'host',
    'database',
    'password',
    'port',
  ];
  const getInput = (e: any) => {
    setInfo({ ...dbInfo, [e.target.name]: e.target.value });
  };

  const connectionFail = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  const onClickConnection = async () => {
    const res = await db.command.request('makeConnection', [dbInfo]);
    if (!res.status) connectionFail();
    if (res.status) setDBstatus(dbInfo as DBstatus);
  };
  return (
    <Column>
      {fields.map((field) => (
        <Input
          value={dbInfo[field]}
          key={field}
          name={field}
          placeholder={field}
          onChange={getInput}
        />
      ))}
      <Button type="button" onClick={onClickConnection}>
        접속하기
      </Button>
      <ErrorMessage style={{ opacity: error ? 1 : 0 }}>
        정확하지 않은 접속정보입니다.
      </ErrorMessage>
    </Column>
  );
};

export default Login;
