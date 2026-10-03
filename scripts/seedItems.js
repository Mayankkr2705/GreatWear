import process from "node:process";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const items = [
  {
    id: "seed-linen-overshirt",
    title: "Relaxed Linen Overshirt",
    description: "Breathable natural linen overshirt in a warm sand tone. Easy to layer over tees or dresses.",
    category: "Tops",
    type: "Overshirt",
    size: "M (32)",
    condition: "Excellent",
    tags: ["linen", "minimal", "summer", "layering"],
    points: 55,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-indigo-jeans",
    title: "Indigo Straight-Leg Jeans",
    description: "Classic mid-rise denim with a clean straight-leg fit and plenty of life left in the fabric.",
    category: "Bottoms",
    type: "Jeans",
    size: "L (34)",
    condition: "Good",
    tags: ["denim", "everyday", "indigo", "classic"],
    points: 65,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-floral-midi-dress",
    title: "Floral Midi Dress",
    description: "Lightweight midi dress with a soft floral print, flattering waist detail, and flowing skirt.",
    category: "Dresses",
    type: "Midi dress",
    size: "S (30)",
    condition: "Like New",
    tags: ["floral", "occasion", "midi", "feminine"],
    points: 80,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-denim-jacket",
    title: "Vintage Wash Denim Jacket",
    description: "A dependable vintage-wash denim jacket with a relaxed fit and gently worn character.",
    category: "Outerwear",
    type: "Denim jacket",
    size: "XL (36)",
    condition: "Excellent",
    tags: ["denim", "vintage", "jacket", "layering"],
    points: 75,
    image: "https://images.unsplash.com/photo-1523205565295-f8e91625443b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-canvas-sneakers",
    title: "Classic Canvas Sneakers",
    description: "Low-top canvas sneakers in versatile off-white with a comfortable everyday sole.",
    category: "Shoes",
    type: "Sneakers",
    size: "Shoe 8",
    condition: "Good",
    tags: ["canvas", "casual", "white", "everyday"],
    points: 45,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-wool-coat",
    title: "Tailored Wool Coat",
    description: "Structured charcoal wool coat with a clean silhouette that works for workdays and weekends.",
    category: "Outerwear",
    type: "Wool coat",
    size: "L (34)",
    condition: "Like New",
    tags: ["wool", "tailored", "winter", "charcoal"],
    points: 120,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-knit-sweater",
    title: "Soft Ribbed Knit Sweater",
    description: "Cozy ribbed knit sweater in a muted rust shade with a relaxed crew neckline.",
    category: "Tops",
    type: "Sweater",
    size: "M (32)",
    condition: "Excellent",
    tags: ["knit", "cozy", "rust", "autumn"],
    points: 60,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-leather-tote",
    title: "Structured Leather Tote",
    description: "Roomy tan leather tote with sturdy handles and an interior pocket for daily essentials.",
    category: "Bags",
    type: "Tote bag",
    size: "One Size",
    condition: "Good",
    tags: ["leather", "workwear", "tote", "tan"],
    points: 90,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-cotton-tee",
    title: "Organic Cotton Everyday Tee",
    description: "Soft organic cotton crew-neck tee in washed sage, ready for repeat wear.",
    category: "Tops",
    type: "T-shirt",
    size: "S (30)",
    condition: "Like New",
    tags: ["organic", "cotton", "basics", "sage"],
    points: 35,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-pleated-trousers",
    title: "Wide-Leg Pleated Trousers",
    description: "High-waisted wide-leg trousers with elegant pleats and a fluid drape.",
    category: "Formal wear",
    type: "Trousers",
    size: "M (32)",
    condition: "Excellent",
    tags: ["tailored", "wide-leg", "formal", "pleated"],
    points: 70,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-silk-scarf",
    title: "Printed Silk Neck Scarf",
    description: "Colorful printed silk scarf that adds an expressive finish to simple outfits.",
    category: "Accessories",
    type: "Scarf",
    size: "Free Size",
    condition: "Like New",
    tags: ["silk", "print", "accessory", "colorful"],
    points: 40,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seed-athletic-set",
    title: "Breathable Training Set",
    description: "Lightweight performance top and matching shorts for running, yoga, or gym sessions.",
    category: "Athletic wear",
    type: "Training set",
    size: "M (32)",
    condition: "Excellent",
    tags: ["activewear", "training", "breathable", "fitness"],
    points: 65,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
  }
];

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return undefined;
  }

  throw new Error(
    "Set FIREBASE_SERVICE_ACCOUNT to the service-account JSON, or set GOOGLE_APPLICATION_CREDENTIALS to its file path."
  );
}

function createFirebaseApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccount = getServiceAccount();
  return serviceAccount
    ? initializeApp({ credential: cert(serviceAccount) })
    : initializeApp();
}

async function seedItems() {
  const db = getFirestore(createFirebaseApp());
  const now = Timestamp.now();
  const batch = db.batch();
  const uploaderId = process.env.SEED_UPLOADER_ID || "seed-user";
  const uploaderName = process.env.SEED_UPLOADER_NAME || "GreatWear Seed";
  const uploaderEmail = process.env.SEED_UPLOADER_EMAIL || "seed@greatwear.local";

  for (const item of items) {
    const { id, image, ...itemFields } = item;
    batch.set(db.collection("items").doc(id), {
      ...itemFields,
      images: [image],
      uploaderId,
      uploaderName,
      uploaderEmail,
      status: "approved",
      available: true,
      createdAt: now,
      updatedAt: now
    }, { merge: true });
  }

  await batch.commit();
  console.log(`Seeded ${items.length} clothing items into the items collection.`);
}

seedItems().catch((error) => {
  console.error("Unable to seed clothing items:", error.message);
  process.exitCode = 1;
});