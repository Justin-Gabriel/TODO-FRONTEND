import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './hooks/useAuthContext.jsx';
import ErrorBoundary from './utils/ErrorBoundary.jsx';
import "./index.css";

const Authentication = lazy(() => import('./pages/Authentication.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));


const App = () => {
  const { accessToken } = useAuthContext()

  return (
    <>
      <Toaster position='bottom-center' reverseOrder={false} />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={accessToken ? <Home /> : <Navigate to="/login" />} />
              <Route path="/project/:projectId" element={accessToken ? <Home /> : <Navigate to="/login" />} />
              <Route path="/signup" element={!accessToken ? <Authentication authType="Signup" /> : <Navigate to="/" />} />
              <Route path="/login" element={!accessToken ? <Authentication authType="Login" /> : <Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;