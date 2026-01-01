const KEY = "pockettech_cart_v1";

export function loadCart(){
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function saveCart(items){
  localStorage.setItem(KEY, JSON.stringify(items));
  // force UI to update cart count immediately
  window.dispatchEvent(new Event("pockettech:cart"));
}

export function addItem(item){
  const cart = loadCart();
  const existing = cart.find(x => x.id === item.id);

  if (existing) existing.qty = (existing.qty || 0) + 1;
  else cart.push({ ...item, qty: 1 });

  saveCart(cart);
  return cart;
}

export function updateQty(id, qty){
  const q = Number(qty);
  const cart = loadCart().map(x =>
    x.id === id ? { ...x, qty: Math.max(1, isNaN(q) ? 1 : q) } : x
  );
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
  const safe = Array.isArray(cart) ? cart : [];
  const subtotal = safe.reduce((s,x)=> s + (Number(x.price||0) * Number(x.qty||1)), 0);
  const shipping = subtotal >= 25000 ? 0 : (subtotal === 0 ? 0 : 199);
  return { subtotal, shipping, total: subtotal + shipping };
}
