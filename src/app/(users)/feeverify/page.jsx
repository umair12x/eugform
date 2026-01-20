"use client";
import React, { useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaFileInvoiceDollar,
  FaUniversity,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaIdCard,
  FaPrint,
  FaHistory,
  FaEnvelope,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

function FeeVerificationSystem() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [requestStatus, setRequestStatus] = useState("new"); // new, submitted, pending, approved, rejected
  const [requestId, setRequestId] = useState("");
  const [verificationHistory, setVerificationHistory] = useState([]);

  const [formData, setFormData] = useState({
    // Step 1: Student Information
    registrationNumber: "",
    studentType: "", // undergraduate or postgraduate
    studentName: "",
    fatherName: "",
    degreeProgram: "",
    semester: "",
    
    // Step 2: Fee Details
    feeAmount: "",
    feeType: "regular", // regular, late, recheck, other
    boarderStatus: "non-boarder", // boarder or non-boarder
    semesterNumber: "",
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    
    // Step 3: Bank & Payment Details
    bankName: "",
    bankBranch: "",
    voucherNumber: "",
    voucherDate: "",
    paymentDate: "",
    transactionId: "",
    
    // File Upload
    voucherImage: null,
    voucherPreview: "",
    
    // Additional Information
    remarks: "",
    contactNumber: "",
    email: "",
    
    // System generated
    submissionDate: new Date().toISOString().split('T')[0],
    requestStatus: "pending",
    assignedTo: "Fee Section Department",
    estimatedProcessingTime: "3-5 working days",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Sample verification history
  useEffect(() => {
    // Generate a random request ID
    const generatedId = `UAF-FV-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestId(generatedId);
    
    // Sample history data
    setVerificationHistory([
      {
        id: 1,
        semester: "Fall 2023",
        amount: "45,000",
        status: "approved",
        date: "2023-09-15",
        voucherNo: "V-789012",
      },
      {
        id: 2,
        semester: "Spring 2023",
        amount: "42,000",
        status: "approved",
        date: "2023-03-10",
        voucherNo: "V-654321",
      },
      {
        id: 3,
        semester: "Fall 2022",
        amount: "40,000",
        status: "approved",
        date: "2022-09-20",
        voucherNo: "V-321098",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          voucherImage: "Only JPG, PNG or PDF files are allowed"
        }));
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          voucherImage: "File size should be less than 5MB"
        }));
        return;
      }
      
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        voucherImage: file,
        voucherPreview: previewUrl
      }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.registrationNumber.trim()) {
      errors.registrationNumber = "Registration number is required";
    }
    if (!formData.studentType) {
      errors.studentType = "Please select student type";
    }
    if (!formData.studentName.trim()) {
      errors.studentName = "Student name is required";
    }
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.feeAmount || parseFloat(formData.feeAmount) <= 0) {
      errors.feeAmount = "Valid fee amount is required";
    }
    if (!formData.semesterNumber) {
      errors.semesterNumber = "Semester number is required";
    }
    if (!formData.boarderStatus) {
      errors.boarderStatus = "Please select boarder status";
    }
    return errors;
  };

  const validateStep3 = () => {
    const errors = {};
    if (!formData.bankName.trim()) {
      errors.bankName = "Bank name is required";
    }
    if (!formData.bankBranch.trim()) {
      errors.bankBranch = "Bank branch is required";
    }
    if (!formData.voucherNumber.trim()) {
      errors.voucherNumber = "Voucher number is required";
    }
    if (!formData.voucherDate) {
      errors.voucherDate = "Voucher date is required";
    }
    if (!formData.voucherImage) {
      errors.voucherImage = "Fee voucher image is required";
    }
    return errors;
  };

  const handleNext = () => {
    let errors = {};
    
    if (step === 1) {
      errors = validateStep1();
    } else if (step === 2) {
      errors = validateStep2();
    } else if (step === 3) {
      errors = validateStep3();
    }
    
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRequestStatus("submitted");
      setIsLoading(false);
      
      // Store in localStorage (simulate database)
      const requests = JSON.parse(localStorage.getItem('feeVerificationRequests') || '[]');
      const newRequest = {
        ...formData,
        id: requestId,
        submittedAt: new Date().toISOString(),
        status: "pending",
      };
      requests.push(newRequest);
      localStorage.setItem('feeVerificationRequests', JSON.stringify(requests));
    }, 2000);
  };

  const handleProceedToForm = () => {
    if (formData.studentType === "undergraduate") {
      router.push('/ugform');
    } else if (formData.studentType === "postgraduate") {
      router.push('/gsform');
    }
  };

  const handleCheckStatus = () => {
    // In real app, this would check from backend
    setRequestStatus("pending");
  };

  const handleNewRequest = () => {
    setStep(1);
    setRequestStatus("new");
    setFormData({
      registrationNumber: formData.registrationNumber,
      studentType: formData.studentType,
      studentName: "",
      fatherName: "",
      degreeProgram: "",
      semester: "",
      feeAmount: "",
      feeType: "regular",
      boarderStatus: "non-boarder",
      semesterNumber: "",
      academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      bankName: "",
      bankBranch: "",
      voucherNumber: "",
      voucherDate: "",
      paymentDate: "",
      transactionId: "",
      voucherImage: null,
      voucherPreview: "",
      remarks: "",
      contactNumber: "",
      email: "",
      submissionDate: new Date().toISOString().split('T')[0],
      requestStatus: "pending",
      assignedTo: "Fee Section Department",
      estimatedProcessingTime: "3-5 working days",
    });
  };

  // Status Indicator Component
  const StatusIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              step >= stepNumber
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 text-gray-300'
            }`}>
              {stepNumber}
            </div>
            <span className="text-xs mt-2 font-medium">
              {stepNumber === 1 && 'Student Info'}
              {stepNumber === 2 && 'Fee Details'}
              {stepNumber === 3 && 'Payment Info'}
              {stepNumber === 4 && 'Submit'}
            </span>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        <div className={`absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-300 -z-10 ${
          step === 2 ? 'w-1/3' : step === 3 ? 'w-2/3' : step >= 4 ? 'w-full' : 'w-0'
        }`}></div>
      </div>
    </div>
  );

  // Step 1: Student Information
  const Step1Form = () => (
    <div className="space-y-6 animate-fade">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-bold text-blue-800 flex items-center gap-2">
          <FaIdCard /> Student Information
        </h3>
        <p className="text-sm text-blue-600 mt-1">
          Please provide your registration details to verify your student status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Registration Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.registrationNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 2022-ag-1234"
          />
          {validationErrors.registrationNumber && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.registrationNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Student Type <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, studentType: "undergraduate" }));
                if (validationErrors.studentType) {
                  setValidationErrors(prev => ({ ...prev, studentType: "" }));
                }
              }}
              className={`px-4 py-3 border rounded-lg flex flex-col items-center justify-center transition ${
                formData.studentType === "undergraduate"
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <FaUniversity className="text-xl mb-2" />
              <span className="font-medium">Undergraduate</span>
              <span className="text-xs text-gray-500">UG Programs</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, studentType: "postgraduate" }));
                if (validationErrors.studentType) {
                  setValidationErrors(prev => ({ ...prev, studentType: "" }));
                }
              }}
              className={`px-4 py-3 border rounded-lg flex flex-col items-center justify-center transition ${
                formData.studentType === "postgraduate"
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <FaUserTie className="text-xl mb-2" />
              <span className="font-medium">Postgraduate</span>
              <span className="text-xs text-gray-500">PG Programs</span>
            </button>
          </div>
          {validationErrors.studentType && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.studentType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Student Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.studentName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Full Name"
          />
          {validationErrors.studentName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.studentName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Father's Name
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Father's Name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Degree Program
          </label>
          <select
            name="degreeProgram"
            value={formData.degreeProgram}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Degree Program</option>
            <option value="BSc Agriculture">BSc Agriculture</option>
            <option value="BSc Computer Science">BSc Computer Science</option>
            <option value="BSc IT">BSc Information Technology</option>
            <option value="MBA">MBA</option>
            <option value="MSc Agriculture">MSc Agriculture</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Current Semester
          </label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <div className="text-sm text-gray-600">
          <p>All fields marked with <span className="text-red-600">*</span> are required.</p>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition"
        >
          Next: Fee Details <FaArrowRight />
        </button>
      </div>
    </div>
  );

  // Step 2: Fee Details
  const Step2Form = () => (
    <div className="space-y-6 animate-fade">
      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <h3 className="font-bold text-green-800 flex items-center gap-2">
          <FaMoneyBillWave /> Fee Payment Details
        </h3>
        <p className="text-sm text-green-600 mt-1">
          Provide details about your fee payment for the current semester.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Semester Number <span className="text-red-600">*</span>
          </label>
          <select
            name="semesterNumber"
            value={formData.semesterNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.semesterNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
          {validationErrors.semesterNumber && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.semesterNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Academic Year
          </label>
          <input
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 2024-2025"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Fee Amount (PKR) <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">Rs.</span>
            <input
              type="number"
              name="feeAmount"
              value={formData.feeAmount}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.feeAmount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
          </div>
          {validationErrors.feeAmount && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.feeAmount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Fee Type
          </label>
          <select
            name="feeType"
            value={formData.feeType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="regular">Regular Fee</option>
            <option value="late">Late Fee</option>
            <option value="recheck">Re-checking Fee</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Boarder Status <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, boarderStatus: "boarder" }));
                if (validationErrors.boarderStatus) {
                  setValidationErrors(prev => ({ ...prev, boarderStatus: "" }));
                }
              }}
              className={`px-4 py-3 border rounded-lg flex flex-col items-center justify-center transition ${
                formData.boarderStatus === "boarder"
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <FaBuilding className="text-xl mb-2" />
              <span className="font-medium">Boarder</span>
              <span className="text-xs text-gray-500">Hostel Resident</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, boarderStatus: "non-boarder" }));
                if (validationErrors.boarderStatus) {
                  setValidationErrors(prev => ({ ...prev, boarderStatus: "" }));
                }
              }}
              className={`px-4 py-3 border rounded-lg flex flex-col items-center justify-center transition ${
                formData.boarderStatus === "non-boarder"
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <FaUniversity className="text-xl mb-2" />
              <span className="font-medium">Non-Boarder</span>
              <span className="text-xs text-gray-500">Day Scholar</span>
            </button>
          </div>
          {validationErrors.boarderStatus && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.boarderStatus}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="03XX-XXXXXXX"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition"
        >
          Next: Bank Details <FaArrowRight />
        </button>
      </div>
    </div>
  );

  // Step 3: Bank & Payment Details
  const Step3Form = () => (
    <div className="space-y-6 animate-fade">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
        <h3 className="font-bold text-purple-800 flex items-center gap-2">
          <FaBuilding /> Bank & Payment Information
        </h3>
        <p className="text-sm text-purple-600 mt-1">
          Provide bank details and upload your fee voucher.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Bank Name <span className="text-red-600">*</span>
          </label>
          <select
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.bankName ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Bank</option>
            <option value="HBL">Habib Bank Limited (HBL)</option>
            <option value="UBL">United Bank Limited (UBL)</option>
            <option value="MCB">Muslim Commercial Bank (MCB)</option>
            <option value="ABL">Allied Bank Limited (ABL)</option>
            <option value="NBP">National Bank of Pakistan (NBP)</option>
            <option value="Bank Alfalah">Bank Alfalah</option>
            <option value="Bank Al Habib">Bank Al Habib</option>
            <option value="Meezan Bank">Meezan Bank</option>
            <option value="Askari Bank">Askari Bank</option>
            <option value="JS Bank">JS Bank</option>
          </select>
          {validationErrors.bankName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.bankName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Bank Branch <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="bankBranch"
            value={formData.bankBranch}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.bankBranch ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Branch Name & City"
          />
          {validationErrors.bankBranch && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.bankBranch}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Voucher Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="voucherNumber"
            value={formData.voucherNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.voucherNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Voucher/Receipt Number"
          />
          {validationErrors.voucherNumber && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.voucherNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Transaction ID (Optional)
          </label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Bank Transaction ID"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Voucher Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            name="voucherDate"
            value={formData.voucherDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.voucherDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.voucherDate && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.voucherDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Payment Date
          </label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* File Upload Section */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Upload Fee Voucher <span className="text-red-600">*</span>
          <span className="text-xs text-gray-500 ml-2">(JPG, PNG or PDF, max 5MB)</span>
        </label>
        <div className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
          validationErrors.voucherImage ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
        }`}>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="voucherUpload"
          />
          <label
            htmlFor="voucherUpload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <FaCloudUploadAlt className="text-4xl text-blue-500" />
            <div>
              <span className="text-blue-600 font-medium">Click to upload</span>
              <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
            </div>
          </label>
          
          {formData.voucherPreview && (
            <div className="mt-4">
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaFileInvoiceDollar className="text-green-600" />
                  <div>
                    <p className="font-medium">{formData.voucherImage?.name || 'voucher.jpg'}</p>
                    <p className="text-xs text-gray-500">Uploaded successfully</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.open(formData.voucherPreview, '_blank')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                >
                  <FaEye className="inline mr-1" /> Preview
                </button>
              </div>
            </div>
          )}
        </div>
        {validationErrors.voucherImage && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.voucherImage}</p>
        )}
      </div>

      {/* Additional Remarks */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Additional Remarks (Optional)
        </label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any additional information or notes..."
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition"
        >
          Next: Review & Submit <FaArrowRight />
        </button>
      </div>
    </div>
  );

  // Step 4: Review & Submit
  const Step4Form = () => (
    <div className="space-y-6 animate-fade">
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <h3 className="font-bold text-yellow-800 flex items-center gap-2">
          <FaCheckCircle /> Review & Submit Fee Verification Request
        </h3>
        <p className="text-sm text-yellow-600 mt-1">
          Please review all information before submission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Information Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-700">
            <FaIdCard /> Student Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Registration No:</span>
              <span className="font-semibold">{formData.registrationNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Student Type:</span>
              <span className="font-semibold capitalize">{formData.studentType}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Student Name:</span>
              <span className="font-semibold">{formData.studentName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Father's Name:</span>
              <span className="font-semibold">{formData.fatherName || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Degree Program:</span>
              <span className="font-semibold">{formData.degreeProgram || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Fee Details Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700">
            <FaMoneyBillWave /> Fee Details
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Semester:</span>
              <span className="font-semibold">Semester {formData.semesterNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Academic Year:</span>
              <span className="font-semibold">{formData.academicYear}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Fee Amount:</span>
              <span className="font-semibold text-green-600">Rs. {parseFloat(formData.feeAmount || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Boarder Status:</span>
              <span className="font-semibold capitalize">{formData.boarderStatus}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Fee Type:</span>
              <span className="font-semibold capitalize">{formData.feeType}</span>
            </div>
          </div>
        </div>

        {/* Bank Details Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-2">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-700">
            <FaBuilding /> Bank & Payment Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Bank Name:</span>
                <span className="font-semibold">{formData.bankName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Bank Branch:</span>
                <span className="font-semibold">{formData.bankBranch}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Voucher Number:</span>
                <span className="font-semibold">{formData.voucherNumber}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Voucher Date:</span>
                <span className="font-semibold">{formData.voucherDate}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Payment Date:</span>
                <span className="font-semibold">{formData.paymentDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold">{formData.transactionId || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {/* Voucher Preview */}
          {formData.voucherPreview && (
            <div className="mt-6 pt-6 border-t">
              <h5 className="font-semibold mb-3">Fee Voucher Preview:</h5>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <FaFileInvoiceDollar className="text-3xl text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Uploaded Voucher</p>
                  <p className="text-sm text-gray-500">Click to preview the uploaded document</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.open(formData.voucherPreview, '_blank')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaEye /> Preview Voucher
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Request Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h4 className="font-bold text-lg mb-3 text-blue-800">Request Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">Request ID</div>
            <div className="text-xl font-bold text-blue-700">{requestId}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">Assigned To</div>
            <div className="text-lg font-semibold">{formData.assignedTo}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">Processing Time</div>
            <div className="text-lg font-semibold">{formData.estimatedProcessingTime}</div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h4 className="font-bold text-lg mb-3">Terms & Conditions</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-0.5" />
            <span>I confirm that all information provided is accurate and complete.</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-0.5" />
            <span>I understand that providing false information may lead to disciplinary action.</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-0.5" />
            <span>I authorize the university to verify my fee payment details with the bank.</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-0.5" />
            <span>I agree to receive updates about my verification status via email/SMS.</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <FaArrowLeft /> Back to Edit
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center gap-2 transition disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <FaCheckCircle /> Submit Verification Request
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Submitted State
  const SubmittedState = () => (
    <div className="text-center py-12 animate-fade">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <FaCheckCircle className="text-4xl text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Verification Request Submitted!</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Your fee verification request has been successfully submitted and forwarded to the 
        Fee Section Department for processing. You will be notified once your verification is complete.
      </p>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto mb-8">
        <h3 className="font-bold text-lg mb-4">Request Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-left">
            <p className="text-sm text-gray-600">Request ID</p>
            <p className="font-bold text-lg text-blue-700">{requestId}</p>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600">Submitted On</p>
            <p className="font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-semibold text-yellow-600 flex items-center gap-2">
              <FaClock /> Pending Verification
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600">Student Type</p>
            <p className="font-semibold capitalize">{formData.studentType}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleCheckStatus}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <FaEye /> Check Status
        </button>
        <button
          onClick={handleProceedToForm}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <FaArrowRight /> Proceed to {formData.studentType === 'undergraduate' ? 'UG-1 Form' : 'GS-10 Form'}
        </button>
        <button
          onClick={handleNewRequest}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <FaFileInvoiceDollar /> New Verification
        </button>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>For any queries, please contact Fee Section at:</p>
        <p className="mt-2 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1"><FaEnvelope /> feesection@uaf.edu.pk</span>
          <span className="flex items-center gap-1"><FaPhone /> +92-41-9200161 Ext: 3303</span>
        </p>
      </div>
    </div>
  );

  // Pending/Approved/Rejected State
  const RequestStatusView = () => {
    const statusConfig = {
      pending: {
        icon: FaClock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        title: "Verification Pending",
        message: "Your request is being reviewed by the Fee Section Department.",
      },
      approved: {
        icon: FaCheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        title: "Verification Approved!",
        message: "Your fee verification has been approved. You can now proceed.",
      },
      rejected: {
        icon: FaTimesCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        title: "Verification Rejected",
        message: "Your fee verification request has been rejected. Please check the remarks.",
      },
    };

    const config = statusConfig[requestStatus] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div className={`border rounded-xl p-8 ${config.bgColor} ${config.borderColor} animate-fade`}>
        <div className="flex flex-col items-center text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${config.bgColor}`}>
            <Icon className={`text-4xl ${config.color}`} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{config.title}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">{config.message}</p>
          
          {requestStatus === "approved" && (
            <button
              onClick={handleProceedToForm}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center gap-2 transition mb-6"
            >
              <FaArrowRight /> Proceed to {formData.studentType === 'undergraduate' ? 'UG-1 Form' : 'GS-10 Form'}
            </button>
          )}
          
          {requestStatus === "rejected" && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 w-full max-w-2xl">
              <h4 className="font-bold mb-2">Remarks from Fee Section:</h4>
              <p className="text-gray-700">The uploaded voucher is unclear. Please upload a clear copy of the fee voucher.</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-600">Request ID</div>
              <div className="text-lg font-bold">{requestId}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-600">Status</div>
              <div className={`text-lg font-bold ${config.color} capitalize`}>{requestStatus}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-600">Last Updated</div>
              <div className="text-lg font-semibold">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleNewRequest}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition"
            >
              <FaFileInvoiceDollar /> New Verification Request
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center gap-2 transition"
            >
              <FaPrint /> Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Verification History
  const VerificationHistory = () => (
    <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <FaHistory /> Verification History
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Semester</th>
              <th className="p-3 text-left border">Fee Amount</th>
              <th className="p-3 text-left border">Voucher No.</th>
              <th className="p-3 text-left border">Date</th>
              <th className="p-3 text-left border">Status</th>
            </tr>
          </thead>
          <tbody>
            {verificationHistory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border">{item.semester}</td>
                <td className="p-3 border">Rs. {item.amount}</td>
                <td className="p-3 border">{item.voucherNo}</td>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white rounded-full shadow">
              <FaUniversity className="text-3xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                University of Agriculture, Faisalabad
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-blue-700">
                Fee Verification System
              </h2>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Submit your fee voucher for verification to proceed with course enrollment.
            After approval, you will be redirected to the relevant enrollment form.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Progress Header */}
          {requestStatus === "new" && step <= 4 && <StatusIndicator />}
          
          <div className="p-6 md:p-8">
            {requestStatus === "new" && (
              <>
                {step === 1 && <Step1Form />}
                {step === 2 && <Step2Form />}
                {step === 3 && <Step3Form />}
                {step === 4 && <Step4Form />}
              </>
            )}
            
            {requestStatus === "submitted" && <SubmittedState />}
            
            {(requestStatus === "pending" || requestStatus === "approved" || requestStatus === "rejected") && (
              <RequestStatusView />
            )}
          </div>
        </div>

        {/* Verification History */}
        {requestStatus !== "new" && <VerificationHistory />}

        {/* Footer Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            For assistance, contact the Fee Section Department at:
            <span className="ml-2 font-medium">Room 101, Admin Block, University of Agriculture, Faisalabad</span>
          </p>
          <p>
            Email: <span className="text-blue-600">feesection@uaf.edu.pk</span> | 
            Phone: <span className="text-blue-600">+92-41-9200161 Ext: 3303</span> | 
            Hours: <span className="text-blue-600">9:00 AM - 4:00 PM (Monday to Friday)</span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default FeeVerificationSystem;