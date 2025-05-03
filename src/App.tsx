import React, { useState, useEffect } from 'react';
import { Address } from './types/schema';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Admin from './pages/Admin';

// --- Mock Data ---
// In a real app, this data would come from an API
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// --- Types ---
interface CartItem extends Product {
  quantity: number;
}

type View = 'products' | 'cart' | 'checkout';

// --- Shadcn/UI Component Stubs ---
// In a real Shadcn setup, you'd import these. Here we define basic stubs.
// You would typically install these via `npx shadcn-ui@latest add button card input label table ...`
const Button = ({ children, onClick, variant = 'default', size = 'default', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string, size?: string }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
      ${variant === 'destructive' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-900 text-white hover:bg-slate-800'}
      ${size === 'lg' ? 'h-11 px-8' : 'h-10 px-4 py-2'}
      ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);

const Input = ({ className = '', type = 'text', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode, htmlFor?: string, className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

// Basic Table Stubs (Adapt as needed for Shadcn's actual table components)
const Table = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <div className={`w-full ${className}`}><table className="w-full caption-bottom text-sm">{children}</table></div>;
const TableHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>;
const TableBody = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>;
const TableFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <tfoot className={`border-t bg-muted/50 font-medium [&>tr]:last:border-b-0 ${className}`}>{children}</tfoot>;
const TableRow = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>{children}</tr>;
const TableHead = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>;
const TableCell = ({ children, className = '', ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>{children}</td>;

// --- Components ---

// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showDetail, setShowDetail] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden cursor-pointer">
        <div onClick={() => setShowDetail(true)}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-48 w-full object-cover"
            // Basic fallback for placeholder images
            onError={(e) => (e.currentTarget.src = `https://placehold.co/300x200/fecaca/991b1b?text=Image+Error`)}
          />
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription className="h-10 overflow-hidden">{product.description}</CardDescription> {/* Fixed height */}
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          </CardContent>
        </div>
        <CardFooter>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }} 
            className="w-full"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
      
      {/* Product Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <pre>sku</pre>

                <h2 className="text-2xl font-bold">{product.name}</h2>
                <button 
                  onClick={() => setShowDetail(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/fecaca/991b1b?text=Image+Error`)}
                />
                
                <div>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
                  
                  <Button 
                    onClick={() => {
                      onAddToCart(product);
                      setShowDetail(false);
                    }}
                    size="lg"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Product List Component
interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

// Shopping Cart Component
interface ShoppingCartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onProceedToCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onProceedToCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground text-center">Your cart is empty.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="hidden md:table-cell">
                    <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                      className="w-16 h-8 text-center"
                    />
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => onRemoveFromCart(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-bold hidden md:table-cell">Total:</TableCell>
                 <TableCell className="text-right font-bold md:hidden" colSpan={3}>Total:</TableCell> {/* Mobile */}
                <TableCell className="text-right font-bold">${total.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </CardContent>
      {cartItems.length > 0 && (
        <CardFooter className="flex justify-end">
          <Button size="lg" onClick={onProceedToCheckout}>Proceed to Checkout</Button>
        </CardFooter>
      )}
    </Card>
  );
};

// Checkout Component
interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (details: { name: string; address: Address }) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder }) => {
  const [name, setName] = useState('');
  // Replace single address field with structured address
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
      // Enhanced validation for all address fields
      alert('Please fill in all required fields.');
      return;
    }
    onPlaceOrder({ name, address });
  };

  // Handle address field changes
  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Order Summary</h4>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-2"/>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          {/* Structured address fields */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shipping Address</h4>
            
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                type="text"
                value={address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                required
                placeholder="Street address"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  required
                  placeholder="City"
                />
              </div>
              
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  type="text"
                  value={address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  required
                  placeholder="State or province"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  type="text"
                  value={address.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  required
                  placeholder="Postal code"
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  value={address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  required
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" size="lg" className="w-full">
            Place Order
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


// --- Main App Component ---
function AppContent() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<View>('products');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Cart Logic ---
  const handleAddToCart = (productToAdd: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
    // Optionally switch to cart view after adding?
    // setCurrentView('cart');
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId); // Remove if quantity goes below 1
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // --- Checkout Logic ---
  const handlePlaceOrder = async (details: { name: string; address: Address }) => {
    try {
      const orderData = {
        userDetails: {
          name: details.name,
          address: details.address  // Send the full address structure
        },
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          priceAtTime: item.price
        })),
        subtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        tax: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();
      alert(`Order placed successfully! Order ID: ${result.orderId}`);
      setCartItems([]);
      setCurrentView('products');
    } catch (err) {
      alert('Failed to place order: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  // --- Navigation ---
  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header/Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            MyStore
          </h1>
          <Button onClick={() => window.location.href = '/admin'}>
            Admin Demo
          </Button>
          <Button onClick={() => navigateTo('cart')}>
            Cart ({cartItemCount})
          </Button>
        </nav>
      </header>

      {/* Main Content Area */}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <main className="container mx-auto px-4 py-8">
            {currentView === 'products' && (
              <>
                {isLoading && <p className="text-center">Loading products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!isLoading && !error && (
                  <ProductList products={products} onAddToCart={handleAddToCart} />
                )}
              </>
            )}
            {currentView === 'cart' && (
              <ShoppingCart
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onProceedToCheckout={() => navigateTo('checkout')}
              />
            )}
            {currentView === 'checkout' && (
              <Checkout cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />
            )}
          </main>
        } />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>&copy; 2025 MyStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
