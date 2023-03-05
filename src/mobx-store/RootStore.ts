import CommonStore from "./CommonStore";
import AuthStore from "./AuthStore";
import ShopStore from "./ShopStore";
import ProductCategoryStore from "./ProductCategoryStore";
import BadgeStore from "./BadgeStore";
import ChargesStore from "./ChargesStore";
import AttributesStore from "./AttributesStore";
import ProductStore from "./ProductStore";
import ContactStore from "./ContactStore";
import SocialLinksStore from "./SocialLinksStore";
import LinksStore from "./LinksStore";
import DomainStore from "./DomainStore";
import PagesStore from "./PagesStore";
import DeliveryStore from "./DeliveryStore";
import NotificationStore from "./NotificationStore";
import CheckoutStore from "./CheckoutStore";
import BannerStore from "./BannerStore";
import PaymentStore from "./PaymentStore";
import CartStore from "./CartStore";
import ShippingStore from "./ShippingStore";


class RootStore {
    commonStore: CommonStore;
    authStore: AuthStore;
    shopStore: ShopStore;
    productCategory: ProductCategoryStore;
    badgeStore: BadgeStore;
    chargesStore: ChargesStore;
    attributesStore: AttributesStore;
    productStore: ProductStore;
    contactStore: ContactStore;
    socialLinkStore: SocialLinksStore;
    linksStore: LinksStore;
    domainStore: DomainStore;
    pagesStore: PagesStore;
    deliveryStore: DeliveryStore;
    notificationStore: NotificationStore;
    checkoutStore: CheckoutStore;
    bannerStore: BannerStore;
    paymentStore: PaymentStore;
    cartStore : CartStore
    shippingStore: ShippingStore;
    constructor() {
        this.commonStore = new CommonStore();
        this.authStore = new AuthStore();
        this.shopStore = new ShopStore();
        this.productCategory = new ProductCategoryStore();
        this.badgeStore = new BadgeStore();
        this.chargesStore = new ChargesStore();
        this.attributesStore = new AttributesStore();
        this.productStore = new ProductStore();
        this.contactStore = new ContactStore();
        this.socialLinkStore = new SocialLinksStore();
        this.linksStore = new LinksStore();
        this.domainStore = new DomainStore();
        this.pagesStore = new PagesStore();
        this.deliveryStore = new DeliveryStore();
        this.notificationStore = new NotificationStore();
        this.checkoutStore = new CheckoutStore();
        this.bannerStore = new BannerStore();
        this.paymentStore = new PaymentStore();
        this.cartStore = new CartStore();
        this.shippingStore = new ShippingStore();

    }
}

export default new RootStore();
