export const metadata = {
  title: "Contact Us ",
  description:
    "Get in touch with the eUG Form support team, including Admin and TGM Tutors, for assistance with form submissions and inquiries.",
};


export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Contact Us
        </h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Admin Contact */}
          <div className="flex flex-col items-center text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <img
              src="https://via.placeholder.com/120"
              alt="Admin"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold text-blue-600">Admin</h2>
            <p className="text-gray-600 mt-2">
              <strong>Phone:</strong> +92 300 9876543
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> admin@eugform.edu.pk
            </p>
            <p className="text-gray-700 mt-3 text-sm px-6">
              For form submission issues, account problems, or general system
              inquiries, contact the admin directly.
            </p>
          </div>

          {/* TGM Tutor Contact */}
          <div className="flex flex-col items-center text-center p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <img
              src="https://via.placeholder.com/120"
              alt="TGM Tutor"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold text-blue-600">TGM Tutor</h2>
            <p className="text-gray-600 mt-2">
              <strong>Phone:</strong> +92 312 1234567
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> tutor@eugform.edu.pk
            </p>
            <p className="text-gray-700 mt-3 text-sm px-6">
              For approval, academic verification, or signature-related
              assistance, contact your TGM tutor.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="youremail@example.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your feedback or queries here..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} eUG Form | University of Agriculture
          </p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </main>
  );
}
