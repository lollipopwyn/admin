import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import AdminLogin from './components/adminLogin/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <AdminLogin />
      <div className="App">
        <Dashboard />
        <Header />
        <Routes></Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
