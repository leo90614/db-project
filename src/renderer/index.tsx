import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// // calling IPC exposed from preload script
// db.command.once('makeConnection', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
db.command.sendMessage('makeConnection', ['ping']);
