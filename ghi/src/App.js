import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Mainpage';
import Nav from './Nav/Nav';
import WorldList from './world/details/WorldList';
import WorldPage from './world/details/WorldPage';
import BaseCreate from './world/create/BaseCreate';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/worlds'>
            <Route path='' element={<WorldList />} />
            <Route path='detail' element={<WorldPage />} />
            <Route path='new' element={<BaseCreate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
