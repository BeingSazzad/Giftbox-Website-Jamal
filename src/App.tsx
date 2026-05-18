import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { SplashScreen } from './components/SplashScreen'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { OtpVerifyPage } from './pages/OtpVerifyPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { HomePage } from './pages/HomePage'
import { DrawDetailsPage } from './pages/DrawDetailsPage'
import { PaymentProofPage } from './pages/PaymentProofPage'
import { MyDrawsPage } from './pages/MyDrawsPage'
import { ParticipationDetailsPage } from './pages/ParticipationDetailsPage'
import { DrawResultsPage } from './pages/DrawResultsPage'
import { ProfilePage } from './pages/ProfilePage'
import { EditProfilePage } from './pages/EditProfilePage'
import { ChangePasswordPage } from './pages/ChangePasswordPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsPage } from './pages/TermsPage'
import { AboutUsPage } from './pages/AboutUsPage'
import { FaqPage } from './pages/FaqPage'
import { LanguagePage } from './pages/LanguagePage'
import { SupportPage } from './pages/SupportPage'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FE9301',
          colorInfo: '#FE9301',
          colorBgBase: '#1a0f3d',
          colorBgContainer: '#1f1545',
          colorBgElevated: '#2a1854',
          colorBorder: '#2a2a35',
          colorText: '#e5e7eb',
          colorTextHeading: '#ffffff',
          borderRadius: 8,
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Button: {
            colorPrimaryHover: '#FFB900',
            colorTextLightSolid: '#1a0f0a',
          },
        },
      }}
    >
      <SplashScreen duration={1000} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-otp" element={<OtpVerifyPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="draw/:id" element={<DrawDetailsPage />} />
          <Route path="draw/:id/payment-proof" element={<PaymentProofPage />} />
          <Route path="my-draws" element={<MyDrawsPage />} />
          <Route path="my-draws/:id" element={<ParticipationDetailsPage />} />
          <Route path="draw-results/:id" element={<DrawResultsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="profile/change-password" element={<ChangePasswordPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="language" element={<LanguagePage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
