// components/Footer.js
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* University Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Enrollment Portal
            </h3>
            <p className="mb-4"> University of Agriculture</p>
            <p className="text-sm">Develped by Hamna Iftikhar ❤️</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/feeverify"
                  className="hover:text-blue-400 transition-colors"
                >
                  Fee Verification
                </a>
              </li>
              <li>
                <a
                  href="/ugform"
                  className="hover:text-blue-400 transition-colors"
                >
                  UG Enrollment
                </a>
              </li>
              <li>
                <a
                  href="/gsform"
                  className="hover:text-blue-400 transition-colors"
                >
                  PG Enrollment
                </a>
              </li>
              <li>
                <a
                  href="/guide"
                  className="hover:text-blue-400 transition-colors"
                >
                  User Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: hamnaiftikhar222@gmail.com</li>
              <li>Phone: +92-329-4183797</li>
              <li>Ext: 3303 (Fee Section)</li>
              <li>Hours: 9AM - 4PM (Mon-Fri)</li>
            </ul>
          </div>

          {/* System Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              System Status
            </h4>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>All Systems Operational</span>
            </div>
            <p className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2">
            This is the digital enrollment portal of UAF.
          </p>
        </div>
      </div>
    </footer>
  );
}
