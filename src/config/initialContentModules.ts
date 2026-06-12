export const initialContentModules = [
  {
    moduleId: "home",
    title: "Homepage",
    route: "/",
    description: "Manage the complete homepage: hero, category carousel, product cards, feature band, gift banner, product story, timeline, social grid, and FAQ.",
    pageType: "Content",
    records: [
      {
        id: "home-hero",
        title: "Home hero banner",
        type: "Hero section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "CRAFTING AGRICULTURAL EXCELLENCE" },
          { id: "headline", label: "H1 headline", type: "text", value: "Premium Dry Fruits Delivered Fresh" },
          { id: "description", label: "Hero paragraph", type: "textarea", value: "Experience the pinnacle of nutrition with our hand-picked selection of gourmet dry fruits, sourced directly from the finest organic orchards across the globe." },
          { id: "primaryCtaLabel", label: "Primary CTA label", type: "text", value: "Explore Collection" },
          { id: "primaryCtaHref", label: "Primary CTA link", type: "text", value: "/product" },
          { id: "image", label: "Hero background image", type: "image", value: "/assets/homeBannerImg.png" },
          { id: "showSection", label: "Show hero section", type: "toggle", value: true }
        ]
      },
      {
        id: "home-categories",
        title: "Curated categories carousel",
        type: "Category cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "Curated Categories" },
          { id: "cards", label: "Category cards", type: "textarea", value: "Almonds | 12 ITEMS | /product?category=almonds\nCashews | 8 ITEMS | /product?category=cashews\nPistachios | 10 ITEMS | /product?category=pistachios\nWalnuts | 6 ITEMS | /product?category=walnuts\nDates | 15 ITEMS | /product?category=dates\nSeeds | 9 ITEMS | /product?category=seeds" },
          { id: "imageSet", label: "Image paths", type: "textarea", value: "/assets/almonds_category.png\n/assets/cashews_category.png\n/assets/pistachios_category.png\n/assets/walnuts_category.png\n/assets/dates_category.png\n/assets/seeds_category.png" }
        ]
      },
      {
        id: "home-best-selling",
        title: "Best selling products",
        type: "Product card section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "CROWD FAVORITES" },
          { id: "heading", label: "Section heading", type: "text", value: "Best Selling Products" },
          { id: "viewAllLabel", label: "View all label", type: "text", value: "View All Products" },
          { id: "viewAllHref", label: "View all link", type: "text", value: "/product" },
          { id: "products", label: "Featured product cards", type: "textarea", value: "Jumbo Cashews | $18.50 | Organic | 250g, 500g, 1kg | WhatsApp enabled\nRaw California Almonds | $18.50 | Best Seller | 100g, 250g, 500g, 1kg | WhatsApp enabled\nArtisanal Chilean Walnuts | $21.99 | No badge | 500g | WhatsApp disabled\nTurkish Salted Pistachios | $27.50 | No badge | 100g, 500g | WhatsApp disabled" }
        ]
      },
      {
        id: "home-features",
        title: "Feature promise band",
        type: "Feature cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "features", label: "Feature cards", type: "textarea", value: "100% Organic | Sourced from certified organic farms committed to sustainable heritage agriculture.\nPremium Quality | Every batch undergoes rigorous quality checks for size, freshness, and nutrient density.\nEco-Fast Delivery | Sustainable carbon-neutral shipping ensures your health arrives at your doorstep swiftly.\nArtisanal Packing | Breathable, eco-friendly packaging designed to maintain crunch and essential oils." }
        ]
      },
      {
        id: "home-gift-banner",
        title: "Gift banner",
        type: "Banner CTA",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "GIFT OF HEALTH" },
          { id: "heading", label: "Banner heading", type: "text", value: "Premium Curated Gift Boxes" },
          { id: "description", label: "Banner paragraph", type: "textarea", value: "Celebrate special moments with our elegant gift hampers. Perfect for corporate gifting or cherished family traditions." },
          { id: "ctaLabel", label: "CTA label", type: "text", value: "Customize Your Box" },
          { id: "ctaHref", label: "CTA link", type: "text", value: "/gifts" },
          { id: "image", label: "Background image", type: "image", value: "/assets/gift_banner_bg.png" }
        ]
      },
      {
        id: "home-faq",
        title: "Frequently asked questions",
        type: "FAQ accordion",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "Frequently Asked Questions" },
          { id: "faqItems", label: "FAQ items", type: "textarea", value: "How do you ensure the freshness of your dry fruits? | We source directly from selected farms during peak harvest season.\nAre your products completely organic? | Yes, our entire curated selection is 100% organic and pesticide-free.\nWhat is your shipping policy? | Orders are processed within 24 hours and delivery typically takes 2-4 business days." }
        ]
      },
      {
        id: "home-product-details",
        title: "Product details section",
        type: "Product details",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "walnutEyebrow", label: "Walnut Eyebrow", type: "text", value: "NATURAL SUPERFOOD" },
          { id: "walnutHeading", label: "Walnut Heading", type: "text", value: "The Brain-Boosting Power of Walnuts" },
          { id: "walnutDescription", label: "Walnut Description", type: "textarea", value: "Rich in omega-3 fatty acids and antioxidants, our Chilean walnuts are more than just a snack. They are essential fuel for cognitive health and heart vitality." },
          { id: "walnutBullets", label: "Walnut Bullets (one per line)", type: "textarea", value: "High in Omega-3 DHA\nSupports Heart Health\nNatural Energy Booster" },
          { id: "walnutImage", label: "Walnut Image", type: "image", value: "/assets/walnutDetail.png" },
          { id: "almondEyebrow", label: "Almond Eyebrow", type: "text", value: "IMMUNE SUPPORT" },
          { id: "almondHeading", label: "Almond Heading", type: "text", value: "Almonds: Nature's Daily Multi-Vitamin" },
          { id: "almondDescription", label: "Almond Description", type: "textarea", value: "Packed with Vitamin E, magnesium, and protein, our California almonds help maintain healthy skin and a robust immune system with every crunch." },
          { id: "almondBullets", label: "Almond Bullets (one per line)", type: "textarea", value: "Rich in Vitamin E\nHigh Fiber Content\nPromotes Skin Health" },
          { id: "almondImage", label: "Almond Image", type: "image", value: "/assets/almondDetail.png" }
        ]
      },
      {
        id: "home-timeline",
        title: "Heritage timeline section",
        type: "Heritage Timeline",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section Heading", type: "text", value: "Our Heritage Journey" },
          { id: "description", label: "Section Description", type: "textarea", value: "Tracing our roots back to the finest organic orchards." },
          { id: "events", label: "Timeline Events (Year | Title | Description | Align)", type: "textarea", value: "1994 | The Seed is Sown | Founded as a small family orchard in the foothills, focused on traditional farming methods. | left\n2008 | Organic Certification | One of the first in the region to achieve global 100% organic certification for all our produce. | right\n2024 | NutriHarvest Global | Launching our digital experience to deliver premium health directly to your doorstep worldwide. | left" }
        ]
      }
    ]
  },
  {
    moduleId: "categories",
    title: "Categories Page",
    route: "/categories",
    description: "Manage the categories landing page title block, collection cards, gifting banner, and assurance feature row.",
    pageType: "Commerce",
    records: [
      {
        id: "categories-header",
        title: "Title section",
        type: "Page header",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Subtitle", type: "text", value: "The Essence of Earth" },
          { id: "headline", label: "H1 headline", type: "text", value: "Curated Collections" },
          { id: "description", label: "Intro paragraph", type: "textarea", value: "Explore our meticulously sourced selection of nature's most exquisite offerings. From the golden dunes of heritage date palms to the ancient groves of artisanal oils, every harvest tells a story of provenance and passion." }
        ]
      },
      {
        id: "categories-grid",
        title: "Collection cards",
        type: "Category grid",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "cards", label: "Collection cards", type: "textarea", value: "Premium Dates | Signature Selection | Heritage varieties hand-plucked from the sun-drenched oases of the Middle East. | /product?category=dates\nExotic Nuts |  | Sustainably sourced, slow-roasted perfection. | /product?category=nuts\nAncient Grains |  | Heirloom grains from untouched soils. | /product?category=grains\nArtisanal Oils |  | Cold-pressed liquid gold for the discerning palate. | /product?category=oils" },
          { id: "imageSet", label: "Image paths", type: "textarea", value: "/assets/dates_category.png\n/assets/exotic_nuts.png\n/assets/ancient_grains.png\n/assets/olive_oil.png" }
        ]
      },
      {
        id: "categories-gifting",
        title: "Artisanal gifting banner",
        type: "Banner CTA",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Eyebrow", type: "text", value: "NEW IN EARTH" },
          { id: "badge", label: "Badge text", type: "text", value: "Perfect for Gifting" },
          { id: "heading", label: "Heading", type: "text", value: "Artisanal Gifting" },
          { id: "description", label: "Description", type: "textarea", value: "Thoughtfully curated hampers that celebrate the art of giving and the bounty of nature." },
          { id: "ctaLabel", label: "CTA label", type: "text", value: "Explore Gift Sets" },
          { id: "ctaHref", label: "CTA link", type: "text", value: "/product?category=gifting" },
          { id: "image", label: "Banner image", type: "image", value: "/assets/artisanal_gifting.png" }
        ]
      },
      {
        id: "categories-features",
        title: "Assurance feature row",
        type: "Feature cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "features", label: "Feature cards", type: "textarea", value: "Ethically Sourced | Working directly with small-scale farmers to ensure fair practices and superior quality.\nCertified Organic | Every product is tested for purity and maintains the highest organic certifications.\nGlobal Excellence | Premium logistics ensuring freshness from our soil to your doorstep." }
        ]
      }
    ]
  },
  {
    moduleId: "products",
    title: "Product Listing Page",
    route: "/product",
    description: "Manage product listing page copy, filter options, sort options, card rules, WhatsApp CTA text, and pagination settings.",
    pageType: "Commerce",
    records: [
      {
        id: "product-list-header",
        title: "Collections header",
        type: "Page header",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "breadcrumbLabel", label: "Breadcrumb label", type: "text", value: "Collections" },
          { id: "headline", label: "H1 headline", type: "text", value: "Dry Fruit Collections" },
          { id: "description", label: "Intro paragraph", type: "textarea", value: "Artisanal selections sourced from the finest orchards globally. Each harvest is hand-picked, ensuring peak nutritional density and superior flavor profiles." }
        ]
      },
      {
        id: "product-filters",
        title: "Filter sidebar",
        type: "Filter settings",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "categories", label: "Category filter options", type: "textarea", value: "Premium Almonds\nExotic Cashews\nWalnut Kernels\nCalifornia Pistachios\nDates & Figs" },
          { id: "dietary", label: "Dietary filter options", type: "textarea", value: "Organic\nGluten-Free\nRaw" },
          { id: "priceMin", label: "Minimum price", type: "number", value: "5" },
          { id: "priceMax", label: "Maximum price", type: "number", value: "100" },
          { id: "sortOptions", label: "Sort options", type: "textarea", value: "Premium First\nPrice: Low to High\nPrice: High to Low\nName: A-Z" },
          { id: "itemsPerPage", label: "Items per page", type: "number", value: "6" }
        ]
      },
      {
        id: "product-card-rules",
        title: "Product card display rules",
        type: "Card settings",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "showRating", label: "Show rating", type: "toggle", value: true },
          { id: "showWishlist", label: "Show wishlist button", type: "toggle", value: true },
          { id: "showWhatsApp", label: "Show WhatsApp action", type: "toggle", value: true },
          { id: "showSizePills", label: "Show size pills", type: "toggle", value: true }
        ]
      }
    ]
  },
  {
    moduleId: "product-detail",
    title: "Product Details Page",
    route: "/product/[slug]",
    description: "Manage the reusable detail page fields: gallery, badges, pricing blocks, package options, trust badges, WhatsApp CTA, and detail panels.",
    pageType: "Commerce",
    records: [
      {
        id: "detail-gallery",
        title: "Product gallery",
        type: "Gallery",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "breadcrumbLabel", label: "Breadcrumb label", type: "text", value: "Collections" },
          { id: "galleryImages", label: "Gallery images", type: "textarea", value: "Use product.gallery image paths from the product record. Add one path per line for future API integration." },
          { id: "showThumbnails", label: "Show thumbnails", type: "toggle", value: true }
        ]
      },
      {
        id: "detail-main-info",
        title: "Product information panel",
        type: "Product detail content",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "badgeRules", label: "Badge rules", type: "textarea", value: "Organic badge when product.badge is ORGANIC\nBest Seller badge when product.badge is BEST SELLER\nAlways show Premium Grade badge" },
          { id: "savingsLabel", label: "Savings label", type: "text", value: "20% Savings" },
          { id: "quantityMin", label: "Minimum quantity", type: "number", value: "1" },
          { id: "cartCta", label: "Cart CTA label", type: "text", value: "Add to Cart" },
          { id: "whatsAppCta", label: "WhatsApp CTA label", type: "text", value: "Order on WhatsApp" },
          { id: "responseNote", label: "Response note", type: "text", value: "Typical response time · 1–3 mins" }
        ]
      },
      {
        id: "detail-trust-bottom",
        title: "Trust and bottom sections",
        type: "Trust panels",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "trustItems", label: "Trust items", type: "textarea", value: "100% Organic | Farm-to-table cultivation\nDirect Trade | Sourced with heritage" },
          { id: "bottomSections", label: "Bottom sections", type: "textarea", value: "Origin story\nStorage instructions\nNutrition facts\nRelated products" }
        ]
      }
    ]
  },
  {
    moduleId: "best-seller",
    title: "Best Seller Page",
    route: "/best-seller",
    description: "Manage the best-seller editorial hero, featured date product, collection cards, quote, and highlight areas.",
    pageType: "Commerce",
    records: [
      {
        id: "best-header",
        title: "Editorial page header",
        type: "Hero header",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Section tag", type: "text", value: "Curated Excellence" },
          { id: "headline", label: "H1 headline", type: "text", value: "The Season's Finest" },
          { id: "description", label: "Hero paragraph", type: "textarea", value: "A limited-batch selection of the Earth's most exceptional yields. From sun-drenched estates to remote forest canopies, we bring you the pinnacle of artisanal cultivation, meticulously verified for provenance, purity, and peak flavor profile." }
        ]
      },
      {
        id: "best-featured",
        title: "Featured product row",
        type: "Featured product",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "image", label: "Featured image", type: "image", value: "/assets/best_seller_dates.png" },
          { id: "badgeTag", label: "Overlay badge", type: "text", value: "Editor's Choice #01" },
          { id: "productName", label: "Product name", type: "text", value: "Jumbo Medjool Dates" },
          { id: "productMeta", label: "Product meta", type: "text", value: "Premium Grade • 1kg • $32.00" },
          { id: "sectionTag", label: "Right column tag", type: "text", value: "The Provenance" },
          { id: "description", label: "Product story", type: "textarea", value: "Harvested from the Jericho Valley, these King of Dates are hand-picked at peak ripeness." },
          { id: "checklist", label: "Checklist items", type: "textarea", value: "Single-Estate Origin\n100% Pure Organic" },
          { id: "ctaLabel", label: "CTA label", type: "text", value: "Add To Harvest" }
        ]
      },
      {
        id: "best-collection",
        title: "The Collection grid",
        type: "Product cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "The Collection" },
          { id: "viewAllLabel", label: "View all label", type: "text", value: "View All Shop" },
          { id: "cards", label: "Collection cards", type: "textarea", value: "Raw Forest Honey | $45.00 | Acacia & Tupelo | 500g | Limited Batch\nArtisanal Walnuts | $28.00 | Shelled | 750g\nExotic Fruit Mix | $34.00 | Dehydrated | 400g" }
        ]
      }
    ]
  },
  {
    moduleId: "gifts",
    title: "Gifts Page",
    route: "/gifts",
    description: "Manage gifting header content, executive gift cards, custom chest CTA, collection columns, and concierge form copy.",
    pageType: "Commerce",
    records: [
      {
        id: "gifts-header",
        title: "Gifting intro",
        type: "Page header",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Subtitle", type: "text", value: "Artisanal Gifting" },
          { id: "headline", label: "H1 headline", type: "text", value: "Curated with\nIntention." },
          { id: "description", label: "Intro paragraph", type: "textarea", value: "Discover our message of special celebrations, unique business appreciation, and hand-selected gestures for every occasion." }
        ]
      },
      {
        id: "gifts-executive",
        title: "Executive gift set",
        type: "Gift cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "The Executive" },
          { id: "exploreLabel", label: "Explore link label", type: "text", value: "Explore The Set" },
          { id: "largeCard", label: "Large gift card", type: "textarea", value: "The Signature | The Founder's Reserve | Handmade wood chest with gourmet dried fruits, chocolate, wildflower honey & olive oil. | Read details" },
          { id: "smallCards", label: "Small gift cards", type: "textarea", value: "Royal Harvest | A sampling box of raw honey, medjool dates & handpicked nuts.\nThe Tea Botanical | Loose leaf organic herbal tea selection with handmade tea infuser." }
        ]
      },
      {
        id: "gifts-custom-chest",
        title: "Custom chest banner",
        type: "Banner CTA",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Banner subtitle", type: "text", value: "Made For You" },
          { id: "heading", label: "Banner heading", type: "text", value: "Build your own Custom Chest." },
          { id: "description", label: "Banner description", type: "textarea", value: "Select what fits, select the size, choose from our premium chest selections." },
          { id: "ctaLabel", label: "CTA label", type: "text", value: "Start building" },
          { id: "ctaHref", label: "CTA link", type: "text", value: "/categories" },
          { id: "image", label: "Banner image", type: "image", value: "/assets/custom_chest_bg.png" }
        ]
      },
      {
        id: "gifts-collections",
        title: "Heritage and seasonal collections",
        type: "Product columns",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heritageHeading", label: "Left column heading", type: "text", value: "The Heritage" },
          { id: "heritageItems", label: "Heritage items", type: "textarea", value: "Old Orchard Classic | Heritage cider, heirloom apples & seasonal fruit. | $110.00\nThe Orchard Spa | Botanical body mist, lavender oil & organic tea. | $75.00" },
          { id: "seasonalHeading", label: "Right column heading", type: "text", value: "The Seasonal" },
          { id: "seasonalItems", label: "Seasonal items", type: "textarea", value: "Winter Solstice | Spiced honey, dark chocolate & hand-poured candle. | $120.00\nThe Morning Harvest | Blueberry jam, wildflower honey & signature blend. | $95.00" }
        ]
      },
      {
        id: "gifts-concierge",
        title: "Gift concierge",
        type: "Lead form",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Form heading", type: "text", value: "Gift Concierge" },
          { id: "description", label: "Form description", type: "textarea", value: "Need help sending gifts for your team or event? Our concierge service provides personalized guidance." },
          { id: "emailPlaceholder", label: "Email placeholder", type: "text", value: "Your Email Address" },
          { id: "submitLabel", label: "Submit button label", type: "text", value: "Inquire" }
        ]
      }
    ]
  },
  {
    moduleId: "about-us",
    title: "About Us Page",
    route: "/about-us",
    description: "Manage about hero, stewardship narrative, process cards, quote, and sustainability charter sections.",
    pageType: "Content",
    records: [
      {
        id: "about-banner",
        title: "About hero",
        type: "Hero section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "EST. 1914" },
          { id: "headline", label: "H1 headline", type: "text", value: "Cultivating Legacy Through the Seasons" },
          { id: "description", label: "Hero paragraph", type: "textarea", value: "A century of dedication to the soil, the seed, and the harvest. The story of our organic stewardship." },
          { id: "image", label: "Hero image", type: "image", value: "/assets/about_banner.png" }
        ]
      },
      {
        id: "about-stewardship",
        title: "Stewardship narrative",
        type: "Split section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "Our Roots" },
          { id: "heading", label: "Section heading", type: "text", value: "A Century of Stewardship" },
          { id: "description", label: "Narrative paragraph", type: "textarea", value: "For over three generations, the Nur Harvest estate has stood as a beacon of organic excellence. Our journey began with a simple promise: to honor the land and craft purity." },
          { id: "quote", label: "Quote block", type: "textarea", value: "This is not merely land; it is a trust we hold for those who will follow." },
          { id: "image", label: "Section image", type: "image", value: "/assets/stewardship_farmer.png" },
          { id: "badgeNumber", label: "Floating badge number", type: "text", value: "100+" },
          { id: "badgeText", label: "Floating badge text", type: "text", value: "Years of Tradition" }
        ]
      },
      {
        id: "about-journey",
        title: "Artisanal journey",
        type: "Process cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "Our Process" },
          { id: "heading", label: "Section heading", type: "text", value: "The Artisanal Journey" },
          { id: "steps", label: "Process cards", type: "textarea", value: "Seed Heritage | The finest seed, hand-selected to reflect archaeological history and botanical purity.\nMineral Enrichment | Curating balanced ecosystem compounds, enriching soil nutrients.\nMaster Curation | Only the pinnacle of the harvest is selected." }
        ]
      }
    ]
  },
  {
    moduleId: "our-story",
    title: "Our Story Page",
    route: "/our-story",
    description: "Manage story hero, legacy split section, philosophy cards, stewardship timeline, and final CTA banner.",
    pageType: "Content",
    records: [
      {
        id: "story-hero",
        title: "Story hero",
        type: "Hero section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Hero subtitle", type: "text", value: "Our Heritage" },
          { id: "headline", label: "H1 headline", type: "text", value: "Cultivating the Legacy\nof Artisanal Earth" },
          { id: "description", label: "Hero paragraph", type: "textarea", value: "Beyond standard agriculture, we are a family-held steward of the land, preserving the patient wisdom of nature." },
          { id: "ctaLabel", label: "CTA label", type: "text", value: "Discover The Promise" },
          { id: "image", label: "Hero image", type: "image", value: "/assets/story_hero_bg.png" }
        ]
      },
      {
        id: "story-legacy",
        title: "Legacy split section",
        type: "Split content",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Small title", type: "text", value: "The Beginning" },
          { id: "heading", label: "Section heading", type: "text", value: "The Legacy of Soil and Spirit" },
          { id: "body", label: "Body copy", type: "textarea", value: "Our story began in 1924, on a small patch of untouched soil that whispered of potential.\nToday, NutriHarvest stands as a beacon of high-end agricultural craft." },
          { id: "image", label: "Section image", type: "image", value: "/assets/story_legacy_soil.png" }
        ]
      },
      {
        id: "story-philosophy",
        title: "Minimal intervention philosophy",
        type: "Card grid",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "Minimal Intervention Philosophy" },
          { id: "description", label: "Intro copy", type: "textarea", value: "We believe the finest produce is born from where the human hand is lightest, guiding nature without forcing it." },
          { id: "cards", label: "Philosophy cards", type: "textarea", value: "Biodynamic Balance | Aligning harvests close with celestial cycles.\nPure Sourcing | Only 2% of global harvests meet our criteria.\nArtisanal Curation | Every batch is hand-inspected and packed with care." }
        ]
      },
      {
        id: "story-timeline",
        title: "Stewardship timeline",
        type: "Timeline",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "A Century of Stewardship" },
          { id: "items", label: "Timeline items", type: "textarea", value: "1924 | The Founding Soil | The first 40 acres are purchased in Oregon.\n1968 | Organic Pioneer | One of the first certified organic estates in the region.\n2024 | The Global Standard | Combining artisanal precision with ecological stewardship." }
        ]
      },
      {
        id: "story-cta",
        title: "Taste the Provenance CTA",
        type: "CTA banner",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "CTA heading", type: "text", value: "Taste the Provenance" },
          { id: "description", label: "CTA description", type: "textarea", value: "Experience the culmination of our century-long journey through our curated seasonal collections." },
          { id: "primaryCta", label: "Primary CTA", type: "text", value: "Explore Collections | /categories" },
          { id: "secondaryCta", label: "Secondary CTA", type: "text", value: "Our Sustainability Promise | /about-us" }
        ]
      }
    ]
  },
  {
    moduleId: "sustainability",
    title: "Sustainability Page",
    route: "/sustainability",
    description: "Manage green pledge hero, quote, regenerative practices, zero-plastic cards, delivery stats, and impact report CTA.",
    pageType: "Content",
    records: [
      {
        id: "sustainability-hero",
        title: "Sustainability hero",
        type: "Hero section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Section tag", type: "text", value: "Our Green Pledge" },
          { id: "headline", label: "H1 headline", type: "text", value: "A Charter for the Future of Food" },
          { id: "description", label: "Hero description", type: "textarea", value: "We believe luxury is keeping the integrity of the soil, the purity of the food, and the transparency of the journey." },
          { id: "image", label: "Hero image", type: "image", value: "/assets/sustainability_hero_bg.png" },
          { id: "quote", label: "Quote text", type: "textarea", value: "We do not inherit the earth from our ancestors, we borrow it from our children." }
        ]
      },
      {
        id: "regenerative",
        title: "Regenerative practices",
        type: "Split section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Section tag", type: "text", value: "Regenerative Practices" },
          { id: "heading", label: "Section heading", type: "text", value: "Healing the Planet Through Agriculture" },
          { id: "features", label: "Feature rows", type: "textarea", value: "Living Soils | Our No-Till philosophy protects complex fungal networks.\nHeritage Seeds | We use heirloom, non-GMO, open-pollinated seeds." },
          { id: "image", label: "Crop image", type: "image", value: "/assets/story_legacy_soil.png" }
        ]
      },
      {
        id: "zero-plastic",
        title: "Zero Plastic Mandate",
        type: "Card grid",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "Zero Plastic Mandate" },
          { id: "description", label: "Intro paragraph", type: "textarea", value: "Every NutriHarvest vessel is designed to respect the environment, using glass, biodegradable mycelium, and vegetable-inked paper." },
          { id: "cards", label: "Packaging cards", type: "textarea", value: "Infinitely Recyclable | Flint Glass Vases\n100% Compostable | Mycelium Buffers\nSoy-Based Ink | Vegetable Dyes" }
        ]
      },
      {
        id: "climate-delivery",
        title: "Climate neutral delivery",
        type: "Stats and CTA",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "stats", label: "Stats cards", type: "textarea", value: "12k+ | Trees Planted\n100% | Offset\nNet Zero | Carbon Footprint" },
          { id: "eyebrow", label: "Section tag", type: "text", value: "Logistics" },
          { id: "heading", label: "Section heading", type: "text", value: "Climate Neutral Delivery" },
          { id: "description", label: "Delivery description", type: "textarea", value: "Our carbon footprint is tracked from farm to gate. All shipments are offset through verified carbon-offset projects." },
          { id: "ctaLabel", label: "CTA label", type: "text", value: "View Impact Report" },
          { id: "ctaHref", label: "CTA link", type: "text", value: "#" }
        ]
      }
    ]
  },
  {
    moduleId: "contact-us",
    title: "Contact Us Page",
    route: "/contact-us",
    description: "Manage contact hero, presence details, enquiry form labels, contact links, WhatsApp live concierge, and support center cards.",
    pageType: "Utility",
    records: [
      {
        id: "contact-hero",
        title: "Contact hero",
        type: "Hero section",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Section tag", type: "text", value: "Concierge Service" },
          { id: "headline", label: "H1 headline", type: "text", value: "How may we assist your journey?" },
          { id: "description", label: "Hero paragraph", type: "textarea", value: "Whether you are seeking a rare harvest or require personalized nutritional guidance, our concierge team is at your disposal." },
          { id: "image", label: "Hero image", type: "image", value: "/assets/contact_hero_shirt.png" }
        ]
      },
      {
        id: "contact-presence",
        title: "Global presence details",
        type: "Contact info",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Section heading", type: "text", value: "Global Presence" },
          { id: "storeLabel", label: "Store label", type: "text", value: "Flagship Store" },
          { id: "address", label: "Address", type: "textarea", value: "42 Savile Row,\nMayfair, London\nW1S 3QR, UK" },
          { id: "mapLabel", label: "Map link label", type: "text", value: "View on map ↗" },
          { id: "email", label: "Enquiry email", type: "text", value: "concierge@nutriharvest.com" },
          { id: "phone", label: "Phone number", type: "text", value: "+44 (0) 20 7946 0123" },
          { id: "socialLinks", label: "Social links", type: "textarea", value: "INSTAGRAM | https://instagram.com\nLINKEDIN | https://linkedin.com" }
        ]
      },
      {
        id: "contact-form",
        title: "Send a message form",
        type: "Form fields",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Form heading", type: "text", value: "Send a Message" },
          { id: "nameLabel", label: "Name label", type: "text", value: "Full Name" },
          { id: "namePlaceholder", label: "Name placeholder", type: "text", value: "E.g. Julian Thorne" },
          { id: "emailLabel", label: "Email label", type: "text", value: "Email Address" },
          { id: "emailPlaceholder", label: "Email placeholder", type: "text", value: "julian@example.com" },
          { id: "enquiryOptions", label: "Enquiry type options", type: "textarea", value: "General Concierge\nProduct Inquiry\nBulk & Custom Gifting\nFeedback" },
          { id: "messageLabel", label: "Message label", type: "text", value: "Your Message" },
          { id: "messagePlaceholder", label: "Message placeholder", type: "text", value: "How can we help cultivate your experience?" },
          { id: "submitLabel", label: "Submit label", type: "text", value: "Submit Request" }
        ]
      },
      {
        id: "contact-support",
        title: "Support center cards",
        type: "Support cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "eyebrow", label: "Section tag", type: "text", value: "Knowledge Base" },
          { id: "heading", label: "Section heading", type: "text", value: "Support Center" },
          { id: "browseLabel", label: "Browse link label", type: "text", value: "Browse All Topics" },
          { id: "cards", label: "Support cards", type: "textarea", value: "Logistics | Global carbon-neutral shipping routes and delivery timelines.\nAuthenticity | Trace your harvest back to its original organic soil.\nReturns | Our uncompromising policy on quality and artisanal satisfaction." }
        ]
      }
    ]
  },
  {
    moduleId: "cart",
    title: "Cart Page",
    route: "/cart",
    description: "Manage basket title copy, default cart items, summary labels, empty state, upsell items, trust messaging, and WhatsApp checkout text.",
    pageType: "Utility",
    records: [
      {
        id: "cart-title",
        title: "Cart title block",
        type: "Page header",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "headline", label: "H1 headline", type: "text", value: "Harvest Basket" },
          { id: "description", label: "Subtitle", type: "textarea", value: "Review your selected artisanal produce before checkout." }
        ]
      },
      {
        id: "cart-items",
        title: "Default cart items",
        type: "Cart products",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "items", label: "Default items", type: "textarea", value: "Artisanal Forest Strawberries | SEASONAL SELECTION | $18.00 | Qty 2\nCold-Pressed Heritage Olive Oil | ESTATE BOTTLED | $45.00 | Qty 1" },
          { id: "emptyTitle", label: "Empty state text", type: "text", value: "Your basket is currently empty." },
          { id: "emptyCtaLabel", label: "Empty CTA label", type: "text", value: "Browse Products" },
          { id: "emptyCtaHref", label: "Empty CTA link", type: "text", value: "/product" }
        ]
      },
      {
        id: "cart-summary",
        title: "Summary and checkout",
        type: "Summary panel",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "summaryTitle", label: "Summary title", type: "text", value: "Summary" },
          { id: "shippingLabel", label: "Shipping label", type: "text", value: "Estimated Shipping" },
          { id: "taxLabel", label: "Tax label", type: "text", value: "Tax" },
          { id: "checkoutLabel", label: "Checkout CTA label", type: "text", value: "Checkout via WhatsApp" },
          { id: "secureLabel", label: "Secure note", type: "text", value: "Secure manual checkout via WhatsApp concierge." },
          { id: "taxRate", label: "Mock tax rate percent", type: "number", value: "5.55" }
        ]
      },
      {
        id: "cart-upsell",
        title: "Upsell products",
        type: "Upsell cards",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "items", label: "Upsell items", type: "textarea", value: "Infused Fleur de Sel | $12.00\nRaw Wildflower Honey | $22.00\nStone-Baked Sourdough | $9.00" }
        ]
      }
    ]
  },
  {
    moduleId: "saved",
    title: "Saved Items Page",
    route: "/saved",
    description: "Manage saved selection items, action labels, empty states, and recommendation list content.",
    pageType: "Utility",
    records: [
      {
        id: "saved-list",
        title: "Curated selection list",
        type: "Saved products",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "items", label: "Saved items", type: "textarea", value: "DESERT HARVEST | Premium Medjool Dates | Hand-selected for honey-like sweetness. | $32.00\nDESERT HARVEST | Premium Medjool Dates | Hand-selected for honey-like sweetness. | $32.00\nDESERT HARVEST | Premium Medjool Dates | Hand-selected for honey-like sweetness. | $32.00" },
          { id: "clearAllLabel", label: "Clear all label", type: "text", value: "Clear All" },
          { id: "moveAllLabel", label: "Move all label", type: "text", value: "Move All to Basket" }
        ]
      },
      {
        id: "saved-recommendations",
        title: "Recommendation list",
        type: "Recommendations",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "heading", label: "Recommendation heading", type: "text", value: "You May Also Like" },
          { id: "items", label: "Recommendation items", type: "textarea", value: "Jumbo Cashews\nMamra Almonds\nKashmiri Walnuts\nForest Berry Mix" }
        ]
      }
    ]
  },
  {
    moduleId: "privacy-policy",
    title: "Privacy Policy Page",
    route: "/privacy-policy",
    description: "Manage privacy policy header, quick navigation, legal sections, sidebar cards, related documents, and service contact block.",
    pageType: "Policy",
    records: [
      {
        id: "privacy-header",
        title: "Policy header",
        type: "Policy hero",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "tag", label: "Governance tag", type: "text", value: "Information Governance" },
          { id: "headline", label: "H1 headline", type: "text", value: "Privacy Policy" },
          { id: "description", label: "Header description", type: "textarea", value: "Your trust is the foundation of our heritage. This policy outlines how NutriHarvest gathers, processes, and protects your information." },
          { id: "effectiveLabel", label: "Effective label", type: "text", value: "Effective Date" },
          { id: "effectiveDate", label: "Effective date", type: "text", value: "Oct 2024" }
        ]
      },
      {
        id: "privacy-sections",
        title: "Policy sections",
        type: "Legal content",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "quickNav", label: "Quick nav items", type: "textarea", value: "01 | Data Collection | data-collection\n02 | Cookie Usage | cookie-usage\n03 | Data Sharing | data-sharing\n04 | Data Security & Rights | data-rights" },
          { id: "sections", label: "Policy body sections", type: "textarea", value: "01 | Data Collection | We collect personal coordinates such as name, email, and phone descriptors.\n02 | Cookie Usage | NutriHarvest utilizes cookies and local browser storage to streamline user selections.\n03 | Data Sharing | We do not rent, sell, or disclose your data to third-party advertising companies.\n04 | Data Security & Rights | You can request access, corrections, or deletion of your profile data." }
        ]
      },
      {
        id: "privacy-sidebar",
        title: "Policy sidebar and service block",
        type: "Sidebar content",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "conciergeTitle", label: "Concierge card title", type: "text", value: "Questions regarding our terms?" },
          { id: "conciergeCopy", label: "Concierge card copy", type: "textarea", value: "Our legal concierge is available to clarify any aspect of our documentation." },
          { id: "relatedDocs", label: "Related documents", type: "textarea", value: "Terms & Conditions | /terms-condition\nCookie Statement | #cookie-statement\nAccessibility | #accessibility" },
          { id: "serviceHeading", label: "Service heading", type: "text", value: "Unrivaled Service" },
          { id: "email", label: "Contact email", type: "text", value: "concierge@nutriharvest.com" },
          { id: "phone", label: "Contact phone", type: "text", value: "1.800.HERITAGE" }
        ]
      }
    ]
  },
  {
    moduleId: "terms-condition",
    title: "Terms & Conditions Page",
    route: "/terms-condition",
    description: "Manage terms header, quick navigation, legal sections, sidebar cards, related documents, and service contact block.",
    pageType: "Policy",
    records: [
      {
        id: "terms-header",
        title: "Terms header",
        type: "Policy hero",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "tag", label: "Governance tag", type: "text", value: "Information Governance" },
          { id: "headline", label: "H1 headline", type: "text", value: "Legal Documentation" },
          { id: "description", label: "Header description", type: "textarea", value: "Welcome to NutriHarvest. These terms outline the rules and regulations for the use of our high-end artisanal estate and provisions platform." },
          { id: "effectiveLabel", label: "Effective label", type: "text", value: "Effective Date" },
          { id: "effectiveDate", label: "Effective date", type: "text", value: "Oct 2024" }
        ]
      },
      {
        id: "terms-sections",
        title: "Terms sections",
        type: "Legal content",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "quickNav", label: "Quick nav items", type: "textarea", value: "01 | Use of Site | use-of-site\n02 | Product Authenticity | product-authenticity\n03 | Intellectual Property | intellectual-property\n04 | Liability | liability" },
          { id: "sections", label: "Terms body sections", type: "textarea", value: "01 | Use of Site | You warrant that you are at least 18 years of age or supervised by a guardian.\n02 | Product Authenticity | All product descriptions and images are subject to change without notice.\n03 | Intellectual Property | All site content is the property of NutriHarvest or its suppliers.\n04 | Liability | NutriHarvest provides the site on an as-is and as-available basis." }
        ]
      },
      {
        id: "terms-sidebar",
        title: "Terms sidebar and service block",
        type: "Sidebar content",
        status: "Published",
        updatedAt: "2026-06-11",
        fields: [
          { id: "conciergeTitle", label: "Concierge card title", type: "text", value: "Questions regarding our terms?" },
          { id: "conciergeCopy", label: "Concierge card copy", type: "textarea", value: "Our legal concierge is available to clarify any aspect of our documentation." },
          { id: "relatedDocs", label: "Related documents", type: "textarea", value: "Privacy Policy | /privacy-policy\nCookie Statement | #cookie-statement\nAccessibility | #accessibility" },
          { id: "serviceHeading", label: "Service heading", type: "text", value: "Unrivaled Service" },
          { id: "email", label: "Contact email", type: "text", value: "concierge@nutriharvest.com" },
          { id: "phone", label: "Contact phone", type: "text", value: "1.800.HERITAGE" }
        ]
      }
    ]
  }
];
