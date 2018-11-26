import * as React from 'react';
// Components
// import GenerateWallet from 'containers/Tabs/GenerateWallet';
// import LandingPage from 'containers/Tabs/LandingPage';
// import ErrorScreen from 'components/ErrorScreen';
// import PageNotFound from 'components/PageNotFound';
// import { pollOfflineStatus, TPollOfflineStatus } from 'actions/config';
// import { AppState } from 'reducers';
// import { RouteNotFound } from 'components/RouteNotFound';
// import 'what-input';
// import { setUnitMeta, TSetUnitMeta } from 'actions/transaction';
// import { getNetworkUnit } from 'selectors/config';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import WebTemplate from './containers/TabSection/WebTemplate';
// import AppDialog from './ccComponents/AppDialog';
import './state/state';
// import Wallet from 'ccContainers/Tabs/Wallet';
// import AppSnackBar from './ccComponents/AppSnackBar';
import CryptoCurveCss from './theme/CryptoCurveCss';
import ErrorScreen from './components/ErrorScreen';
import AppSnackBar from './components/AppSnackBar';
import AppDialog from './components/AppDialog';
import LandingPage from './containers/LandingPage/LandingPage';
import Fade from '@material-ui/core/Fade/Fade';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import BackgroundImage from './assets/images/mycryptocurveMain.jpg';
import { cryptoCurveMainTheme } from './theme/theme';
import Header from './components/Header';
import DialogContext from './context/DialogContext';
import SnackBarContext from './context/SnackBarContext';
import RouteContext, { WithRouteContext, withRouteContext } from './context/RouteContext';
import { helperRenderConsoleText } from './helpers/helpers';

interface OwnProps {
}

const styles = (theme: Theme) =>
  createStyles({
    background: {
      backgroundImage: `url(${BackgroundImage})`,
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#35286E',
      top: 0,
      position: 'absolute',
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      [theme.breakpoints.only('xl')]: {
        backgroundSize: 'cover'
      }
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  error: Error | null;
}

class App extends React.Component<Props, State> {
  public state = {
    error: null
  };

  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    console.log(...helperRenderConsoleText('Render App', 'lightGreen'));
    const { error } = this.state;
    if (error) {
      return <ErrorScreen error={error}/>;
    }

    // const routes: JSX.Element = (
    {/*<Route path="/account" exact={true} component={Wallet} />*/
    }
    {/*<Route path="/generate" component={GenerateWallet} />*/
    }
    {/*<Route path="/" component={LandingPage} />*/
    }
    {/*<Redirect exact={true} from="/" to="/account" />*/
    }
    // );

    return (
      <React.Fragment>
        <CssBaseline/>
        <CryptoCurveCss/>
        <MuiThemeProvider theme={cryptoCurveMainTheme}>
          <RouteContext>
            <DialogContext>
              <SnackBarContext>
                {/*<WebTemplate routes={routes} />*/}
                <MainRouting/>
                <AppDialog/>
                <AppSnackBar/>
              </SnackBarContext>
            </DialogContext>
          </RouteContext>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

const MainRouting = withStyles(styles)(withRouteContext((props: WithRouteContext & WithStyles<typeof styles>) => {
  console.log(props);
  const { routeContext, classes } = props;
  const { location } = routeContext;
  return (
    <React.Fragment>
      <Fade in={location === ''}>
        <div className={classes.background}/>
      </Fade>
      <Header/>
      {location === 'wallet' ? <div/> :
        <LandingPage/>}
    </React.Fragment>
  );
}));
export default App as React.ComponentClass<{}>;
