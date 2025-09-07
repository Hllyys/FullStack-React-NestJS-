import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import UsersPage from '../../pages/UsersPage';
import PostsPage from '../../pages/PostsPage';
import Navbar from '../../components/ui/layout/Navbar';
function RootLayout() {
  return (
    <>
      <Navbar />
      {/* Navbar yüksekliği ~64px => üstten boşluk: pt-20 */}
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/posts', element: <PostsPage /> },
      {
        path: '*',
        element: (
          <div className="container-std py-10">
            <div className="card">
              <p>Page not found.</p>
              <Link to="/" className="text-blue-600 underline">
                Home page
              </Link>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
