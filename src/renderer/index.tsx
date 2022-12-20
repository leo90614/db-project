import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <App />
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>
);
