import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Loading from './components/Loading';

const Home       = lazy(() => import('./pages/Home'));
const Portfolio  = lazy(() => import('./pages/Portfolio'));
const ClientForm = lazy(() => import('./pages/ClientForm'));
const MyRequests = lazy(() => import('./pages/Myrequests'));

function App() {
  return (
    <UserProvider>
      <HashRouter> 
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/client-form" element={<ClientForm />} />
            <Route path="/myrequests" element={<MyRequests />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
