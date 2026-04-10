import { jsPDF } from "jspdf";
import type { FeedbackEntry } from "./feedback-store";

export async function generatePDF(entry: FeedbackEntry) {
  const doc = new jsPDF("landscape", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 🔥 Load your certificate image
  const img = new Image();
  img.src = "public/Certificate.png"; // make sure image is in public folder

  img.onload = () => {
    // 🖼️ Add image as FULL background
    doc.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);

    // ✍️ Add Parent Name on the blank line
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);

    // 🎯 POSITION (VERY IMPORTANT)
    // Adjust Y value to perfectly match the line in your image
    const nameY = pageHeight / 2 - 5;

    doc.text(entry.parentName, pageWidth / 2, nameY, {
      align: "center",
    });

    // 💾 Save PDF
    doc.save(`Feedback_${entry.parentName.replace(/\s+/g, "_")}.pdf`);
  };
}