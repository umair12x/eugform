"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [voucherImage, setVoucherImage] = useState(null);

  const [semesterSubjects, setSemesterSubjects] = useState({
    1: { credits: 18, status: "passed" },
    2: { credits: 18, status: "passed" },
    3: { credits: 18, status: "passed" },
    4: { credits: 18, status: "passed" },
    5: { credits: 18, status: "current" },
    6: { credits: 0, status: "upcoming" },
    7: { credits: 0, status: "upcoming" },
    8: { credits: 0, status: "upcoming" },
  });

  const [formData, setFormData] = useState({
    paidDate: "",
    bankName: "",
    bankBranch: "",
    studentName: "",
    regNo: "",
    fatherName: "",
    contact: "",
    enrollmentDate: "",
    address: "",
    currentDate: "",
    semester: "",
    degree: "",
    section: "",
  });

  // Department-wise subjects
  const departmentSubjects = {
    "BSc Agriculture": {
      5: [
        {
          code: "AG-501",
          name: "Crop Production",
          credits: 3,
          mandatory: true,
        },
        { code: "AG-502", name: "Soil Science", credits: 3, mandatory: true },
        {
          code: "AG-503",
          name: "Plant Pathology",
          credits: 3,
          mandatory: true,
        },
        { code: "AG-504", name: "Entomology", credits: 3, mandatory: true },
        {
          code: "AG-505",
          name: "Agriculture Economics",
          credits: 3,
          mandatory: false,
        },
        {
          code: "AG-506",
          name: "Irrigation Management",
          credits: 3,
          mandatory: false,
        },
        {
          code: "AG-507",
          name: "Organic Farming",
          credits: 2,
          mandatory: false,
        },
        { code: "AG-508", name: "Agri-Business", credits: 2, mandatory: false },
      ],
    },
    "BSc Horticulture": {
      5: [
        {
          code: "HT-501",
          name: "Fruit Production",
          credits: 3,
          mandatory: true,
        },
        {
          code: "HT-502",
          name: "Vegetable Production",
          credits: 3,
          mandatory: true,
        },
        { code: "HT-503", name: "Floriculture", credits: 3, mandatory: true },
        {
          code: "HT-504",
          name: "Nursery Management",
          credits: 3,
          mandatory: true,
        },
        {
          code: "HT-505",
          name: "Landscape Design",
          credits: 3,
          mandatory: false,
        },
        {
          code: "HT-506",
          name: "Post Harvest Tech",
          credits: 3,
          mandatory: false,
        },
        {
          code: "HT-507",
          name: "Medicinal Plants",
          credits: 2,
          mandatory: false,
        },
      ],
    },
    "MSc Agriculture": {
      3: [
        {
          code: "MAG-301",
          name: "Advanced Crop Science",
          credits: 4,
          mandatory: true,
        },
        {
          code: "MAG-302",
          name: "Research Methodology",
          credits: 3,
          mandatory: true,
        },
        { code: "MAG-303", name: "Biotechnology", credits: 4, mandatory: true },
        { code: "MAG-304", name: "Seminar", credits: 2, mandatory: true },
        {
          code: "MAG-305",
          name: "Advanced Soil Chemistry",
          credits: 3,
          mandatory: false,
        },
        {
          code: "MAG-306",
          name: "Climate Change",
          credits: 3,
          mandatory: false,
        },
      ],
    },
    "MSc Horticulture": {
      3: [
        {
          code: "MHT-301",
          name: "Advanced Pomology",
          credits: 4,
          mandatory: true,
        },
        {
          code: "MHT-302",
          name: "Research Methods",
          credits: 3,
          mandatory: true,
        },
        {
          code: "MHT-303",
          name: "Plant Breeding",
          credits: 4,
          mandatory: true,
        },
        { code: "MHT-304", name: "Seminar", credits: 2, mandatory: true },
        {
          code: "MHT-305",
          name: "Greenhouse Tech",
          credits: 3,
          mandatory: false,
        },
        {
          code: "MHT-306",
          name: "Tissue Culture",
          credits: 3,
          mandatory: false,
        },
      ],
    },
  };

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [extraSubjects, setExtraSubjects] = useState([]);
  const [maxCreditHours, setMaxCreditHours] = useState(24);
  const [currentSemesterCredits, setCurrentSemesterCredits] = useState(18);
  const [totalCredits, setTotalCredits] = useState(18);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    calculateTotalCredits();
  }, [selectedSubjects, extraSubjects]);

  const calculateTotalCredits = () => {
    const selectedCredits = selectedSubjects.reduce(
      (sum, subject) => sum + subject.credits,
      0
    );
    const extraCredits = extraSubjects.reduce(
      (sum, subject) => sum + subject.credits,
      0
    );
    const total = selectedCredits + extraCredits;
    setTotalCredits(total);

    if (total > maxCreditHours) {
      setWarning(
        `Warning: You cannot enroll in more than ${maxCreditHours} credit hours. Current: ${total}`
      );
    } else if (total < 12) {
      setWarning("Minimum enrollment is 12 credit hours");
    } else {
      setWarning("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset subjects when degree changes
    if (name === "degree" && step === 3) {
      setSelectedSubjects([]);
      setExtraSubjects([]);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVoucherImage(URL.createObjectURL(file));
    }
  };

  const handleSubjectToggle = (subject) => {
    const isSelected = selectedSubjects.some((s) => s.code === subject.code);

    if (isSelected) {
      setSelectedSubjects(
        selectedSubjects.filter((s) => s.code !== subject.code)
      );
    } else {
      if (subject.mandatory) {
        // For mandatory subjects, check if already at max credits
        const newTotal = totalCredits + subject.credits;
        if (newTotal > maxCreditHours) {
          setWarning(
            `Cannot add mandatory subject. Maximum ${maxCreditHours} credits exceeded.`
          );
          return;
        }
      }
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const addExtraSubject = () => {
    const newSubject = {
      id: Date.now(),
      code: `EXT-${extraSubjects.length + 1}`,
      name: "",
      credits: 3,
      isExtra: true,
    };
    setExtraSubjects([...extraSubjects, newSubject]);
  };

  const updateExtraSubject = (id, field, value) => {
    setExtraSubjects(
      extraSubjects.map((subject) =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    );
  };

  const removeExtraSubject = (id) => {
    setExtraSubjects(extraSubjects.filter((subject) => subject.id !== id));
  };

  const getAvailableSubjects = () => {
    const currentSem = parseInt(formData.semester?.match(/\d+/)?.[0]) || 5;
    const degree = formData.degree;

    if (!degree || !departmentSubjects[degree]) {
      return [];
    }

    return departmentSubjects[degree][currentSem] || [];
  };

  return (
    <main className="min-h-screen px-5 py-10 flex justify-center bg-yellow-50 dark:bg-gray-900 transition">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-yellow-100 dark:border-gray-700">
        {/* Progress Header */}
       <div className="flex flex-col gap-4 mb-8">

  {/* Progress Bar */}
  <div className="relative w-full h-2 md:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
    <div
      className={`absolute left-0 top-0 h-full bg-yellow-500 dark:bg-yellow-400 
      transition-all duration-500 ease-in-out
      ${step === 1 ? "w-1/3" : ""}
      ${step === 2 ? "w-2/3" : ""}
      ${step === 3 ? "w-full" : ""}
      `}
    />
  </div>

  {/* Step Labels */}
  <div className="flex justify-between">
    <div
      className={`font-bold text-sm md:text-lg transition-colors duration-300 ${
        step === 1
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-400 dark:text-gray-500"
      }`}
    >
      Step 1, Voucher
    </div>

    <div
      className={`font-bold text-sm md:text-lg transition-colors duration-300 ${
        step === 2
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-400 dark:text-gray-500"
      }`}
    >
      Step 2, Details
    </div>

    <div
      className={`font-bold text-sm md:text-lg transition-colors duration-300 ${
        step === 3
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-400 dark:text-gray-500"
      }`}
    >
      Step 3, Subjects
    </div>
  </div>

</div>


        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6 animate-fade">
            <label className="block text-gray-800 dark:text-gray-200 font-semibold">
              Upload Fee Voucher Picture
            </label>

            <div
              className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer 
              bg-yellow-100 dark:bg-gray-700 dark:border-gray-600 border-yellow-200"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="voucherUpload"
              />

              <label
                htmlFor="voucherUpload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FaCloudUploadAlt className="text-4xl text-yellow-600 dark:text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Click here to upload
                </span>
              </label>

              {voucherImage && (
                <img
                  src={voucherImage}
                  alt="Voucher"
                  className="mt-4 w-full rounded-lg shadow"
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                name="paidDate"
                value={formData.paidDate}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="bankBranch"
                placeholder="Bank Branch"
                value={formData.bankBranch}
                onChange={handleChange}
                className="input"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-primary ml-auto flex items-center gap-2 mt-4"
            >
              Next <FaArrowRight />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6 animate-fade">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="regNo"
                placeholder="Registration Number"
                value={formData.regNo}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="fatherName"
                placeholder="Father Name"
                value={formData.fatherName}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                className="input"
              />
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="input"
              />
              <input
                type="date"
                name="currentDate"
                value={formData.currentDate}
                onChange={handleChange}
                className="input"
              />

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Semester</option>
                <option value="Spring 2025">Spring 2025</option>
                <option value="Summer 2025">Summer 2025</option>
                <option value="Fall 2025">Fall 2025</option>
              </select>

              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Degree</option>
                <option value="BSc Agriculture">BSc Agriculture</option>
                <option value="BSc Horticulture">BSc Horticulture</option>
                <option value="MSc Agriculture">MSc Agriculture</option>
                <option value="MSc Horticulture">MSc Horticulture</option>
              </select>

              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-gray flex items-center gap-2"
              >
                <FaArrowLeft /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary flex items-center gap-2"
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Subjects Enrollment */}
        {step === 3 && (
          <div className="space-y-8 animate-fade">
            {/* Semester Progress */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
                Semester Progress
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <div
                    key={sem}
                    className={`text-center p-3 rounded-lg border ${
                      semesterSubjects[sem].status === "passed"
                        ? "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700"
                        : semesterSubjects[sem].status === "current"
                        ? "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700"
                        : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <div className="font-bold">Sem {sem}</div>
                    <div className="text-sm mt-1">
                      {semesterSubjects[sem].credits} Credits
                    </div>
                    <div className="text-xs mt-1 capitalize">
                      {semesterSubjects[sem].status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Hours Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl">
                <div className="text-sm text-blue-600 dark:text-blue-300">
                  Current Semester
                </div>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {currentSemesterCredits}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Mandatory Credits
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl">
                <div className="text-sm text-green-600 dark:text-green-300">
                  Selected Credits
                </div>
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {totalCredits}
                </div>
                <div className="text-xs text-green-700 dark:text-green-300">
                  Total Enrolled
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded-xl">
                <div className="text-sm text-red-600 dark:text-red-300">
                  Maximum Limit
                </div>
                <div className="text-2xl font-bold text-red-800 dark:text-red-200">
                  {maxCreditHours}
                </div>
                <div className="text-xs text-red-700 dark:text-red-300">
                  Credit Hours
                </div>
              </div>
            </div>

            {/* Warning Message */}
            {warning && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <FaExclamationTriangle className="text-red-500" />
                <span className="text-red-700 dark:text-red-300">
                  {warning}
                </span>
              </div>
            )}

            {/* Available Subjects */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                Available Subjects for {formData.degree || "Select Degree"} -
                Semester {formData.semester || "N/A"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getAvailableSubjects().map((subject) => (
                  <div
                    key={subject.code}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      selectedSubjects.some((s) => s.code === subject.code)
                        ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                        : "border-gray-300 dark:border-gray-600 hover:border-yellow-400"
                    }`}
                    onClick={() => handleSubjectToggle(subject)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-gray-800 dark:text-gray-200">
                          {subject.code}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {subject.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700">
                          {subject.credits} Credits
                        </span>
                        {subject.mandatory && (
                          <span className="px-2 py-1 text-xs rounded bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300">
                            Mandatory
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {selectedSubjects.some((s) => s.code === subject.code)
                        ? "✓ Selected"
                        : "Click to select"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Subjects */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  Extra Subjects
                </h3>
                <button
                  onClick={addExtraSubject}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <FaPlus /> Add Extra Subject
                </button>
              </div>

              <div className="space-y-3">
                {extraSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-4"
                  >
                    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                      <input
                        type="text"
                        placeholder="Subject Code"
                        value={subject.code}
                        onChange={(e) =>
                          updateExtraSubject(subject.id, "code", e.target.value)
                        }
                        className="input flex-1"
                      />
                      <input
                        type="text"
                        placeholder="Subject Name"
                        value={subject.name}
                        onChange={(e) =>
                          updateExtraSubject(subject.id, "name", e.target.value)
                        }
                        className="input flex-2"
                      />
                      <select
                        value={subject.credits}
                        onChange={(e) =>
                          updateExtraSubject(
                            subject.id,
                            "credits",
                            parseInt(e.target.value)
                          )
                        }
                        className="input flex-1"
                      >
                        <option value="1">1 Credit</option>
                        <option value="2">2 Credits</option>
                        <option value="3">3 Credits</option>
                        <option value="4">4 Credits</option>
                      </select>
                      <button
                        onClick={() => removeExtraSubject(subject.id)}
                        className="btn-red flex items-center gap-2"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Subjects Summary */}
            {selectedSubjects.length > 0 || extraSubjects.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">
                  Selected Subjects Summary
                </h3>
                <div className="space-y-2">
                  {selectedSubjects.map((subject) => (
                    <div
                      key={subject.code}
                      className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {subject.code} - {subject.name}
                      </span>
                      <span className="font-bold">
                        {subject.credits} Credits
                      </span>
                    </div>
                  ))}
                  {extraSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {subject.code} - {subject.name}{" "}
                        <span className="text-xs text-blue-500">(Extra)</span>
                      </span>
                      <span className="font-bold">
                        {subject.credits} Credits
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300 dark:border-gray-500">
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      Total Credits
                    </span>
                    <span className="font-bold text-lg">
                      {totalCredits} / {maxCreditHours}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="btn-gray flex items-center gap-2"
              >
                <FaArrowLeft /> Back
              </button>
              <div className="flex gap-3">
                <button className="btn-gray">Save as Draft</button>
                <button className="btn-primary">Submit Enrollment</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MultiStepForm;

// Add CSS classes if not already defined
const styles = `
.input {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
         rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
         dark:focus:ring-yellow-400 dark:focus:border-yellow-400 
         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
         transition duration-200;
}

.btn-primary {
  @apply px-6 py-3 bg-yellow-500 hover:bg-yellow-600 
         text-white font-semibold rounded-lg 
         transition duration-200 
         focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
         dark:focus:ring-offset-gray-800;
}

.btn-gray {
  @apply px-6 py-3 bg-gray-200 hover:bg-gray-300 
         text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 
         dark:text-gray-200 font-semibold rounded-lg 
         transition duration-200 
         focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
         dark:focus:ring-offset-gray-800;
}

.btn-red {
  @apply px-4 py-2 bg-red-100 hover:bg-red-200 
         text-red-700 dark:bg-red-800 dark:hover:bg-red-700 
         dark:text-red-200 font-semibold rounded-lg 
         transition duration-200 
         focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 
         dark:focus:ring-offset-gray-800;
}

.animate-fade {
  @apply animate-in fade-in duration-300;
}
`;
