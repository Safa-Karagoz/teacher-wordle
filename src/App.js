import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Outlet, Navigate} from 'react-router-dom'
import { checkCookie } from "./utils/login";


import SignIn from './pages/SignIn';
import EX from './pages/EX';

function App() {

  const ProtectedRoute = ({
    redirectPath = '/',
    children,
  }) => {
    if (checkCookie()) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };

  return (
    <Router basename='/'>
      <Routes>
          <Route path="/" element={<SignIn />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/ex" element={ <EX />}/>
          </Route>

          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    </Router>
    
  )
}

export default App;