import { Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import './App.css';
import AnimationWrapper from './components/Framer_components/AnimationWrapper.jsx';
import Home from './pages/Home.jsx';
import MettingPage from './pages/MettingPage.jsx';
import LiveVideoPage from './pages/LiveVideoPage.jsx';
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AuthTemplatePage from './pages/AuthTemplatePage.jsx';
import OTP from './pages/OTP.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';
import PublicRoute from './components/common/PublicRoute.jsx';
import Layout from './components/common/Layout.jsx';


function App() {
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
  return (
    <StrictMode>
      <AgoraRTCProvider client={agoraClient}>
        <AnimationWrapper>
          <Routes>
            {/* Routes that need the NavBar */}
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/meeting' element={<MettingPage />} />
              <Route path='/auth' element={<PublicRoute element={<AuthTemplatePage />} />} />
              <Route path='/verify-via-otp' element={<OTP />} />
            </Route>

            {/* Route without NavBar */}
            <Route path='/meeting/:channel/:uid' element={<PrivateRoute element={<LiveVideoPage />} />} />
          </Routes>
        </AnimationWrapper>
      </AgoraRTCProvider>
    </StrictMode>
  );
}

export default App;
