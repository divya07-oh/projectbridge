import { BrowserRouter, Routes, Route } from "react-router-dom"
import RootLayout from "./components/layout/RootLayout"
import DashboardLayout from "./components/layout/DashboardLayout"
import LandingPage from "./pages/LandingPage"
import MarketplacePage from "./pages/MarketplacePage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import StudentDashboard from "./pages/StudentDashboard"
import StudentProfile from "./pages/StudentProfile"
import ApplicationsPage from "./pages/ApplicationsPage"
import EarningsPage from "./pages/EarningsPage"
import BusinessDashboard from "./pages/BusinessDashboard"
import CreateProjectPage from "./pages/CreateProjectPage"
import MessagingPage from "./pages/MessagingPage"
import ReviewsPage from "./pages/ReviewsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<MarketplacePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/profile/:id" element={<StudentProfile />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          
          {/* Business Routes */}
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/business/create-project" element={<CreateProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
