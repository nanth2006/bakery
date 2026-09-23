import { useState } from 'react';

function AddSWeet({ onProductAdded }) {
  const [form, setForm] = useState({ name: '', rate: '', link: '', title: '', qty: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Product added:', data);
      setForm({ name: '', rate: '', link: '', title: '', qty: '' });

      if (onProductAdded)
         onProductAdded();

      setSuccessMsg('✓ Product added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/60 border border-[#C9A46A] rounded-md px-3 py-2.5 text-[#2B1810] " +
    "placeholder:text-[#B79B7A] focus:outline-none focus:ring-2 focus:ring-[#E8A33D] focus:border-[#E8A33D]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF3E7] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-[#FBF3E7] border-2 border-[#4A1E1E] rounded-lg shadow-[6px_6px_0px_0px_#4A1E1E] p-8"
      >
        <div className="absolute -top-3 left-6 right-6 h-3 bg-[#E8A33D] rounded-t-md border-2 border-b-0 border-[#4A1E1E]" />

        <p className="text-xs tracking-[0.3em] uppercase text-[#B0742D] font-semibold mb-1">
          New Batch
        </p>
        <h2 className="font-serif text-3xl text-[#4A1E1E] mb-6">
          Add a Sweet
        </h2>

        {successMsg && (
          <div className="mb-4 bg-[#E8F5E0] border border-[#6B8E4E] text-[#3E5A2A] text-sm
                          rounded-md px-4 py-2.5 font-medium">
            {successMsg}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Sweet Name (e.g. Kaju Katli)"
            className={inputClass}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="rate"
              value={form.rate}
              onChange={handleChange}
              placeholder="Price / kg (₹)"
              type="number"
              className={inputClass}
            />
            <input
              name="qty"
              value={form.qty}
              onChange={handleChange}
              placeholder="Stock (kg)"
              type="number"
              className={inputClass}
            />
          </div>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Description"
            className={inputClass}
          />

          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Image URL"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-7 w-full bg-[#4A1E1E] text-[#FBF3E7] font-serif text-lg py-3 rounded-md
                     border-2 border-[#4A1E1E] transition-transform
                     hover:-translate-y-0.5 hover:bg-[#3A1616]
                     disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {submitting ? 'Adding…' : 'Add to Shelf'}
        </button>
      </form>
    </div>
  );
}

export default AddSWeet;