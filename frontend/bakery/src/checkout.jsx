import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './context/cartcontext.jsx';
import Navbar from './navbar/navbar.jsx';
import API_BASE_URL from './config/api.js';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  QrCode,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Tag,
  Copy,
  Check
} from 'lucide-react';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeFromCart, clearCart, totalAmount } = useCart();

  const userEmailStored = localStorage.getItem("userEmail") || "";
  const userNameStored = localStorage.getItem("userName") || "";

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [address, setAddress] = useState({
    name: userNameStored,
    phone: '',
    email: userEmailStored,
    street: '',
    city: '',
    pincode: '',
    notes: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState('');
  const [couponError, setCouponError] = useState('');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const deliveryFee = totalAmount >= 500 || totalAmount === 0 ? 0 : 40;
  const finalTotal = Math.max(0, totalAmount - discountAmount + deliveryFee);

  const upiId = "siglekumar@okaxis";
  const upiLink = `upi://pay?pa=${upiId}&pn=NanthanaBakery&am=${finalTotal}&cu=INR`;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'SWEET10') {
      const discount = Math.round(totalAmount * 0.1);
      setDiscountAmount(discount);
      setCouponApplied('SWEET10 (10% Special Discount Applied!)');
    } else if (code === 'FESTIVE50') {
      const discount = 50;
      setDiscountAmount(discount);
      setCouponApplied('FESTIVE50 (₹50 Flat Festive Discount Applied!)');
    } else if (code === 'GHEE100') {
      if (totalAmount >= 1000) {
        setDiscountAmount(100);
        setCouponApplied('GHEE100 (₹100 Pure Ghee Mega Discount Applied!)');
      } else {
        setCouponError('GHEE100 is valid only on orders above ₹1000');
      }
    } else {
      setCouponError('Invalid coupon code. Try SWEET10 or FESTIVE50');
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const isAddressValid =
    address.name.trim() !== '' &&
    address.phone.trim() !== '' &&
    address.street.trim() !== '' &&
    address.city.trim() !== '';

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty! Please add sweets before placing an order.');
      return;
    }

    if (!isAddressValid) {
      setError('Please fill in all mandatory delivery details (Name, Phone, Street, City).');
      return;
    }

    setError('');
    setPlacing(true);

    const orderData = {
      items: cartItems,
      totalAmount: finalTotal,
      discount: discountAmount,
      address: {
        name: address.name.trim(),
        phone: address.phone.trim(),
        street: address.street.trim(),
        city: address.city.trim(),
        pincode: address.pincode.trim() || '625001'
      },
      userEmail: address.email || userEmailStored,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Awaiting Payment',
      notes: address.notes
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        clearCart();
        navigate('/order-sucess', {
          state: {
            order: data.order || data,
            placedDetails: orderData
          }
        });
      } else {
        setError(data.message || data.error || 'Failed to place order. Please check your connection and try again.');
      }
    } catch (err) {
      setError('Server connection error. Please ensure backend is running.');
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  const inputClass =
    "w-full bg-[#FFFDF9] border border-[#C9A46A]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#4A1521] " +
    "placeholder:text-[#A88B77] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] focus:border-[#E8A33D]";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A1521]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8A33D]/30">
          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="p-2 rounded-xl bg-white border border-[#E8A33D]/40 text-[#4A1521] hover:bg-[#E8A33D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1521]">
                Checkout & Delivery
              </h1>
              <p className="text-xs text-[#785E4F]">
                Review your fresh mithai box and enter delivery address
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Safe & Secure Checkout
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#C9A46A] p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 bg-[#FAF1E4] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8C273B]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#4A1521]">Your Cart is Empty</h2>
            <p className="text-sm text-[#785E4F] mt-2 mb-6 max-w-xs mx-auto">
              Looks like you haven't added any fresh sweets to your box yet.
            </p>
            <Link
              to="/sweets"
              className="inline-flex items-center gap-2 bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#E8A33D]" />
              <span>Browse Sweets Catalogue</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Customer Address & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Address Card */}
              <div className="bg-white rounded-3xl border border-[#E8A33D]/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F0DFCD]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#4A1521] text-[#E8A33D] flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h2 className="font-serif text-xl font-bold text-[#4A1521]">
                      Delivery Address
                    </h2>
                  </div>
                  <span className="text-xs text-[#8C6D5B]">* Required fields</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      name="name"
                      placeholder="e.g. Ananya Sundaram"
                      value={address.name}
                      onChange={handleAddressChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={address.phone}
                      onChange={handleAddressChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Email Address (For Receipt & Tracking)
                    </label>
                    <input
                      name="email"
                      placeholder="e.g. ananya@example.com"
                      value={address.email}
                      onChange={handleAddressChange}
                      type="email"
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Flat / House No. & Street Address *
                    </label>
                    <input
                      name="street"
                      placeholder="e.g. Flat 3B, Temple View Apartments, Main Road"
                      value={address.street}
                      onChange={handleAddressChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      City / Town *
                    </label>
                    <input
                      name="city"
                      placeholder="e.g. Madurai, Chennai"
                      value={address.city}
                      onChange={handleAddressChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Postal Pincode
                    </label>
                    <input
                      name="pincode"
                      placeholder="e.g. 625001"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Special Delivery Instructions / Festive Note
                    </label>
                    <input
                      name="notes"
                      placeholder="e.g. Ring bell twice / Gift packaging requested"
                      value={address.notes}
                      onChange={handleAddressChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-3xl border border-[#E8A33D]/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F0DFCD]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#4A1521] text-[#E8A33D] flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h2 className="font-serif text-xl font-bold text-[#4A1521]">
                      Select Payment Method
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* COD Option */}
                  <label
                    className={`flex items-center justify-between border-2 rounded-2xl p-4 cursor-pointer transition-all ${paymentMethod === 'COD'
                        ? 'border-[#4A1521] bg-[#FAF1E4] shadow-md'
                        : 'border-[#E8A33D]/30 bg-white hover:bg-[#FAF1E4]/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#4A1521] w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-sm text-[#4A1521] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-xs text-[#785E4F]">Pay with cash upon arrival</span>
                      </div>
                    </div>
                  </label>

                  {/* UPI Option */}
                  <label
                    className={`flex items-center justify-between border-2 rounded-2xl p-4 cursor-pointer transition-all ${paymentMethod === 'UPI'
                        ? 'border-[#4A1521] bg-[#FAF1E4] shadow-md'
                        : 'border-[#E8A33D]/30 bg-white hover:bg-[#FAF1E4]/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#4A1521] w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-sm text-[#4A1521] block">
                          Instant UPI / QR Code
                        </span>
                        <span className="text-xs text-[#785E4F]">GPay, PhonePe, Paytm, BHIM</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Live UPI QR Code Interactive Box */}
                {paymentMethod === 'UPI' && (
                  <div className="mt-6 bg-[#FAF1E4] border-2 border-dashed border-[#E8A33D] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 animate-in fade-in duration-300">
                    <div className="bg-white p-3 rounded-2xl shadow border border-[#C9A46A]/50 shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                          upiLink
                        )}`}
                        alt="Scan QR code to pay"
                        className="w-36 h-36 rounded-lg"
                      />
                    </div>

                    <div className="space-y-3 text-center sm:text-left flex-1">
                      <div className="inline-flex items-center gap-1.5 bg-[#4A1521] text-[#E8A33D] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        <QrCode className="w-3 h-3" /> Scan & Pay ₹{finalTotal}
                      </div>
                      <p className="text-xs text-[#785E4F] leading-relaxed">
                        Scan with Google Pay, PhonePe, Paytm or any UPI App to complete payment instantly.
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#C9A46A]/40 text-xs">
                        <span className="font-mono font-bold text-[#4A1521]">{upiId}</span>
                        <button
                          onClick={copyUpiId}
                          type="button"
                          className="p-1 hover:bg-[#FAF1E4] rounded-md text-[#8C273B]"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-[#E8A33D]/30 p-6 sm:p-8 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0DFCD]">
                  <h3 className="font-serif text-xl font-bold text-[#4A1521]">Order Summary</h3>
                  <span className="text-xs font-bold text-[#8C273B] bg-[#FAF1E4] px-2.5 py-1 rounded-full">
                    {cartItems.length} {cartItems.length === 1 ? 'variety' : 'varieties'}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#FAF1E4]">
                  {cartItems.map((item) => (
                    <div key={item._id} className="pt-2.5 flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF1E4] overflow-hidden shrink-0 border border-[#C9A46A]/40">
                          {item.link ? (
                            <img src={item.link} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">🍬</div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#4A1521] block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#8C6D5B]">
                            ₹{item.rate} × {item.qty} {item.unit || 'kg'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#4A1521]">
                          ₹{item.rate * item.qty}
                        </span>
                        <div className="flex items-center gap-1 bg-[#FAF1E4] rounded-lg p-0.5 border border-[#C9A46A]/40">
                          <button
                            onClick={() => updateQty(item._id, item.qty - 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#4A1521] hover:bg-[#E8A33D] rounded transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item._id, item.qty + 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#4A1521] hover:bg-[#E8A33D] rounded transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="mt-5 pt-4 border-t border-[#F0DFCD]">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B0742D]" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon (e.g. SWEET10)"
                        className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl pl-9 pr-3 py-2 text-xs uppercase font-bold text-[#4A1521] placeholder:text-[#A88B77] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#4A1521] text-[#FDF8F0] hover:bg-[#320E16] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponApplied && (
                    <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {couponApplied}
                    </div>
                  )}

                  {couponError && (
                    <div className="mt-2 text-xs font-semibold text-rose-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      {couponError}
                    </div>
                  )}
                </form>

                {/* Price Calculations */}
                <div className="mt-5 pt-4 border-t border-[#F0DFCD] space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#785E4F]">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-[#4A1521]">₹{totalAmount}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promotional Discount:</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#785E4F]">
                    <span>Delivery Handling:</span>
                    <span className="font-semibold text-[#4A1521]">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#F0DFCD] flex justify-between items-baseline font-serif text-lg sm:text-xl font-bold text-[#4A1521]">
                    <span>Total Pay Amount:</span>
                    <span className="text-[#8C273B] font-serif text-2xl">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing || cartItems.length === 0}
                  className="w-full mt-6 bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] rounded-2xl py-3.5 font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E8A33D]" />
                  {placing ? 'Confirming Order…' : `Confirm Order • ₹${finalTotal}`}
                </button>

                <p className="text-[11px] text-[#8C6D5B] text-center mt-3">
                  📦 Orders dispatched within 2 hours • Freshness guaranteed
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;