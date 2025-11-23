/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import ChatbotPage from './components/ChatbotPage';
import StorePage from './components/StorePage';
import { Product, JournalArticle, ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Special case for Chronos full page
    if (targetId === 'chronos-page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setView({ type: 'chatbot' });
      return;
    }

    // Special case for Store full page
    if (targetId === 'store-page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setView({ type: 'store' });
      return;
    }

    // If we are not home, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#09090b] font-sans text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-100">
      {view.type !== 'checkout' && view.type !== 'chatbot' && view.type !== 'store' && (
        <Navbar 
            onNavClick={handleNavClick} 
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero 
                onChronosClick={() => setView({ type: 'chatbot' })} 
                onStoreClick={() => setView({ type: 'store' })}
            />
            <ProductGrid 
                onProductClick={(p) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setView({ type: 'product', product: p });
                }} 
                onViewFullArchive={() => {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                     setView({ type: 'store' });
                }}
            />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
               // Determine where to go back to based on previous context logically
               // For simplicity here, we go to store if we came from there, but 
               // since we don't track history stack deeply, we'll default to store if it feels like a store item
               setView({ type: 'store' });
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'store' })}
            />
        )}
        
        {view.type === 'chatbot' && (
            <ChatbotPage 
                onBack={() => setView({ type: 'home' })}
            />
        )}

        {view.type === 'store' && (
            <StorePage 
                onBack={() => setView({ type: 'home' })}
                onProductClick={(p) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setView({ type: 'product', product: p });
                }}
                cartCount={cartItems.length}
                onOpenCart={() => setIsCartOpen(true)}
            />
        )}
      </main>

      {view.type !== 'checkout' && view.type !== 'chatbot' && view.type !== 'store' && <Footer onLinkClick={handleNavClick} />}
      
      {/* Keep assistant for quick access unless in full chatbot mode */}
      {view.type !== 'chatbot' && <Assistant />}
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;