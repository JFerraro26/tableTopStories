import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Mainpage';
import Nav from './Nav/Nav';
import WorldList from './world/WorldList';
import WorldDetail from './world/WorldDetail';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/worlds'>
            <Route path='' element={<WorldList />} />
            <Route path='detail' element={<WorldDetail />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
