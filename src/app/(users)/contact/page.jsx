export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the eUG Form support team, including Admin and TGM Tutors, for assistance with form submissions and inquiries",
};

export default function Contact() {
  return (
    <main
      className="
        min-h-screen flex items-center justify-center px-6 py-14 transition
        bg-yellow-50 dark:bg-[#0b0f14]
      "
    >
      <div
        className="
          max-w-6xl w-full rounded-2xl p-10 transition
          bg-white dark:bg-[#121821]
          shadow-xl border
          border-yellow-200 dark:border-gray-800
        "
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Contact Us
        </h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Admin */}
          <div
            className="
              flex flex-col items-center text-center p-6 rounded-xl transition
              bg-yellow-50 dark:bg-[#0f172a]
              border border-yellow-200 dark:border-gray-700
              hover:shadow-lg
            "
          >
            <img
              src="https://via.placeholder.com/120"
              alt="Admin"
              className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-yellow-200 dark:border-yellow-500/40"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Admin
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <strong>Phone:</strong> +92 300 9876543
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Email:</strong> admin@eugform.edu.pk
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-3 text-sm px-6">
              For form submission issues, account problems, or general system
              inquiries, contact the admin directly
            </p>
          </div>

          {/* TGM Tutor */}
          <div
            className="
              flex flex-col items-center text-center p-6 rounded-xl transition
              bg-yellow-50 dark:bg-[#0f172a]
              border border-yellow-200 dark:border-gray-700
              hover:shadow-lg
            "
          >
            <img
              src="https://via.placeholder.com/120"
              alt="TGM Tutor"
              className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-yellow-200 dark:border-yellow-500/40"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              TGM Tutor
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <strong>Phone:</strong> +92 312 1234567
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Email:</strong> tutor@eugform.edu.pk
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-3 text-sm px-6">
              For approval, academic verification, or signature-related
              assistance, contact your TGM tutor
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="
                  w-full rounded-xl px-4 py-3 transition outline-none
                  bg-yellow-50 dark:bg-[#0f172a]
                  border border-yellow-200 dark:border-gray-700
                  text-gray-800 dark:text-gray-200
                  focus:ring-2 focus:ring-yellow-400
                "
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="youremail@example.com"
                className="
                  w-full rounded-xl px-4 py-3 transition outline-none
                  bg-yellow-50 dark:bg-[#0f172a]
                  border border-yellow-200 dark:border-gray-700
                  text-gray-800 dark:text-gray-200
                  focus:ring-2 focus:ring-yellow-400
                "
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your feedback or queries here"
                className="
                  w-full rounded-xl px-4 py-3 transition outline-none resize-none
                  bg-yellow-50 dark:bg-[#0f172a]
                  border border-yellow-200 dark:border-gray-700
                  text-gray-800 dark:text-gray-200
                  focus:ring-2 focus:ring-yellow-400
                "
                required
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="
                  px-8 py-3 rounded-xl font-semibold transition
                  bg-yellow-500 hover:bg-yellow-600
                  text-white shadow-md
                  dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                "
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-14 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} eUG Form, University of Agriculture</p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </main>
  );
}
