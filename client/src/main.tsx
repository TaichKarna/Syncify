import React from 'react'
import ReactDOM from 'react-dom/client'
import { SocketProvider } from './components/SocketProviders.tsx'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {store} from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'
import { ThemeProvider } from './components/theme-provider.tsx'
import Navbar from './components/Navbar/Navbar.tsx';
import MainMenu from './components/testComponents/MainMenu.tsx'
import LiveChat from './components/testComponents/socketLiveChat.tsx'

const router = createBrowserRouter([
{
  path: '/',
  element: <App/>
},
{
  path: '/room',
  element: <MainMenu/>
},
{
  path: '/room/:roomId',
  element: <LiveChat/>
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <ThemeProvider>
              <Navbar/>
              <RouterProvider router={router}>
              </RouterProvider>
            </ThemeProvider>   
          </SocketProvider>
      </PersistGate>
  </Provider>
  </React.StrictMode>,
)
