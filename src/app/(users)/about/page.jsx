export const metadata = {
  title: "About eUG Form",
  description:
    "Learn more about eUG Form, a digital platform that simplifies undergraduate form submission at the University of Agriculture.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 p-10 flex justify-center items-center">
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          About eUG Form
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
          The <span className="font-semibold text-blue-600">eUG Form</span> is a
          digital platform designed to simplify the process of undergraduate
          form submission at the University of Agriculture. Traditionally,
          students had to manually fill UG forms, print fee vouchers, get tutor
          signatures, and submit hard copies on campus, which was time-consuming
          and prone to delays.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-3">
          How It Works
        </h2>
        <ul className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
          <li>
            Students log in and fill out their UG form online using an
            easy-to-use interface.
          </li>
          <li>
            The system automatically fetches the official fee voucher from the
            university’s website using web scraping technology.
          </li>
          <li>
            After payment, students can upload the paid voucher for
            verification.
          </li>
          <li>
            Tutors and department heads digitally approve the form through their
            respective dashboards.
          </li>
          <li>
            Students receive instant updates and status notifications through
            email or WhatsApp.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-3">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
          <li>Completely paperless process for UG form submission</li>
          <li>Automated fee voucher download and digital verification</li>
          <li>Role-based access for Students, Tutors, and Admins</li>
          <li>Real-time form status tracking</li>
          <li>Automatic notifications and reminders</li>
        </ul>

        <div className="mt-10 text-center">
          <p className="text-gray-600 text-lg">
            The goal of eUG Form is to save time, reduce errors, and make the
            submission process faster and smarter for every student.
          </p>
        </div>
      </div>
    </main>
  );
}
