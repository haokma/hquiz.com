// material
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { logout } from 'features/Auth/authSlice';
import routes from 'routes';
import PrivateRouter from 'routes/PrivateRouter';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const currentRef = useRef(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('refreshToken'));
    if (token) {
      currentRef.current = setInterval(async () => {
        try {
          const token = JSON.parse(localStorage.getItem('refreshToken'));
          const res = await axios.post(`http://localhost:5000/api/auth/refresh-token`, {
            token
          });
          console.log(res.token);
          localStorage.setItem('token', JSON.stringify(res.token));
        } catch (error) {
          const action = logout();
          dispatch(action);
        }
      }, 80000 * 1000);
    }
    return () => {
      clearInterval(currentRef.current);
    };
  }, [history, dispatch]);
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Switch>
          {routes.map((route, index) => (
            <PrivateRouter key={index} exact path={route.path} component={route.component} />
          ))}
        </Switch>
      </MainStyle>
    </RootStyle>
  );
}
