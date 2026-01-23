import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './pages/Home'
import ConvenienceStore from './pages/ConvenienceStore'
import CarWash from './pages/CarWash'
import GarageShops from './pages/GarageShops'
import CloudBasedPOS from './pages/CloudBasedPOS'
import QuickService from './pages/QuickService'
import Bakery from './pages/Bakery'
import Hotel from './pages/Hotel'
import Bar from './pages/Bar'
import ClothingStore from './pages/ClothingStore'
import GroceryStore from './pages/GroceryStore'
import NailSalon from './pages/NailSalon'
import Salon from './pages/Salon'
import Cafe from './pages/Cafe'
import PizzaShop from './pages/PizzaShop'
import Restaurant from './pages/Restaurant'
import RetailPOS from './pages/RetailPOS'
import HospitalityPOS from './pages/HospitalityPOS'
import Software from './pages/Software'
import Loyalty from './pages/Loyalty'
import Mailchimp from './pages/Mailchimp'
import WhatsApp from './pages/WhatsApp'
import ZohoCampaigns from './pages/ZohoCampaigns'
import EmailCampaign from './pages/EmailCampaign'
import SupportCentre from './pages/SupportCentre'
import ServiceRequest from './pages/ServiceRequest'
import AboutBloomSwiftPOS from './pages/AboutBloomSwiftPOS'
import SuccessStories from './pages/SuccessStories'
import UserProfile from './pages/UserProfile'

// Admin Components
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import LiveChat from './pages/Admin/LiveChat'
import ProjectRequests from './pages/Admin/ProjectRequests'
import HardwareAdmin from './pages/Admin/Hardware'
import Tickets from './pages/Admin/Tickets'
import { ToastProvider } from './context/ToastContext'
import { UIProvider } from './context/UIContext'
import Hardware from './pages/Hardware'
import MyTickets from './pages/MyTickets'
import MyPOSRequests from './pages/MyPOSRequests'

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <UIProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/convenience-store" element={<ConvenienceStore />} />
            <Route path="/car-wash" element={<CarWash />} />
            <Route path="/garage-shops" element={<GarageShops />} />
            <Route path="/cloud-based-pos" element={<CloudBasedPOS />} />
            <Route path="/quick-service" element={<QuickService />} />
            <Route path="/bakery" element={<Bakery />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/clothing-store" element={<ClothingStore />} />
            <Route path="/grocery-store" element={<GroceryStore />} />
            <Route path="/nail-salon" element={<NailSalon />} />
            <Route path="/salon" element={<Salon />} />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/pizza-shop" element={<PizzaShop />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/retail-pos" element={<RetailPOS />} />
            <Route path="/hospitality-pos" element={<HospitalityPOS />} />
            <Route path="/software" element={<Software />} />
            <Route path="/integrations/loyalty" element={<Loyalty />} />
            <Route path="/integrations/mailchimp" element={<Mailchimp />} />
            <Route path="/integrations/whatsapp" element={<WhatsApp />} />
            <Route path="/integrations/zoho-campaigns" element={<ZohoCampaigns />} />
            <Route path="/integrations/email-campaign" element={<EmailCampaign />} />
            <Route path="/support-centre" element={<SupportCentre />} />
            <Route path="/request-pos" element={<ServiceRequest />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/about-bloom-swift-pos" element={<AboutBloomSwiftPOS />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/my-pos-requests" element={<MyPOSRequests />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="live-chat" element={<LiveChat />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="project-requests" element={<ProjectRequests />} />
            <Route path="hardware" element={<HardwareAdmin />} />
          </Route>
        </Routes>
      </UIProvider>
    </ToastProvider>
  )
}
