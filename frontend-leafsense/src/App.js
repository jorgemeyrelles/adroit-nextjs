import { StateProvider } from './context/StateGlobal';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <StateProvider>
      <Routes>
        <Route exact  path="/" element={ <Login /> } />
        <Route exact path="/dashboard" element={ <Dashboard /> } />
      </Routes>
    </StateProvider>
  );
}

export default App;
