export interface LocalizedText { en: string; ku: string }
export interface MenuItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string;
  category: string;
  tags: string[];
  spiceLevel: 0 | 1 | 2 | 3;
  popularity: number;
  seasonal: boolean;
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  prepTime: string;
  calories: number;
  featured: boolean;
}

export interface UserPrefs {
  likedTags: Record<string, number>; // tag -> score
  likedCategories: Record<string, number>; // category -> score
  vegPreferred: boolean | null; // null = unknown, true = veg oriented
  lastSeen: string | null; // ISO date
}

const STORAGE_KEY = 'nv_prefs_v1';

export function getDefaultPrefs(): UserPrefs {
  return {
    likedTags: {},
    likedCategories: {},
    vegPreferred: null,
    lastSeen: null,
  };
}

export function readPrefs(): UserPrefs {
  if (typeof window === 'undefined') return getDefaultPrefs();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPrefs();
    return { ...getDefaultPrefs(), ...(JSON.parse(raw) as UserPrefs) };
  } catch {
    return getDefaultPrefs();
  }
}

export function writePrefs(prefs: UserPrefs) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

export function trackView(item: MenuItem) {
  const prefs = readPrefs();
  prefs.lastSeen = new Date().toISOString();
  // Slightly bump category and tags
  prefs.likedCategories[item.category] = (prefs.likedCategories[item.category] || 0) + 1;
  item.tags.forEach((t) => {
    prefs.likedTags[t] = (prefs.likedTags[t] || 0) + 1;
  });
  // Adjust veg preference
  if (item.vegan || item.vegetarian) {
    prefs.vegPreferred = prefs.vegPreferred === null ? true : prefs.vegPreferred || true;
  }
  writePrefs(prefs);
}

export function getTopByPopularity(items: MenuItem[], count = 10): MenuItem[] {
  return [...items]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, count);
}

function timeOfDayWeight(now = new Date()): { categoryBoost: Record<string, number>; tagBoost: Record<string, number> } {
  const hour = now.getHours();
  // Simple heuristic: morning favors beverages/sweet, midday mains/salads, evening mains/soups/desserts
  if (hour < 11) {
    return { categoryBoost: { beverage: 1.2, dessert: 1.1 }, tagBoost: { caffeine: 1.3, sweet: 1.1 } };
  } else if (hour < 16) {
    return { categoryBoost: { main: 1.2, salad: 1.1 }, tagBoost: { healthy: 1.1, fresh: 1.1 } };
  } else {
    return { categoryBoost: { main: 1.15, soup: 1.1, dessert: 1.1 }, tagBoost: { comfort: 1.1, hearty: 1.1 } };
  }
}

export function recommendByPrefs(items: MenuItem[], count = 8): MenuItem[] {
  const prefs = readPrefs();
  const tod = timeOfDayWeight();

  const scored = items.map((item) => {
    let score = 0;
    // Base popularity
    score += item.popularity;

    // Preference alignment
    score += (prefs.likedCategories[item.category] || 0) * 0.8;
    item.tags.forEach((t) => {
      score += (prefs.likedTags[t] || 0) * 0.5;
    });

    // Veg orientation
    if (prefs.vegPreferred) {
      if (item.vegan) score += 1.0;
      else if (item.vegetarian) score += 0.6;
    }

    // Time-of-day boosts
    score *= tod.categoryBoost[item.category] ?? 1;
    item.tags.forEach((t) => {
      score *= tod.tagBoost[t] ?? 1;
    });

    // Seasonal slight boost
    if (item.seasonal) score += 0.5;

    return { item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.item);
}
