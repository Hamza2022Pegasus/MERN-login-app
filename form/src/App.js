import NewEmail from './Components/NewEmail';
import Homepage from './Pages/Homepage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
// import Oldemailform from './Components/Oldemailform';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewEmail/>}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <NewEmail/>
    //   <hr/>
    // </div>
  );
}

export default App;
