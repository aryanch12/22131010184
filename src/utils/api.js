export const shortenUrl = async (payload) => {
    // Replace this with actual API call using fetch/axios
    return payload.map((item, i) => ({
      original: item.original,
      shortened: `http://localhost:3000/${item.shortcode || 'short' + i}`,
      expiry: item.validity || 30
    }));
  };
  