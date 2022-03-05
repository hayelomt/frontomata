const storage = {
  saveItem: (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
  },
  getItem<T>(key: string): T | null {
    let data = localStorage.getItem(key);
    if (!data) return null;

    try {
      const parsed = JSON.parse(data) as T | null;

      return parsed || null;
    } catch (_) {
      return null;
    }
  },
};

export default storage;
