"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPrint,
  FaSave,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaPlus,
  FaTrash,
  FaUserGraduate,
  FaDownload,
  FaFilePdf,
  FaCopy,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import debounce from "lodash/debounce";

function PostGraduateForm() {
  // Available degree programs
  const graduateDegrees = [
    "M.Sc. Agriculture",
    "M.Sc. Horticulture",
    "M.Sc. Computer Science",
    "M.Sc. Information Technology",
    "M.A. Economics",
    "MBA",
    "MBA (Executive)",
    "M.Com",
    "M.Ed.",
    "Ph.D. Agriculture",
    "Ph.D. Computer Science",
    "Ph.D. Economics",
  ];

  // Form copy options
  const formCopies = [
    "CONTROLLER'S COPY-I",
    "DIRECTOR'S COPY-II", 
    "ADVISOR'S COPY-III",
    "STUDENT'S COPY-IV"
  ];

  const formRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const [currentCopy, setCurrentCopy] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showGPAWarning, setShowGPAWarning] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("pdf");

  // Initial form data
  const initialFormData = {
    // Header Information
    enrollmentSemester: "Winter",
    enrollmentYear: new Date().getFullYear().toString(),
    commencementDate: "",
    degree: "",
    studentName: "",
    fatherName: "",
    registeredNo: "",
    dateOfFirstAdmission: "",
    
    // Status Selection
    status: "",
    statusType: "",
    
    // Faculty/Department
    faculty: "",
    department: "",
    
    // Credits Completed
    sem1Credits: "",
    sem2Credits: "",
    sem3Credits: "",
    sem4Credits: "",
    sem5Credits: "",
    sem6Credits: "",
    sem7Credits: "",
    sem8Credits: "",
    
    // Course Details
    courses: [
      { id: 1, courseNumber: "", title: "", credits: "", type: "Major", repeatStatus: "" },
      { id: 2, courseNumber: "", title: "", credits: "", type: "Major", repeatStatus: "" },
      { id: 3, courseNumber: "", title: "", credits: "", type: "Minor", repeatStatus: "" },
      { id: 4, courseNumber: "", title: "", credits: "", type: "Compulsory", repeatStatus: "" },
    ],
    
    // Additional Information
    cgpa: "",
    studentSignature: "",
    feesPaid: "",
    feeAssistantSignature: "",
    directorSignature: "",
    chairmanSignature: "",
    submissionDate: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState(initialFormData);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pgFormData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Debounced save to localStorage
  const saveToStorage = useCallback((dataToSave) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('pgFormData', JSON.stringify(dataToSave));
    }, 1000);
  }, []);

  // Update formData with debounced localStorage save
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Calculate total credits
  useEffect(() => {
    const total = formData.courses.reduce((sum, course) => {
      return sum + (parseInt(course.credits) || 0);
    }, 0);
    setTotalCredits(total);
  }, [formData.courses]);

  // Course change handler
  const handleCourseChange = useCallback((id, field, value) => {
    setFormData(prev => {
      const updatedCourses = prev.courses.map(course =>
        course.id === id ? { ...course, [field]: value } : course
      );
      
      const updated = {
        ...prev,
        courses: updatedCourses
      };
      
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      courseNumber: "",
      title: "",
      credits: "",
      type: "Major",
      repeatStatus: "",
    };
    setFormData(prev => {
      const updated = {
        ...prev,
        courses: [...prev.courses, newCourse]
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const removeCourse = (id) => {
    if (formData.courses.length <= 1) {
      alert("At least one course must be enrolled.");
      return;
    }
    setFormData(prev => {
      const updated = {
        ...prev,
        courses: prev.courses.filter(course => course.id !== id)
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.degree || !formData.studentName || !formData.registeredNo) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (totalCredits < 6) {
      alert("Minimum enrollment must be at least 6 credit hours.");
      return;
    }
    
    if (formData.cgpa && parseFloat(formData.cgpa) < 2.0) {
      setShowGPAWarning(true);
      if (!confirm("Your GPA is below 2.0. Continuing may lead to enrollment cancellation. Do you want to proceed?")) {
        return;
      }
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsApproved(true);
      setIsLoading(false);
      
      const submissionId = `GS10-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      localStorage.setItem('pgSubmissionId', submissionId);
      
      alert(`GS-10 Form submitted successfully!\nSubmission ID: ${submissionId}`);
    }, 1500);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
      setFormData(initialFormData);
      setIsSubmitted(false);
      setIsApproved(false);
      setShowGPAWarning(false);
      localStorage.removeItem('pgFormData');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPDF = async () => {
    if (!formRef.current) return;
    
    setIsLoading(true);
    
    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`GS10-Form-${formData.registeredNo}-${formCopies[currentCopy]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Header Component matching PDF layout
  const FormHeader = () => (
    <div className="mb-6 border-b-2 border-gray-800 pb-4">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-900">
          UNIVERSITY OF AGRICULTURE, FAISALABAD
        </h1>
        <h2 className="text-lg md:text-xl font-semibold mt-2 text-red-600">
          GS-10: POST GRADUATE ENROLLMENT FORM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold">Enrolment to Semester,</span>
              <span className="border-b border-gray-800 min-w-[80px] inline-block">
                <input
                  type="text"
                  name="enrollmentSemester"
                  value={formData.enrollmentSemester}
                  onChange={handleChange}
                  className="w-full text-center border-none bg-transparent focus:outline-none"
                />
              </span>
              <span className="font-bold">Commencing on</span>
              <span className="border-b border-gray-800 min-w-[100px] inline-block">
                <input
                  type="date"
                  name="commencementDate"
                  value={formData.commencementDate}
                  onChange={handleChange}
                  className="w-full text-center border-none bg-transparent focus:outline-none"
                />
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="font-bold">Degree</span>
              <span className="border-b border-gray-800 min-w-[200px] inline-block">
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full text-center border-none bg-transparent focus:outline-none"
                >
                  <option value="">Select Degree</option>
                  {graduateDegrees.map(degree => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Student Information Section matching PDF layout
  const StudentInfoSection = () => (
    <div className="mb-6">
      <table className="w-full border-collapse border border-gray-800 text-sm">
        <tbody>
          {/* Student Name Row */}
          <tr>
            <td className="border border-gray-800 p-2 font-bold w-1/4">Student's Name</td>
            <td className="border border-gray-800 p-1">
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none"
                placeholder="Enter full name"
              />
            </td>
            <td className="border border-gray-800 p-2 font-bold w-1/4">Father's Name</td>
            <td className="border border-gray-800 p-1">
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none"
                placeholder="Enter father's name"
              />
            </td>
          </tr>
          
          {/* Registration No Row */}
          <tr>
            <td className="border border-gray-800 p-2 font-bold">Registered No.</td>
            <td className="border border-gray-800 p-1">
              <input
                type="text"
                name="registeredNo"
                value={formData.registeredNo}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none"
                placeholder="Registration number"
              />
            </td>
            <td className="border border-gray-800 p-2 font-bold">Date of first Admission</td>
            <td className="border border-gray-800 p-1">
              <input
                type="date"
                name="dateOfFirstAdmission"
                value={formData.dateOfFirstAdmission}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none"
              />
            </td>
          </tr>
          
          {/* STATUS Section */}
          <tr>
            <td className="border border-gray-800 p-2 font-bold align-top">STATUS<br/><span className="text-xs font-normal">(Please tick the appropriate box)</span></td>
            <td colSpan="3" className="border border-gray-800 p-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { value: "regular", label: "(a) Regular Student" },
                  { value: "uniEmployee", label: "(b) Uni. Employee (Academic/Administration)" },
                  { value: "govtEmployee", label: "(c) Govt. Employee (on leave)" },
                  { value: "statutoryEmployee", label: "(d) Employee of other statutory organization (on leave)" },
                  { value: "hecNominee", label: "(e) HEC Nominee" },
                  { value: "others", label: "(f) Others" },
                ].map((status) => (
                  <div key={status.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={formData.status === status.value}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <label className="text-sm">{status.label}</label>
                  </div>
                ))}
              </div>
              
              {/* Employee Type Sub-options */}
              {formData.status === "uniEmployee" && (
                <div className="mt-2 ml-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="statusType"
                        value="fullTime"
                        checked={formData.statusType === "fullTime"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <label className="text-sm">i. Full Time (on leave)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="statusType"
                        value="partTime"
                        checked={formData.statusType === "partTime"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <label className="text-sm">ii. Part Time</label>
                    </div>
                  </div>
                </div>
              )}
            </td>
          </tr>
          
          {/* Faculty/Department Row */}
          <tr>
            <td className="border border-gray-800 p-2 font-bold">Faculty</td>
            <td className="border border-gray-800 p-1">
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none"
                placeholder="Enter faculty"
              />
            </td>
            <td className="border border-gray-800 p-2 font-bold">Department/Institute</td>
            <td className="border border-gray-800 p-1">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none"
                placeholder="Enter department"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // Credits Completed Table matching PDF layout
  const CreditsCompletedTable = () => (
    <div className="mb-6">
      <h3 className="text-center font-bold mb-2 bg-gray-800 text-white py-2">
        Credits Completed Semester Wise
      </h3>
      <div className="grid grid-cols-8 border border-gray-800">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
          <div key={sem} className="border border-gray-800 p-2 text-center">
            <div className="font-bold mb-1">SEM {sem}</div>
            <input
              type="number"
              name={`sem${sem}Credits`}
              value={formData[`sem${sem}Credits`]}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded text-center"
              placeholder="-"
              min="0"
              max="24"
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Course Enrollment Table matching PDF layout
  const CourseEnrollmentTable = () => (
    <div className="mb-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-800 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-800 p-2 text-center w-16">Course Number</th>
              <th colSpan="3" className="border border-gray-800 p-2 text-center">Title of the Course</th>
              <th className="border border-gray-800 p-2 text-center w-20">Credits</th>
              <th className="border border-gray-800 p-2 text-center w-24">Major/Minor/Compulsory<br/>Minor/Deficiency/Audit</th>
              <th className="border border-gray-800 p-2 text-center w-20">Rep. If any<br/>i.e. (I, II and III)</th>
              <th className="border border-gray-800 p-2 text-center w-16">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.courses.map((course, index) => (
              <tr key={course.id}>
                <td className="border border-gray-800 p-1">
                  <input
                    type="text"
                    value={course.courseNumber}
                    onChange={(e) => handleCourseChange(course.id, 'courseNumber', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded text-center"
                    placeholder="CS-501"
                  />
                </td>
                <td colSpan="3" className="border border-gray-800 p-1">
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => handleCourseChange(course.id, 'title', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                    placeholder="Course Title"
                  />
                </td>
                <td className="border border-gray-800 p-1">
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded text-center"
                    placeholder="3"
                    min="0"
                    max="4"
                  />
                </td>
                <td className="border border-gray-800 p-1">
                  <select
                    value={course.type}
                    onChange={(e) => handleCourseChange(course.id, 'type', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded text-center"
                  >
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    <option value="Compulsory">Compulsory</option>
                    <option value="Deficiency">Deficiency</option>
                    <option value="Audit">Audit</option>
                  </select>
                </td>
                <td className="border border-gray-800 p-1">
                  <select
                    value={course.repeatStatus}
                    onChange={(e) => handleCourseChange(course.id, 'repeatStatus', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded text-center"
                  >
                    <option value="">-</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                  </select>
                </td>
                <td className="border border-gray-800 p-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    disabled={formData.courses.length <= 1}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="border border-gray-800 p-2 text-right font-bold">
                Total Credit Hours:
              </td>
              <td className="border border-gray-800 p-2 text-center font-bold">
                {totalCredits}
              </td>
              <td colSpan="3" className="border border-gray-800 p-2 text-center">
                {totalCredits < 6 && (
                  <span className="text-red-600 text-sm">Minimum 6 credits required</span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-2">
        <button
          type="button"
          onClick={addCourse}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-1"
        >
          <FaPlus size={12} /> Add Course
        </button>
      </div>
    </div>
  );

  // Declaration Section
  const DeclarationSection = () => (
    <div className="mb-6 p-4 border border-gray-300 rounded">
      <p className="text-sm mb-4">
        <strong>Note:</strong> All columns must be filled in properly.
      </p>
      
      <p className="text-sm mb-4">
        I shall be responsible for any piece of information misreported on this GS- 10 form. I understand that it is subject to cancellation after scrutiny before receiving degree. I shall also abide by rules / regulations regarding GPA/CGPA. In case, I receive low GPA/CGPA than the required one my enrolment will be automatically cancelled. The information given above is correct to the best of my knowledge.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Current CGPA (if applicable)
          </label>
          <input
            type="number"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            step="0.01"
            min="0"
            max="4"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="e.g., 3.25"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">
            Student's Signature
          </label>
          <input
            type="text"
            name="studentSignature"
            value={formData.studentSignature}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Type full name"
          />
        </div>
      </div>
      
      {/* GPA Warning */}
      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm font-bold text-yellow-800 mb-1">Warning:</p>
        <p className="text-xs text-yellow-700">
          Admission will be cancelled if the GPA fell below the following i.e. in M.Sc/MA/MBA/MBA (Exec.)/M.Com/M.Ed. degrees 2.00, at the end of academic year i.e. Winter, Spring and Summer. If a student avails only one regular semester (Winter/Spring) must obtained CGPA of 2.00 for M.Sc/MA/MBA/MBA (Exec.)/M.Com/M.Ed. at the end of Summer Session of the same academic year to remain on roll.
        </p>
      </div>
    </div>
  );

  // Administrative Section
  const AdministrativeSection = () => (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Fees Paid</label>
          <input
            type="text"
            name="feesPaid"
            value={formData.feesPaid}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Amount/Status"
          />
          <div className="text-center mt-1 text-sm text-gray-600">Fees Assistant</div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">Submission Date</label>
          <input
            type="date"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <div className="text-center mt-1 text-sm text-gray-600">Director, Graduate Studies</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Fee Assistant Signature</label>
          <input
            type="text"
            name="feeAssistantSignature"
            value={formData.feeAssistantSignature}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Assistant Name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">(Chairman/Director)</label>
          <input
            type="text"
            name="chairmanSignature"
            value={formData.chairmanSignature}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Approving Authority"
          />
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div ref={formRef} className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-4 md:p-6">
        <FormHeader />
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {formCopies.map((copy, index) => (
              <button
                key={index}
                onClick={() => setCurrentCopy(index)}
                className={`px-3 py-1 text-sm rounded ${
                  currentCopy === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {copy}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <StudentInfoSection />
          <CreditsCompletedTable />
          <CourseEnrollmentTable />
          <DeclarationSection />
          <AdministrativeSection />

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-gray-300 flex flex-wrap gap-3 justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded flex items-center gap-2"
              >
                <FaTimesCircle /> Reset
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded flex items-center gap-2"
              >
                <FaPrint /> Print
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> Submit Enrollment
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Submission Status */}
          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <div>
                  <p className="font-bold text-green-800">Form Submitted Successfully!</p>
                  <p className="text-sm text-green-700">
                    Submission ID: {localStorage.getItem('pgSubmissionId')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

export default PostGraduateForm;