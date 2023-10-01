import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router";
import AppURL from "../api/AppURL";
import HomePage from "../pages/HomePage";
import UserLoginPage from "../pages/UserLoginPage";
import ContactPage from "../pages/ContactPage";
import PurchasePage from "../pages/PurchasePage";
import PrivacyPage from "../pages/PrivacyPage";
import RefundPage from "../pages/RefundPage";
import ProductDetailsPage from "../pages/ProductDetailPages";
import Notification from "../components/Notification/Notification";
import FavouritePage from "../components/Favorite/Favorite";
import CartPage from "../pages/CartPage";
import AboutPage from "../pages/AboutPage";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import ProductSubCategoryPage from "../pages/ProductSubCategoryPage";
import SearchPage from "../pages/SearchPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import axios from "axios";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import OrderListPage from "../pages/OrderListPage";
class AppRoute extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.UserData)
      .then((response) => {
        this.setUser(response.data);
      })
      .catch((error) => {});
  }

  setUser = (user) => {
    this.setState({ user: user });
  };

  render() {
    return (
      <Fragment>
        <NavMenuDesktop user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <UserLoginPage
                user={this.state.user}
                setUser={this.setUser}
                {...props}
                key={Date.now()}
              />
            )}
          />

          <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterPage
                user={this.state.user}
                setUser={this.setUser}
                {...props}
                key={Date.now()}
              />
            )}
          />

          <Route
            exact
            path="/forget"
            render={(props) => (
              <ForgetPasswordPage {...props} key={Date.now()} />
            )}
          />

          <Route
            exact
            path="/reset/:id"
            render={(props) => (
              <ResetPasswordPage {...props} key={Date.now()} />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <ProfilePage
                user={this.state.user}
                setUser={this.setUser}
                {...props}
                key={Date.now()}
              />
            )}
          />

          <Route exact path="/contact" component={ContactPage} />

          <Route exact path="/purchase" component={PurchasePage} />

          <Route
            exact
            path="/privacy"
            render={(props) => <PrivacyPage {...props} key={Date.now()} />}
          />
          <Route exact path="/refund" component={RefundPage} />

          <Route
            exact
            path="/productdetails/:code"
            render={(props) => (
              <ProductDetailsPage
                user={this.state.user}
                {...props}
                key={Date.now()}
              />
            )}
          />

          <Route exact path="/notification" component={Notification} />
          <Route
            exact
            path="/favourite"
            render={(props) => (
              <FavouritePage
                user={this.state.user}
                {...props}
                key={Date.now()}
              />
            )}
          />
          <Route
            exact
            path="/cart"
            render={(props) => (
              <CartPage user={this.state.user} {...props} key={Date.now()} />
            )}
          />
          <Route exact path="/about" component={AboutPage} />
          <Route
            exact
            path="/productcategory/:category"
            component={ProductCategoryPage}
          />
          <Route
            exact
            path="/productsubcategory/:category/:subcategory"
            component={ProductSubCategoryPage}
          />

          <Route
            exact
            path="/productbysearch/:searchkey"
            render={(props) => <SearchPage {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/orderlist"
            render={(props) => (
              <OrderListPage
                user={this.state.user}
                {...props}
                key={Date.now()}
              />
            )}
          />
        </Switch>
      </Fragment>
    );
  }
}
export default AppRoute;
