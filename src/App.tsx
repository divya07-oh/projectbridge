import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppProvider, useAppContext } from "./context/AppContext"
import { Toaster } from "@/components/ui/sonner"

import RootLayout from "./components/layout/RootLayout"
import DashboardLayout from "./components/layout/DashboardLayout"
import LandingPage from "./pages/LandingPage"
import FindWorkPage from "./pages/FindWorkPage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import StudentDashboard from "./pages/StudentDashboard"
import StudentProfile from "./pages/StudentProfile"
import ApplicationsPage from "./pages/ApplicationsPage"
import EarningsPage from "./pages/EarningsPage"
import BusinessDashboard from "./pages/BusinessDashboard"
import CreateProjectPage from "./pages/CreateProjectPage"
import MessagingPage from "./pages/MessagingPage"
import ReviewsPage from "./pages/ReviewsPage"
import NotificationsPage from "./pages/NotificationsPage"

// New Auth Pages
import Login from "./pages/auth/Login"
import StudentSignup from "./pages/auth/StudentSignup"
import BusinessSignup from "./pages/auth/BusinessSignup"

// Business Pages
import BusinessActiveProjects from "./pages/business/BusinessActiveProjects"
import BusinessApplicants from "./pages/business/BusinessApplicants"
import BusinessPayments from "./pages/business/BusinessPayments"
import BusinessProfile from "./pages/business/BusinessProfile"

function ProtectedRoute({ children, requiredType }: { children: React.ReactNode, requiredType?: 'student' | 'business' }) {
  const { currentUser } = useAppContext()
  
  if (!currentUser) return <Navigate to="/login" replace />
  if (requiredType && currentUser.type !== requiredType) {
    return <Navigate to={currentUser.type === 'business' ? '/business' : '/student/dashboard'} replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<FindWorkPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/profile/:id" element={<StudentProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/student" element={<StudentSignup />} />
            <Route path="/signup/business" element={<BusinessSignup />} />
          </Route>

          {/* Student Dashboard Routes */}
          <Route element={<ProtectedRoute requiredType="student"><DashboardLayout /></ProtectedRoute>}>
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/find-work" element={<FindWorkPage />} />
            <Route path="/student/applications" element={<ApplicationsPage />} />
            <Route path="/student/earnings" element={<EarningsPage />} />
            <Route path="/student/messages" element={<MessagingPage />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/reviews" element={<ReviewsPage />} />
            <Route path="/student/notifications" element={<NotificationsPage />} />
          </Route>
          
          {/* Business Dashboard Routes */}
          <Route element={<ProtectedRoute requiredType="business"><DashboardLayout /></ProtectedRoute>}>
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/business/create-project" element={<CreateProjectPage />} />
            <Route path="/business/messages" element={<MessagingPage />} />
            <Route path="/business/active" element={<BusinessActiveProjects />} />
            <Route path="/business/applicants" element={<BusinessApplicants />} />
            <Route path="/business/payments" element={<BusinessPayments />} />
            <Route path="/business/profile" element={<BusinessProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AppProvider>
  )
}

export default App
