function authEvents(events) {
  const p = 131;
  const m = 10 ** 9 + 7;
  const result = [];
  let hash = 0;
  events.forEach(event => {
    if (event[0] === 'setPassword') {
      hash = calculateHash(event[1], p, m);
    }
    if (event[0] === 'authorize') {
      let authResult = 0;
      if (event[1] == hash)
        authResult = 1;
      for (let i = 0; i < 127; i++) {
        const newHash = (hash * p + i) % m;
        if (newHash == event[1]) {
          authResult = 1;
          break;
        }
      }
      result.push(authResult);
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