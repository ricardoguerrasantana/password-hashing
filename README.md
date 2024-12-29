# Password Hashing

A website is programming an authentication system that accepts a password if:
1. It's the correct password, **or**
2. It's the correct password with a single character appended to it.

This repository provides a JavaScript implementation of a password authentication system that uses a hashing function to process events, such as setting passwords and verifying authorization attempts.

## Problem Description

The system handles two types of events:
1. **setPassword(s):** Sets the current password to `s`.
2. **authorize(x):** Attempts to sign in with the integer `x`. Returns:
   - `1` if `x` is the hash of the current password or the hash of the current password with one additional character appended.
   - `0` otherwise.

### Hashing Function

The password hashing function used in this system is defined as:

$$ h(s) = (s[0] \times p^{(n-1)} + s[1] \times p^{(n-2)} + \dots + s[n-1]) \mod M $$

Where:
- $s[i]$ is the ASCII value of the character at index `i` in the string `s`.
- $p = 131$ (a prime number).
- $M = 10^9 + 7$ (a large prime modulus).

For example, if $s = "cAr1"$:

$$ h(s) = (f('c') \times 131^3 + f('A') \times 131^2 + f('r') \times 131^1 + f('1')) \mod (10^9 + 7) = 223691457 $$

### Example

Given the following sequence of events:

1. **setPassword("cAr1")**
2. **authorize(223691457)** - Returns `1` (matches the hash of "cAr1").
3. **authorize(303580761)** - Returns `1` (matches the hash of "cAr1a").
4. **authorize(100)** - Returns `0` (invalid hash).
5. **setPassword("d")**
6. **authorize(100)** - Returns `1` (matches the hash of "d").

The output for these events will be: `[1, 1, 0, 1]`.

### Constraints

- $2 \leq q \leq 10^5$, where $q$ is the number of events.
- $1 \leq \text{length of } s \leq 9$, where $s$ is the password.
- $0 \leq x < 10^9 + 7$, where $x$ is the integer value of an `authorize` event.
- The first event is always a `setPassword` event.
- At least one `authorize` event is guaranteed.
- Passwords consist of lowercase and uppercase English letters and digits.

## Implementation

This repository includes the following files:
- **`src/authEvents.js`**  
  Contains the implementation of the `authEvents` function, which processes the password-related events using the hashing algorithm.
  
- **`__tests__/test_authEvents.jest.js`**  
  Contains Jest test cases to verify the functionality of the `authEvents` implementation.

## Usage

### Prerequisites

- Node.js (version 16 or above)
- npm (Node Package Manager)

### Installation

1. Clone this repository:
	 ```bash
   git clone https://github.com/ricardoguerrasantana/password-hashing.git
   cd password-hashing
	```

2.  Install the dependencies:
    
    ```bash
    npm install
    ```
    

### Run Tests

To execute the tests and verify the implementation:

```bash
npm test
```

## Contributing

Contributions are welcome! If you find a bug or have an idea for a cool optimization:
- Fork the repository.
- Create a new branch for your changes.
- Submit a pull request with a detailed explanation of your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.