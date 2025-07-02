import { useState } from "react";
import { FaTrash, FaGripVertical, FaMagic, FaBrain } from "react-icons/fa";
import styles from "./Field.module.css";

interface FieldProps {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  onLabelEdit: (label: string) => void;
  onAIGenerate?: () => void;
  className?: string;
  isAIResponse?: boolean;
  generateAIResponse?: () => void;
}

export default function Field({
  label,
  value,
  type = "text",
  onChange,
  onDelete,
  onLabelEdit,
  onAIGenerate,
  className,
  isAIResponse,
  generateAIResponse
}: FieldProps) {
  const [editingLabel, setEditingLabel] = useState(false);
  const [labelValue, setLabelValue] = useState(label);

  const handleLabelClick = () => setEditingLabel(true);
  const handleLabelBlur = () => {
    setEditingLabel(false);
    onLabelEdit(labelValue);
  };

  return (
    <div className={`${styles.field}${className ? ' ' + className : ''}`}>
      {isAIResponse ? <button
        type="button"
        className={styles.dragHandleBtn}
        title="Drag to reorder"
        tabIndex={0}
        aria-label="Drag to reorder"
        onClick={generateAIResponse}
      >
        <FaBrain />
      </button> : <button
        type="button"
        className={styles.dragHandleBtn}
        title="Drag to reorder"
        tabIndex={0}
        aria-label="Drag to reorder"
      >
        <FaGripVertical />
      </button>}
      <div className={styles.labelWrapper}>
        {editingLabel ? (
          <input
            className={styles.labelInput}
            value={labelValue}
            onChange={e => setLabelValue(e.target.value)}
            onBlur={handleLabelBlur}
            autoFocus
            onKeyDown={e => e.key === "Enter" && handleLabelBlur()}
            maxLength={32}
          />
        ) : (
          <span className={styles.label} onClick={handleLabelClick} title="Click to edit label">
            {label}
          </span>
        )}
      </div>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {(label === "About Me" || label.toLowerCase().includes("about me") || label.toLowerCase().includes("expect")) && onAIGenerate && (
        <button className={styles.aiBtn} onClick={onAIGenerate} title="Generate with AI" type="button">
          <FaMagic />
        </button>
      )}
      <button className={styles.deleteBtn} onClick={onDelete} title="Delete field">
        <FaTrash />
      </button>
    </div>
  );
} 