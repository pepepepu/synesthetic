import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/reset.css'

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;