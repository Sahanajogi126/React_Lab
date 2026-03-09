import { useState, useEffect, useCallback } from "react";
import DOMPurify from "dompurify";
import "./index.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const sanitizeInput = (value) => DOMPurify.sanitize(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value.trim()),
    }));
  };

  const validateForm = useCallback(() => {
    let valid = true;
    const newErrors = {};

    // Name Validation
    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter valid email";
      valid = false;
    }

    // Password Validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?8]).{6,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = "Min 6 chars, 1 uppercase, 1 number, 1 special char";
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmittedData(formData);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-border" : ""}
            placeholder="Enter name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-border" : ""}
            placeholder="Enter email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-border" : ""}
            placeholder="Enter password"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        {/* Show Password Checkbox */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>

      {/* Result Display */}
      {submittedData && (
        <div className="result">
          <h3>Submitted Data</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
