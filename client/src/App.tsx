import React from 'react';

import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security, LoginCallback, SecureRoute, useOktaAuth } from "@okta/okta-react"
import LoginWidget from './auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { PrivateRoute } from './layouts/utils/PrivateRoute';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
import { PaymentPage } from './layouts/PaymentPage/PaymentPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  let navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true })
  }

  const customAuthHandler = () => {
    navigate('/login');
  }


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>

        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/reviewlist/:bookId" element={<ReviewListPage />} />
            <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
            <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
            <Route path='/login/callback' Component={LoginCallback} />
            {/* <Route path='/shelf' element={<ShelfPage />} /> */}
            <Route path='/shelf' element={<PrivateRoute component={<ShelfPage />} />} />
            <Route path='/messages' element={<PrivateRoute component={<MessagesPage />} />} />
            <Route path='/admin' element={<PrivateRoute component={<ManageLibraryPage />} />} />
            <Route path='/fees' element={<PrivateRoute component={<PaymentPage />} />} />
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
}
