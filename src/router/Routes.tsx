import { lazy } from 'react';
import { IRoutesProps } from '../interface/ICommon';

const MyProfile = lazy(() => import('../views/account/MyProfile'));
const Subscription = lazy(() => import('../views/account/Subscription'));
const ResetPassword = lazy(() => import('../views/account/ResetPassword'));
const MainDashboard = lazy(() => import('../views/dashboard/Dashboard'));
const BusinessProfile = lazy(() => import('../views/settings/BusinessProfile'));
const Contact = lazy(() => import('../views/settings/contact/Contacts'));
const Domain = lazy(() => import('../views/settings/Domain'));
const Links = lazy(() => import('../views/settings/links/Links'));
const Pages = lazy(() => import('../views/settings/pages/Pages'));
const AddPages = lazy(() => import('../views/settings/pages/AddPage'));
const UpdatePage = lazy(() => import('../views/settings/pages/UpdatePage'));
const SocialLinks = lazy(() => import('../views/settings/SocialLinks'));
const Theme = lazy(() => import('../views/settings/Theme'));
const Attributes = lazy(() => import('../views/store/Attributes'));
const Badges = lazy(() => import('../views/store/Badges'));
const Categories = lazy(() => import('../views/store/productCategory.tsx/ProductCategories'));
const Charges = lazy(() => import('../views/store/charges/Charges'));
const AddCharges = lazy(() => import('../views/store/charges/AddCharges'));
const UpdateCharges = lazy(() => import('../views/store/charges/UpdateCharges'));
const Dashboard = lazy(() => import('../views/store/Dashboard'));
const Delivery = lazy(() => import('../views/store/Delivery'));
const Orders = lazy(() => import('../views/store/Orders'));
const Products = lazy(() => import('../views/store/products/Products'));
const AddProducts = lazy(() => import('../views/store/products/AddProduct'));
const UpdateProducts = lazy(() => import('../views/store/products/UpdateProduct'));
const Reviews = lazy(() => import('../views/store/Reviews'));
const Notification = lazy(() => import('../views/store/Notification'));
const MinOrder = lazy(() => import('../views/store/checkouts/MinOrder'));
const Address = lazy(() => import('../views/store/checkouts/Address'));
const Note = lazy(() => import('../views/store/checkouts/Note'));
const UserVerification = lazy(() => import('../views/store/checkouts/UserVerification'));
const Banner = lazy(() => import('../views/store/Banner'));
const Payment = lazy(() => import('../views/store/Payment'));
const EditPayment = lazy(() => import('../views/store/PaymentSetting'));

const Coupon = lazy(() => import('../views/store/Coupon'));
const AddContact = lazy(() => import('../views/settings/contact/AddContact'));
const UpdateContact = lazy(() => import('../views/settings/contact/UpdateContact'));
const AddLink = lazy(() => import('../views/settings/links/AddLink'));
const UpdateLink = lazy(() => import('../views/settings/links/UpdateLink'));
// const ProductStore = lazy(() => import('../views/productStore'));

const Routes: IRoutesProps[] = [
    { path: 'main-dashboard', name: 'Dashboard', element: MainDashboard, icon: 'Dashboard', children: [] },
    // { path: 'product-store', name: 'Product Store', element: ProductStore, icon: 'Dashboard', children: [] },
    {
        path: 'store', name: 'Store', icon: 'Store', children: [
            { path: 'dashboard', name: 'Dashboard', element: Dashboard, icon: 'Dashboard' },
            { path: 'orders', name: 'Orders', element: Orders, icon: 'Orders' },
            { path: 'reviews', name: 'Reviews', element: Reviews, icon: 'Reviews' },
            { path: 'categories', name: 'Categories', element: Categories, icon: 'Categories' },
            { path: 'products', name: 'Products', element: Products, icon: 'Products' },
            { path: 'products/add', name: 'Add Product', element: AddProducts, icon: 'Products' },
            { path: 'products/:id', name: 'Update Product', element: UpdateProducts, icon: 'Products' },
            { path: 'badges', name: 'Badges', element: Badges, icon: 'Badges' },
            { path: 'attributes', name: 'Attributes', element: Attributes, icon: 'Attributes' },
            { path: 'charges', name: 'Charges', element: Charges, icon: 'Charges' },
            { path: 'charges/add', name: '', element: AddCharges, icon: 'Charges' },
            { path: 'charges/:id', name: '', element: UpdateCharges, icon: 'Charges' },
            { path: 'delivery', name: 'Delivery', element: Delivery, icon: 'Delivery' },
            { path: 'notification', name: 'Notification', element: Notification, icon: 'Notification' },
            {
                path: 'checkout', name: 'Checkout', icon: 'Checkout', tabChildren: [
                    { path: 'min-order', name: 'Min Order', element: MinOrder, icon: 'MinOrder' },
                    { path: 'address', name: 'Address', element: Address, icon: 'Address' },
                    { path: 'note', name: 'Note', element: Note, icon: 'Note' },
                    { path: 'user-verification', name: 'User Verification', element: UserVerification, icon: 'UserVerification' }
                ]
            },
            { path: 'banner', name: 'Banner', element: Banner, icon: 'Banner' },
            { path: 'payment', name: 'Payment', element: Payment, icon: 'Payment' },
            { path: 'payment/:id', name: 'Edit Payment', element: EditPayment, icon: 'Payment' },
            { path: 'products/:id', name: 'Update Product', element: UpdateProducts, icon: 'Products' },
            { path: 'coupon', name: 'Coupon', element: Coupon, icon: 'Coupon' }
        ]
    },
    {
        path: 'settings', name: 'Settings', icon: 'Settings', children: [
            { path: 'business-profile', name: 'Business Profile', element: BusinessProfile, icon: 'BizzProfile' },
            { path: 'contact', name: 'Contact', element: Contact, icon: 'Contact' },
            { path: 'contact/add', name: '', element: AddContact, icon: 'Contact' },
            { path: 'contact/:id', name: '', element: UpdateContact, icon: 'Contact' },
            { path: 'social-links', name: 'Social Links', element: SocialLinks, icon: 'SocialLinks' },
            { path: 'domain', name: 'Domain', element: Domain, icon: 'Domain' },
            { path: 'links', name: 'Links', element: Links, icon: 'Links' },
            { path: 'links/add', name: '', element: AddLink, icon: 'Links' },
            { path: 'links/:id', name: '', element: UpdateLink, icon: 'Links' },
            { path: 'pages', name: 'Pages', element: Pages, icon: 'Pages' },
            { path: 'pages/add', name: '', element: AddPages, icon: 'Pages' },
            { path: 'pages/:id', name: '', element: UpdatePage, icon: 'Pages' },
            { path: 'theme', name: 'Theme', element: Theme, icon: 'Theme' },
        ]
    },
    {
        path: 'account', name: 'Account', icon: 'Account', children: [
            { path: 'my-profile', name: 'My Profile', element: MyProfile, icon: 'Account' },
            { path: 'reset-password', name: 'Reset Password', element: ResetPassword, icon: 'Subscription' },
            { path: 'subscription', name: 'Subscription', element: Subscription, icon: 'Subscription' },
            // { path: 'logout', name: 'Logout', element: Settings, icon: 'Logout' }
        ]
    }
]

export default Routes;
