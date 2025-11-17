import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    // Validate token before restoring session
    const isTokenValid = (token) => {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;
        const payload = JSON.parse(atob(parts[1]));
        if (!payload || !payload.exp) return true; // if no exp, treat as invalid session recovery
        const now = Date.now() / 1000;
        return payload.exp > now;
      } catch {
        return false;
      }
    };
    if (storedUser && storedToken && isTokenValid(storedToken)) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      // Clear stale session to avoid defaulting to admin
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }

    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Login function
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.optionId === product.optionId);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.optionId === product.optionId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (optionId) => {
    const newCart = cart.filter(item => item.optionId !== optionId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateCartQuantity = (optionId, quantity) => {
    const newCart = cart.map(item =>
      item.optionId === optionId ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.priceSale > 0 ? item.priceSale : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Favorites functions
  const addToFavorites = (product) => {
    if (!favorites.find(item => item.id === product.id)) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (productId) => {
    const newFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;

