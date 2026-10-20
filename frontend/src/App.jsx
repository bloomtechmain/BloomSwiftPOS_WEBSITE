import React, { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastProvider } from './context/ToastContext'
import { UIProvider } from './context/UIContext'
import { CartProvider } from './context/CartContext'
import CartSidebar from './Components/CartSidebar'
import FloatingCart from './Components/FloatingCart'

// Eager load only critical components
import Home from './pages/Home'

// Lazy load all other pages for better performance
const ConvenienceStore = lazy(() => import('./pages/ConvenienceStore'))
const CarWash = lazy(() => import('./pages/CarWash'))
const GarageShops = lazy(() => import('./pages/GarageShops'))
const CloudBasedPOS = lazy(() => import('./pages/CloudBasedPOS'))
const QuickService = lazy(() => import('./pages/QuickService'))
const Bakery = lazy(() => import('./pages/Bakery'))
const Hotel = lazy(() => import('./pages/Hotel'))
const Bar = lazy(() => import('./pages/Bar'))
const ClothingStore = lazy(() => import('./pages/ClothingStore'))
const GroceryStore = lazy(() => import('./pages/GroceryStore'))
const NailSalon = lazy(() => import('./pages/NailSalon'))
const Salon = lazy(() => import('./pages/Salon'))
const Cafe = lazy(() => import('./pages/Cafe'))
const PizzaShop = lazy(() => import('./pages/PizzaShop'))
const Restaurant = lazy(() => import('./pages/Restaurant'))
const RetailPOS = lazy(() => import('./pages/RetailPOS'))
const HospitalityPOS = lazy(() => import('./pages/HospitalityPOS'))
const Software = lazy(() => import('./pages/Software'))
const Loyalty = lazy(() => import('./pages/Loyalty'))
const Mailchimp = lazy(() => import('./pages/Mailchimp'))
const WhatsApp = lazy(() => import('./pages/WhatsApp'))
const ZohoCampaigns = lazy(() => import('./pages/ZohoCampaigns'))
const EmailCampaign = lazy(() => import('./pages/EmailCampaign'))
const SupportCentre = lazy(() => import('./pages/SupportCentre'))
const ServiceRequest = lazy(() => import('./pages/ServiceRequest'))
const AboutBloomSwiftPOS = lazy(() => import('./pages/AboutBloomSwiftPOS'))
const SuccessStories = lazy(() => import('./pages/SuccessStories'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Hardware = lazy(() => import('./pages/Hardware'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Cart = lazy(() => import('./pages/Cart'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const MyTickets = lazy(() => import('./pages/MyTickets'))
const MyPOSRequests = lazy(() => import('./pages/MyPOSRequests'))

// Admin Components - lazy loaded
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const LiveChat = lazy(() => import('./pages/Admin/LiveChat'))
const ProjectRequests = lazy(() => import('./pages/Admin/ProjectRequests'))
const HardwareAdmin = lazy(() => import('./pages/Admin/Hardware'))
const Tickets = lazy(() => import('./pages/Admin/Tickets'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
)

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <Outlet />
      <Footer />
      <FloatingCart />
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <UIProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
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
            <Route path="/contact" element={<SupportCentre />} />
            <Route path="/request-pos" element={<ServiceRequest />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders />} />
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
          </Suspense>
        </CartProvider>
      </UIProvider>
    </ToastProvider>
  )
}
