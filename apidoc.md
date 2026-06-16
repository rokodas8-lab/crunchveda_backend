# CrunchVeda — Dynamic Admin & CMS Integration: Issues & Required Changes

## Current State Analysis

### ✅ Already Working (Dynamic)

| Feature | Component | Status |
|---|---|---|
| **Homepage Categories carousel** | `CuratedCategories.tsx` | ✅ Reads from `GET /api/categories` via `useCategories()` hook |
| **Homepage Bestsellers section** | `BestSellingProducts.tsx` | ✅ Reads from `GET /api/products/bestsellers` via `useBestsellers()` hook |
| **Best Seller page hero** | `BestSellerHero.tsx` | ✅ Reads from `GET /api/products/bestsellers` via `useBestsellers()` hook |
| **Best Seller page grid** | `BestSellerGrid.tsx` | ✅ Reads from `GET /api/products/bestsellers` via `useBestsellers()` hook |
| **Admin Categories List** | `/admin/categories/page.tsx` | ✅ Full CRUD wired to real DB via `categoryService` |
| **Admin Add Category** | `/admin/categories/add/page.tsx` | ✅ Posts to `POST /api/categories` |
| **Admin Edit Category** | `/admin/categories/edit/[id]/page.tsx` | ⚠️ Wired correctly but has a **Next.js 15 params bug** |

---

## 🐛 Issues Found

### Issue 1: Next.js 15 `params` Promise Warning — `EditCategoryPage`

**File:** `/app/admin/(dashboard)/categories/edit/[id]/page.tsx`

**Error in console:**
```
A param property was accessed directly with `params.id`. `params` is a Promise 
and must be unwrapped with `React.use()` before accessing its properties.
```

**Root Cause:** In Next.js 15, dynamic route `params` is now a Promise. You must unwrap it using `React.use()` before accessing properties like `params.id`.

**Fix Required:**

```diff
- export default function EditCategoryPage({ params }: { params: { id: string } }) {
-   const [category, setCategory] = React.useState<ICategory | null>(null);
-   ...
-   React.useEffect(() => {
-     ...
-     const found = list.find(c => c._id === params.id);   // ← crash
-     ...
-   }, [params.id]);

+ export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
+   const { id } = React.use(params);    // ← unwrap the Promise
+   const [category, setCategory] = React.useState<ICategory | null>(null);
+   ...
+   React.useEffect(() => {
+     ...
+     const found = list.find(c => c._id === id);
+     ...
+   }, [id]);
```

> [!IMPORTANT]
> Apply the same fix to **any other dynamic route pages** that use `params.id`, `params.slug`, etc. directly.

---

### Issue 2: Admin Products Manager — Simplified Mock-Style Form (Not DB-Complete)

**File:** `components/AdminComponents/AdminProductManager.tsx`

**Problem:** The current product form only captures:
- `name`, `category` (text, not dropdown), `price` (string), `defaultSize`, `rating`, `status`, `badge`, `image` (single), `description`

**Missing fields required by the backend `Product` model:**
- `slug` — required, must be unique
- `stock` — required integer
- `images[]` — array of image URLs (not just one)
- `sizePrices` — map of `{ "250g": 800, "500g": 1500 }` (required for size pills to work on CMS)
- `category` must be a dropdown populated from real DB categories, not a plain text field
- `dietary` — array of dietary tags

The `contentService.saveProduct()` compensates for some of these by auto-generating values, but this creates problems:
- Auto-generated slug can collide if product name is similar
- Stock always defaults to 100
- `sizePrices` only contains the single default size

---

### Issue 3: Admin Bestsellers Manager — Same Form Issue

**File:** `components/AdminComponents/AdminBestsellerManager.tsx`

Same missing fields as Issue 2 above. The `category` field is a plain text input, but the backend requires a category ObjectId. The `contentService.saveProduct()` tries to auto-create a category if it doesn't exist — this causes unexpected side effects.

---

### Issue 4: `AdminProductRecord` Type Mismatch

**File:** `json/mock/admin.ts` (or equivalent)

The `AdminProductRecord` type used internally is a simplified flat record:
```ts
type AdminProductRecord = {
  id: string;
  name: string;
  category: string;   // just a name string
  status: AdminStatus;
  price: string;      // "$18.50" formatted string
  defaultSize: string;
  rating: string;
  image: string;      // single image
  description: string;
  badge?: string;
}
```

This should be replaced or extended to align with the actual backend `Product` model for full fidelity.

---

## ✅ Required Changes

### 1. Fix `EditCategoryPage` Next.js 15 params (URGENT — causes runtime crash)

**File:** `app/admin/(dashboard)/categories/edit/[id]/page.tsx`

Unwrap `params` using `React.use()`:

```tsx
"use client";
import React from "react";
// ...

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);  // ← unwrap Promise
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    categoryService.getAll().then(list => {
      if (!active) return;
      const found = list.find(c => c._id === id);  // ← use unwrapped id
      if (found) {
        setCategory(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }).catch(err => {
      if (!active) return;
      toast.error(err instanceof Error ? err.message : "Failed to load category");
      setLoading(false);
      setNotFound(true);
    });
    return () => { active = false; };
  }, [id]);
  // ...
}
```

---

### 2. Upgrade `AdminProductManager` to Full DB-backed Form

**File:** `components/AdminComponents/AdminProductManager.tsx`

Replace the simplified product form with a full-fidelity form that:
- Loads categories from `GET /api/categories?all=true` and renders a `Select` dropdown
- Has a `slug` field (auto-generated from name, editable)
- Has `stock` number field
- Has `sizePrices` editor (e.g., key-value pairs: "250g → 800")
- Has `dietary` multi-select or comma-input
- Has `images[]` array with Cloudinary uploader for primary + ability to add more

The service method `adminContentService.saveProduct()` should also be updated to stop auto-creating categories and instead require a valid selected category ID.

---

### 3. Upgrade `AdminBestsellerManager` to Use Real Category Dropdown

**File:** `components/AdminComponents/AdminBestsellerManager.tsx`

Same changes as above — replace `category` text input with a dropdown populated from real API.

---

### 4. Add `adminProductService` (New Service File)

**New File:** `services/admin/productService.ts`

Create a dedicated admin product service that:
- Reads categories from real DB for dropdowns
- Constructs proper API payloads with all required fields
- Handles `POST /api/products` (create) and `PUT /api/products/:id` (update) correctly

```ts
// services/admin/productService.ts
export type ProductPayload = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;         // ObjectId
  badge?: string;
  dietary?: string[];
  sizePrices?: Record<string, number>;
  defaultSize?: string;
  isActive?: boolean;
};

export const adminProductService = {
  getAll: async (token: string): Promise<Product[]> => { ... },
  create: async (payload: ProductPayload, token: string): Promise<Product> => { ... },
  update: async (id: string, payload: Partial<ProductPayload>, token: string): Promise<Product> => { ... },
  remove: async (id: string, token: string): Promise<void> => { ... },
};
```

---

### 5. Add `Product` Type to `/types/`

**New File:** `types/product.ts`

```ts
export type IProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    isActive: boolean;
  } | string;
  ratings: {
    average: number;
    count: number;
  };
  badge?: string;
  dietary?: string[];
  sizePrices?: Record<string, number>;
  defaultSize?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
```

---

## API Changes Summary

### No new backend endpoints needed

All required API endpoints **already exist**. The backend is fully functional. The work is entirely on the **frontend admin forms** to correctly use the existing APIs.

| Endpoint | Used By | Already Working? |
|---|---|---|
| `GET /api/categories?all=true` | Admin product form dropdown | ✅ Yes |
| `POST /api/categories` | Admin add category | ✅ Yes |
| `PUT /api/categories/:id` | Admin edit category | ✅ Yes |
| `DELETE /api/categories/:id` | Admin delete category | ✅ Yes |
| `GET /api/products?all=true` | Admin product list | ✅ Yes |
| `POST /api/products` | Admin create product | ✅ Yes |
| `PUT /api/products/:id` | Admin edit product | ✅ Yes |
| `DELETE /api/products/:id` | Admin delete product | ✅ Yes |
| `GET /api/products/bestsellers` | CMS bestseller sections | ✅ Yes |
| `GET /api/categories` | CMS category carousel | ✅ Yes |

---

## Postman Collection Update Needed

The Postman collection (`crunchveda_postman_collection.json`) already has full coverage — no changes needed there.

---

## Summary of Files to Change

| File | Change |
|---|---|
| `app/admin/(dashboard)/categories/edit/[id]/page.tsx` | Fix Next.js 15 params Promise unwrap with `React.use()` |
| `components/AdminComponents/AdminProductManager.tsx` | Full form rewrite: slug, stock, images[], sizePrices, category dropdown |
| `components/AdminComponents/AdminBestsellerManager.tsx` | Replace category text input with real DB category dropdown |
| `services/admin/contentService.ts` | Remove auto-category-creation side effect from `saveProduct()` |
| `services/admin/productService.ts` | **[NEW]** Dedicated admin product CRUD service |
| `types/product.ts` | **[NEW]** Full IProduct type aligned with backend model |
