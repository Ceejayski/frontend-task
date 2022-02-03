import {
  BrowserRouter as Router, Routes,
  Route,
} from 'react-router-dom';
import Header from './components/header';
import NotFoundPage from './pages/404';
import FormPage from './pages/form.page';
import HomePage from './pages/home.page';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/*" element={<HomePage />} />
          <Route exact path="*" element={<NotFoundPage />} />
          <Route exact path="/404" element={<NotFoundPage />} />
          <Route exact path="/users/:id" element={<FormPage />} />
          <Route exact path="/users/new" element={<FormPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
