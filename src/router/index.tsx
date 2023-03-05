import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import Layout from "../layout";
import RootStore from "../mobx-store/RootStore";
import { observer } from "mobx-react-lite";
import _routes from "./Routes";
import NestedSidebar from "../layout/NestedSidebar";
import Tabs from "../constant/Tabs";
import CustomSuspense from "../components/CustomSuspense";
import Function from "../utils/Function";
import LocalStorage from "../storage/LocalStorage";

const Login = lazy(() => import("../views/authentication/Login"));
const ProductStore = lazy(() => import("../views/product-store/productStore"));

const ProductDetail = lazy(() => import("../views/product-store/productDetail"));
const ShoppingCart = lazy(() => import("../views/product-store/shoppingCart"));
const StoreLogin = lazy(() => import("../views/product-store/userAccount"));
const OrderCompletion = lazy(() => import("../views/orderCompletion"));
const ProductShipping = lazy(() => import("../views/product-store/productShipping"));
const Registration = lazy(() => import("../views/authentication/Registration"));
const RegistrationOTPVerification = lazy(() => import("../views/authentication/RegistrationOTPVerification"));
const ResetPassword = lazy(() => import("../views/authentication/ResetPassword"));
const AccountActivation = lazy(() => import("../views/authentication/AccountActivation"));
const ForgotPassword = lazy(() => import("../views/authentication/ForgotPassword"));
const ForgotPasswordOTPVerification = lazy(() => import("../views/authentication/ForgotPasswordOTPVerification"));
const Loader = lazy(() => import("../views/common/Loader"));
const NotFound = lazy(() => import("../components/NotFound"));

const Router = () => {
  let { authStore, shopStore } = RootStore;
  let navigate = useNavigate();
  let isLoggedIn = LocalStorage.get('isLoggedIn');
  let userInfo:any = LocalStorage.get('USER_INFO');

  const location = useLocation();
  let path = location.pathname;
  useEffect(() => {
   
    if(path.includes('store-login') || path.includes('shopping-cart') || path.includes('/product-store/')){
  
    }else{
      if (isLoggedIn && userInfo?.roleId !== 3) {
        navigate('/loader');
      }
    } 

  }, []);
  



  return <Routes>
    <Route path='login' element={<CustomSuspense><Login /></CustomSuspense>} />
    <Route path='product-store/:id' element={<CustomSuspense><ProductStore /></CustomSuspense>} />
    <Route path='product-store/product/:id' element={<CustomSuspense><ProductDetail /></CustomSuspense>} />
    <Route path='shopping-cart' element={isLoggedIn?<CustomSuspense><ShoppingCart /></CustomSuspense>:<Navigate to={'/store-login'} />} />
    <Route path='store-login' element={<CustomSuspense><StoreLogin /></CustomSuspense>} />
    <Route path='order-completion' element={isLoggedIn?<CustomSuspense><OrderCompletion /></CustomSuspense>:<Navigate to={'/store-login'} replace />} />
    <Route path='product-shipping' element={isLoggedIn?<CustomSuspense><ProductShipping /></CustomSuspense>:<Navigate to={'/store-login'} replace />} />
    <Route path='registration' element={<CustomSuspense><Registration /></CustomSuspense>} />
    <Route path='registration-otp-verification' element={<CustomSuspense><RegistrationOTPVerification /></CustomSuspense>} />
    <Route path='account-activation' element={<CustomSuspense><AccountActivation /></CustomSuspense>} />
    <Route path='forgot-password' element={<CustomSuspense><ForgotPassword /></CustomSuspense>} />
    <Route path='forgot-password-otp-verification' element={<CustomSuspense><ForgotPasswordOTPVerification /></CustomSuspense>} />
    <Route path='reset-password' element={<CustomSuspense><ResetPassword /></CustomSuspense>} />
    <Route path='loader' element={<CustomSuspense><Loader visibility={true} isLoggedIn={isLoggedIn} /></CustomSuspense>} />
    <Route path='/' element={(authStore.isLoggedIn && authStore.isValidToken) ? <Layout /> : <Navigate to={'login'} replace />}>
      {_routes.map((route, routeIndex) => {
        return route?.path === 'store' ?
          <Route key={routeIndex} path={route?.path} element={<NestedSidebar />}>
            {route?.children?.map((child, childIndex) => {
              return child?.path === 'checkout' ?
                <Route key={childIndex} path={child?.path} element={<Tabs tabRoutes={child?.tabChildren} />}>
                  {child?.tabChildren?.map((tabChild, tabChildIndex) => {
                    return <Route key={tabChildIndex} path={tabChild?.path} element={<CustomSuspense><tabChild.element /></CustomSuspense>} />
                  })}
                  <Route path={`/${route?.path}/${child.path}`} element={<Navigate to="min-order" replace />} />
                </Route>
                :
                <Route key={childIndex} path={child?.path} element={<CustomSuspense><child.element /></CustomSuspense>} />
            })}
            <Route path="/store" element={<Navigate to="dashboard" replace />} />
          </Route>
          :
          (route?.path === 'settings' || route?.path === 'account') ?
            <Route key={routeIndex} path={route?.path} element={<Tabs tabRoutes={route?.children} />}>
              {route?.children?.map((child, childIndex) => {
                return <Route key={childIndex} path={child?.path} element={<CustomSuspense><child.element /></CustomSuspense>} />
              })}
              <Route path={`/${route?.path}`} element={<Navigate to={route?.path === 'settings' ? 'business-profile' : 'my-profile'} replace />} />
            </Route>
            :
            <Route key={routeIndex} path={route?.path} element={<CustomSuspense><route.element /></CustomSuspense>} />
      })}
      <Route path="/" element={<Navigate to={!Function.isEmptyObject(shopStore.storeDetails) ? "main-dashboard" : 'settings'} replace />} />
    </Route>
    <Route path='*' element={<CustomSuspense><NotFound /></CustomSuspense>} />
  </Routes>
}

export default observer(Router);
