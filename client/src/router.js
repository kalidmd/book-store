import { createBrowserRouter } from 'react-router-dom'
import App from './App';
//pages
import PageNotFound from './pages/main-pages/PageNotFound'
import Home from './pages/main-pages/Home';
import Dashboard from './pages/main-pages/admin/Dashboard';
import ManageBook from './pages/main-pages/admin/ManageBook';
import AddNewBook from './pages/main-pages/admin/AddNewBook';
import Login from './pages/main-pages/Login';
import Register from './pages/main-pages/Register';
// import AddBook from './pages/sub-pages/AddBook';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/',
                element: <Home />
            },            
            {
                path: 'login',
                element: <Login />
            },            
            {
                path: 'register',
                element: <Register />
            },            
            {
                path: 'orders',
                element: <h1> Orders Page </h1>
            },            
            {
                path: 'cart',
                element: <h1> Cart Page </h1>
            },            
            {
                path: 'checkout',
                element: <h1> Checkout </h1>
            },            
        ]
    },
    {
        path: 'dashboard/',
        element: <Dashboard />,
        children: [
            {
                path: 'add-new-books',
                element: <AddNewBook />
            },
            {
                path: 'manage-books',
                element: <ManageBook />
            },
        ]
    }
])

export default router;