import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])

export default router;