import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  BorderBox,
  Column,
  Item,
  Modal,
  ModalBody,
  Row,
  Wrapper,
} from 'renderer/CSScontainers';
import DBstate from 'renderer/states/DBstate';

const TableDomainScan = () => {
  const dbState = useRecoilValue(DBstate);
  const [showResult, setShowResult] = useState(false);
  const [scanResult, setScanResult] = useState<any>();
  const [tables, setTables] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await db.command.request('readTables', [dbState.database]);
      if (res.status) setTables(res.data);
    })();
  }, [dbState.database]);

  const onClickTable = (tableName: string) => {
    if (!window.confirm(`${tableName}에 대한 테이블스캔을 진행하시겠습니까?`)) {
      return;
    }
    setShowResult(true);
    console.log('테이블 스캔을 진행한다.');
  };
  return (
    <Wrapper>
      <Modal style={{ display: showResult ? '' : 'none' }}>
        <ModalBody>
          <Row
            style={{ justifyContent: 'flex-end', fontSize: '2rem' }}
            onClick={() => setShowResult(false)}
          >
            {' '}
            X
          </Row>
        </ModalBody>
      </Modal>
      <Column>
        {tables.map((table) => {
          return (
            <Item
              key={table.table_name}
              onClick={() => onClickTable(table.table_name)}
            >
              <Column>
                <BorderBox>
                  <Item>테이블 명: {table.table_name}</Item>
                  <Row>
                    <Item>속성 개수: {table.column_name.length}개</Item>
                    <Item>레코드 수: {String(table.table_rows)}개</Item>
                  </Row>
                </BorderBox>
              </Column>
            </Item>
          );
        })}
      </Column>
    </Wrapper>
  );
};

export default TableDomainScan;
