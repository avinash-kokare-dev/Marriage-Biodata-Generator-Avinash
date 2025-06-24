'use client';

import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import styles from './page.module.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isLogin && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, current data:', formData);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle form submission here
      console.log('Form submitted:', formData);
      
      // Show success message
      alert(isLogin ? 'Successfully logged in!' : 'Account created successfully!');
      
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Google login clicked');
      alert('Google login functionality will be implemented here!');
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const getInputClassName = (fieldName: string) => {
    return `${styles.input} ${errors[fieldName] ? styles.error : ''}`;
  };

  const getInputWrapperClassName = (fieldName: string) => {
    return `${styles.inputWrapper} ${errors[fieldName] ? styles.error : ''}`;
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className={styles.authSubtitle}>
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join us and create your marriage biodata'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
  
          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={getInputWrapperClassName('name')}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={getInputWrapperClassName('email')}>
              <FaEnvelope className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={getInputWrapperClassName('phone')}>
                <FaPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={getInputWrapperClassName('password')}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={getInputWrapperClassName('confirmPassword')}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.passwordToggle}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className={styles.googleButton}
          disabled={isLoading}
        >
          <FaGoogle className={styles.googleIcon} />
          {isLoading ? 'Processing...' : 'Continue with Google'}
        </button>

        <div className={styles.toggleSection}>
          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button onClick={toggleForm} className={styles.toggleButton}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
} 