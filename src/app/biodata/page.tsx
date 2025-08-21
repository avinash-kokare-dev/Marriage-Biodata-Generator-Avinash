"use client";
import styles from "./page.module.css";
import { useState, useEffect, useCallback } from "react";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import Field from "@/components/Field";
import { FaPlus } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { defaultContactFields, defaultExtraFields, defaultFamilyFields, defaultPersonalFields, defaultProfessionalFields, defaultSectionExpandState, sectionConfigs, STORAGE_KEY, templateOptions } from "@/helper/default-configs";
import { SectionKey } from "@/interface/types";
import { defaultGodImages } from "@/helper/image-provider";
import { fileToBase64, reorderList } from "@/helper/helper-functions";

export default function BiodataPage() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [personalFields, setPersonalFields] = useState(defaultPersonalFields);
  const [contactFields, setContactFields] = useState(defaultContactFields);
  const [professionalFields, setProfessionalFields] = useState(defaultProfessionalFields);
  const [familyFields, setFamilyFields] = useState(defaultFamilyFields);
  const [extraFields, setExtraFields] = useState(defaultExtraFields);
  const [godImage, setGodImage] = useState<File | null>(null);
  const [godImageUrl, setGodImageUrl] = useState<string | null>(null);
  const [godName, setGodName] = useState("");
  const [selectedGodImage, setSelectedGodImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [sectionExpand, setSectionExpand] = useState<Record<string, boolean>>(defaultSectionExpandState);

  const sectionState: Record<SectionKey, any[]> = {
    personalFields,
    contactFields,
    professionalFields,
    familyFields,
    extraFields,
  };
  const setSectionState: Record<SectionKey, React.Dispatch<React.SetStateAction<any[]>>> = {
    personalFields: setPersonalFields,
    contactFields: setContactFields,
    professionalFields: setProfessionalFields,
    familyFields: setFamilyFields,
    extraFields: setExtraFields,
  };

  // Save to localStorage on any change
  useEffect(() => {
    const data = {
      profilePicUrl,
      personalFields,
      contactFields,
      professionalFields,
      familyFields,
      godImageUrl,
      selectedGodImage,
      godName,
      selectedTemplate,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [profilePicUrl, personalFields, contactFields, professionalFields, familyFields, extraFields, godImageUrl, selectedGodImage, godName, selectedTemplate]);

  // Load from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    console.log('Loading from localStorage:', data);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        console.log('Parsed data:', parsed);
        if (parsed.profilePicUrl) setProfilePicUrl(parsed.profilePicUrl);
        if (parsed.personalFields) setPersonalFields(parsed.personalFields);
        if (parsed.contactFields) setContactFields(parsed.contactFields);
        if (parsed.professionalFields) setProfessionalFields(parsed.professionalFields);
        if (parsed.familyFields) setFamilyFields(parsed.familyFields);
        if (parsed.godImageUrl) setGodImageUrl(parsed.godImageUrl);
        if (parsed.selectedGodImage) setSelectedGodImage(parsed.selectedGodImage);
        if (parsed.godName) setGodName(parsed.godName);
        if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  const handleResetForm = useCallback(() => {
    setProfilePic(null);
    setProfilePicUrl(null);
    setPersonalFields(defaultPersonalFields);
    setContactFields(defaultContactFields);
    setProfessionalFields(defaultProfessionalFields);
    setFamilyFields(defaultFamilyFields);
    setExtraFields(defaultExtraFields);
    setGodImage(null);
    setGodImageUrl(null);
    setSelectedGodImage(null);
    setGodName("");
    setSelectedTemplate("classic");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const handleChooseTemplate = useCallback(() => {
    setShowTemplateModal(true);
  }, []);

  const handleProfilePicChange = async (file: File | null) => {
    setProfilePic(file);
    if (file) {
      const base64 = await fileToBase64(file);
      setProfilePicUrl(base64);
    } else {
      setProfilePicUrl(null);
    }
  };

  const handleGodImageChange = async (file: File | null) => {
    setGodImage(file);
    if (file) {
      const base64 = await fileToBase64(file);
      setGodImageUrl(base64);
      setSelectedGodImage(base64);
    } else {
      setGodImageUrl(null);
      setSelectedGodImage(null);
    }
  };

  const handleSelectDefaultGod = (img: string) => {
    setSelectedGodImage(img);
    setGodImage(null);
    setGodImageUrl(null);
  };

  const handleRemoveGodImage = () => {
    setGodImage(null);
    setGodImageUrl(null);
    setSelectedGodImage(null);
  };

  // Add Field Handler
  const handleAddField = (sectionKey: SectionKey) => {
    console.log("Section in handle add fiedl : ", sectionKey)
    const newField = {
      id: `custom_${Date.now()}`,
      label: "New Field",
      value: "",
      type: "text",
    };
    setSectionState[sectionKey]((prev) => [...prev, newField]);
  };

  // Field Change Handler
  const handleFieldChange = (sectionKey: SectionKey, idx: number, value: string) => {
    setSectionState[sectionKey]((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], value };
      return updated;
    });
  };

  // Field Delete Handler
  const handleFieldDelete = (sectionKey: SectionKey, idx: number) => {
    setSectionState[sectionKey]((prev) => prev.filter((_: any, i: number) => i !== idx));
  };

  // Field Label Edit Handler
  const handleFieldLabelEdit = (sectionKey: SectionKey, idx: number, label: string) => {
    console.log("Section key : ", sectionKey)
    setSectionState[sectionKey]((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], label };
      return updated;
    });
  };

  // Section expand/collapse handler
  const handleToggleSectionExpand = (sectionKey: string) => {
    setSectionExpand(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const handleDownload = async () => {
    if (isGeneratingPDF) return;

    setIsGeneratingPDF(true);

    try {
      // Get the preview element
      const previewElement = document.querySelector(`.${styles.preview}`) as HTMLElement;

      if (!previewElement) {
        alert('Preview element not found');
        return;
      }

      // Create a clone for PDF generation to avoid affecting the display
      const clone = previewElement.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '800px'; // Fixed width for PDF
      clone.style.height = 'auto';
      clone.style.transform = 'none';
      clone.style.boxShadow = 'none';
      clone.style.border = '1px solid #ddd';
      clone.style.padding = '40px';
      clone.style.margin = '0';
      clone.style.backgroundColor = 'white';
      clone.setAttribute('data-pdf', 'true');

      // Add to DOM temporarily
      document.body.appendChild(clone);

      // Wait for images to load
      const images = clone.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // Convert to canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: clone.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Remove clone from DOM
      document.body.removeChild(clone);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      const templateName = templateOptions.find(t => t.key === selectedTemplate)?.label || 'Classic';
      pdf.save(`marriage-biodata-${templateName.toLowerCase().replace(/\s+/g, '-')}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const generateAIResponse = async (sectionKey: SectionKey, fieldKey: string) => {
    const response = await fetch("/api/generate-suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // name: defaultPersonalFields.find(field => field.id === "fullName")?.value,
        // age: defaultPersonalFields.find(field => field.id === "dob")?.value,
        // profession: defaultProfessionalFields.find(field => field.id === "occupation")?.value,
        // education: defaultProfessionalFields.find(field => field.id === "education")?.value,
        // location: "Pune",
        // hobbies: defaultPersonalFields.find(field => field.id === "hobbies")?.value,
        name: 'Avinash',
        age: 26,
        profession: 'Software Engineer',
        education: 'B.E. Computer Science',
        location: 'Mumbai',
        hobbies: 'Cricket, Reading, Travelling',
        birthdate: '19-10-1999',
        sectionType: sectionKey
      })
    });

    const data = await response.json();

    if (data && sectionKey in setSectionState) {
      const setter = setSectionState[sectionKey as SectionKey];

      setter((prev) => {
        return prev.map((field) => {
          if (field.id === fieldKey) {
            return { ...field, value: data };
          }
          return field;
        });
      });
    }


  }

  return (
    <div className={styles.biodataWrapper}>
      <div className={styles.formColumn}>
        <div className={styles.formActions}>
          <div className={styles.actionButtons}>
            <button
              className={styles.actionButton}
              onClick={handleChooseTemplate}
            >
              Choose Template
            </button>
            <button
              className={styles.actionButton}
              onClick={handleResetForm}
            >
              Reset Form
            </button>
            <button
              className={styles.actionButton}
              onClick={handleDownload}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? 'Generating PDF...' : 'Download Biodata'}
            </button>
          </div>
        </div>
        <div className={styles.godImageSelector}>
          <div className={styles.godImageUploadWrapper}>
            <ProfilePictureUpload imageUrl={selectedGodImage && !defaultGodImages.includes(selectedGodImage) ? selectedGodImage : null} onChange={handleGodImageChange} />
            {selectedGodImage && !defaultGodImages.includes(selectedGodImage) && (
              <button
                onClick={handleRemoveGodImage}
                className={styles.godImageRemoveBtn}
                title="Remove image"
              >
                ×
              </button>
            )}
            <span className={styles.godImageUploadLabel}>Upload</span>
          </div>
          <div className={styles.godImageOptions}>
            {defaultGodImages.map(img => (
              <button
                key={img}
                type="button"
                onClick={() => handleSelectDefaultGod(img)}
                className={
                  styles.godImageBtn + (selectedGodImage === img ? ' ' + styles.godImageBtnActive : '')
                }
                aria-label="Select god image"
              >
                <img src={img} alt="God" className={styles.godImageThumb} />
              </button>
            ))}
            {/* Upload option with preview and remove */}

          </div>
          <input
            type="text"
            placeholder="Enter God Name (e.g. Shree Ganeshay Namah)"
            value={godName}
            onChange={e => setGodName(e.target.value)}
            className={styles.godNameInput}
          />
        </div>
        <ProfilePictureUpload imageUrl={profilePicUrl} onChange={handleProfilePicChange} />
        <div className={styles.formSections}>
          {sectionConfigs.map(section => (
            <section className={styles.formSection} key={section.key}>
              <div className={styles.sectionHeader}>
                <button
                  type="button"
                  className={styles.sectionToggleBtn}
                  onClick={() => handleToggleSectionExpand(section.key)}
                  aria-label={sectionExpand[section.key] ? 'Collapse section' : 'Expand section'}
                >
                  {sectionExpand[section.key] ? '▼' : '►'}
                </button>
                <span>{section.title}</span>
              </div>
              {sectionExpand[section.key] && (
                <>
                  <div>
                    {sectionState[section.stateKey as SectionKey].map((field: any, idx: number) => (
                      <div>
                        <Field
                          label={field.label}
                          value={field.value}
                          type={field.type}
                          onChange={val => handleFieldChange(section.stateKey as SectionKey, idx, val)}
                          onDelete={() => handleFieldDelete(section.stateKey as SectionKey, idx)}
                          onLabelEdit={label => handleFieldLabelEdit(section.stateKey as SectionKey, idx, label)}

                          isAIResponse={field.isAIResponse}
                          generateAIResponse={() => generateAIResponse(section.stateKey as SectionKey, field.id)}
                        />
                      </div>
                    ))}
                  </div>
                  <button className={styles.addFieldBtn} onClick={() => handleAddField(section.stateKey as SectionKey)}>
                    <FaPlus style={{ marginRight: 6 }} /> Add Field
                  </button>
                </>
              )}
            </section>
          ))}
        </div>
        {showTemplateModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setShowTemplateModal(false)}
                aria-label="Close"
                type="button"
                style={{ position: 'absolute', top: 16, right: 20, fontSize: 28, background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', zIndex: 2 }}
              >
                ×
              </button>
              <h3>Choose Template</h3>
              <div className={styles.templateGrid}>
                {templateOptions.map((template) => (
                  <div
                    key={template.key}
                    className={`${styles.templateOption} ${selectedTemplate === template.key ? styles.selected : ''}`}
                    onClick={() => {
                      setSelectedTemplate(template.key);
                      setShowTemplateModal(false);
                    }}
                  >
                    <div className={`${styles.templatePreview} ${styles[template.key]}`}>
                      <div className={styles.templatePreviewHeader}>
                        <h4>Marriage Biodata</h4>
                        <p>{template.label}</p>
                      </div>
                    </div>
                    <div className={styles.templateInfo}>
                      <h4>{template.label}</h4>
                      <p>{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.previewColumn}>
        <div className={`${styles.preview} ${styles[selectedTemplate] || styles.classic}`}>
          <div className={styles.previewHeader}>
            <h2 className={styles.templateName}>Marriage Biodata</h2>
            <p className={styles.templateDetails}>Template: {templateOptions.find(t => t.key === selectedTemplate)?.label}</p>
          </div>

          {/* Corner decoration based on template */}
          {selectedTemplate === 'elegant' && (
            <div className={styles.cornerDecoration}>✦</div>
          )}
          {selectedTemplate === 'royal' && (
            <div className={styles.cornerDecoration}>⚜</div>
          )}
          {selectedTemplate === 'modern' && (
            <div className={styles.cornerDecoration}>●</div>
          )}
          {selectedTemplate === 'traditional' && (
            <div className={styles.cornerDecoration}>❀</div>
          )}

          {selectedGodImage && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.7rem' }}>
              <img
                src={selectedGodImage}
                alt="God"
                style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(99,102,241,0.10)' }}
              />
            </div>
          )}
          {godName && (
            <div style={{ textAlign: 'center', color: '#6366f1', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.7rem', letterSpacing: '0.02em' }}>{godName}</div>
          )}

          {profilePicUrl && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
              <img
                src={profilePicUrl}
                alt="Profile"
                style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(99,102,241,0.10)' }}
              />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {sectionConfigs.map(section => (
              <div key={section.key} style={{ background: '#f8fafc', borderRadius: '1rem', boxShadow: '0 1px 8px rgba(99,102,241,0.03)', padding: '1.2rem 1rem' }}>
                <div style={{ fontWeight: 600, color: '#6366f1', marginBottom: '0.7rem', fontSize: '1.08rem' }}>{section.title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#374151' }}>
                  {sectionState[section.stateKey as SectionKey].map((field: any) => (
                    <li key={field.id} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 500, minWidth: 90, color: '#6366f1' }}>{field.label}:</span>
                      <span style={{ flex: 1 }}>{field.value || <span style={{ color: '#a0aec0' }}>—</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 