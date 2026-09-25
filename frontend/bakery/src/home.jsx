import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './navbar/navbar.jsx';
import Sweets from './sweets.jsx';
import AddSWeet from './addsweet.jsx';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Star,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Gift,
  Flame,
  ArrowRight,
  Plus
} from 'lucide-react';

const ADMIN_EMAIL = "nanthakumar2006geetha02@gmail.com";

function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const userEmail = localStorage.getItem("userEmail") || "";
  const isAdmin = userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const navigate = useNavigate();

  const handleProductAdded = () => {
    setRefreshKey((prev) => prev + 1);
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A1521] selection:bg-[#E8A33D] selection:text-[#4A1521]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#4A1521] via-[#350F18] to-[#20080E]">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E8A33D]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8C273B]/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-difference"
          style={{
            backgroundImage: `url('https://thumbs.dreamstime.com/b/assortment-traditional-indian-sweets-displayed-ornate-brass-bowls-variety-desserts-including-laddoos-modaks-386738914.jpg')`
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E8A33D]/20 border border-[#E8A33D]/40 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-[#E8A33D] tracking-widest uppercase shadow-lg">
              <Sparkles className="w-4 h-4 text-[#E8A33D] animate-spin" style={{ animationDuration: '6s' }} />
              Royal Heritage Since 1988 • 100% Pure Desi Ghee
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FDF8F0] tracking-tight leading-[1.1]">
              Sweet Traditions <br />
              <span className="bg-gradient-to-r from-[#E8A33D] via-[#F3C478] to-[#E8A33D] bg-clip-text text-transparent italic">
                Crafted to Perfection.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#FDF8F0]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the royal richness of authentic Indian mithai prepared in small batches using cow ghee, premium nuts, and age-old recipes.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#sweets"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E8A33D] hover:bg-[#d89228] text-[#4A1521] px-8 py-4 rounded-full font-bold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#E8A33D]/20 hover:scale-105 transition-all"
              >
                <span>Explore Sweets Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/cart"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-[#FDF8F0] px-8 py-4 rounded-full font-bold text-sm sm:text-base tracking-wide transition-all"
              >
                <Gift className="w-4 h-4 text-[#E8A33D]" />
                <span>Gift Boxes & Orders</span>
              </Link>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-[#FDF8F0]">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#E8A33D]">50+</div>
                <div className="text-xs text-[#FDF8F0]/70 font-medium">Sweet Varieties</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#E8A33D]">100%</div>
                <div className="text-xs text-[#FDF8F0]/70 font-medium">Pure Cow Ghee</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#E8A33D]">4.9★</div>
                <div className="text-xs text-[#FDF8F0]/70 font-medium">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Floating Card Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative halo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E8A33D] to-[#8C273B] rounded-3xl opacity-30 blur-xl"></div>

              {/* Main Visual Feature Card */}
              <div className="relative bg-[#FFFDF9] rounded-3xl p-4 shadow-2xl border border-[#E8A33D]/40 overflow-hidden animate-float">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4 ">
                  <img
                    src="https://tse4.mm.bing.net/th/id/OIP.ci9dVwj5dxCaV7llVVAU1gHaEK?r=0&pid=Api&h=220&P=0"
                    alt="Royal Kaju Katli"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#4A1521] text-[#E8A33D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Festive Favorite
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#4A1521]">Royal Kaju Katli</h3>
                      <p className="text-xs text-[#8C6D5B]">Melt-in-mouth cashew diamonds</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-bold text-[#4A1521]">₹850</span>
                      <span className="text-xs text-[#8C6D5B]"> /kg</span>
                    </div>
                  </div>

                  <a
                    href="#sweets"
                    className="mt-4 w-full bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Order Fresh Batch</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E8A33D]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PILLARS & FEATURES STRIP */}
      <section className="bg-[#FAF1E4] border-y border-[#E8A33D]/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl border border-[#E8A33D]/20 shadow-xs transition-transform duration-300 hover:-translate-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#4A1521]">100% Pure Desi Ghee</h4>
              <p className="text-xs text-[#785E4F]">No palm oil, no artificial preservatives</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl border border-[#E8A33D]/20 shadow-xs transition-transform duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#4A1521]">Fresh Daily Morning</h4>
              <p className="text-xs text-[#785E4F]">Prepared fresh every single sunrise</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl border border-[#E8A33D]/20 shadow-xs transition-transform duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#4A1521]">Fast Safe Delivery</h4>
              <p className="text-xs text-[#785E4F]">Hygienic aroma-locked box packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl border border-[#E8A33D]/20 shadow-xs transition-transform duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#4A1521]">Celebration Boxes</h4>
              <p className="text-xs text-[#785E4F]">Wedding & festive corporate gifts</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADMIN CONTROLS STRIP (IF ADMIN) */}
      {isAdmin && (
        <section className="bg-[#4A1521] text-[#FDF8F0] py-4 px-6 border-b border-[#E8A33D]/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#E8A33D]" />
              <div>
                <span className="font-bold text-sm block text-[#E8A33D]">Admin Mode Activated</span>
                <span className="text-xs text-[#FDF8F0]/80">Manage products, pricing, stock and customer orders</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 bg-[#E8A33D] hover:bg-[#d89228] text-[#4A1521] px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow"
              >
                <Plus className="w-4 h-4" /> Add New Sweet
              </button>
              <Link
                to="/admin"
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all"
              >
                Admin Orders Dashboard
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SWEETS CATALOGUE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Sweets refreshKey={refreshKey} onEditProduct={handleEditProduct} />
      </section>

      {/* HERITAGE & PROMISE STORY SECTION */}
      <section className="bg-gradient-to-r from-[#FAF1E4] to-[#F5E6D3] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E8A33D]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80"
              alt="Mithai Artisanal Making"
              className="rounded-3xl shadow-2xl border-4 border-white object-cover w-full h-[400px]"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#4A1521] text-[#FDF8F0] p-6 rounded-2xl border-2 border-[#E8A33D] shadow-xl max-w-xs hidden sm:block animate-float">
              <p className="font-serif text-lg font-bold text-[#E8A33D]">Zero Preservatives</p>
              <p className="text-xs text-[#FDF8F0]/80 mt-1">
                Every sweet is prepared freshly each morning with certified organic ingredients.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#4A1521] text-[#E8A33D] px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Our Purity Promise
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1521] leading-tight">
              The Essence of True Indian Hospitality & Flavor.
            </h2>
            <p className="text-sm sm:text-base text-[#785E4F] leading-relaxed">
              For over three decades, Nanthana Bakery has remained dedicated to preserving timeless confectionery crafts. From simmering golden milk to roasting fragrant gram flour in copper cauldrons, every step is an act of devotion.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-[#E8A33D] pl-4">
                <h5 className="font-bold text-sm text-[#4A1521]">Pure Cow Ghee</h5>
                <p className="text-xs text-[#785E4F] mt-0.5">Sourced directly from certified dairy farms</p>
              </div>
              <div className="border-l-2 border-[#E8A33D] pl-4">
                <h5 className="font-bold text-sm text-[#4A1521]">Hand-Picked Dry Fruits</h5>
                <p className="text-xs text-[#785E4F] mt-0.5">Premium cashews, almonds & Iranian pistachios</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#4A1521] hover:text-[#B0742D] group"
              >
                <span>Read more about our heritage & artisan chefs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#B0742D] tracking-widest uppercase">Loved by Families</span>
          <h2 className="font-serif text-3xl font-bold text-[#4A1521] mt-1">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/30 shadow-sm space-y-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-sm text-[#785E4F] italic leading-relaxed">
              "The Pure Ghee Mysore Pak simply melts in the mouth! We ordered 5kg for my daughter's wedding and every guest asked where we bought it from."
            </p>
            <div className="pt-2 border-t border-[#F2E5D5]">
              <h5 className="font-bold text-sm text-[#4A1521]">Priya Sundaram</h5>
              <p className="text-xs text-[#8C6D5B]">Chennai, Verified Customer</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/30 shadow-sm space-y-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-sm text-[#785E4F] italic leading-relaxed">
              "Kaju Katli has the authentic silver foil and is not overly sweet. You can taste the quality of the cashews. Fast delivery as well!"
            </p>
            <div className="pt-2 border-t border-[#F2E5D5]">
              <h5 className="font-bold text-sm text-[#4A1521]">Karthik Narayanan</h5>
              <p className="text-xs text-[#8C6D5B]">Bangalore, Verified Customer</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/30 shadow-sm space-y-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-sm text-[#785E4F] italic leading-relaxed">
              "The Rasmalai arrived chilled and fresh in tamper-proof boxes. Highly recommended for festival celebrations and family gatherings."
            </p>
            <div className="pt-2 border-t border-[#F2E5D5]">
              <h5 className="font-bold text-sm text-[#4A1521]">Meenakshi Raman</h5>
              <p className="text-xs text-[#8C6D5B]">Madurai, Verified Customer</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#4A1521] text-[#FDF8F0] pt-16 pb-12 border-t-4 border-[#E8A33D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🍬</span>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#E8A33D]">
                  Nanthana Bakery
                </span>
              </div>
              <p className="text-xs text-[#FDF8F0]/70 leading-relaxed">
                Authentic Indian sweets and savory delicacies prepared with unconditional commitment to quality, ghee purity, and traditional heritage.
              </p>
              <div className="text-xs text-[#E8A33D] font-semibold">
                FSSAI Certified • 100% Vegetarian
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#E8A33D] mb-4">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-[#FDF8F0]/80">
                <li>
                  <Link to="/home" className="hover:text-[#E8A33D] transition-colors">Home Storefront</Link>
                </li>
                <li>
                  <a href="#sweets" className="hover:text-[#E8A33D] transition-colors">Sweets Catalogue</a>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#E8A33D] transition-colors">About Our Heritage</Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#E8A33D] transition-colors">Cart & Checkout</Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-[#E8A33D] transition-colors">Order Tracking</Link>
                </li>
              </ul>
            </div>

            {/* Sweet Categories */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#E8A33D] mb-4">Mithai Specials</h4>
              <ul className="space-y-2 text-xs text-[#FDF8F0]/80">
                <li>Pure Ghee Mysore Pak</li>
                <li>Royal Kaju Katli & Barfi</li>
                <li>Bengali Chilled Rasmalai</li>
                <li>Tirunelveli Ghee Halwa</li>
                <li>Traditional Motichoor Laddu</li>
                <li>Festive Gift Hampers</li>
              </ul>
            </div>

            {/* Contact & Store info */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#E8A33D] mb-4">Store Location</h4>
              <div className="flex items-start gap-2.5 text-xs text-[#FDF8F0]/80">
                <MapPin className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
                <span>42, Heritage Sweet Street, Near Temple Tower, Madurai, Tamil Nadu - 625001</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FDF8F0]/80">
                <Phone className="w-4 h-4 text-[#E8A33D] shrink-0" />
                <span>+91 98765 43210 / 0452-2345678</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#FDF8F0]/80">
                <Mail className="w-4 h-4 text-[#E8A33D] shrink-0" />
                <span>orders@nanthanabakery.com</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDF8F0]/60">
            <p>© {new Date().getFullYear()} Nanthana Bakery Confectionery. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Handcrafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for sweet lovers everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* ADD / EDIT SWEET MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl my-8">
            <AddSWeet
              productToEdit={editingProduct}
              onProductAdded={handleProductAdded}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;