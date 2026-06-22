import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-blue-500 rounded-sm" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            <span className="font-semibold text-lg tracking-tight">Navii</span>
          </div>
          <p className="text-gray-500 text-sm max-w-sm">
            Your glowing AI companion that moves with you. Making computer interaction magical again.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Product</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
            <li><a href="#safety" className="hover:text-blue-600">Safety & Trust</a></li>
            <li><a href="#" className="hover:text-blue-600">Download</a></li>
            <li><a href="#faq" className="hover:text-blue-600">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Company</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Navii Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
