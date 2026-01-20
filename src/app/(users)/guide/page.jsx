// app/guide/page.js
"use client";

import { useState } from "react";
import { 
  FaUserGraduate, 
  FaFileInvoiceDollar, 
  FaCloudUploadAlt, 
  FaCheckCircle,
  FaClock,
  FaPrint,
  FaArrowRight,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaFileAlt,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaDownload,
  FaSearch,
  FaCog
} from "react-icons/fa";
import Link from "next/link";

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "ug-guide", label: "UG Enrollment" },
    { id: "pg-guide", label: "PG Enrollment" },
    { id: "faq", label: "FAQs" },
    { id: "contact", label: "Contact" },
  ];

  const processSteps = [
    {
      step: 1,
      icon: <FaUserGraduate className="text-3xl" />,
      title: "Student Verification",
      description: "Login with your university credentials to verify your student status",
      details: [
        "Ensure you have active university account",
        "Verify your registration number is correct",
        "Check your academic status is 'Active'"
      ],
      color: "from-blue-500 to-blue-600",
      duration: "2-3 minutes"
    },
    {
      step: 2,
      icon: <FaFileInvoiceDollar className="text-3xl" />,
      title: "Fee Processing",
      description: "Generate and pay your semester fee through designated banks",
      details: [
        "Download fee voucher from university portal",
        "Pay at any designated bank branch",
        "Keep the payment receipt safe",
        "Note down voucher number and bank details"
      ],
      color: "from-green-500 to-green-600",
      duration: "15-20 minutes"
    },
    {
      step: 3,
      icon: <FaCloudUploadAlt className="text-3xl" />,
      title: "Voucher Submission",
      description: "Upload paid fee voucher for verification by university",
      details: [
        "Scan or take clear photo of paid voucher",
        "Upload in JPG, PNG or PDF format (max 5MB)",
        "Enter bank details accurately",
        "Submit for verification"
      ],
      color: "from-purple-500 to-purple-600",
      duration: "5-10 minutes"
    },
    {
      step: 4,
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Verification & Enrollment",
      description: "Wait for verification and proceed to course enrollment",
      details: [
        "Verification takes 24-48 hours",
        "You'll receive email notification",
        "After approval, access enrollment forms",
        "Select courses and submit forms"
      ],
      color: "from-amber-500 to-amber-600",
      duration: "1-2 days"
    }
  ];

  const ugRequirements = [
    { title: "Registration Number", status: "Required" },
    { title: "Active Student Status", status: "Required" },
    { title: "Paid Fee Voucher", status: "Required" },
    { title: "Previous Semester Results", status: "Required" },
    { title: "No Outstanding Dues", status: "Required" },
    { title: "Valid Email & Phone", status: "Required" },
  ];

  const pgRequirements = [
    { title: "PG Registration Number", status: "Required" },
    { title: "Supervisor Approval", status: "Required" },
    { title: "Research Proposal", status: "For PhD only" },
    { title: "Coursework Completion", status: "If applicable" },
    { title: "No Academic Probation", status: "Required" },
    { title: "Department Approval", status: "Required" },
  ];

  const faqs = [
    {
      question: "How long does fee verification take?",
      answer: "Fee verification typically takes 24-48 hours during working days. During peak enrollment periods, it may take up to 72 hours."
    },
    {
      question: "What if my voucher is rejected?",
      answer: "If your voucher is rejected, you'll receive an email with specific reasons. Common issues include unclear images, incorrect bank details, or insufficient payment."
    },
    {
      question: "Can I enroll in courses before fee verification?",
      answer: "No, you must complete fee verification first. Course enrollment forms (UG-1/GS-10) will only be accessible after successful verification."
    },
    {
      question: "What is the deadline for enrollment?",
      answer: "The enrollment deadline is usually 2 weeks after the semester starts. Check the academic calendar on the university website for exact dates."
    },
    {
      question: "How do I reset my password?",
      answer: "Use the 'Forgot Password' link on the login page or contact the IT Help Desk at helpdesk@uaf.edu.pk"
    }
  ];

  const importantDates = [
    { event: "Semester Start", date: "March 15, 2024" },
    { event: "Enrollment Deadline", date: "March 29, 2024" },
    { event: "Late Enrollment (with fine)", date: "April 5, 2024" },
    { event: "Course Add/Drop Deadline", date: "April 12, 2024" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Enrollment Process Guide
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Step-by-step instructions for successful enrollment
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/feeverify"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Fee Verification
                <FaArrowRight className="ml-2" />
              </Link>
              <button
                onClick={() => document.getElementById('quick-start').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                Quick Start Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="sticky top-16 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Start Guide */}
            <section id="quick-start" className="mb-12">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <FaArrowRight className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Quick Start Guide
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Undergraduate (UG)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span>Complete fee verification first</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span>Access UG-1 form after verification</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span>Select courses (12-24 credit hours)</span>
                    </li>
                  </ul>
                  <Link
                    href="/feeverify"
                    className="mt-6 inline-flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start UG Enrollment
                  </Link>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Postgraduate (PG)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span>Complete fee verification first</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span>Access GS-10 form after verification</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span>Minimum 6 credit hours required</span>
                    </li>
                  </ul>
                  <Link
                    href="/feeverify"
                    className="mt-6 inline-flex items-center justify-center w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Start PG Enrollment
                  </Link>
                </div>
              </div>
            </section>

            {/* Detailed Process Steps */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                  <FaCog className="text-2xl text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Detailed Process Steps
                </h2>
              </div>

              <div className="space-y-6">
                {processSteps.map((step) => (
                  <div 
                    key={step.step} 
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Step Indicator */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold`}>
                          {step.step}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
                              {step.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {step.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FaClock className="mr-2" />
                            Estimated: {step.duration}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Key Points:
                          </h4>
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {step.step === 3 && (
                          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                              <FaExclamationTriangle className="mr-2" />
                              Important Note:
                            </h4>
                            <p className="text-blue-600 dark:text-blue-300">
                              Ensure voucher image is clear and all bank details are visible. 
                              Unclear submissions will be rejected and require resubmission.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements Section */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-4">
                  <FaFileAlt className="text-2xl text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Requirements & Eligibility
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UG Requirements */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FaUserGraduate className="mr-3 text-blue-500" />
                    Undergraduate Requirements
                  </h3>
                  <div className="space-y-4">
                    {ugRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">{req.title}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'Required' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PG Requirements */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FaUniversity className="mr-3 text-purple-500" />
                    Postgraduate Requirements
                  </h3>
                  <div className="space-y-4">
                    {pgRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">{req.title}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'Required' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section id="faq" className="mb-12">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                  <FaQuestionCircle className="text-2xl text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">Q</span>
                      </div>
                      {faq.question}
                    </h3>
                    <div className="ml-9 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="text-gray-600 dark:text-gray-400 flex items-start">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <span className="text-green-600 dark:text-green-400 font-bold">A</span>
                        </div>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Important Dates */}
            <div className="sticky top-32 space-y-6">
              {/* Important Dates Card */}
              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaClock className="mr-3 text-blue-500" />
                  Important Dates
                </h3>
                <div className="space-y-4">
                  {importantDates.map((date, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">{date.event}</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{date.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-green-100 dark:border-green-900/30 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaLightbulb className="mr-3 text-green-500" />
                  Pro Tips
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Complete fee verification early to avoid last-minute rush
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Keep digital copies of all documents for future reference
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Check your university email regularly for updates
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Contact help desk if verification takes more than 72 hours
                    </span>
                  </li>
                </ul>
              </div>

              {/* Download Resources */}
              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-purple-100 dark:border-purple-900/30 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaDownload className="mr-3 text-purple-500" />
                  Resources
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <FaFileAlt className="text-blue-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Fee Structure 2024</span>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <FaFileAlt className="text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Academic Calendar</span>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <FaFileAlt className="text-amber-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Course Catalog</span>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <FaFileAlt className="text-purple-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Enrollment Guidelines PDF</span>
                  </a>
                </div>
              </div>

              {/* Contact Help */}
              <div id="contact" className="bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-red-100 dark:border-red-900/30 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaPhone className="mr-3 text-red-500" />
                  Need Help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Email Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">enrollment@uaf.edu.pk</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <FaPhone className="text-green-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Phone Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">+92-41-9200161 Ext. 3303</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <FaClock className="text-amber-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Support Hours</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mon-Fri: 9AM - 4PM</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Enrollment?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Begin your fee verification now to secure your enrollment for the upcoming semester
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/feeverify"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Fee Verification
              <FaArrowRight className="ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}