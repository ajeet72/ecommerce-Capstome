export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-bold text-xl mb-3">
              LumaStore
            </h3>

            <p className="text-slate-600">
              Premium shopping experience with modern products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Quick Links
            </h4>

            <ul className="space-y-2 text-slate-600">
              <li>Home</li>
              <li>Cart</li>
              <li>Wishlist</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Contact
            </h4>

            <p className="text-slate-600">
              support@lumastore.com
            </p>

            <p className="text-slate-600">
              +91 9876543210
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}