import { useRecoilValue } from 'recoil';
import { List, ListItem, Column } from 'renderer/CSScontainers';
import DBstate from 'renderer/states/DBstate';

const ConnectionStatus = () => {
  const dbInfo = useRecoilValue(DBstate);
  const fields: ['user', 'host', 'database', 'password', 'port'] = [
    'user',
    'host',
    'database',
    'password',
    'port',
  ];
  return (
    <Column>
      <List>
        {fields.map((field) => (
          <ListItem key={field} style={{ padding: 0 }}>
            {field} : {dbInfo[field]}
          </ListItem>
        ))}
      </List>
    </Column>
  );
};

export default ConnectionStatus;
