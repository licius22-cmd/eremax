/* ============================================================
   EREMAX QUIZ — CONFIG
   Everything you normally change lives here.
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",
  productName: "Eremax Performance Gummies",

  // Social-proof number used in the copy. Only use a figure you can back up.
  customersCount: "[XX,XXX]",

  // Where the "Submit" button on the last step sends the visitor.
  // Default: the offer page included in this repo. Swap for your product/checkout URL.
  redirectUrl: "offer.html",

  // Pass UTM / click-id params from the quiz URL to the redirect + checkout links.
  passQueryParams: true,

  // Black Friday bar countdown: per-visitor timer (seconds). Original uses 2h.
  countdownSeconds: 7200,

  // Images — drop your files in /images with these names (or change the paths).
  // While a file is missing, a built-in illustration is shown instead.
  images: {
    logo: "",                       // e.g. "images/logo.png" — empty = text logo
    age: ["images/age-1.webp", "images/age-2.webp", "images/age-3.webp",
          "images/age-4.webp", "images/age-5.webp", "images/age-6.webp"],
    proof: ["images/proof-1.jpg", "images/proof-2.jpg", "images/proof-3.jpg", "images/proof-4.jpg"],
    transformation: "images/transformation.png",
    profile: "images/profile.png"
  },

  // Offer page packages (offer.html) — replace prices and checkout URLs.
  packages: [
    { id: "1", label: "1 Bottle", supply: "30-Day Supply", price: 69, oldPrice: 99, perUnit: "$69 / bottle",
      shipping: "+ Shipping", badge: "", bonuses: false, checkoutUrl: "https://example.com/checkout?pkg=1" },
    { id: "6", label: "6 Bottles", supply: "180-Day Supply", price: 294, oldPrice: 594, perUnit: "$49 / bottle",
      shipping: "FREE Shipping", badge: "BEST VALUE", bonuses: true, highlight: true, checkoutUrl: "https://example.com/checkout?pkg=6" },
    { id: "3", label: "3 Bottles", supply: "90-Day Supply", price: 177, oldPrice: 297, perUnit: "$59 / bottle",
      shipping: "FREE Shipping", badge: "MOST POPULAR", bonuses: true, checkoutUrl: "https://example.com/checkout?pkg=3" }
  ],

  guaranteeDays: 60
};
