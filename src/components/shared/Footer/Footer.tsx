import BaseInput from "../BaseInput/BaseInput";

const Footer = () => {
  return (
    <footer className="bg-background flex flex-col px-8 lg:px-12">
      <span className="w-full outline-1 outline-gray-600" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 space-y-5 gap-8 my-16 md:my-16">
          <div className="xl:col-span-2 max-w-fit">
            <h2 className="text-xl font-semibold mb-2">
              Sign up for our newsletter
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Be the first to know about our special offers, news, and updates.
            </p>
            <BaseInput placeholder="Email Address" />
          </div>
          {[1, 2, 3].map((col) => (
            <div key={col}>
            <h3 className="font-medium mb-2">
                {col === 1 ? "Customer Service" : col === 2 ? "Shop" : "About Us"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
                {col === 1
                    ? ["Contact Us", "FAQs", "Shipping & Returns", "Track Order", "Privacy Policy", "Terms of Service"].map((item, i) => (
                            <li key={i}>{item}</li>
                        ))
                    : col === 2
                    ? ["Men's Clothing", "Women's Clothing", "Accessories", "New Arrivals", "Best Sellers", "Gift Cards"].map((item, i) => (
                            <li key={i}>{item}</li>
                        ))
                    : ["Our Story", "Careers", "Sustainability", "Press", "Blog", "Affiliate Program"].map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
            </ul>
        </div>
          ))}
      </div>
      <span className="bg-black h-5 md:h-11 text-white md:text-lg font-medium justify-center flex-row-center -mx-8 lg:-mx-12">
        Copyright tte.com. All Rights Reserved
      </span>
    </footer>
  );
};

export default Footer;
