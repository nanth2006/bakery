import React, { useState } from 'react';
import Navbar from './navbar/navbar.jsx';
import {
  Award,
  Sparkles,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Send,
  AlertCircle
} from 'lucide-react';

function About() {
  const [inquiry, setInquiry] = useState({ name: '', phone: '', eventType: 'Wedding / Reception', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inquiry.name.trim() || !inquiry.phone.trim()) {
      setError('Please fill in Name and Phone Number.');
      return;
    }

    setError('');
    setSending(true);

    try {
      const res = await fetch('http://localhost:5000/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setInquiry({ name: '', phone: '', eventType: 'Wedding / Reception', message: '' });
        }, 4000);
      } else {
        setError(data.message || 'Failed to send inquiry. Please try again.');
      }
    } catch (err) {
      setError('Server connection error. Please make sure backend is running on port 5000.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A1521]">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#4A1521] to-[#320E16] text-[#FDF8F0] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E8A33D_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8A33D]/20 border border-[#E8A33D]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#E8A33D] tracking-widest uppercase shadow">
            <Sparkles className="w-3.5 h-3.5" />
            Heritage & Craftsmanship
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight">
            The Soul of Authentic Indian Mithai
          </h1>
          <p className="text-sm sm:text-base text-[#FDF8F0]/80 max-w-xl mx-auto leading-relaxed">
            Crafting pure happiness and golden memories through artisanal sweets, 100% farm-fresh cow ghee, and unwavering integrity since 1988.
          </p>
        </div>
      </section>

      {/* Heritage Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B0742D]">
              Our Humble Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1521] leading-tight">
              A Legacy of Pure Ghee & Uncompromising Purity
            </h2>
            <p className="text-sm sm:text-base text-[#785E4F] leading-relaxed">
              Nanthana Bakery was born in the temple heart of Madurai with a singular mission: to bring back the forgotten taste of royal Indian confectionery, free from industrial additives, artificial aromas, and palm oil shortcuts.
            </p>
            <p className="text-sm sm:text-base text-[#785E4F] leading-relaxed">
              Our master confectioners prepare every batch early each morning. From reducing farm-fresh milk for twelve hours to caramelizing organic gram flour in copper cauldrons, every sweet is an authentic work of culinary art.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#F0DFCD]">
              <div>
                <span className="font-serif text-3xl font-bold text-[#8C273B]">35+</span>
                <p className="text-xs text-[#8C6D5B] font-semibold mt-1">Years of Pure Craft</p>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#8C273B]">100%</span>
                <p className="text-xs text-[#8C6D5B] font-semibold mt-1">Fresh Ingredients</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.tR3wiMoKyg_PgP1jIQtHrwHaFc?r=0&pid=Api&h=220&P=0"
              alt="Traditional sweet preparation"
              className="rounded-3xl shadow-2xl border-4 border-white object-cover w-full h-[440px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border-2 border-[#E8A33D] shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                <ShieldCheck className="w-5 h-5" /> FSSAI Certified
              </div>
              <p className="text-xs text-[#785E4F]">
                Tested for supreme hygiene and zero chemical adulteration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-[#FAF1E4] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E8A33D]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B0742D]">The Gold Standard</span>
            <h2 className="font-serif text-3xl font-bold text-[#4A1521] mt-1">Our Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/20 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#4A1521]">100% Desi Cow Ghee</h4>
              <p className="text-xs text-[#785E4F] leading-relaxed">
                Directly churned from dairy milk for that unmistakable aroma and velvety finish.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/20 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#4A1521]">Hand-Selected Nuts</h4>
              <p className="text-xs text-[#785E4F] leading-relaxed">
                W180 grade cashews, Mamra almonds, and fresh Iranian green pistachios.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/20 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#4A1521]">Morning Fresh Batches</h4>
              <p className="text-xs text-[#785E4F] leading-relaxed">
                We never store stock for weeks. Everyday is a fresh sweet sunrise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8A33D]/20 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#4A1521] text-[#E8A33D] flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#4A1521]">Zero Preservatives</h4>
              <p className="text-xs text-[#785E4F] leading-relaxed">
                Pure sugar, jaggery, saffron and spices. Clean and completely vegetarian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Location & Wedding/Bulk Orders Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Store info card */}
          <div className="bg-white rounded-3xl border border-[#E8A33D]/30 p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#4A1521]">Visit Our Flagship Store</h3>
            <p className="text-sm text-[#785E4F] leading-relaxed">
              Step in to sample warm, freshly fried jalebis, aromatic halwa straight from the pan, and chilled rasmalai.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#785E4F]">
                <MapPin className="w-5 h-5 text-[#8C273B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A1521] block">Flagship Address:</strong>
                  <span>42, Heritage Sweet Street, Near Temple Tower, Madurai, Tamil Nadu - 625001</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#785E4F]">
                <Clock className="w-5 h-5 text-[#8C273B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A1521] block">Store Timings:</strong>
                  <span>Monday - Sunday: 7:00 AM – 10:30 PM (All 365 Days)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#785E4F]">
                <Phone className="w-5 h-5 text-[#8C273B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A1521] block">Phone & WhatsApp:</strong>
                  <span>+91 98765 43210 / 0452-2345678</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk & Wedding Catering Inquiry */}
          <div className="bg-white rounded-3xl border border-[#E8A33D]/30 p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#4A1521] mb-2">Wedding & Bulk Inquiries</h3>
            <p className="text-xs text-[#785E4F] mb-6">
              Custom decorative gift hampers, return gift boxes, and bulk festival orders.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Thank you! Our catering manager will contact you within 2 hours with customized pricing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="e.g. Ramesh Krishnan"
                    className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl px-3.5 py-2.5 text-xs text-[#4A1521] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiry.phone}
                      onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl px-3.5 py-2.5 text-xs text-[#4A1521] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                      Event Type
                    </label>
                    <select
                      value={inquiry.eventType}
                      onChange={(e) => setInquiry({ ...inquiry, eventType: e.target.value })}
                      className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl px-3.5 py-2.5 text-xs text-[#4A1521] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                    >
                      <option>Wedding / Reception</option>
                      <option>Diwali / Festival</option>
                      <option>Corporate Gift Box</option>
                      <option>Family Get-together</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                    Special Requirements / Quantity
                  </label>
                  <textarea
                    rows={3}
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    placeholder="e.g. Need 50 gift boxes of Kaju Katli + Mysore Pak combination."
                    className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl px-3.5 py-2.5 text-xs text-[#4A1521] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#E8A33D]" />
                  <span>{sending ? 'Sending...' : 'Send Catering Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;