'use client';

import React, { useState } from 'react';
import styles from './HowToCreateBiodata.module.scss';
import Button from './Button';

interface Step {
  id: number;
  title: string;
  description: string;
  details: string[];
  icon: string;
  tips?: string[];
}

const HowToCreateBiodata: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Start with your basic personal details",
      icon: "👤",
      details: [
        "Full name (as per official documents)",
        "Date of birth and age",
        "Place of birth",
        "Current residential address",
        "Contact information (phone, email)"
      ],
      tips: [
        "Use your official name as it appears on your passport or Aadhar card",
        "Include both permanent and current address if different",
        "Ensure your contact details are up-to-date"
      ]
    },
    {
      id: 2,
      title: "Family Background",
      description: "Share information about your family",
      icon: "👨‍👩‍👧‍👦",
      details: [
        "Father's name and occupation",
        "Mother's name and occupation",
        "Siblings (names, ages, marital status)",
        "Family type (nuclear/joint)",
        "Family's native place"
      ],
      tips: [
        "Include your family's cultural and religious background",
        "Mention if you belong to any specific community",
        "Share your family's values and traditions"
      ]
    },
    {
      id: 3,
      title: "Education & Career",
      description: "Highlight your academic and professional achievements",
      icon: "🎓",
      details: [
        "Educational qualifications (highest degree)",
        "Institution names and years of completion",
        "Current profession and designation",
        "Company/organization name",
        "Work experience and achievements"
      ],
      tips: [
        "Focus on your highest qualification first",
        "Include any certifications or specializations",
        "Mention career goals and aspirations"
      ]
    },
    {
      id: 4,
      title: "Physical Attributes",
      description: "Share your physical characteristics",
      icon: "📏",
      details: [
        "Height and build",
        "Complexion",
        "Any distinctive features",
        "Health status",
        "Blood group (optional)"
      ],
      tips: [
        "Be honest about your physical attributes",
        "Include recent photos that represent you well",
        "Mention any health conditions if relevant"
      ]
    },
    {
      id: 5,
      title: "Lifestyle & Interests",
      description: "Show your personality and hobbies",
      icon: "🎨",
      details: [
        "Hobbies and interests",
        "Sports and activities you enjoy",
        "Travel preferences",
        "Food preferences (vegetarian/non-vegetarian)",
        "Cultural interests and traditions"
      ],
      tips: [
        "Share hobbies that reflect your personality",
        "Mention any special talents or skills",
        "Include cultural and religious practices"
      ]
    },
    {
      id: 6,
      title: "Partner Preferences",
      description: "Specify what you're looking for in a partner",
      icon: "💕",
      details: [
        "Age range preference",
        "Educational background preference",
        "Career/occupation preference",
        "Location preference",
        "Cultural and religious preferences"
      ],
      tips: [
        "Be realistic and flexible with your preferences",
        "Focus on compatibility rather than rigid requirements",
        "Consider values and life goals over superficial traits"
      ]
    },
    {
      id: 7,
      title: "Photos & Documents",
      description: "Add quality photos and required documents",
      icon: "📸",
      details: [
        "Recent passport-size photographs",
        "Full-length photos in traditional attire",
        "Educational certificates",
        "Employment certificates",
        "Identity proof documents"
      ],
      tips: [
        "Use high-quality, well-lit photographs",
        "Include photos in both traditional and casual attire",
        "Ensure all documents are clear and legible"
      ]
    },
    {
      id: 8,
      title: "Review & Submit",
      description: "Final review and submission of your biodata",
      icon: "✅",
      details: [
        "Review all information for accuracy",
        "Check spelling and grammar",
        "Ensure all required fields are completed",
        "Verify contact information",
        "Submit your biodata"
      ],
      tips: [
        "Take time to review everything carefully",
        "Ask a family member to review your biodata",
        "Keep a copy of your submitted biodata"
      ]
    }
  ];

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <section className={styles.howToSection} id='how-to-create-biodata'>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          How to Create Your Marriage Biodata
        </h2>
        <p className={styles.sectionDescription}>
          Follow these simple steps to create a comprehensive and attractive marriage biodata that will help you find your perfect match.
        </p>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.stepCard}>
              <div 
                className={styles.stepHeader}
                onClick={() => toggleStep(step.id)}
              >
                <div className={styles.stepNumber}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                  <span className={styles.stepId}>{step.id}</span>
                </div>
                <div className={styles.stepInfo}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
                <div className={styles.expandIcon}>
                  {expandedStep === step.id ? '−' : '+'}
                </div>
              </div>

              {expandedStep === step.id && (
                <div className={styles.stepContent}>
                  <div className={styles.detailsSection}>
                    <h4>What to Include:</h4>
                    <ul className={styles.detailsList}>
                      {step.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  {step.tips && (
                    <div className={styles.tipsSection}>
                      <h4>💡 Pro Tips:</h4>
                      <ul className={styles.tipsList}>
                        {step.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h3>Ready to Create Your Biodata?</h3>
          <p>Start building your perfect marriage biodata today and find your soulmate!</p>
          <a 
            href="/biodata"
            className={styles.ctaButton}
          >
            Create My Biodata
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToCreateBiodata;
