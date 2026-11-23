const VIDEOVIAAI_CONFIG = {
  brandName: "VideoViaAI",
  apiEndpoint: "", // Will connect to free Cloudflare Worker proxy in Phase 3
  tiers: {
    free: {
      name: "Free",
      price: 0,
      imagesPerDay: 2,
      videosPerDay: 1,
      maxVideoSeconds: 15,
      videoQuality: "480p",
      imageQuality: "Standard",
      showAds: true
    },
    starter: {
      name: "Starter",
      price: 4.99,
      imagesPerDay: 15,
      videosPerDay: 3,
      maxVideoSeconds: 15,
      videoQuality: "720p",
      imageQuality: "High",
      showAds: false
    },
    pro: {
      name: "Pro",
      price: 9.99,
      imagesPerDay: 40,
      videosPerDay: 10,
      maxVideoSeconds: 30,
      videoQuality: "1080p",
      imageQuality: "Ultra",
      showAds: false
    },
    unlimited: {
      name: "Unlimited",
      price: 19.99,
      imagesPerDay: Infinity,
      videosPerDay: Infinity,
      maxVideoSeconds: 60,
      videoQuality: "4K",
      imageQuality: "Maximum",
      showAds: false
    }
  }
};
