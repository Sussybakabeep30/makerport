import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Loading from './components/Loading';

const Home       = lazy(() => import('./pages/Home'));
const Portfolio  = lazy(() => import('./pages/Portfolio'));
const ClientForm = lazy(() => import('./pages/ClientForm'));
const Tracker    = lazy(() => import('./pages/ProjectTracker'));

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/client-form" element={<ClientForm />} />
            <Route path="/projects" element={<Tracker />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
