// Tracks daily image & video limits per browser and resets automatically each day
const VideoViaLimits = (() => {
  const STORAGE_KEY = "videoviaai_daily_usage";
  const PLAN_KEY = "videoviaai_user_plan";

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  function getUserPlan() {
    const saved = localStorage.getItem(PLAN_KEY);
    return saved && VIDEOVIAAI_CONFIG.tiers[saved] ? saved : "free";
  }

  function getTierConfig() {
    return VIDEOVIAAI_CONFIG.tiers[getUserPlan()];
  }

  function getUsage() {
    const today = getTodayDate();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date === today) {
          return parsed;
        }
      }
    } catch (e) {
      // Reset if storage data is corrupted
    }
    const fresh = { date: today, image: 0, video: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  function getRemaining(type) {
    const tier = getTierConfig();
    const limit = type === "video" ? tier.videosPerDay : tier.imagesPerDay;
    if (limit === Infinity) return Infinity;
    const usage = getUsage();
    return Math.max(0, limit - (usage[type] || 0));
  }

  function canGenerate(type) {
    return getRemaining(type) > 0;
  }

  function recordUsage(type) {
    const usage = getUsage();
    usage[type] = (usage[type] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
    return usage;
  }

  return {
    getUserPlan,
    getTierConfig,
    getUsage,
    getRemaining,
    canGenerate,
    recordUsage
  };
})();
