import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router'

import { CalendarApp } from './calendar'
import { AuthLayout } from './auth/AuthLayout'
import { LoginPage, RegisterPage } from './auth/pages'
import PrivateRoute from './router/PrivateRoute'
import PublicRoute from './router/PublicRoute'
import { NotFound } from './not-found/NotFound'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>

      <BrowserRouter>
        <Routes>

          <Route index element={<PrivateRoute Component={<CalendarApp />} />} />

          <Route path="auth" element={<PublicRoute Component={<AuthLayout />} />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="*" element={<NotFound/>} />

        </Routes>
      </BrowserRouter>

    </Provider>

  </StrictMode>,
)
