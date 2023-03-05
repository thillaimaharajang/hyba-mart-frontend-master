const Endpoints = {
    Timeout: 30000,
    // User apis
    Registration: '/user/registration',
    RegOTPVerification: '/user/register-otp-verification',
    AccountActivation: '/user/activation',
    Login: '/user/login',
    GoogleRegistration: '/user/google-registration',
    GoogleLogin: '/user/google-login',
    ForgotPassword: '/user/forgot-password',
    ForgotPasswordOTPVerification: '/user/forgot-password-otp-verification',
    ResetPassword: '/user/reset-password',
    RefreshToken: '/user/refresh-token',
    // Store apis
    Dashboard: '/dashboard',
    GetCountries: '/country',
    GetCategories: '/category',
    StoreDetails: '/store',
    ProductCategory: '/product-category',
    PaymentMode: '/payment',
    Order: '/order',
    Badge: '/badge',
    Charges: '/charge',
    Attributes: '/attribute',
    Product: '/product',
    Cart: '/cart',
    Contact: '/contact',
    SocialLink: '/social-link',
    Links: '/link',
    Domain: '/domain',
    Pages: '/page',
    Delivery: '/delivery',
    Notification: '/notification',
    CheckoutOrder: '/checkoutOrder',
    CheckoutAddress: '/checkoutAddr',
    CheckoutNotes: '/checkoutNotes',
    CheckoutUserDetails: '/checkoutUserDetails',
    Banner: '/banner',
    ProductStore: '/product-store',
    ProductDetails:'/product-store/product/'
}

export default Endpoints;
