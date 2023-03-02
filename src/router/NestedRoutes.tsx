import { INestedRouteProps } from '../interface/ICommon';

interface INestedRoutesProps {
    category: string
    routes: INestedRouteProps[]
}

const NestedRoutes: INestedRoutesProps[] = [
    {
        category: '', routes: [
            { path: 'dashboard', name: 'Dashboard', icon: 'Dashboard' },
            { path: 'orders', name: 'Orders', icon: 'Orders' },
            { path: 'reviews', name: 'Reviews', icon: 'Reviews' }
        ]
    }, {
        category: 'Product', routes: [
            { path: 'categories', name: 'Categories', icon: 'Categories' },
            { path: 'products', name: 'Products', icon: 'Products' },
            { path: 'badges', name: 'Badges', icon: 'Badges' },
            { path: 'attributes', name: 'Attributes', icon: 'Attributes' },
            { path: 'charges', name: 'Charges', icon: 'Charges' }
        ]
    }, {
        category: 'Settings', routes: [
            { path: 'delivery', name: 'Delivery', icon: 'Delivery' },
            { path: 'notification', name: 'Notification', icon: 'Notification' },
            { path: 'checkout', name: 'Checkout', icon: 'Checkout' },
            { path: 'banner', name: 'Banner', icon: 'Banner' },
            { path: 'payment', name: 'Payment', icon: 'Payment' },
            { path: 'coupon', name: 'Coupon', icon: 'Coupon' }
        ]
    }
]

export default NestedRoutes;
