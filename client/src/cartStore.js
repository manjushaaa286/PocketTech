const KEY = "pockettech_cart_v1";

export function loadCart(){
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}
export function saveCart(items){ localStorage.setItem(KEY, JSON.stringify(items)); }

export function addItem(item){
  const cart = loadCart();
  const existing = cart.find(x => x.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  saveCart(cart);
  return cart;
}

export function updateQty(id, qty){
  const cart = loadCart().map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x);
  saveCart(cart);
  return cart;
}

export function removeItem(id){
  const cart = loadCart().filter(x => x.id !== id);
  saveCart(cart);
  return cart;
}

export function clearCart(){ saveCart([]); }

export function cartTotals(cart){
  const subtotal = cart.reduce((s,x)=> s + (x.price * x.qty), 0);
  const shipping = subtotal >= 25000 ? 0 : (subtotal === 0 ? 0 : 199);
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}
