import './styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from "./App"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Signup, {handleSignup} from './pages/Signup'
import Login, {handleLogin} from './pages/Login'
import Home from './pages/Home'
import Dashboard, {loader as dashboardLoader} from './pages/Dashboard'
import UserHome from './pages/UserHome'
import CreateTask, {handleCreateTask} from './pages/CreateTask'
import UpdateTask, {handleUpdateTask, loader as updateTaskLoader} from './pages/UpdateTask'
import ViewTask, {loader as viewTaskLoader} from './pages/ViewTask'
import DeleteTask from './pages/DeleteTask'
import Category, {loader as categoryLoader} from './pages/Category'
import Project, {loader as projectLoader} from './pages/Project'

import { requireAuth } from './utils/requireAuth'


// Route params
// absolute and relative paths
// index routes
// import { RouterProvider, BrowserRouter, createBrowserRouter, createRoutesFromElements, redirect, useLoaderData, useRouteError, Navigate, useNavigate, Outlet, useOutletContext, NavLink, useParams, useLocation, Form, useActionData, useNavigation, defer, Await } from 'react-router-dom'
// relative routes
// <NavLink style={({isActive}) => isActive ? activeStyles}></NavLink>
// URLSearchParams
// catch-all route  <Route path="*" element={<h1>Page not found!</h1>} />
// <Route errorElement={} />
// <React.Suspense></React.Suspense>



const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} action={handleLogin} />
        <Route path='/signup' element={<Signup />} action={handleSignup} />


        <Route
            path='/userHome'
            element={<UserHome />}
            loader={async () => {
                await requireAuth()
                return null
            }}
        >

            <Route
                index
                element={<Dashboard />}
                loader={dashboardLoader}
            />

            <Route
                path='createTask'
                element={<CreateTask />}
                loader={async () => {
                    await requireAuth()
                    return null
                }}
                action={handleCreateTask}
            />

            <Route
                path='updateTask/:id'
                element={<UpdateTask />}
                loader={updateTaskLoader}
                action={handleUpdateTask}
            />

            <Route
                path='viewTask/:id'
                element={<ViewTask />}
                loader={viewTaskLoader}
            />

            <Route
                path='deleteTask/:id'
                element={<DeleteTask />}
                loader={async () => {
                    await requireAuth()
                    return null
                }}
            />

            <Route
                path='category'
                element={<Category />}
                loader={categoryLoader}
            />

            <Route
                path='project'
                element={<Project />}
                loader={projectLoader}
            />

        </Route>


    </Route>
))


function App() {
    return (
        <RouterProvider router={router} />
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)