import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config/api.js';
import { X, Sparkles, Plus, Edit3 } from 'lucide-react';

function AddSWeet({ onProductAdded, productToEdit, onClose }) {
  const [form, setForm] = useState({
    name: '',
    rate: '',
    link: '',
    title: '',
    qty: '',
    category: 'General',
    unit: 'kg',
    badge: 'Fresh'
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || '',
        rate: productToEdit.rate !== undefined ? productToEdit.rate : '',
        link: productToEdit.link || '',
        title: productToEdit.title || '',
        qty: productToEdit.qty !== undefined ? productToEdit.qty : '',
        category: productToEdit.category || 'General',
        unit: productToEdit.unit || 'kg',
        badge: productToEdit.badge || 'Fresh'
      });
    } else {
      setForm({
        name: '',
        rate: '',
        link: '',
        title: '',
        qty: '',
        category: 'General',
        unit: 'kg',
        badge: 'Fresh'
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const isEditing = Boolean(productToEdit && productToEdit._id);
      const url = isEditing
        ? `${API_BASE_URL}/api/updateProduct/${productToEdit._id}`
        : `${API_BASE_URL}/api/addProduct`;

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          rate: Number(form.rate),
          qty: form.qty ? Number(form.qty) : 10
        }),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setSuccessMsg(isEditing ? '✓ Sweet updated successfully!' : '✓ Sweet added successfully!');
        if (!isEditing) {
          setForm({
            name: '',
            rate: '',
            link: '',
            title: '',
            qty: '',
            category: 'General',
            unit: 'kg',
            badge: 'Fresh'
          });
        }
        if (onProductAdded) {
          setTimeout(() => {
            onProductAdded();
          }, 800);
        }
      } else {
        setErrorMsg(data.message || 'Failed to save product');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/90 border border-[#C9A46A] rounded-xl px-3.5 py-2.5 text-sm text-[#2B1810] " +
    "placeholder:text-[#B79B7A] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] focus:border-[#E8A33D] transition-all";

  return (
    <div className="relative w-full max-w-lg mx-auto bg-[#FDFBF7] border-2 border-[#4A1521] rounded-3xl shadow-2xl p-6 sm:p-8">
      {/* Top Accent */}
      <div className="absolute top-0 left-8 right-8 h-2 bg-gradient-to-r from-[#E8A33D] via-[#4A1521] to-[#E8A33D] rounded-t-3xl" />

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-[#4A1521]/60 hover:text-[#4A1521] hover:bg-[#4A1521]/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="mb-6 mt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8A33D]/20 text-[#B0742D] rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E8A33D]" />
          {productToEdit ? 'Edit Batch' : 'Fresh Kitchen Batch'}
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1521]">
          {productToEdit ? 'Update Sweet Details' : 'Add Sweet to Shelf'}
        </h2>
      </div>

      {successMsg && (
        <div className="mb-4 bg-[#E8F5E0] border border-[#6B8E4E] text-[#3E5A2A] text-xs sm:text-sm rounded-xl px-4 py-2.5 font-medium flex items-center justify-between">
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm rounded-xl px-4 py-2.5 font-medium">
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
            Sweet Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Kaju Katli (Royal Cashew Diamond)"
            className={inputClass}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Ghee Specials">Ghee Specials</option>
              <option value="Bengali Mithai">Bengali Mithai</option>
              <option value="Kaju & Dry Fruit">Kaju & Dry Fruit</option>
              <option value="Traditional & Laddu">Traditional & Laddu</option>
              <option value="Savory & Snacks">Savory & Snacks</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Badge / Tag
            </label>
            <select
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Fresh Daily">Fresh Daily</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Pure Ghee">Pure Ghee</option>
              <option value="Chef's Choice">Chef's Choice</option>
              <option value="Chilled Special">Chilled Special</option>
              <option value="Heritage">Heritage</option>
              <option value="Crispy Delight">Crispy Delight</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Price (₹) *
            </label>
            <input
              name="rate"
              value={form.rate}
              onChange={handleChange}
              placeholder="e.g. 850"
              type="number"
              min="1"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Stock Qty *
            </label>
            <input
              name="qty"
              value={form.qty}
              onChange={handleChange}
              placeholder="e.g. 25"
              type="number"
              min="0"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Unit
            </label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="kg">kg</option>
              <option value="box">box</option>
              <option value="pack">pack</option>
              <option value="piece">piece</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
            Short Description / Ingredients
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Made from premium Goan cashews & pure desi ghee."
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
            Image URL (Optional)
          </label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl border border-[#4A1521]/30 text-[#4A1521] font-bold text-xs uppercase tracking-wider hover:bg-[#4A1521]/5 transition-all"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className={`${onClose ? 'w-2/3' : 'w-full'} bg-[#4A1521] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg hover:bg-[#320E16] hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50`}
          >
            {productToEdit ? <Edit3 className="w-4 h-4 text-[#E8A33D]" /> : <Plus className="w-4 h-4 text-[#E8A33D]" />}
            <span>{submitting ? 'Saving...' : productToEdit ? 'Save Changes' : 'Add to Shelf'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSWeet;