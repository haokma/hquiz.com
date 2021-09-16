import { Login } from 'features/Auth/pages/Login';
import { Register } from 'features/Auth/pages/Register';
import { Redirect, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './features/Page404';
import DashboardLayout from './layouts/dashboard';
import PrivateRouter from './routes/PrivateRouter';
import ThemeConfig from './theme';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Switch>
        <PrivateRouter path="/dashboard">
          <DashboardLayout />
        </PrivateRouter>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route extra path="/">
          <Redirect to="/dashboard/app" />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ThemeConfig>
  );
}
