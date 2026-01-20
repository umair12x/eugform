// app/contact/page.js
"use client";

import { useState } from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaBuilding, 
  FaUserTie, 
  FaUserGraduate, 
  FaCode,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaHeadset,
  FaUniversity,
  FaComments,
  FaShieldAlt
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", department: "", message: "" });
  };

  // University Administration
  const administration = [
    {
      name: "Dr. Saqib (Chairman)",
      title: "Chairman, Computer Science Department",
      phone: "+92-41-9200161 Ext. 3401",
      email: "chairman.cs@uaf.edu.pk",
      office: "Room 101, CS Department",
      availability: "Mon-Wed, 10:00 AM - 2:00 PM",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: <FaUniversity />
    },
    {
      name: "Prof. Yasin Paracha (Director)",
      title: "Director, Faculty of Computing & IT",
      phone: "+92-41-9200161 Ext. 3301",
      email: "director.fcit@uaf.edu.pk",
      office: "Director Office, Admin Block",
      availability: "Tue-Thu, 9:00 AM - 1:00 PM",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: <FaUserTie />
    },
    {
      name: "Mr. Irfan (Manager)",
      title: "Manager, Student Affairs",
      phone: "+92-41-9200161 Ext. 3201",
      email: "manager.student@uaf.edu.pk",
      office: "Student Affairs Office",
      availability: "Mon-Fri, 9:00 AM - 4:00 PM",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      icon: <FaHeadset />
    }
  ];

  // TGM Teachers
  const tgmTeachers = [
    {
      name: "Dr. Salman Afsar",
      title: "Associate Professor, TGM Coordinator",
      phone: "+92-300-9876543",
      email: "salmansasar@uaf.edu.pk",
      specialization: "Software Engineering, Database Systems",
      office: "Room 205, CS Department",
      availability: "Mon-Fri, 11:00 AM - 3:00 PM",
      color: "bg-gradient-to-br from-red-500 to-red-600"
    },
    {
      name: "Dr. Kaleem Ullah",
      title: "Assistant Professor",
      phone: "+92-312-1234567",
      email: "kaleemullah@uaf.edu.pk",
      specialization: "Artificial Intelligence, Machine Learning",
      office: "Room 210, CS Department",
      availability: "Mon-Wed-Fri, 10:00 AM - 2:00 PM",
      color: "bg-gradient-to-br from-amber-500 to-amber-600"
    },
    {
      name: "Prof. Yaseen Paracha",
      title: "Professor",
      phone: "+92-333-4567890",
      email: "yaseen.paracha@uaf.edu.pk",
      specialization: "Networking, Cybersecurity",
      office: "Room 301, CS Department",
      availability: "Tue-Thu, 11:00 AM - 3:00 PM",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      name: "Dr. Imran Mumtaz",
      title: "Assistant Professor",
      phone: "+92-321-7654321",
      email: "imran.mumtaz@uaf.edu.pk",
      specialization: "Data Science, Big Data Analytics",
      office: "Room 215, CS Department",
      availability: "Mon-Thu, 9:00 AM - 1:00 PM",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600"
    }
  ];

  // Support Staff
  const supportStaff = [
    {
      name: "Control Office",
      title: "Examination & Enrollment Control",
      phone: "+92-41-9200161 Ext. 3101",
      email: "control.office@uaf.edu.pk",
      responsibility: "Examination schedules, Enrollment verification",
      office: "Ground Floor, Admin Block",
      availability: "Mon-Fri, 9:00 AM - 4:00 PM",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      name: "Dr. Nayyar Iqbal",
      title: "Academic Advisor",
      phone: "+92-41-9200161 Ext. 3202",
      email: "advisor.academic@uaf.edu.pk",
      responsibility: "Academic guidance, Course planning",
      office: "Advisor Office, Academic Block",
      availability: "Mon-Wed-Fri, 10:00 AM - 2:00 PM",
      color: "bg-gradient-to-br from-pink-500 to-pink-600"
    }
  ];

  // Developer Contact
  const developer = {
    name: "Hamna Iftikhar",
    title: "Web Develpment",
    phone: "+92-329-4183797",
    email: "hamnaiftikhar222@gmail.com",
    specialization: "Web Development",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    color: "bg-gradient-to-br from-violet-500 to-violet-600",
    icon: <FaCode />
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            University Contact Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Connect with university administration, faculty members, and support staff
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="space-y-12">
          {/* University Administration */}
          <section>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <FaUniversity className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                University Administration
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {administration.map((person, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${person.color} rounded-xl flex items-center justify-center text-white text-2xl mr-4`}>
                      {person.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{person.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{person.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{person.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaEnvelope className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{person.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaBuilding className="text-purple-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{person.office}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaClock className="text-amber-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{person.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TGM Teachers */}
          <section>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mr-4">
                <FaUserGraduate className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                TGM Teachers & Faculty
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tgmTeachers.map((teacher, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start mb-6">
                    <div className={`w-14 h-14 ${teacher.color} rounded-xl flex items-center justify-center text-white text-xl mr-4 flex-shrink-0`}>
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{teacher.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{teacher.title}</p>
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {teacher.specialization}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{teacher.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaEnvelope className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{teacher.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaBuilding className="text-purple-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{teacher.office}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaClock className="text-amber-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{teacher.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Support Staff */}
          <section>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl mr-4">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Support Staff & Offices
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportStaff.map((staff, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start mb-6">
                    <div className={`w-14 h-14 ${staff.color} rounded-xl flex items-center justify-center text-white text-xl mr-4 flex-shrink-0`}>
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{staff.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{staff.title}</p>
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {staff.responsibility}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{staff.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaEnvelope className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{staff.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaBuilding className="text-purple-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{staff.office}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaClock className="text-amber-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{staff.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Developer Contact */}
          <section>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl mr-4">
                <FaCode className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Technical Support & Development
              </h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-violet-200 dark:border-violet-900/30 p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-20 h-20 ${developer.color} rounded-xl flex items-center justify-center text-white text-3xl mr-6`}>
                    {developer.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{developer.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{developer.title}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{developer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-green-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{developer.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaBuilding className="text-purple-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Office</p>
                        <p className="font-medium text-gray-900 dark:text-white">{developer.office}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-amber-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
                        <p className="font-medium text-gray-900 dark:text-white">{developer.availability}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Technical Support Areas:</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    System errors, Login issues, Form submission problems, 
                    Browser compatibility, Mobile app support, Feature requests
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Form Section */}
        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-8 text-white text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Send a Message</h2>
              <p className="text-blue-100">
                Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl">
                  <p className="text-green-700 dark:text-green-400 font-medium">
                    ✓ Message sent successfully! We'll contact you shortly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="youremail@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Select Department</option>
                      <option value="administration">Administration</option>
                      <option value="academic">Academic Affairs</option>
                      <option value="faculty">Faculty</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                    <FaMapMarkerAlt className="inline mr-2" />
                    University of Agriculture, Faisalabad
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* University Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-6 text-center">
            <FaUniversity className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">University Address</h3>
            <p className="text-gray-600 dark:text-gray-400">
              University Road<br />
              Faisalabad, Punjab<br />
              Pakistan 38000
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-green-100 dark:border-green-900/30 p-6 text-center">
            <FaClock className="text-4xl text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Office Hours</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday: 9:00 AM - 4:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM<br />
              Sunday: Closed
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-purple-100 dark:border-purple-900/30 p-6 text-center">
            <FaComments className="text-4xl text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Emergency Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              IT Help Desk: +92-41-9200161 Ext. 3501<br />
              Student Affairs: +92-41-9200161 Ext. 3201<br />
              Security: +92-41-9200161 Ext. 1000
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} University of Agriculture, Faisalabad. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            This contact directory is for official university communication only.
          </p>
        </div>
      </div>
    </main>
  );
}