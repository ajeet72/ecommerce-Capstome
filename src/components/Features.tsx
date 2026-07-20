import {
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiShield,
} from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Free Shipping",
    description:
      "Enjoy free shipping on all orders above $50 with fast and reliable delivery.",
  },
  {
    icon: FiRefreshCw,
    title: "Free Returns",
    description:
      "Not satisfied? Return your order within 30 days with no extra charges.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description:
      "Our customer support team is available anytime to help you with your shopping.",
  },
  {
    icon: FiShield,
    title: "Secure Payments",
    description:
      "Shop with confidence using encrypted and trusted payment methods.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block rounded-full bg-black text-white px-4 py-1 text-sm font-medium mb-4">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold text-slate-900">
            Everything You Need For A Better Shopping Experience
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            We focus on quality products, secure shopping, fast delivery,
            and exceptional customer service to give you the best online
            shopping experience.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white group-hover:scale-110 transition">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}