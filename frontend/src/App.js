import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import SuspendedProductScreen from './screens/SuspendedProductScreen';
import SigninScreen from './screens/SigninScreen';
import ProfileScreen from './screens/ProfileScreen';
import { LinkContainer } from 'react-router-bootstrap';
import { useSignOut, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import NewProductScreen from './screens/NewproductScreen';
import RequestScreen from './screens/RequestScreen';
import RoomScreen from './screens/RoomScreen';
import LatePolicy from './screens/LatePolicy';
import Statistics from './screens/Statistics';
import SuspensionHistoryScreen from './screens/SuspensionHistoryScreen';

import Language from './componnents/language';

const Divider = () => {
  return (
    <div
      style={{
        borderLeft: '1px solid white',
        height: '50px',
        margin: '0 12px',
      }}
    />
  );
};
function App() {
  const singOut = useSignOut();

  const logout = () => {
    singOut();
  };
  const auth = useAuthUser();
  const isAuth = useIsAuthenticated();
  console.log(isAuth());
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Container>
          <header className="fixed-top">
            <Navbar className="navbar-nav" bg="dark" variant="dark">
              <Container className="navbar-container">
                <LinkContainer to="/">
                  <Navbar.Brand className="brand  border-right">
                    Warehouse
                  </Navbar.Brand>
                </LinkContainer>
                <Divider />
                <Language></Language>
                <Divider />

                {isAuth() ? (
                  auth().role === 'Admin' ? (
                    <>
                      <LinkContainer to="/profile">
                        <Navbar.Brand className="brand divider">
                          Borrowed equipment
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer to="/request">
                        <Navbar.Brand className="brand divider">
                          Requests
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer to="/suspended">
                        <Navbar.Brand className="brand divider">
                          Suspended equipment
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer to="/suspension-history">
                        <Navbar.Brand className="brand divider">
                          Suspension History
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer to="/newproduct">
                        <Navbar.Brand className="brand divider">
                          New product
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer to="/statistics">
                        <Navbar.Brand className="brand divider">
                          Statistics
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer onClick={logout} to="/signin">
                        <Navbar.Brand className="brand">Log Out</Navbar.Brand>
                      </LinkContainer>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/profile">
                        <Navbar.Brand className="brand divider">
                          Profile
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer to="/late-policy">
                        <Navbar.Brand className="brand divider">
                          Late Policy
                        </Navbar.Brand>
                      </LinkContainer>
                      <Divider />
                      <LinkContainer onClick={logout} to="/signin">
                        <Navbar.Brand className="brand">Log Out</Navbar.Brand>
                      </LinkContainer>
                    </>
                  )
                ) : (
                  <>
                    <LinkContainer to="/signin">
                      <Navbar.Brand className="brand divider">
                        Sign In
                      </Navbar.Brand>
                    </LinkContainer>
                    <Divider />
                    <LinkContainer to="/signup">
                      <Navbar.Brand className="brand">Register</Navbar.Brand>
                    </LinkContainer>
                  </>
                )}
              </Container>
            </Navbar>
          </header>
          <main className="mt-5">
            <Container>
              <Routes>
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/" element={<HomeScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/suspended" element={<SuspendedProductScreen />} />
                <Route path="/newproduct" element={<NewProductScreen />} />
                <Route path="/order/:slug" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/request" element={<RequestScreen />} />
                <Route path="/room" element={<RoomScreen />} />
                <Route path="/late-policy" element={<LatePolicy />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route
                  path="/suspension-history"
                  element={<SuspensionHistoryScreen />}
                />
              </Routes>
            </Container>
          </main>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
