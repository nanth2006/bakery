import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/cartcontext';
import { 
  Search, 
  Sparkles, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Trash2, 
  Edit3, 
  Check, 
  SlidersHorizontal,
  Flame,
  Award
} from 'lucide-react';

const ADMIN_EMAIL = "nanthakumar2006geetha02@gmail.com";

// Fallback high quality imagery for sweets if custom link is broken or empty
const DEFAULT_SWEET_IMAGES = {
  "Ghee Specials": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
  "Kaju & Dry Fruit": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  "Bengali Mithai": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
  "Traditional & Laddu": "https://images.unsplash.com/photo-1605197148560-6316f7fb4f04?auto=format&fit=crop&w=600&q=80",
  "Savory & Snacks": "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=600&q=80",
  "General": "https://images.unsplash.com/photo-1589119908995-c6837fa14d48?auto=format&fit=crop&w=600&q=80"
};

const CATEGORIES = [
  "All Sweets",
  "Ghee Specials",
  "Bengali Mithai",
  "Kaju & Dry Fruit",
  "Traditional & Laddu",
  "Savory & Snacks"
];

function Sweets({ refreshKey, onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Sweets");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [quantities, setQuantities] = useState({});
  const [addedAnimation, setAddedAnimation] = useState({});

  const userEmail = localStorage.getItem("userEmail") || "";
  const isAdmin = userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/getProduct');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to load sweets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the store?`)) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const nextVal = Math.max(1, current + delta);
      return { ...prev, [id]: nextVal };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    addToCart(product, qty);

    // Trigger checkmark animation for 1.2s
    setAddedAnimation((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product._id]: false }));
    }, 1200);
  };

  const handleOrderNow = (product) => {
    const qty = quantities[product._id] || 1;
    addToCart(product, qty);
    navigate('/cart');
  };

  // Filter and Sort Sweets
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "All Sweets" ||
          (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.rate - b.rate;
        if (sortBy === "price-high") return b.rate - a.rate;
        if (sortBy === "rating") return (b.rating || 4.8) - (a.rating || 4.8);
        return 0; // featured / default
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const [quickViewSweet, setQuickViewSweet] = useState(null);

  return (
    <div id="sweets" className="w-full">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#F6E8D4] border border-[#E8A33D]/50 px-4 py-1.5 rounded-full text-xs font-bold text-[#8C273B] tracking-wider uppercase mb-3 ">
          <Sparkles className="w-3.5 h-3.5 text-[#E8A33D] animate-ping animation-duration-1000" />
          Fresh Daily Batches
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1521] tracking-tight">
          Handcrafted Mithai & Confections
        </h2 >
        <p className="text-sm sm:text-base text-[#785E4F] mt-2">
          Prepared according to authentic regional traditions with pure country ghee, roasted nuts, and royal aromatic spices.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#E8A33D]/30 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#4A1521] text-[#FDF8F0] shadow-md scale-105"
                  : "bg-[#FAF1E4] text-[#4A1521] hover:bg-[#E8A33D] hover:text-[#4A1521]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0742D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sweets (e.g. Kaju Katli, Mysore Pak, Laddu)..."
              className="w-full bg-[#FAF1E4]/70 border border-[#C9A46A]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#4A1521] placeholder:text-[#9F8575] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#8C273B]" />
            <span className="text-xs font-bold text-[#4A1521] uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF1E4] border border-[#C9A46A]/50 text-xs font-semibold text-[#4A1521] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-4 border border-[#E8A33D]/20 animate-pulse space-y-4">
              <div className="w-full h-44 bg-gray-200 rounded-xl"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-dashed border-[#C9A46A] p-8 max-w-md mx-auto">
          <span className="text-5xl block mb-3">🔍</span>
          <h3 className="font-serif text-xl font-bold text-[#4A1521]">No Sweets Found</h3>
          <p className="text-sm text-[#785E4F] mt-1 mb-4">
            We couldn't find any sweets matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Sweets");
            }}
            className="bg-[#4A1521] text-[#FDF8F0] px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#320E16]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const currentQty = quantities[p._id] || 1;
            const isAdded = addedAnimation[p._id];
            const fallbackImg =
              DEFAULT_SWEET_IMAGES[p.category] || DEFAULT_SWEET_IMAGES["General"];
            const displayImg = p.link && p.link.startsWith("http") ? p.link : fallbackImg;

            return (
              <div
                key={p._id}
                className="group bg-white rounded-2xl border border-[#E8A33D]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div 
                  className="relative w-full h-48 bg-[#FAF1E4] overflow-hidden cursor-pointer"
                  onClick={() => setQuickViewSweet(p)}
                >
                  <img
                    src={displayImg}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = fallbackImg;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-bold text-white bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      🔍 Click for Details
                    </span>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-[#4A1521]/90 backdrop-blur-md text-[#E8A33D] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#E8A33D]/40 shadow">
                      {p.badge || "Pure Ghee"}
                    </span>
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow text-[11px] font-bold text-[#4A1521]">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{p.rating || "4.9"}</span>
                  </div>

                  {/* Admin Quick Actions */}
                  {isAdmin && (
                    <div 
                      className="absolute top-3 right-3 flex items-center gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {onEditProduct && (
                        <button
                          onClick={() => onEditProduct(p)}
                          className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-full shadow hover:scale-110 transition-transform"
                          title="Edit sweet"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        className="p-2 bg-white/90 hover:bg-red-600 hover:text-white text-red-600 rounded-full shadow hover:scale-110 transition-transform"
                        title="Delete sweet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#B0742D] uppercase tracking-wider mb-1">
                      {p.category || "Traditional"}
                    </div>
                    <h3 
                      onClick={() => setQuickViewSweet(p)}
                      className="font-serif text-lg font-bold text-[#4A1521] leading-snug group-hover:text-[#B0742D] transition-colors cursor-pointer"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#785E4F] mt-1.5 line-clamp-2 leading-relaxed">
                      {p.title || "Handcrafted traditional treat made with authentic ingredients."}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#F2E5D5]">
                    {/* Price and Stock info */}
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="font-serif text-2xl font-bold text-[#4A1521]">
                          ₹{p.rate}
                        </span>
                        <span className="text-xs text-[#8C6D5B] font-medium ml-1">
                          /{p.unit || "kg"}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        In Stock
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-[#FAF1E4] rounded-xl p-1 mb-3 border border-[#E8A33D]/30">
                      <span className="text-xs font-semibold text-[#785E4F] pl-2">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(p._id, -1)}
                          className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-[#4A1521] hover:bg-[#E8A33D] transition-colors shadow-xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm text-[#4A1521] min-w-[20px] text-center">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(p._id, 1)}
                          className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-[#4A1521] hover:bg-[#E8A33D] transition-colors shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(p)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#FAF1E4] text-[#4A1521] border border-[#C9A46A]/60 hover:bg-[#E8A33D] hover:text-[#4A1521]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Add
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleOrderNow(p)}
                        className="flex items-center justify-center gap-1 bg-[#4A1521] text-[#FDF8F0] hover:bg-[#320E16] py-2.5 px-3 rounded-xl font-semibold text-xs shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK VIEW POPUP MODAL */}
      {quickViewSweet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#E8A33D] max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewSweet(null)}
              className="absolute top-2 right-1 p-2 text-[#4A1521] hover:bg-[#FAF1E4] rounded-full transition-colors font-bold text-sm"
            >
              ✕
            </button>

            <div className="h-56 rounded-2xl overflow-hidden mb-4 bg-[#FAF1E4] relative">
              <img
                src={
                  quickViewSweet.link ||
                  DEFAULT_SWEET_IMAGES[quickViewSweet.category] ||
                  DEFAULT_SWEET_IMAGES["General"]
                }
                alt={quickViewSweet.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#4A1521] text-[#E8A33D] text-xs font-bold px-3 py-1 rounded-full uppercase">
                {quickViewSweet.badge || "Pure Ghee"}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#B0742D] uppercase tracking-wider">
                    {quickViewSweet.category || "Confectionery"}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#4A1521]">
                    {quickViewSweet.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#8C273B]">
                    ₹{quickViewSweet.rate}
                  </span>
                  <span className="text-xs text-[#8C6D5B]"> /{quickViewSweet.unit || "kg"}</span>
                </div>
              </div>

              <p className="text-sm text-[#785E4F] leading-relaxed">
                {quickViewSweet.title ||
                  "Handcrafted using certified 100% pure cow ghee, slow-roasted nuts and royal saffron. Prepared in artisanal batches."}
              </p>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#F0DFCD] text-xs text-[#785E4F]">
                <div>
                  <strong>🌿 Purity:</strong> 100% Pure Desi Ghee
                </div>
                <div>
                  <strong>⏳ Shelf Life:</strong> 15-20 Days
                </div>
                <div>
                  <strong>📦 Packaging:</strong> Aroma-locked Box
                </div>
                <div>
                  <strong>⭐ Rating:</strong> {quickViewSweet.rating || 4.9} / 5.0
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewSweet, quantities[quickViewSweet._id] || 1);
                    setQuickViewSweet(null);
                  }}
                  className="flex-1 bg-[#FAF1E4] hover:bg-[#E8A33D] text-[#4A1521] py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-[#C9A46A]"
                >
                  Add to Box
                </button>
                <button
                  onClick={() => {
                    addToCart(quickViewSweet, quantities[quickViewSweet._id] || 1);
                    setQuickViewSweet(null);
                    navigate('/cart');
                  }}
                  className="flex-1 bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sweets;