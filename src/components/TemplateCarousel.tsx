'use client';
import { useState } from "react";
import styles from "./TemplateCarousel.module.css";

const templates = [
  {
    id: 1,
    image: 'https://biodatamaker.app/_next/image/?url=%2Fimages%2Fexamples%2Feg9.webp&w=750&q=75'
  },
  {
    id: 2,
    image: 'https://biodatamaker.app/_next/image/?url=%2Fimages%2Fexamples%2Feg23.png&w=750&q=75'
  },
  {
    id: 3,
    image: 'https://biodatamaker.app/_next/image/?url=%2Fimages%2Fexamples%2Feg24.png&w=750&q=75'
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