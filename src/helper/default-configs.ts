// LocalStorage keys
export const STORAGE_KEY = "biodataFormData";

export const defaultPersonalFields = [
    { id: "fullName", label: "Full Name", value: "", type: "text" },
    { id: "gender", label: "Gender", value: "", type: "select", options: ["Male", "Female", "Other"] },
    { id: "dob", label: "Date of Birth", value: "", type: "datetime-local" },
    { id: "height", label: "Height", value: "", type: "text" },
    { id: "religion", label: "Religion", value: "", type: "text" },
    { id: "caste", label: "Caste", value: "", type: "text" },
];
export const defaultContactFields = [
    { id: "phone", label: "Phone", value: "", type: "text" },
    { id: "email", label: "Email", value: "", type: "email" },
    { id: "address", label: "Address", value: "", type: "text" },
];
export const defaultProfessionalFields = [
    { id: "education", label: "Education", value: "", type: "text" },
    { id: "occupation", label: "Occupation", value: "", type: "text" },
    { id: "income", label: "Income", value: "", type: "text" },
    { id: "hobbies", label: "Hobbies", value: "", type: "text" },
];
export const defaultFamilyFields = [
    { id: "fatherName", label: "Father's Name", value: "", type: "text" },
    { id: "motherName", label: "Mother's Name", value: "", type: "text" },
    { id: "brotherName", label: "Brother's Name", value: "", type: "text" },
    { id: "sisterName", label: "Sister's Name", value: "", type: "text" },
];

export const defaultExtraFields = [
    { id: "aboutMe", label: "About Me", value: "", type: "text", isAIResponse: true },
    { id: "partnerPreference", label: "Partner Preference", value: "", type: "text", isAIResponse: true },
];

export const sectionConfigs = [
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
    {
        key: "family",
        title: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66 Family Details",
        stateKey: "familyFields",
        defaultFields: defaultFamilyFields,
    },
    {
        key: "extraFields",
        title: "About Me and Partner Preference",
        stateKey: "extraFields",
        defaultFields: defaultExtraFields,
    },
];

export const templateOptions = [
    { key: "classic", label: "Classic", description: "Clean and simple" },
    { key: "elegant", label: "Elegant Gold", description: "Premium golden theme" },
    { key: "royal", label: "Royal Maroon", description: "Rich maroon design" },
    { key: "modern", label: "Modern Blue", description: "Contemporary blue theme" },
    { key: "traditional", label: "Traditional Red", description: "Traditional red design" },
];

// Add section expand/collapse state
export const defaultSectionExpandState: Record<string, boolean> = {
  personal: true,
  contact: true,
  professional: true,
  family: true,
  extraFields: true,
};


