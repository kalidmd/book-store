import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import PageNotFound from './components/pages/PageNotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/',
                element: <h1>Home Page</h1>
            }
        ]
    }
])

export default router;