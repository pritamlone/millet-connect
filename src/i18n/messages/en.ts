export const en = {
  nav: {
    home: "Home",
    marketplace: "Marketplace",
    sell: "Sell",
    orders: "Orders",
    traceability: "Traceability",
    awareness: "Awareness Hub",
    signIn: "Sign In",
    signOut: "Sign Out",
    dashboard: "Dashboard",
  },
  hero: {
    badge: "International Year of Millets Initiative",
    title: "Connecting Rural India Through",
    titleAccent: "Smart",
    titleSuffix: "Millet Supply Chains",
    subtitle:
      "Empowering farmers, ensuring transparency, and bringing authentic millet products directly from the heart of rural India to your doorstep.",
    exploreMarketplace: "Explore Marketplace",
    watchImpact: "Watch Our Impact",
    statFarmers: "Verified Farmers",
    statVillages: "Villages Covered",
    statOrders: "Monthly Orders",
  },
  language: {
    select: "Select language",
    current: "Current language",
  },
  features: {
    heading: "A Complete Digital Ecosystem",
    subheading:
      "We're building the infrastructure for India's millet revolution, empowering every stakeholder in the value chain.",
    farmerTitle: "Direct Farmer Linkage",
    farmerDesc:
      "Eliminate middlemen and connect directly with verified millet producers across India.",
    blockchainTitle: "Blockchain Traceability",
    blockchainDesc:
      "Scan QR codes to verify the complete farm-to-table journey of your millet products.",
    marketTitle: "Live Market Insights",
    marketDesc:
      "Access real-time pricing and demand trends to make informed selling and buying decisions.",
    qualityTitle: "Quality Assurance",
    qualityDesc:
      "Every product listed undergoes rigorous quality checks and origin verification.",
    logisticsTitle: "Integrated Logistics",
    logisticsDesc:
      "Seamless transport coordination from remote rural farms to urban distribution centers.",
    sustainableTitle: "Sustainable Farming",
    sustainableDesc:
      "Promoting low-water crops and organic practices for a healthier planet.",
  },
  home: {
    impactHeading: "Transforming the Millet Economy,",
    impactHeadingAccent: "One Village at a Time.",
    impactItem1: "Empowering 12,000+ farmers with digital tools.",
    impactItem2: "Transparent pricing with zero hidden commissions.",
    impactItem3: "Promoting climate-resilient agriculture.",
    statIncome: "Average Income Increase",
    statSatisfaction: "Farmer Satisfaction Rate",
    imageFieldAlt: "Millet field",
    imageProductsAlt: "Millet products",
    ctaHeading: "Ready to Join the Revolution?",
    ctaBody:
      "Whether you are a farmer looking for better prices, or a buyer seeking authentic products, MilletConnect is your gateway to a smarter supply chain.",
    ctaGetStarted: "Get Started Now",
    ctaBrowse: "Browse Products",
  },
  footer: {
    tagline:
      "Digitizing the millet supply chain to empower rural communities and promote sustainable agriculture across India.",
    ecosystem: "Ecosystem",
    farmerNetwork: "Farmer Network",
    logistics: "Logistics",
    resources: "Resources",
    milletRecipes: "Millet Recipes",
    govtSchemes: "Govt Schemes",
    agriculturalBlog: "Agricultural Blog",
    contact: "Contact",
    location: "New Delhi, India",
    copyright: "© 2024 MilletConnect. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
};

export type Messages = {
  [Section in keyof typeof en]: {
    [Key in keyof (typeof en)[Section]]: string;
  };
};
