import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
      <div className="App">
          <Navbar />
          <div className='mt-24'>
            <Outlet />
          </div>
          <Footer />
      </div>
  );
}

export default App;
