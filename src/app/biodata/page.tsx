"use client";
import styles from "./page.module.css";
import { useState, useEffect, useCallback } from "react";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Field from "@/components/Field";
import { FaPlus } from "react-icons/fa";
import type { DraggableProvided, DraggableStateSnapshot, DroppableProvided } from "react-beautiful-dnd";

const defaultPersonalFields = [
  { id: "fullName", label: "Full Name", value: "", type: "text" },
  { id: "gender", label: "Gender", value: "", type: "select", options: ["Male", "Female", "Other"] },
  { id: "dob", label: "Date of Birth", value: "", type: "date" },
  { id: "height", label: "Height", value: "", type: "text" },
  { id: "religion", label: "Religion", value: "", type: "text" },
  { id: "caste", label: "Caste", value: "", type: "text" },
];
const defaultContactFields = [
  { id: "phone", label: "Phone", value: "", type: "text" },
  { id: "email", label: "Email", value: "", type: "email" },
  { id: "address", label: "Address", value: "", type: "text" },
];
const defaultProfessionalFields = [
  { id: "education", label: "Education", value: "", type: "text" },
  { id: "occupation", label: "Occupation", value: "", type: "text" },
  { id: "income", label: "Income", value: "", type: "text" },
  { id: "aboutMe", label: "About Me", value: "", type: "textarea" },
];

const sectionConfigs = [
  {
    key: "personal",
    title: "\uD83D\uDC64 Personal Details",
    stateKey: "personalFields",
    defaultFields: defaultPersonalFields,
  },
  {
    key: "contact",
    title: "\uD83D\uDCDE Contact Details",
    stateKey: "contactFields",
    defaultFields: defaultContactFields,
  },
  {
    key: "professional",
    title: "\uD83D\uDCBC Professional Details",
    stateKey: "professionalFields",
    defaultFields: defaultProfessionalFields,
  },
];

type SectionKey = "personalFields" | "contactFields" | "professionalFields";

// Helper function to reorder an array
function reorderList(list: any[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const defaultGodImages = [
  "/gods/ganesh.png",
  "/gods/krishna.png",
  "/gods/shiva.png",
  "/gods/durga.png",
  "/gods/hanuman.png",
];

const templateOptions = [
  { key: "classic", label: "Classic" },
  { key: "gold", label: "Gold" },
  { key: "maroon", label: "Maroon" },
];

// Helper to convert File to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function BiodataPage() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [personalFields, setPersonalFields] = useState(defaultPersonalFields);
  const [contactFields, setContactFields] = useState(defaultContactFields);
  const [professionalFields, setProfessionalFields] = useState(defaultProfessionalFields);
  const [godImage, setGodImage] = useState<File | null>(null);
  const [godImageUrl, setGodImageUrl] = useState<string | null>(null);
  const [godName, setGodName] = useState("");
  const [selectedGodImage, setSelectedGodImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const sectionState: Record<SectionKey, any[]> = {
    personalFields,
    contactFields,
    professionalFields,
  };
  const setSectionState: Record<SectionKey, React.Dispatch<React.SetStateAction<any[]>>> = {
    personalFields: setPersonalFields,
    contactFields: setContactFields,
    professionalFields: setProfessionalFields,
  };

  // LocalStorage keys
  const STORAGE_KEY = "biodataFormData";

  // Save to localStorage on any change
  useEffect(() => {
    const data = {
      profilePicUrl,
      personalFields,
      contactFields,
      professionalFields,
      godImageUrl,
      selectedGodImage,
      godName,
      selectedTemplate,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [profilePicUrl, personalFields, contactFields, professionalFields, godImageUrl, selectedGodImage, godName, selectedTemplate]);

  // Load from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.profilePicUrl) setProfilePicUrl(parsed.profilePicUrl);
        if (parsed.personalFields) setPersonalFields(parsed.personalFields);
        if (parsed.contactFields) setContactFields(parsed.contactFields);
        if (parsed.professionalFields) setProfessionalFields(parsed.professionalFields);
        if (parsed.godImageUrl) setGodImageUrl(parsed.godImageUrl);
        if (parsed.selectedGodImage) setSelectedGodImage(parsed.selectedGodImage);
        if (parsed.godName) setGodName(parsed.godName);
        if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
      } catch { }
    }
  }, []);

  const handleResetForm = useCallback(() => {
    setProfilePic(null);
    setProfilePicUrl(null);
    setPersonalFields(defaultPersonalFields);
    setContactFields(defaultContactFields);
    setProfessionalFields(defaultProfessionalFields);
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

  const handleSelectTemplate = (key: string) => {
    setSelectedTemplate(key);
    setShowTemplateModal(false);
  };

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
    setSectionState[sectionKey]((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], label };
      return updated;
    });
  };

  // Update onDragEnd to handle reordering
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Map droppableId to section key
    const droppableIdToSectionKey = {
      personal: "personalFields",
      contact: "contactFields",
      professional: "professionalFields",
    } as const;
    const sourceSectionKey = droppableIdToSectionKey[source.droppableId as keyof typeof droppableIdToSectionKey] as SectionKey;
    const destSectionKey = droppableIdToSectionKey[destination.droppableId as keyof typeof droppableIdToSectionKey] as SectionKey;
    if (!sourceSectionKey || !destSectionKey) return;

    if (sourceSectionKey === destSectionKey) {
      // Reorder within the same section
      setSectionState[sourceSectionKey]((prev) => reorderList(prev, source.index, destination.index));
    } else {
      // Move between sections
      setSectionState[sourceSectionKey]((prevSource) => {
        const sourceList = Array.from(prevSource);
        const [movedField] = sourceList.splice(source.index, 1);
        setSectionState[destSectionKey]((prevDest) => {
          const destList = Array.from(prevDest);
          destList.splice(destination.index, 0, movedField);
          return destList;
        });
        return sourceList;
      });
    }
  };

  return (
    <div className={styles.biodataWrapper}>
      <div className={styles.formColumn}>
        <div className={styles.formActions}>
          <button className={styles.formButton} onClick={handleResetForm}>Reset Form</button>
          <button className={styles.formButton} onClick={handleChooseTemplate}>Choose Template</button>
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
          <DragDropContext onDragEnd={onDragEnd}>
            {sectionConfigs.map(section => (
              <section className={styles.formSection} key={section.key}>
                <div className={styles.sectionHeader}>{section.title}</div>
                <Droppable droppableId={section.key}>
                  {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {sectionState[section.stateKey as SectionKey].map((field: any, idx: number) => (
                        <Draggable key={field.id} draggableId={field.id} index={idx}>
                          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={provided.draggableProps.style}
                            >
                              <Field
                                label={field.label}
                                value={field.value}
                                type={field.type}
                                onChange={val => handleFieldChange(section.stateKey as SectionKey, idx, val)}
                                onDelete={() => handleFieldDelete(section.stateKey as SectionKey, idx)}
                                onLabelEdit={label => handleFieldLabelEdit(section.stateKey as SectionKey, idx, label)}
                                dragHandleProps={provided.dragHandleProps}
                                className={snapshot.isDragging ? styles.dragging : ''}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button className={styles.addFieldBtn} onClick={() => handleAddField(section.stateKey as SectionKey)}>
                  <FaPlus style={{ marginRight: 6 }} /> Add Field
                </button>
              </section>
            ))}
          </DragDropContext>
        </div>
        {showTemplateModal && (
          <div className={styles.templateModalOverlay}>
            <div className={styles.templateModal}>
              <button className={styles.templateModalClose} onClick={() => setShowTemplateModal(false)} title="Close">×</button>
              <div className={styles.templateModalTitle}>Choose a Template</div>
              <div className={styles.templatePicker}>
                {templateOptions.map(opt => (
                  <button
                    key={opt.key}
                    className={styles.templateOption + (selectedTemplate === opt.key ? ' ' + styles.templateOptionActive : '')}
                    onClick={() => handleSelectTemplate(opt.key)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.previewColumn}>
        <div className={styles.livePreview + ' ' + styles[selectedTemplate]}>
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
          <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '1.5rem' }}>Biodata Preview</h2>

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
                    <li key={field.id} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
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