import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaGift } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  MdStorefront,
  MdCampaign,
  MdHelpCenter,
  MdPayment,
} from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#172554] text-white mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 px-10 py-10 text-sm">
        <div>
          <h3 className="text-gray-400 mb-3 uppercase">About</h3>

          <NavLink to="/contact" className="block hover:text-gray-300">
            Contact Us
          </NavLink>

          <NavLink to="/about" className="block hover:text-gray-300">
            About Us
          </NavLink>

          <NavLink to="/careers" className="block hover:text-gray-300">
            Careers
          </NavLink>

          <p>Shopify Stories</p>
          <p>Press</p>
          <p>Corporate Information</p>
        </div>

        <div>
          <h3 className="text-gray-400 mb-3 uppercase">Group Companies</h3>
          <p>Myntra</p>
          <p>Cleartrip</p>
          <p>Shopsy</p>
        </div>

        <div>
          <h3 className="text-gray-400 mb-3 uppercase">Help</h3>

          <NavLink to="/payments" className="block hover:text-gray-300">
            Payments
          </NavLink>

          <NavLink to="/shipping" className="block hover:text-gray-300">
            Shipping
          </NavLink>

          <NavLink to="/returns" className="block hover:text-gray-300">
            Cancellation & Returns
          </NavLink>

          <NavLink to="/faq" className="block hover:text-gray-300">
            FAQ
          </NavLink>
        </div>

        <div>
          <h3 className="text-gray-400 mb-3 uppercase">Consumer Policy</h3>

          <NavLink to="/terms" className="block hover:text-gray-300">
            Terms Of Use
          </NavLink>

          <NavLink to="/security" className="block hover:text-gray-300">
            Security
          </NavLink>

          <NavLink to="/privacy" className="block hover:text-gray-300">
            Privacy
          </NavLink>

          <p>Sitemap</p>
          <p>Grievance Redressal</p>
        </div>

        <div className="lg:border-l lg:border-gray-500 lg:pl-8">
          <h3 className="text-gray-400 mb-3">Mail Us:</h3>
          <p>Shopify Internet Private Limited,</p>
          <p>Hyderabad, Telangana,</p>
          <p>India - 500001</p>

          <h3 className="text-gray-400 mt-5 mb-3">Social:</h3>
          <div className="flex gap-4 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-blue-400" />
            <FaXTwitter className="cursor-pointer hover:text-gray-300" />
            <FaYoutube className="cursor-pointer hover:text-red-500" />
            <FaInstagram className="cursor-pointer hover:text-pink-400" />
          </div>
        </div>

        <div>
          <h3 className="text-gray-400 mb-3">Registered Office Address:</h3>
          <p>Shopify Internet Private Limited,</p>
          <p>Hyderabad, Telangana, India</p>
          <p>CIN : U51109KA2026PTC066107</p>
          <p>
            Telephone: <span className="text-blue-400">044-45614700</span>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-600 px-10 py-5 flex flex-col lg:flex-row justify-between items-center gap-5 text-sm">
        <div className="flex flex-wrap gap-8">
          <p className="flex items-center gap-2">
            <MdStorefront className="text-yellow-400" /> Become a Seller
          </p>

          <p className="flex items-center gap-2">
            <MdCampaign className="text-yellow-400" /> Advertise
          </p>

          <p className="flex items-center gap-2">
            <FaGift className="text-yellow-400" /> Gift Cards
          </p>

          <NavLink to="/help" className="flex items-center gap-2">
            <MdHelpCenter className="text-yellow-400" /> Help Center
          </NavLink>
        </div>

        <p>© 2026 Shopify.com</p>

        <div className="flex items-center gap-2">
          <MdPayment className="text-yellow-400 text-xl" />
          <span className="bg-white text-blue-950 px-2 py-1 rounded text-xs font-bold">
            VISA
          </span>
          <span className="bg-white text-blue-950 px-2 py-1 rounded text-xs font-bold">
            UPI
          </span>
          <span className="bg-white text-blue-950 px-2 py-1 rounded text-xs font-bold">
            COD
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;