import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SourceDB from './pages/SourceDB';
import TableDomainScan from './pages/TableDomainScan';
import TableFeatureEdit from './pages/TableFeatureEdit';
import SingleTableJoin from './pages/SingleTableJoin';
import MultiTableJoin from './pages/MultiTableJoin';
import Result from './pages/Result';
import ConnectionStatus from './pages/ConnectionStatus';
import './App.css';
import { Wrapper, SideBar, List, ListItem, Main } from './CSScontainers';

export default function App() {
  return (
    <Wrapper>
      <SideBar>
        <List>
          <ListItem>
            <ConnectionStatus />
          </ListItem>
          <ListItem>
            <Link to="/sourceDB">소스DB관리</Link>
          </ListItem>
          <ListItem>
            <Link to="/tableDomainScan">테이블 도메인 스캔</Link>
          </ListItem>
          <ListItem>
            <Link to="/tableFeatureEdit">테이블 속성 편집</Link>
          </ListItem>
          <ListItem>
            <Link to="/singleTableJoin">단일 결합</Link>
          </ListItem>
          <ListItem>
            <Link to="/multipleTableJoin">다중 결합</Link>
          </ListItem>
          <ListItem>
            <Link to="/result">결과 조회</Link>
          </ListItem>
        </List>
      </SideBar>
      <Main>
        <Routes>
          <Route path="/sourceDB" element={<SourceDB />} />
          <Route path="/tableDomainScan" element={<TableDomainScan />} />
          <Route path="/tableFeatureEdit" element={<TableFeatureEdit />} />
          <Route path="/singleTableJoin" element={<SingleTableJoin />} />
          <Route path="/multipleTableJoin" element={<MultiTableJoin />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Main>
    </Wrapper>
  );
}