import { useMemo, useState } from "react";
import {
  ArrowRight, Check, ChevronDown, Clock3, Grid2X2, Heart, Leaf,
  Mail, MapPin, Menu, MessageCircle, Minus, Phone, Plus, Search,
  ShoppingCart, Truck, UserRound, X
} from "lucide-react";
import { products } from "./data/products";
import type { Product } from "./types";
import { enquiryMessage, openWhatsApp } from "./utils/whatsapp";

const categories = [
  { name: "Fresh Lemons", icon: "🍋" },
  { name: "Pickles", icon: "🥫" },
  { name: "Lemon Juice", icon: "🍋" },
  { name: "Ghee", icon: "🫙" },
  { name: "Rice & Grains", icon: "🌾" },
  { name: "Spices & More", icon: "🌶️" },
  { name: "All Products", icon: "▦" }
];

type CartLine = { product: Product; quantity: number };

function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const addToCart = (product: Product) => {
    setCart(current => {
      const existing = current.find(x => x.product.id === product.id);
      if (existing) return current.map(x => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(current => current
      .map(x => x.product.id === id ? { ...x, quantity: Math.max(0, x.quantity + delta) } : x)
      .filter(x => x.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, x) => sum + x.product.price * x.quantity, 0);
  const delivery = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 80;
  const total = subtotal + delivery;
  const cartCount = cart.reduce((sum, x) => sum + x.quantity, 0);

  const featured = products.filter(p => p.featured);
  const visibleProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = selectedCategory === "All Products" || p.category === selectedCategory;
      const searchMatch = `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const orderCart = () => {
    if (!cart.length) return;
    const lines = cart.map((x, i) => `${i + 1}. ${x.product.name} - ${x.quantity} x ₹${x.product.price}/${x.product.unit} = ₹${x.product.price * x.quantity}`).join("\n");
    openWhatsApp([
      "Hello Village Pickles,",
      "",
      "I would like to place an order.",
      "",
      "Products:",
      lines,
      "",
      `Subtotal: ₹${subtotal}`,
      `Delivery: ${delivery === 0 ? "FREE" : `₹${delivery}`}`,
      `Total: ₹${total}`,
      "",
      "Please confirm my order.",
      "Thank you."
    ].join("\n"));
  };

  const jump = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site">
      <div className="announcement">
        <span></span>
        <span className="announcement-center">Fresh from our farms to your home</span>
        <a href="tel:+91 9959414445">☎ &nbsp;+91 9959414445</a>
      </div>

      <header className="header">
        <div className="brand" onClick={() => jump("home")}>
          <div className="brand-icon">🍋</div>
          <div>
            <div className="brand-name">Village Pickles</div>
            <div className="brand-tag">Pure. Natural. Traditional.</div>
          </div>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button className="active" onClick={() => jump("home")}>Home</button>
          <div className="nav-drop">
            <button onClick={() => jump("products")}>Products <ChevronDown size={14}/></button>
            <div className="dropdown">
              {categories.slice(0, -1).map(c => <button key={c.name} onClick={() => { setSelectedCategory(c.name); jump("products"); }}>{c.name}</button>)}
            </div>
          </div>
          <button onClick={() => jump("about")}>About Us</button>
          <button onClick={() => jump("farm")}>Our Farm</button>
          <button onClick={() => jump("bulk")}>Bulk Orders</button>
          <button onClick={() => jump("contact")}>Contact Us</button>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={20}/></button>
          <button className="cart-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={21}/>
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
          <button className="whatsapp-btn" onClick={() => openWhatsApp("Hello Village Pickles, I would like to know more about your products.")}>
            <MessageCircle size={18}/> Order on WhatsApp
          </button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <Search size={19}/>
          <input autoFocus value={search} onChange={e => { setSearch(e.target.value); jump("products"); }} placeholder="Search lemons, pickles, ghee, rice..." />
          <button onClick={() => {setSearch(""); setSearchOpen(false)}}><X size={18}/></button>
        </div>
      )}

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <div className="eyebrow">From Our 50 Acres</div>
            <h1>Pure Lemons,<br/><span>Pure Living</span></h1>
            <p>Fresh Lemons, Homemade Pickles, Natural Juices and More - Direct From Our Farms to Your Home</p>
            <div className="hero-features">
              <span><Leaf/>100% Natural</span>
              <span><Check/>No Preservatives</span>
              <span><Leaf/>Farm Fresh</span>
              <span><Heart/>Made with Love</span>
            </div>
            <div className="hero-actions">
              <button className="primary" onClick={() => jump("products")}>Shop Now <ArrowRight size={17}/></button>
              <button className="secondary" onClick={() => jump("farm")}>About Our Farm</button>
            </div>
          </div>
          <div className="hero-art">
            <div className="sun"></div>
            <div className="leaf-shape leaf-one"></div>
            <div className="leaf-shape leaf-two"></div>
            <div className="basket">🍋🍋🍋</div>
            <div className="jar jar-one"><div>🥫</div><small>LEMON<br/>PICKLE</small></div>
            <div className="jar jar-two"><div>🥫</div><small>SWEET<br/>PICKLE</small></div>
            <div className="juice">🍋<small>LEMON<br/>JUICE</small></div>
            <div className="lemons-bottom">🍋 🍋 🍋</div>
            <div className="hero-dots"><i></i><i className="active"></i><i></i></div>
          </div>
        </section>

        <section className="category-bar">
          {categories.map(c => (
            <button key={c.name} className={selectedCategory === c.name ? "selected" : ""} onClick={() => { setSelectedCategory(c.name); jump("products"); }}>
              <div className="category-icon">{c.icon}</div>
              <span>{c.name}</span>
            </button>
          ))}
        </section>

        <section id="products" className="section products-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Our Products</div>
              <h2>Pure. Natural. Delicious.</h2>
            </div>
            <div className="product-tools">
              <button className="view-all" onClick={() => setSelectedCategory("All Products")}>View All Products <ArrowRight size={16}/></button>
            </div>
          </div>
          <div className="product-grid">
            {(selectedCategory === "All Products" && !search ? featured : visibleProducts).map(product =>
              <ProductCard key={product.id} product={product} onAdd={addToCart}/>
            )}
          </div>
          {selectedCategory === "All Products" && !search && (
            <div className="center-action"><button className="outline-btn" onClick={() => setSelectedCategory("All Products")}>Explore More Products</button></div>
          )}
        </section>

        <section id="farm" className="farm-section">
          <div className="farm-visual">
            <div className="farm-card">
              <span>🌳</span><strong>50</strong><small>ACRES OF<br/>LEMON GARDENS</small>
            </div>
            <div className="farm-orchard">🍋 🌳 🍋 🌳 🍋</div>
          </div>
          <div className="farm-copy">
            <div className="eyebrow">Our Farm</div>
            <h2>50 Acres.<br/><span>One Promise: Quality.</span></h2>
            <p>Our lemons are grown across 50 acres of carefully maintained gardens. From cultivation to harvesting, we focus on freshness, quality and traditional values.</p>
            <div className="farm-points">
              <div><Leaf/><div><b>Farm Fresh</b><small>Freshly harvested products</small></div></div>
              <div><Truck/><div><b>Direct From Farm</b><small>Farm-to-home supply</small></div></div>
              <div><Heart/><div><b>Made With Care</b><small>Traditional food values</small></div></div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-copy">
            <div className="eyebrow">Why Choose Village Pickles?</div>
            <h2>Traditional Taste.<br/>Modern Trust.</h2>
            <div className="why-list">
              <Why icon={<Leaf/>} title="50 Acres of Lemon Gardens" text="Grown with care and natural farming methods."/>
              <Why icon={<span>🥫</span>} title="Traditional Homemade" text="Prepared using traditional village recipes."/>
              <Why icon={<Check/>} title="No Unnecessary Preservatives" text="Natural products made with care."/>
              <Why icon={<Truck/>} title="Direct From Farm" text="Farm-to-home freshness."/>
            </div>
            <button className="primary" onClick={() => jump("farm")}>Know More About Us</button>
          </div>
          <div className="about-photo">
            <div className="photo-overlay">
              <span>🍋</span>
              <b>Farm Fresh</b>
              <small>From our gardens to your table</small>
            </div>
          </div>
        </section>

        <section id="bulk" className="bulk-section">
          <div>
            <div className="eyebrow">Bulk Supply</div>
            <h2>Fresh Farm Products<br/><span>for Your Community</span></h2>
            <p>Special supply and pricing for gated communities, supermarkets, retailers, hotels, restaurants, caterers and wholesalers.</p>
            <div className="bulk-tags">
              <span>Gated Communities</span><span>Supermarkets</span><span>Wholesale</span><span>Hotels & Restaurants</span>
            </div>
            <button className="yellow-btn" onClick={() => jump("contact")}>Request Bulk Pricing <ArrowRight size={17}/></button>
          </div>
          <div className="bulk-visual">
            <div className="bulk-circle">📦</div>
            <div className="bulk-box">🍋</div>
            <div className="bulk-box two">🌾</div>
            <div className="bulk-box three">🥫</div>
          </div>
        </section>

        <section className="section village-section">
          <div className="section-heading">
            <div><div className="eyebrow">Also From Our Farm</div><h2>Selected Farm Products</h2></div>
            <button className="view-all" onClick={() => {setSelectedCategory("All Products"); jump("products")}}>View All <ArrowRight size={16}/></button>
          </div>
          <div className="mini-grid">
            {products.filter(p => ["Ghee","Rice & Grains","Spices & More"].includes(p.category)).slice(0, 6).map(p => <ProductCard key={p.id} product={p} onAdd={addToCart}/>)}
          </div>
        </section>

        <section className="trust-strip">
          <div><Leaf/><b>Farm Fresh</b><span>Freshly sourced</span></div>
          <div><Check/><b>Quality Checked</b><span>Carefully selected</span></div>
          <div><Heart/><b>Traditional</b><span>Made with care</span></div>
          <div><Truck/><b>Home Delivery</b><span>Safe & fast delivery</span></div>
          <div><MessageCircle/><b>WhatsApp Support</b><span>Quick response</span></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-info">
            <div className="eyebrow">Contact Us</div>
            <h2>We're Here<br/><span>to Help!</span></h2>
            <p>Tell us what you need and we'll send your details to our WhatsApp. Our team will get back to you.</p>
            <div className="contact-cards">
              <a href="tel:+91 9959414445"><Phone/><div><small>Call Us</small><b>+91 9959414445</b></div></a>
              <a href="https://wa.me/91+91 9959414445" target="_blank"><MessageCircle/><div><small>WhatsApp</small><b>Chat With Us</b></div></a>
              <div><Clock3/><div><small>Working Hours</small><b>Mon - Sun: 7 AM - 9 PM</b></div></div>
            </div>
          </div>
          <ContactForm/>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-name">🍋 Village Pickles</div>
            <p>From our 50 acres of lemon gardens to your table. Pure, natural and traditional products.</p>
            <div className="socials"><a href="https://wa.me/91+91 9959414445">◉</a><a href="#">f</a><a href="#">◎</a></div>
          </div>
          <FooterColumn title="Quick Links" items={["Home","About Us","Our Farm","All Products","Bulk Orders","Contact Us"]} onItem={(x) => jump(x === "Home" ? "home" : x === "About Us" ? "about" : x === "Our Farm" ? "farm" : x === "Bulk Orders" ? "bulk" : x === "Contact Us" ? "contact" : "products")}/>
          <FooterColumn title="Our Products" items={["Fresh Lemons","Pickles","Lemon Juice","Ghee","Rice & Grains","Spices & More"]} onItem={(x) => {setSelectedCategory(x); jump("products")}}/>
          <div className="footer-col"><h4>Contact Info</h4><p><UserRound/>Konda Srinivasullu Reddy</p><p><Phone/>+91 9959414445</p><p><Mail/>info.villegeforms@gmail.com</p><p><MapPin/>Gottikadu Village, Balayapalli Mandal,<br/>Thirupati District, Andhra Pradesh - 524131</p><p><Clock3/>Mon - Sun: 7:00 AM - 9:00 PM</p></div>
          <div className="footer-col newsletter"><h4>Newsletter</h4><p>Subscribe for updates and offers</p><div><input placeholder="Enter your email"/><button>Subscribe →</button></div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Village Pickles. All Rights Reserved.</span><span>Made with ❤️ in India</span></div>
      </footer>

      <button className="floating-whatsapp" onClick={() => openWhatsApp("Hello Village Pickles, I would like to order your products.")}><MessageCircle size={27}/></button>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-head"><h3>Your Cart</h3><button onClick={() => setCartOpen(false)}><X/></button></div>
            {!cart.length ? <div className="empty-cart"><ShoppingCart size={48}/><h3>Your cart is empty</h3><p>Add farm-fresh products to continue.</p><button className="primary" onClick={() => {setCartOpen(false);jump("products")}}>Shop Products</button></div> :
              <>
                <div className="cart-lines">{cart.map(x => <div className="cart-line" key={x.product.id}>
                  <img src={x.product.image} alt={x.product.name}/>
                  <div className="cart-line-info"><b>{x.product.name}</b><small>₹{x.product.price}/{x.product.unit}</small><div className="qty"><button onClick={() => updateQty(x.product.id,-1)}><Minus size={14}/></button><span>{x.quantity}</span><button onClick={() => updateQty(x.product.id,1)}><Plus size={14}/></button></div></div>
                  <strong>₹{x.product.price*x.quantity}</strong>
                </div>)}</div>
                <div className="cart-summary"><div><span>Subtotal</span><b>₹{subtotal}</b></div><div><span>Delivery</span><b>{delivery === 0 ? "FREE" : `₹${delivery}`}</b></div><div className="total"><span>Total</span><b>₹{total}</b></div><button className="whatsapp-btn wide" onClick={orderCart}><MessageCircle/> Place Order on WhatsApp</button></div>
              </>
            }
          </aside>
        </div>
      )}
    </div>
  );
}

function ProductCard({product,onAdd}:{product:Product;onAdd:(p:Product)=>void}) {
  return <article className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name}/><button className="heart"><Heart size={17}/></button></div>
    <div className="product-content"><h3>{product.name}</h3><p>{product.description}</p><div className="product-price">₹{product.price} <small>/ {product.unit}</small></div><button className="order-now" onClick={() => onAdd(product)}><ShoppingCart size={15}/> Order Now <ArrowRight size={14}/></button></div>
  </article>;
}

function Why({icon,title,text}:{icon:React.ReactNode;title:string;text:string}) {
  return <div className="why-item"><div className="why-icon">{icon}</div><div><b>{title}</b><p>{text}</p></div></div>
}

function FooterColumn({title,items,onItem}:{title:string;items:string[];onItem:(x:string)=>void}) {
  return <div className="footer-col"><h4>{title}</h4>{items.map(x=><button key={x} onClick={()=>onItem(x)}>{x}</button>)}</div>
}

function ContactForm() {
  const [sent,setSent] = useState(false);
  const [form,setForm] = useState({name:"",phone:"+91 9959414445",whatsapp:"",email:"",interest:"",quantity:"",location:"",message:""});
  const update = (key:string,value:string) => setForm({...form,[key]:value});
  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.interest) return;
    openWhatsApp(enquiryMessage({
      "Customer Name": form.name,
      "Phone Number": form.phone,
      "WhatsApp Number": form.whatsapp,
      "Email": form.email,
      "Interest": form.interest,
      "Quantity": form.quantity,
      "Delivery Location": form.location,
      "Message": form.message
    }));
    setSent(true);
  };
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Your Name *<input required value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Enter your name"/></label>
      <label>Phone Number *<input required type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="Enter phone number"/></label>
      <label>WhatsApp Number<input type="tel" value={form.whatsapp} onChange={e=>update("whatsapp",e.target.value)} placeholder="Your WhatsApp number"/></label>
      <label>Email<input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="Enter your email"/></label>
      <label>Select Interest *<select required value={form.interest} onChange={e=>update("interest",e.target.value)}><option value="">Select your interest</option>{["Fresh Lemons","Pickles","Lemon Juice","Ghee","Rice","Sugarless Rice","Nuvvulu","Yendu Mirchi","Bulk Order","Gated Community Order","Wholesale","Supermarket","Other"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Quantity<input value={form.quantity} onChange={e=>update("quantity",e.target.value)} placeholder="e.g. 20 kg"/></label>
      <label className="full">Delivery Location<input value={form.location} onChange={e=>update("location",e.target.value)} placeholder="City / Area / Pincode"/></label>
      <label className="full">Your Message<textarea rows={4} value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Type your message here..."/></label>
    </div>
    <button className="whatsapp-submit" type="submit"><MessageCircle size={19}/> Send Details on WhatsApp</button>
    {sent && <div className="success"><Check size={18}/> Thank you! Your enquiry details have been prepared for WhatsApp. Our team will contact you shortly.</div>}
    <small className="form-note">Your details are sent directly to our WhatsApp number: <b>+91 9959414445</b></small>
  </form>
}

export default App;
