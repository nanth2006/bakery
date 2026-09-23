import sweet from "../models/sweet.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, title, category, link, rate, qty, unit, badge, rating } = req.body;

    if (!name || rate === undefined || rate === null) {
      return res.status(400).json({ success: false, message: "Name and Price are required" });
    }

    const newProduct = new sweet({
      name: name.trim(),
      title: title?.trim() || "",
      category: category || "General",
      link: link?.trim() || "",
      rate: Number(rate),
      qty: qty !== undefined && qty !== "" ? Number(qty) : 10,
      unit: unit || "kg",
      badge: badge || "Fresh",
      rating: rating ? Number(rating) : 4.8
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, message: "Sweet added successfully!", product: savedProduct });
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err.message);
    res.status(500).json({ success: false, message: "Failed to add sweet: " + err.message });
  }
};

// Get all products with optional filter / search
export const getProduct = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== "All" && category !== "All Sweets") {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const sweets = await sweet.find(filter).sort({ createdAt: -1 });
    res.status(200).json(sweets);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch sweets: " + err.message });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, category, link, rate, qty, unit, badge, rating, isAvailable } = req.body;

    const updated = await sweet.findByIdAndUpdate(
      id,
      {
        ...(name && { name: name.trim() }),
        ...(title !== undefined && { title: title.trim() }),
        ...(category && { category }),
        ...(link !== undefined && { link: link.trim() }),
        ...(rate !== undefined && { rate: Number(rate) }),
        ...(qty !== undefined && { qty: Number(qty) }),
        ...(unit && { unit }),
        ...(badge && { badge }),
        ...(rating !== undefined && { rating: Number(rating) }),
        ...(isAvailable !== undefined && { isAvailable })
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully!", product: updated });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err.message);
    res.status(500).json({ success: false, message: "Failed to update product: " + err.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await sweet.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product removed successfully", deleted });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err.message);
    res.status(500).json({ success: false, message: "Failed to delete product: " + err.message });
  }
};