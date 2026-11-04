import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview, track } from '../lib/pixel';

export default function PixelTracker() {
  const location = useLocation();
  useEffect(() => { pageview(); }, [location.pathname, location.search]);
  return null;
}


// Product page
// track('ViewContent', { content_ids: [product.id], content_type: 'product', value: product.price, currency: 'EGP' });

// // Add to cart
// track('AddToCart', { content_ids: [product.id], value: product.price, currency: 'EGP' });

// // Checkout start
// track('InitiateCheckout', { value: total, currency: 'EGP', num_items: items.length });

// // After successful order (from your API response)
// track('Purchase', { value: order.total, currency: 'EGP' }, `order-${order.id}`);