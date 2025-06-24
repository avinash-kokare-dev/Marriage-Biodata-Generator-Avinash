'use client';
import { useState } from "react";
import styles from "./TemplateCarousel.module.css";

const templates = [
  {
    id: 1,
    name: "Classic",
    description: "Clean and simple design",
    image: "https://via.placeholder.com/400x300/f8fafc/6366f1?text=Classic+Template",
    features: ["Professional layout", "Easy to read", "Traditional format"]
  },
  {
    id: 2,
    name: "Elegant Gold",
    description: "Premium golden theme",
    image: "https://via.placeholder.com/400x300/fff9e6/d4af37?text=Elegant+Gold",
    features: ["Luxury design", "Golden accents", "Premium feel"]
  },
  {
    id: 3,
    name: "Royal Maroon",
    description: "Rich maroon design",
    image: "https://via.placeholder.com/400x300/2d1b3d/8b0000?text=Royal+Maroon",
    features: ["Royal appearance", "Deep colors", "Sophisticated look"]
  },
  {
    id: 4,
    name: "Modern Blue",
    description: "Contemporary blue theme",
    image: "https://via.placeholder.com/400x300/f0f8ff/3b82f6?text=Modern+Blue",
    features: ["Modern design", "Clean lines", "Professional blue"]
  },
  {
    id: 5,
    name: "Traditional Red",
    description: "Traditional red design",
    image: "https://via.placeholder.com/400x300/fff5f5/dc2626?text=Traditional+Red",
    features: ["Traditional style", "Red accents", "Cultural elements"]
  }
];

export default function TemplateCarousel() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex(i => (i === 0 ? templates.length - 1 : i - 1));
  const next = () => setIndex(i => (i === templates.length - 1 ? 0 : i + 1));

  // Show 3 cards: prev, current, next
  const getVisibleTemplates = () => {
    const prevIdx = (index - 1 + templates.length) % templates.length;
    const nextIdx = (index + 1) % templates.length;
    return [templates[prevIdx], templates[index], templates[nextIdx]];
  };
  const visible = getVisibleTemplates();

  return (
    <div className={styles.carouselWrapper}>
      <h2 className={styles.heading}>Beautifully Handcrafted Marriage Biodata Templates</h2>
      <p className={styles.subheading}>
        We have designed the best looking, well formatted marriage biodata formats for you to just choose and make biodata without any hassle. No need to invest time on layouts, designs and getting that perfect biodata for marriage.
      </p>
      <div className={styles.carousel}>
        <button className={styles.arrow} onClick={prev} aria-label="Previous Template">&#8592;</button>
        <div className={styles.templates}>
          {visible.map((t, i) => (
            <div
              key={t.id}
              className={
                styles.templateCard +
                (i === 1 ? ' ' + styles.active : ' ' + styles.side)
              }
            >
              <div className={styles.templateImgFrame}>
                <img src={t.image} alt="Profile" className={styles.templateImg} />
              </div>
            </div>
          ))}
        </div>
        <button className={styles.arrow} onClick={next} aria-label="Next Template">&#8594;</button>
      </div>
    </div>
  );
} 