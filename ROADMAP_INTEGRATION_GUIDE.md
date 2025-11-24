# How to Add Roadmap Page to Your Navigation

The Roadmap page has been created at `frontend/src/pages/Roadmap.jsx`.

To make it accessible from your footer, follow these steps:

---

## Step 1: Update Footer Component

**File to modify:** `frontend/src/LandingPage/LandingFooter.jsx`

Find the "Product" section in your footer (it currently has Features and Updates).

**Add this line between Features and Updates:**

```jsx
<a href="/roadmap" style={linkStyle}>Roadmap</a>
```

**Example:**
```jsx
// Product Section
<div>
    <h3 style={headingStyle}>Product</h3>
    <a href="/features" style={linkStyle}>Features</a>
    <a href="/roadmap" style={linkStyle}>Roadmap</a>  {/* NEW LINE */}
    <a href="/updates" style={linkStyle}>Updates</a>
</div>
```

---

## Step 2: Add Route (if using React Router)

**File to modify:** Your main routing file (likely `App.jsx` or `Routes.jsx`)

**Add this import:**
```jsx
import Roadmap from './pages/Roadmap';
```

**Add this route:**
```jsx
<Route path="/roadmap" element={<Roadmap />} />
```

---

## Step 3: Test

1. Start your development server
2. Navigate to the footer
3. Click on "Roadmap" link
4. Verify the page loads correctly

---

## What the Roadmap Page Includes:

✅ Now/Next/Later format with progress bars  
✅ Quarterly roadmap (Q1-Q4 2025)  
✅ Interactive feature voting  
✅ Recently shipped features  
✅ Development stats  
✅ Email subscription  

---

## Alternative: If Not Using React Router

If you're not using React Router and just want to link to the page directly, you can create a new HTML file or adjust your routing setup accordingly.

The Roadmap component is self-contained and ready to use!
