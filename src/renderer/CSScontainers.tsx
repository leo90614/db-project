import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const Main = styled.div`
  width: 80%;
`;
export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  border-right: 2px solid gray;
  height: 100%;
`;
export const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;
export const ListItem = styled.li`
  padding: 15px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Input = styled.input``;

export const Button = styled.button``;
export const ErrorMessage = styled.div`
  opacity: 0;
  color: tomato;
`;
