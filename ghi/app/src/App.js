import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import Nav from './Nav';
import WorldList from './WorldList';
import WorldlDetail from './WorldDetail';


function App() {
  return (
   <BrowserRouter >
    <Nav />
    <div className='container'>
      <Routes path="/">
          <Route path='' element={<HomePage />} />
          <Route path='worlds'>
            <Route path='' element={<WorldList />} />
            <Route path='detail' element={<WorldlDetail />} />
          </Route>
      </Routes>
    </div>
   </BrowserRouter>
  )
}

export default App;
