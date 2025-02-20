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
import SingleBook from './pages/main-pages/SingleBook';
import CartPage from './pages/main-pages/CartPage';
import CheckoutPage from './pages/main-pages/CheckoutPage';
import OrderPage from './pages/main-pages/OrderPage';
import AdminLogin from './pages/main-pages/admin/AdminLogin';
import UsersRoute from './protected-routes/UsersRoute';
import AdminRoute from './protected-routes/AdminRoute';
import UpdateBook from './pages/main-pages/admin/UpdateBook';
import DashboardStats from './pages/main-pages/admin/DashboardStats';
import FavoritePage from './pages/main-pages/FavoritePage';
import EmailVerifyPage from './pages/main-pages/EmailVerifyPage';
import ForgotPassword from './pages/main-pages/ForgotPassword';
import ResetPassword from './pages/main-pages/ResetPassword';
// import RegisterUser from './pages/main-pages/RegisterUser';
// import LoginUser from './pages/main-pages/LoginUser';

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
                path: 'forgot-password',
                element: <ForgotPassword />
            },            
            {
                path: 'reset-password/:id/:token',
                element: <ResetPassword />
            },            
            {
                path: 'users/:id/verify/:mailToken',
                element: <EmailVerifyPage />
            },            
            {
                path: 'books/:id',
                element: <SingleBook />
            },                    
            {
                path: 'favorite',
                element: <FavoritePage />
            },    
            {
                path: 'cart',
                element: <CartPage />
            },    
            {
                path: '/',
                element: <UsersRoute />,
                children: [
                    {
                        path: 'checkout',
                        element: <CheckoutPage /> 
                    },
                    {
                        path: 'orders',
                        element: <OrderPage />
                    },    
                ]
            },               
        ]
    },
    {
        path: '',
        element: <AdminRoute />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                            {
                                path: '',
                                element: <DashboardStats />  
                            },
                            {
                                path: 'add-new-books',
                                element: <AddNewBook />  
                            },
                            {
                                path: 'manage-books',
                                element: <ManageBook />  
                            },
                            {
                                path: 'edit-book/:id',
                                element: <UpdateBook />
                            }
                        ]
            }
        ] 
    },
    {
        path: 'admin',
        element: <AdminLogin />
    }
])

export default router;