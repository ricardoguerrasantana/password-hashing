function authEvents(events) {
  const p = 131;
  const m = 10 ** 9 + 7;
  const result = [];
  let hash = 0;
  events.forEach(([eventType, eventValue]) => {
    if (eventType === 'setPassword') {
      hash = calculateHash(eventValue, p, m);
    }
    if (eventType === 'authorize') {
      const value = parseInt(eventValue);
      let authResult = false;
      if (value === hash)
        authResult = true;
      for (let i = 0; i <= 127; i++) {
        const newHash = (hash * p + i) % m;
        if (newHash === value) {
          authResult = true;
          break;
        }
      }
      result.push(authResult ? 1 : 0);
    }
  });

  return result;
}

function calculateHash(password, p, m) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash * p + password.charCodeAt(i)) % m;
  }
  return hash;
}

module.exports = authEvents;