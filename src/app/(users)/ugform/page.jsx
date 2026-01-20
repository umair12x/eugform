"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaPrint,
  FaSave,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaPlus,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { debounce } from "lodash";

function UgForm() {
  // Degree options
  const degrees = [
    "BS Computer Science",
    "BS Information Technology",
    "BS Software Engineering",
    "BS Bioinformatics",
  ];

  // Degree schemes remain the same...
  const degreeSchemes = {
    "BS Computer Science": {
      1: [
        { code: "ENG-301", name: "COMPOSITION AND COMMUNICATION SKILLS", credits: "3(3-0)", mandatory: true },
        { code: "SSH-302", name: "PAKISTAN STUDIES", credits: "2(2-0)", mandatory: true },
        { code: "MATH-404", name: "LINEAR ALGEBRA", credits: "3(3-0)", mandatory: true },
        { code: "CS-305", name: "INTRODUCTION TO INFORMATION AND COMMUNICATION TECHNOLOGIES", credits: "3(2-1)", mandatory: true },
        { code: "PY-305", name: "BASIC ELECTRONICS", credits: "3(2-1)", mandatory: true },
        { code: "ARE-402", name: "ECONOMY OF PAKISTAN", credits: "3(3-0)", mandatory: true },
      ],
      2: [
        { code: "MATH-305", name: "CALCULUS-II", credits: "3(3-0)", mandatory: true },
        { code: "CS-306", name: "DIGITAL LOGIC DESIGN", credits: "3(2-1)", mandatory: true },
        { code: "CS-308", name: "PROGRAMMING FUNDAMENTALS", credits: "3(2-1)", mandatory: true },
        { code: "IS-401/SSH-402", name: "ISLAMIC STUDIES/ETHICS", credits: "3(3-0)", mandatory: true },
        { code: "DHL-405", name: "CONTEMPORARY ETHICS", credits: "3(3-0)", mandatory: true },
        { code: "BBA-412", name: "FINANCIAL MANAGEMENT-I", credits: "3(3-0)", mandatory: true },
      ],
      // ... rest of the degree schemes
    },
    // ... other degrees
  };

  const formCopies = [
    "CONTROLLER'S COPY-I",
    "DIRECTOR'S COPY-II", 
    "ADVISOR'S COPY-III",
    "STUDENT'S COPY-IV"
  ];

  const initialFormData = {
    degree: "BS Computer Science",
    semester: "1",
    admissionTo: "Fall 2024",
    dateOfCommencement: "",
    dateOfFirstEnrollment: "",
    registeredNo: "",
    section: "",
    studentName: "",
    fatherName: "",
    permanentAddress: "",
    phoneCell: "",
    
    // Credits completed for previous semesters
    semester1Credits: "",
    semester2Credits: "",
    semester3Credits: "",
    semester4Credits: "",
    semester5Credits: "",
    semester6Credits: "",
    semester7Credits: "",
    semester8Credits: "",
    
    // Failed/Repeat subjects
    failedSubjects: [],
    
    feePaidUpto: "",
    treasurerSignature: "",
    directorSignature: "",
    advisorSignature: "",
    studentSignature: "",
    formDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formDataCopy, setFormDataCopy] = useState(initialFormData);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [extraCourses, setExtraCourses] = useState([]);
  const [activeCopy, setActiveCopy] = useState(0);
  const [failedSubjectsOpen, setFailedSubjectsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [maxCreditHours] = useState(24);

  // Debounced save to localStorage
  const debouncedSave = useCallback(
    debounce((data) => {
      localStorage.setItem('ugFormData', JSON.stringify(data));
      localStorage.setItem('ugSelectedCourses', JSON.stringify(selectedCourses));
      localStorage.setItem('ugExtraCourses', JSON.stringify(extraCourses));
    }, 1000),
    [selectedCourses, extraCourses]
  );

  // Load from localStorage on mount
  useEffect(() => {
    const savedForm = localStorage.getItem('ugFormData');
    const savedSelected = localStorage.getItem('ugSelectedCourses');
    const savedExtra = localStorage.getItem('ugExtraCourses');
    
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
      setFormDataCopy(JSON.parse(savedForm));
    }
    if (savedSelected) setSelectedCourses(JSON.parse(savedSelected));
    if (savedExtra) setExtraCourses(JSON.parse(savedExtra));
  }, []);

  // Update formDataCopy immediately, debounce formData update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataCopy(prev => ({ ...prev, [name]: value }));
    
    // Update the actual formData after a delay
    setTimeout(() => {
      setFormData(prev => ({ ...prev, [name]: value }));
    }, 50);
    
    // Reset selected courses when degree or semester changes
    if (name === 'degree' || name === 'semester') {
      setSelectedCourses([]);
    }
    
    // Debounce localStorage save
    debouncedSave({ ...formDataCopy, [name]: value });
  };

  // Calculate total credits
  const totalCredits = useMemo(() => {
    const selectedCredits = selectedCourses.reduce((sum, course) => {
      const creditMatch = course.credits.match(/\d+/);
      return sum + (creditMatch ? parseInt(creditMatch[0]) : 0);
    }, 0);
    
    const extraCredits = extraCourses.reduce((sum, course) => {
      return sum + (parseInt(course.credits) || 0);
    }, 0);
    
    return selectedCredits + extraCredits;
  }, [selectedCourses, extraCourses]);

  const handleCourseSelection = (course) => {
    const isSelected = selectedCourses.some(c => c.code === course.code);
    const creditValue = parseInt(course.credits.match(/\d+/)?.[0] || "0");
    
    if (isSelected) {
      const updated = selectedCourses.filter(c => c.code !== course.code);
      setSelectedCourses(updated);
      localStorage.setItem('ugSelectedCourses', JSON.stringify(updated));
    } else {
      if (totalCredits + creditValue > maxCreditHours) {
        alert(`Cannot add course. Maximum ${maxCreditHours} credit hours exceeded.`);
        return;
      }
      const updated = [...selectedCourses, course];
      setSelectedCourses(updated);
      localStorage.setItem('ugSelectedCourses', JSON.stringify(updated));
    }
  };

  const addExtraCourse = () => {
    if (totalCredits >= maxCreditHours) {
      alert(`Maximum ${maxCreditHours} credit hours reached.`);
      return;
    }
    
    const newCourse = {
      id: Date.now(),
      code: "",
      name: "",
      credits: "3",
      isExtra: true,
      previousGrade: "",
    };
    const updated = [...extraCourses, newCourse];
    setExtraCourses(updated);
    localStorage.setItem('ugExtraCourses', JSON.stringify(updated));
  };

  const updateExtraCourse = (id, field, value) => {
    const updated = extraCourses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    );
    setExtraCourses(updated);
    localStorage.setItem('ugExtraCourses', JSON.stringify(updated));
  };

  const removeExtraCourse = (id) => {
    const updated = extraCourses.filter(course => course.id !== id);
    setExtraCourses(updated);
    localStorage.setItem('ugExtraCourses', JSON.stringify(updated));
  };

  const addFailedSubject = () => {
    const newSubject = {
      id: Date.now(),
      code: "",
      name: "",
      semester: "",
      grade: "F",
    };
    const updated = [...formData.failedSubjects, newSubject];
    setFormData(prev => ({ ...prev, failedSubjects: updated }));
    setFormDataCopy(prev => ({ ...prev, failedSubjects: updated }));
    localStorage.setItem('ugFormData', JSON.stringify({ ...formData, failedSubjects: updated }));
  };

  const updateFailedSubject = (id, field, value) => {
    const updated = formData.failedSubjects.map(subject =>
      subject.id === id ? { ...subject, [field]: value } : subject
    );
    setFormData(prev => ({ ...prev, failedSubjects: updated }));
    setFormDataCopy(prev => ({ ...prev, failedSubjects: updated }));
    localStorage.setItem('ugFormData', JSON.stringify({ ...formData, failedSubjects: updated }));
  };

  const removeFailedSubject = (id) => {
    const updated = formData.failedSubjects.filter(subject => subject.id !== id);
    setFormData(prev => ({ ...prev, failedSubjects: updated }));
    setFormDataCopy(prev => ({ ...prev, failedSubjects: updated }));
    localStorage.setItem('ugFormData', JSON.stringify({ ...formData, failedSubjects: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.registeredNo || !formData.fatherName) {
      alert("Please fill in all required student information.");
      return;
    }
    
    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }
    
    if (totalCredits < 12) {
      alert("Minimum enrollment is 12 credit hours.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      alert("Form submitted successfully!");
    }, 1500);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
      setFormData(initialFormData);
      setFormDataCopy(initialFormData);
      setSelectedCourses([]);
      setExtraCourses([]);
      setIsSubmitted(false);
      localStorage.removeItem('ugFormData');
      localStorage.removeItem('ugSelectedCourses');
      localStorage.removeItem('ugExtraCourses');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Get current semester courses
  const currentCourses = useMemo(() => {
    const currentSem = parseInt(formData.semester);
    return degreeSchemes[formData.degree]?.[currentSem] || [];
  }, [formData.degree, formData.semester]);

  // Header Component
  const FormHeader = () => (
    <div className="mb-6 border-b-2 border-gray-800 pb-4">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider">
          University of Agriculture, Faisalabad, Pakistan
        </h1>
        <h2 className="text-lg md:text-xl font-semibold mt-2">
          Form for listing courses to be taken in Semester {formData.semester} ({formData.admissionTo})
        </h2>
        <h3 className="text-md md:text-lg font-bold mt-1">
          Faculty of Computing and Information Technology
        </h3>
        <div className="text-sm md:text-base font-medium mt-2">
          UG-1 (Computer Science & IT Department)
        </div>
      </div>
    </div>
  );

  // Form Copy Selector
  const CopySelector = () => (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {formCopies.map((copy, index) => (
          <button
            key={index}
            onClick={() => setActiveCopy(index)}
            className={`px-3 py-1 text-sm rounded ${
              activeCopy === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {copy}
          </button>
        ))}
      </div>
      <div className="text-center mt-2 text-sm text-gray-600">
        Active Copy: {formCopies[activeCopy]}
      </div>
    </div>
  );

  // Student Information Section - Compact Layout
  const StudentInfoSection = () => (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold mb-1">DEGREE PROGRAM</label>
          <select
            name="degree"
            value={formDataCopy.degree}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
          >
            {degrees.map(degree => (
              <option key={degree} value={degree}>{degree}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">SEMESTER</label>
          <select
            name="semester"
            value={formDataCopy.semester}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">ADMISSION TO</label>
          <input
            type="text"
            name="admissionTo"
            value={formDataCopy.admissionTo}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
            placeholder="e.g., Fall 2024"
          />
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-800 text-sm mb-3">
        <tbody>
          <tr>
            <td className="border border-gray-800 p-1.5 font-semibold w-1/4">Date of Commencement</td>
            <td className="border border-gray-800 p-1">
              <input
                type="date"
                name="dateOfCommencement"
                value={formDataCopy.dateOfCommencement}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
              />
            </td>
            <td className="border border-gray-800 p-1.5 font-semibold w-1/4">Date of First Enrolment</td>
            <td className="border border-gray-800 p-1">
              <input
                type="date"
                name="dateOfFirstEnrollment"
                value={formDataCopy.dateOfFirstEnrollment}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-1.5 font-semibold">Registered No.</td>
            <td className="border border-gray-800 p-1">
              <input
                type="text"
                name="registeredNo"
                value={formDataCopy.registeredNo}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
                placeholder="Registration Number"
              />
            </td>
            <td className="border border-gray-800 p-1.5 font-semibold">Section</td>
            <td className="border border-gray-800 p-1">
              <select
                name="section"
                value={formDataCopy.section}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border border-gray-800 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-800 p-1.5 font-semibold">Student's Name</td>
            <td colSpan="3" className="border border-gray-800 p-1">
              <input
                type="text"
                name="studentName"
                value={formDataCopy.studentName}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
                placeholder="Full Name"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-1.5 font-semibold">Father's Name</td>
            <td colSpan="3" className="border border-gray-800 p-1">
              <input
                type="text"
                name="fatherName"
                value={formDataCopy.fatherName}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
                placeholder="Father's Name"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-1.5 font-semibold">Permanent Address</td>
            <td colSpan="3" className="border border-gray-800 p-1">
              <textarea
                name="permanentAddress"
                value={formDataCopy.permanentAddress}
                onChange={handleChange}
                rows="2"
                className="w-full p-1 border-none focus:outline-none text-sm resize-none"
                placeholder="Complete Address"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-1.5 font-semibold">Phone/Cell No.</td>
            <td colSpan="3" className="border border-gray-800 p-1">
              <input
                type="text"
                name="phoneCell"
                value={formDataCopy.phoneCell}
                onChange={handleChange}
                className="w-full p-1 border-none focus:outline-none text-sm"
                placeholder="Phone Number"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // Failed Subjects Section
  const FailedSubjectsSection = () => (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between p-2 bg-red-50 border border-red-300 rounded cursor-pointer"
        onClick={() => setFailedSubjectsOpen(!failedSubjectsOpen)}
      >
        <span className="text-sm font-semibold text-red-700">
          Failed/Repeat Subjects from Previous Semesters (F/D Grades)
        </span>
        {failedSubjectsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </div>
      
      {failedSubjectsOpen && (
        <div className="mt-2 p-3 border border-red-300 rounded">
          {formData.failedSubjects.length === 0 ? (
            <p className="text-sm text-gray-600">No failed subjects added.</p>
          ) : (
            formData.failedSubjects.map((subject) => (
              <div key={subject.id} className="grid grid-cols-4 gap-2 mb-2 p-2 bg-red-50 rounded">
                <input
                  type="text"
                  placeholder="Code"
                  value={subject.code}
                  onChange={(e) => updateFailedSubject(subject.id, "code", e.target.value)}
                  className="px-2 py-1 border border-red-300 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={subject.name}
                  onChange={(e) => updateFailedSubject(subject.id, "name", e.target.value)}
                  className="px-2 py-1 border border-red-300 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Semester"
                  value={subject.semester}
                  onChange={(e) => updateFailedSubject(subject.id, "semester", e.target.value)}
                  className="px-2 py-1 border border-red-300 rounded text-sm"
                />
                <div className="flex gap-1">
                  <select
                    value={subject.grade}
                    onChange={(e) => updateFailedSubject(subject.id, "grade", e.target.value)}
                    className="flex-1 px-2 py-1 border border-red-300 rounded text-sm"
                  >
                    <option value="F">F</option>
                    <option value="D">D</option>
                  </select>
                  <button
                    onClick={() => removeFailedSubject(subject.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
          
          <button
            onClick={addFailedSubject}
            className="mt-2 px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
          >
            <FaPlus size={12} /> Add Failed Subject
          </button>
        </div>
      )}
    </div>
  );

  // Credits Summary Table
  const CreditsSummaryTable = () => {
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    const currentSem = parseInt(formData.semester);
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-2 text-center bg-gray-800 text-white py-1.5">
          Credits Completed Semester Wise
        </h3>
        <div className="grid grid-cols-8 border border-gray-800">
          {semesters.map(sem => (
            <div key={sem} className="border border-gray-800 p-2 text-center">
              <div className="text-xs font-bold mb-1">SEM {sem}</div>
              {sem < currentSem ? (
                <input
                  type="number"
                  name={`semester${sem}Credits`}
                  value={formDataCopy[`semester${sem}Credits`]}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300 rounded text-center text-sm"
                  placeholder="0"
                  min="0"
                  max="24"
                />
              ) : (
                <div className="text-xs text-gray-500">Future</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Course Selection Table
  const CourseSelectionTable = () => (
    <div className="mb-6">
      <h3 className="text-sm font-bold mb-2 text-center bg-gray-800 text-white py-1.5">
        Course Selection for Semester {formData.semester}
      </h3>
      
      <div className="overflow-x-auto mb-3">
        <table className="w-full border-collapse border border-gray-800 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-800 p-1 w-8">✓</th>
              <th className="border border-gray-800 p-1">Course Code</th>
              <th className="border border-gray-800 p-1">Course Title</th>
              <th className="border border-gray-800 p-1">Credits</th>
              <th className="border border-gray-800 p-1">Type</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course, index) => {
              const isSelected = selectedCourses.some(c => c.code === course.code);
              const creditValue = parseInt(course.credits.match(/\d+/)?.[0] || "0");
              
              return (
                <tr key={index} className={isSelected ? 'bg-blue-50' : ''}>
                  <td className="border border-gray-800 p-1 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCourseSelection(course)}
                      className="h-3 w-3"
                      disabled={!isSelected && totalCredits + creditValue > maxCreditHours}
                    />
                  </td>
                  <td className="border border-gray-800 p-1 font-mono">{course.code}</td>
                  <td className="border border-gray-800 p-1">{course.name}</td>
                  <td className="border border-gray-800 p-1 text-center">{course.credits}</td>
                  <td className="border border-gray-800 p-1 text-center">
                    <span className={`px-1 py-0.5 rounded text-xs ${course.mandatory ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {course.mandatory ? 'Mandatory' : 'Optional'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Extra Courses */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Extra/Additional Courses</span>
          <button
            onClick={addExtraCourse}
            disabled={totalCredits >= maxCreditHours}
            className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
          >
            <FaPlus size={10} /> Add Extra
          </button>
        </div>
        
        {extraCourses.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-800 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-800 p-1">Code</th>
                  <th className="border border-gray-800 p-1">Name</th>
                  <th className="border border-gray-800 p-1">Credits</th>
                  <th className="border border-gray-800 p-1">Prev. Grade</th>
                  <th className="border border-gray-800 p-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {extraCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="border border-gray-800 p-1">
                      <input
                        type="text"
                        value={course.code}
                        onChange={(e) => updateExtraCourse(course.id, "code", e.target.value)}
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                        placeholder="Code"
                      />
                    </td>
                    <td className="border border-gray-800 p-1">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateExtraCourse(course.id, "name", e.target.value)}
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                        placeholder="Name"
                      />
                    </td>
                    <td className="border border-gray-800 p-1">
                      <select
                        value={course.credits}
                        onChange={(e) => updateExtraCourse(course.id, "credits", e.target.value)}
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </td>
                    <td className="border border-gray-800 p-1">
                      <select
                        value={course.previousGrade}
                        onChange={(e) => updateExtraCourse(course.id, "previousGrade", e.target.value)}
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                      >
                        <option value="">N/A</option>
                        <option value="F">F</option>
                        <option value="D">D</option>
                      </select>
                    </td>
                    <td className="border border-gray-800 p-1 text-center">
                      <button
                        onClick={() => removeExtraCourse(course.id)}
                        className="px-1.5 py-0.5 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                      >
                        <FaTrash size={10} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Credit Summary */}
      <div className="p-3 bg-gray-50 border border-gray-300 rounded">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-600">Selected Credits</div>
            <div className="text-lg font-bold">{totalCredits}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Maximum Limit</div>
            <div className="text-lg font-bold">{maxCreditHours}</div>
          </div>
          <div className={`${totalCredits >= 12 ? 'text-green-600' : 'text-red-600'}`}>
            <div className="text-xs">Status</div>
            <div className="text-lg font-bold">
              {totalCredits >= 12 ? '✓ Eligible' : '⚠ Minimum 12'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Selected Courses Summary
  const SelectedCoursesSummary = () => (
    <div className="mb-6">
      <h3 className="text-sm font-bold mb-2 text-center bg-gray-800 text-white py-1.5">
        Selected Courses Summary
      </h3>
      
      <div className="overflow-x-auto mb-2">
        <table className="w-full border-collapse border border-gray-800 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-800 p-1">Code</th>
              <th className="border border-gray-800 p-1">Course Title</th>
              <th className="border border-gray-800 p-1">Credits</th>
              <th className="border border-gray-800 p-1">Type</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses.map((course, index) => (
              <tr key={index}>
                <td className="border border-gray-800 p-1 font-mono">{course.code}</td>
                <td className="border border-gray-800 p-1">{course.name}</td>
                <td className="border border-gray-800 p-1 text-center">{course.credits}</td>
                <td className="border border-gray-800 p-1 text-center">
                  <span className="px-1 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">Regular</span>
                </td>
              </tr>
            ))}
            {extraCourses.map((course, index) => (
              <tr key={`extra-${index}`}>
                <td className="border border-gray-800 p-1 font-mono">{course.code}</td>
                <td className="border border-gray-800 p-1">{course.name}</td>
                <td className="border border-gray-800 p-1 text-center">{course.credits}</td>
                <td className="border border-gray-800 p-1 text-center">
                  <span className="px-1 py-0.5 rounded bg-green-100 text-green-700 text-xs">Extra</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td colSpan="2" className="border border-gray-800 p-1 text-right">Total Credit Hours:</td>
              <td className="border border-gray-800 p-1 text-center">{totalCredits}</td>
              <td className="border border-gray-800 p-1 text-center">
                <span className={`px-1 py-0.5 rounded text-xs ${
                  totalCredits <= maxCreditHours 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {totalCredits <= maxCreditHours ? 'Within Limit' : 'Exceeded'}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );

  // Signatures Section
  const SignaturesSection = () => (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1">Fee paid upto</label>
            <input
              type="text"
              name="feePaidUpto"
              value={formDataCopy.feePaidUpto}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
              placeholder="e.g., 31-12-2024"
            />
            <div className="text-center mt-4 text-sm font-bold">Treasurer</div>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1">Student's Signature</label>
            <input
              type="text"
              name="studentSignature"
              value={formDataCopy.studentSignature}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
              placeholder="Type name as signature"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1">Dated</label>
            <input
              type="date"
              name="formDate"
              value={formDataCopy.formDate}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
            />
            <div className="text-center mt-4">
              <div className="text-sm font-bold">DIRECTOR,</div>
              <div className="text-xs">Faculty of Computing and IT</div>
              <div className="text-sm font-bold">UAF</div>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-semibold mb-1">Advisor's Signature</label>
            <input
              type="text"
              name="advisorSignature"
              value={formDataCopy.advisorSignature}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-800 rounded text-sm"
              placeholder="Type advisor name"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white p-4 md:p-8 print:p-0">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg border border-gray-800 p-4 md:p-6 print:shadow-none print:border-0">
        <FormHeader />
        <CopySelector />
        
        <form onSubmit={handleSubmit}>
          <StudentInfoSection />
          <FailedSubjectsSection />
          <CreditsSummaryTable />
          <CourseSelectionTable />
          <SelectedCoursesSummary />
          <SignaturesSection />

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-gray-300 flex flex-wrap gap-3 justify-between print:hidden">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded text-sm flex items-center gap-2"
              >
                <FaTimesCircle /> Reset
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-sm flex items-center gap-2"
              >
                <FaPrint /> Print
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> Submit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Indicator */}
          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <div>
                  <p className="font-bold text-green-800">Form Submitted Successfully</p>
                  <p className="text-green-700">
                    Your enrollment for {formData.degree} - Semester {formData.semester} has been submitted.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Important Instructions */}
          <div className="mt-4 p-3 bg-gray-50 border border-gray-300 rounded text-xs print:hidden">
            <h4 className="font-bold mb-1 text-red-700">Important Instructions:</h4>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Maximum 24 credit hours per semester</li>
              <li>Minimum 12 credit hours required for enrollment</li>
              <li>All mandatory courses must be selected</li>
              <li>Mark all failed/repeat subjects (F/D grades)</li>
              <li>Submit before the enrollment deadline</li>
            </ul>
          </div>
        </form>
      </div>
    </main>
  );
}

export default UgForm;