import { useEffect, Switch } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
    homeOutline,
    bagHandleOutline,
    personCircleOutline,
    videocamOutline,
    searchOutline,
} from "ionicons/icons";
import SearchIcon from "@mui/icons-material/Search";
import { checkUserSession } from "./Redux/User/user.actions";
import ReactGA from 'react-ga';

// PAGES
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Orderhistorypg from "./pages/Orderhistorypg";
import Account from "./pages/Account";
import ExtraSettings from "./pages/ExtraSettings";
// import Admin from "./pages/Admin";
import Admin2 from "./pages/Admin2";
import SearchResultsPg from "./pages/SearchResultsPg";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Seller from "./pages/Seller";
import CustomerOrders from "./pages/CustomerOrders";
import Order from "./pages/Order";
import SellerSignup from "./pages/SellerSignup";
import SocialsLink from "./pages/SocialsLink";
// import SellerForm2 from "./pages/SellerForm2";
import Logo from "./Assets/mallshop2.png";
import SellerForm from "./pages/SellerForm";
import ReviewPost from "./pages/ReviewPost";
import ReviewToks from "./pages/ReviewTok/actual";
import ShipLabel from "./pages/ShipLabel";

import Privacy from "./components/PrivacyNotice";
import Support from "./pages/SupportHelpPg";
import ConditionsUse from "./components/ConditionsOfUse";
import AnnouncementPage from "./pages/AnnouncementPage";
import Affiliate from "./pages/Affiliate";
import LagrangeNetwork from "./pages/LagrangeNetwork";
import Advertise from "./pages/AdvertiseProducts";
import CompanyPage from "./pages/CompanyPages";
import Guide from "./pages/Guide1";

// import ShipLabelStrapper from "./pages/ShipLabelStrapper";

// LAYOUTS
import MainLayout from "./layouts/MainLayout.js";
import HomepageLayout from "../src/layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ExtraOptionLayout from "./layouts/ExtraOptionLayout";

// HOC
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";
import WithAdminAuth2 from "./hoc/withAdminAuth2";
import "@stripe/stripe-js";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./default.scss";

const App = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());

        // ReactGA.initialize('UA-205040198-1');
        // ReactGA.pageview(window.location.pathname + window.location.search);

    }, []);

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet className="wholeApp">
                        <Route path="/Home"> <HomepageLayout> <Homepage /> </HomepageLayout> </Route>
                        <Route exact path="/"> <Redirect to="/Home" /> </Route>
                        <Route path="/Advertise" render={() => ( <MainLayout> <Advertise /> </MainLayout> )} />
                        <Route path="/CompanyPage" render={() => ( <MainLayout> <CompanyPage /> </MainLayout> )} />
                        <Route path="/AnnouncementPage" render={() => ( <MainLayout> <AnnouncementPage /> </MainLayout> )} />
                        <Route path="/Registration" render={() => ( <MainLayout> <Registration /> </MainLayout> )} />
                        <Route path="/Payment" render={() => (  <MainLayout> <Payment /> </MainLayout>  )} />
                        <Route path="/Cart" render={() => ( <MainLayout> <Cart /> </MainLayout> )} />
                        <Route path="/Login" render={() => ( <MainLayout> <Login /> </MainLayout> )} />
                        <Route path="/Recovery" render={() => ( <MainLayout> <Recovery /> </MainLayout> )} />
                        <Route exact path="/SearchResults" render={() => ( <MainLayout> <SearchResultsPg /> </MainLayout> )} />
                        <Route exact path="/ReviewFeed" render={() => ( <ReviewToks/> )} />
                        <Route exact path="/ReviewFeed/:productID" render={() => ( <ReviewToks/> )} />
                        <Route path="/Product/:productID" render={() => ( <MainLayout> <ProductDetails /> </MainLayout> )} />
                        <Route path="/ShipLabel/:sellerOrdersIDGet" render={() => ( <WithAuth> <MainLayout> <ShipLabel /> </MainLayout> </WithAuth> )} />
                        {/* // VERY IMPORTANT WHEN REFERING TO useParams in /ShipLabel */}
                        {/* ADD MEDIA QUERY TO HIDE TABS AND LAYOUT */}
                        <Route path="/ReviewPost/:productID" render={() => ( <ReviewPost /> )} />
                        <Route path="/Order/:orderID" render={() => ( <WithAuth> <DashboardLayout> <Order /> </DashboardLayout> </WithAuth> )} />
                        <Route path="/SearchResults/:filterType" render={() => ( <MainLayout> <SearchResultsPg /> </MainLayout> )} />
                        <Route path="/SearchResults/:input" render={() => ( <MainLayout> <SearchResultsPg /> </MainLayout> )} />
                        {/* //CHANGING THIS SHOWED ME THAT WE CAN CREATE ANY NEW PAGE/:filterType or page/:anything */}
                        <Route path="/Seller" render={() => ( <WithAdminAuth> <AdminLayout> <Seller /> </AdminLayout> </WithAdminAuth> )} />
                        <Route path="/CustomerOrders" render={() => ( <WithAdminAuth> <AdminLayout> <CustomerOrders /> </AdminLayout> </WithAdminAuth> )} />
                        <Route path="/admin2" render={() => ( <WithAdminAuth2> <AdminLayout> <Admin2 /> </AdminLayout> </WithAdminAuth2> )} />
                        <Route path="/OrderHistory" render={() => ( <WithAuth> <DashboardLayout> <Orderhistorypg /> </DashboardLayout> </WithAuth> )} />
                        <Route path="/Account" render={() => ( <WithAuth> <DashboardLayout> <Account /> </DashboardLayout> </WithAuth> )} />
                        <Route path="/ExtraSettings" render={() => ( <WithAuth> <ExtraOptionLayout> <ExtraSettings /> </ExtraOptionLayout> </WithAuth> )} />
                        <Route exact path="/SocialsLink" render={() => ( <MainLayout> <SocialsLink /> </MainLayout> )} />

                        <Route exact path="/SellerSignup" render={() => ( <MainLayout> <SellerSignup /> </MainLayout> )} />
                        <Route exact path="/SellerForm" render={() => ( <MainLayout> <SellerForm /> </MainLayout> )} />
                        <Route exact path="/Affiliate" render={() => ( <MainLayout> <Affiliate /> </MainLayout> )} />
                        <Route exact path="/LagrangeNetwork" render={() => ( <MainLayout> <LagrangeNetwork /> </MainLayout> )} />
                        <Route exact path="/SellingSuccessfully" render={() => ( <MainLayout> <Guide /> </MainLayout> )} />
                        <Route exact path="/ConditionsOfUse" render={() => ( <MainLayout> <ConditionsUse /> </MainLayout> )} />
                        <Route exact path="/PrivacyNotice" render={() => ( <MainLayout> <Privacy /> </MainLayout> )} />
                        <Route exact path="/SupportHelpPg" render={() => ( <MainLayout> <Support /> </MainLayout> )} />
                    </IonRouterOutlet>
                    {/* TABS CONTENT */}

                    <IonTabBar className="OfftabsMobile" slot="bottom">
                        <IonTabButton className="tabCustomStyle" tab="Home" href="/Home">
                            <IonIcon icon={homeOutline} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton  className="tabCustomStyle" tab="Categories" href="/SearchResults">
                            <IonIcon  icon={searchOutline} />
                            <IonLabel>Categories</IonLabel>
                        </IonTabButton>
                        <IonTabButton  className="tabCustomStyle" tab="Reviews" href="/ReviewFeed">
                            <IonIcon  icon={videocamOutline} />
                            <IonLabel>Reviews</IonLabel>
                        </IonTabButton>
                        <IonTabButton className="tabCustomStyle"  tab="Cart" href="/Cart">
                            <IonIcon className="boldenTabIcon" icon={bagHandleOutline} />
                            <IonLabel>Cart</IonLabel>
                        </IonTabButton>
                        <IonTabButton className="tabCustomStyle"  tab="Account" href="/Account">
                            <IonIcon icon={personCircleOutline} />
                            <IonLabel>Account</IonLabel>
                        </IonTabButton>



                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

//ALLOWS OTHER COMPS TO USE with Connect and mapstateToProps and mapDispatchToProps, but now we can just replace them with Redux Hooks and UseEffect
export default App;
