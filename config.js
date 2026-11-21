/* ============================================================
   EREMAX QUIZ — CONFIG
   Edit everything here: copy, numbers, prices and checkout links.
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",

  // Social-proof number shown on interstitials. Use a figure you can back up.
  customersCount: "[XX,XXX]+",

  // How long the countdown lasts (minutes) — resets per visitor session.
  countdownMinutes: 15,

  // Pass UTM / click-id params from the landing URL through to checkout links.
  passQueryParamsToCheckout: true,

  // Offer packages — replace prices and checkout URLs (BuyGoods, Shopify, etc).
  packages: [
    {
      id: "1",
      label: "Starter",
      supply: "1 Bottle · 30-Day Supply",
      price: 69,
      oldPrice: 99,
      perUnit: "$69 / bottle",
      shipping: "+ Shipping",
      badge: "",
      bonuses: false,
      checkoutUrl: "https://example.com/checkout?pkg=1"
    },
    {
      id: "6",
      label: "Best Value",
      supply: "6 Bottles · 180-Day Supply",
      price: 294,
      oldPrice: 594,
      perUnit: "$49 / bottle",
      shipping: "FREE Shipping",
      badge: "BEST VALUE",
      bonuses: true,
      highlight: true,
      checkoutUrl: "https://example.com/checkout?pkg=6"
    },
    {
      id: "3",
      label: "Most Popular",
      supply: "3 Bottles · 90-Day Supply",
      price: 177,
      oldPrice: 297,
      perUnit: "$59 / bottle",
      shipping: "FREE Shipping",
      badge: "MOST POPULAR",
      bonuses: true,
      checkoutUrl: "https://example.com/checkout?pkg=3"
    }
  ],

  guaranteeDays: 60
};
