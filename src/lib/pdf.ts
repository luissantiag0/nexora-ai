import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 45;
const CONTENT_W = PAGE_W - MARGIN * 2;

const CYAN = rgb(0.13, 0.83, 0.93);
const DARK = rgb(0.03, 0.03, 0.04);
const WHITE = rgb(1, 1, 1);
const GRAY = rgb(0.4, 0.4, 0.42);
const MID_GRAY = rgb(0.55, 0.55, 0.57);
const LIGHT_GRAY = rgb(0.88, 0.88, 0.9);
const DARK_BG = rgb(0.06, 0.06, 0.08);

let bannerImage: Uint8Array | null = null;

function loadBanner(): Uint8Array | null {
  if (bannerImage) return bannerImage;
  try {
    const paths = [
      join(process.cwd(), "banner-nexora.png"),
      join(process.cwd(), "public", "banner-nexora.png"),
      join(process.cwd(), "..", "banner-nexora.png"),
    ];
    for (const p of paths) {
      try {
        bannerImage = readFileSync(p);
        return bannerImage;
      } catch {}
    }
  } catch {}
  return null;
}

async function getFonts(doc: PDFDocument) {
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const mono = await doc.embedFont(StandardFonts.Courier);
  return { regular, bold, mono };
}

function drawPageFrame(
  page: PDFPage,
  fonts: { regular: PDFFont; bold: PDFFont },
  pageNum: number,
  totalPages: number,
  doc: PDFDocument
) {
  const totalLabel = totalPages > 0 ? ` de ${totalPages}` : "";
  const { width, height } = page.getSize();

  // Top accent line
  page.drawRectangle({
    x: 0, y: height - 3, width, height: 3,
    color: CYAN,
  });

  // Header bar
  page.drawRectangle({
    x: 0, y: height - 52, width, height: 49,
    color: DARK_BG,
  });

  // Try to embed banner image
  const banner = loadBanner();
  if (banner) {
    try {
      const img = doc.embedPng(banner);
      const imgAspect = img.width / img.height;
      const imgH = 36;
      const imgW = imgH * imgAspect;
      page.drawImage(img, {
        x: MARGIN, y: height - 48,
        width: Math.min(imgW, 180), height: imgH,
      });
    } catch {
      // Fallback to text if image fails
    }
  }

  // Company name as fallback
  page.drawText("NexoraAI", {
    x: MARGIN, y: height - 36,
    size: 16, font: fonts.bold, color: CYAN,
  });

  // Tagline
  page.drawText("Automatización con IA", {
    x: MARGIN + 115, y: height - 33,
    size: 8, font: fonts.regular, color: MID_GRAY,
  });

  // Page number
  page.drawText(`Página ${pageNum}${totalLabel}`, {
    x: width - MARGIN - 90, y: height - 36,
    size: 8, font: fonts.regular, color: GRAY,
  });

  // Bottom bar
  page.drawRectangle({
    x: 0, y: 0, width, height: 28,
    color: DARK_BG,
  });

  page.drawText("NexoraAI — Automatización con IA", {
    x: MARGIN, y: 9, size: 7, font: fonts.regular, color: GRAY,
  });

  page.drawText("contacto@nexora.ai | nexora.ai", {
    x: width - MARGIN - 140, y: 9, size: 7, font: fonts.regular, color: GRAY,
  });
}

function wrapText(text: string, maxWidth: number, fontSize: number, font: PDFFont): string[] {
  const lines: string[] = [];
  const words = text.split(" ");
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const w = font.widthOfTextAtSize(testLine, fontSize);
    if (w > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawTableHeader(
  page: PDFPage,
  y: number,
  cols: { x: number; w: number; label: string }[],
  fonts: { bold: PDFFont }
) {
  page.drawRectangle({
    x: MARGIN, y: y - 22, width: CONTENT_W, height: 22,
    color: DARK_BG,
  });
  for (const col of cols) {
    page.drawText(col.label, {
      x: col.x, y: y - 16,
      size: 8, font: fonts.bold, color: CYAN,
    });
  }
}

function drawTableRow(
  page: PDFPage,
  y: number,
  cols: { x: number; value: string }[],
  fonts: { regular: PDFFont; bold: PDFFont },
  isTotal: boolean
) {
  const font = isTotal ? fonts.bold : fonts.regular;
  const size = isTotal ? 10 : 9;
  for (const col of cols) {
    page.drawText(col.value, {
      x: col.x, y, size, font,
      color: isTotal ? DARK : rgb(0.12, 0.12, 0.14),
    });
  }
}

// ─── INVOICE PDF ─────────────────────────────────────────────────

export async function generateInvoicePdf(data: {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  company?: string | null;
  dueDate?: string;
  status: string;
  items: Array<{ description: string; quantity: number; price: number; total: number }>;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string | null;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts = await getFonts(doc);
  const { regular, bold } = fonts;

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let currentPageNum = 1;
  let totalPageEstimate = 5;
  drawPageFrame(page, fonts, currentPageNum, totalPageEstimate, doc);

  let y = PAGE_H - 85;

  // Title
  page.drawText("FACTURA", {
    x: MARGIN, y, size: 22, font: bold, color: DARK,
  });
  y -= 10;
  page.drawText(`#${data.invoiceNumber}`, {
    x: MARGIN + 110, y, size: 12, font: regular, color: GRAY,
  });
  y -= 8;

  // Status badge
  const statusName = data.status === "pagada" ? "Pagada" : data.status === "borrador" ? "Borrador" : "Pendiente";
  page.drawRectangle({
    x: MARGIN, y: y - 18, width: 80, height: 18,
    color: data.status === "pagada" ? rgb(0.1, 0.7, 0.3) : data.status === "borrador" ? GRAY : rgb(0.9, 0.6, 0.1),
  });
  page.drawText(statusName, {
    x: MARGIN + 10, y: y - 14,
    size: 9, font: bold, color: WHITE,
  });
  y -= 40;

  // Divider
  page.drawLine({
    start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y },
    color: LIGHT_GRAY, thickness: 1,
  });
  y -= 25;

  // Client info block
  page.drawText("CLIENTE", {
    x: MARGIN, y, size: 9, font: bold, color: CYAN,
  });
  y -= 18;
  const clientLines = [
    data.clientName,
    data.clientEmail,
    ...(data.company ? [data.company] : []),
  ];
  for (const line of clientLines) {
    page.drawText(line, {
      x: MARGIN, y, size: 10, font: regular, color: DARK,
    });
    y -= 15;
  }

  // Due date on right
  if (data.dueDate) {
    page.drawText("VENCIMIENTO", {
      x: PAGE_W - MARGIN - 100, y: y + 40, size: 9, font: bold, color: CYAN,
    });
    page.drawText(data.dueDate, {
      x: PAGE_W - MARGIN - 100, y: y + 22, size: 10, font: regular, color: DARK,
    });
  }

  y -= 20;
  page.drawLine({
    start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y },
    color: LIGHT_GRAY, thickness: 0.5,
  });
  y -= 30;

  // Items table
  const colDefs = [
    { x: MARGIN, w: 240, label: "DESCRIPCIÓN" },
    { x: MARGIN + 250, w: 60, label: "CANTIDAD" },
    { x: MARGIN + 320, w: 80, label: "PRECIO" },
    { x: MARGIN + 410, w: 90, label: "TOTAL" },
  ];

  drawTableHeader(page, y, colDefs, fonts);
  y -= 30;

  for (const item of data.items) {
    const descLines = wrapText(item.description, colDefs[0].w, 9, regular);
    const rowH = Math.max(descLines.length * 14, 18);

    if (y - rowH < 60) {
      currentPageNum++;
      page = doc.addPage([PAGE_W, PAGE_H]);
      drawPageFrame(page, fonts, currentPageNum, currentPageNum, doc);
      y = PAGE_H - 85;
      drawTableHeader(page, y, colDefs, fonts);
      y -= 30;
    }

    for (let i = 0; i < descLines.length; i++) {
      page.drawText(descLines[i], {
        x: colDefs[0].x, y: y - (i * 14),
        size: 9, font: regular, color: DARK,
      });
    }

    page.drawText(String(item.quantity), {
      x: colDefs[1].x, y,
      size: 9, font: regular, color: DARK,
    });
    page.drawText(`${item.price.toFixed(2)} €`, {
      x: colDefs[2].x, y,
      size: 9, font: regular, color: DARK,
    });
    page.drawText(`${item.total.toFixed(2)} €`, {
      x: colDefs[3].x, y,
      size: 9, font: bold, color: DARK,
    });

    y -= rowH + 4;
    page.drawLine({
      start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y },
      color: LIGHT_GRAY, thickness: 0.3,
    });
    y -= 10;
  }

  // Totals section
  if (y < 140) {
    currentPageNum++;
    page = doc.addPage([PAGE_W, PAGE_H]);
    drawPageFrame(page, fonts, currentPageNum, currentPageNum, doc);
    y = PAGE_H - 120;
  }

  y += 5;
  page.drawLine({
    start: { x: PAGE_W - MARGIN - 200, y }, end: { x: PAGE_W - MARGIN, y },
    color: DARK, thickness: 0.5,
  });
  y -= 20;

  const totals = [
    { label: "Subtotal", value: `${data.subtotal.toFixed(2)} €`, bold: false },
    { label: "IVA", value: `${data.tax.toFixed(2)} €`, bold: false },
  ];
  for (const t of totals) {
    page.drawText(t.label, {
      x: PAGE_W - MARGIN - 190, y, size: 10, font: regular, color: GRAY,
    });
    page.drawText(t.value, {
      x: PAGE_W - MARGIN - 80, y, size: 10, font: regular, color: DARK,
    });
    y -= 18;
  }

  page.drawLine({
    start: { x: PAGE_W - MARGIN - 200, y }, end: { x: PAGE_W - MARGIN, y },
    color: CYAN, thickness: 1,
  });
  y -= 22;

  page.drawText("TOTAL", {
    x: PAGE_W - MARGIN - 190, y,
    size: 14, font: bold, color: DARK,
  });
  page.drawText(`${data.total.toFixed(2)} €`, {
    x: PAGE_W - MARGIN - 80, y,
    size: 14, font: bold, color: DARK,
  });

  // Notes
  if (data.notes) {
    y -= 40;
    if (y < 60) {
      currentPageNum++;
      page = doc.addPage([PAGE_W, PAGE_H]);
      drawPageFrame(page, fonts, currentPageNum, currentPageNum, doc);
      y = PAGE_H - 85;
    }
    page.drawText("NOTAS", {
      x: MARGIN, y, size: 9, font: bold, color: CYAN,
    });
    y -= 18;
    const noteLines = wrapText(data.notes, CONTENT_W, 9, regular);
    for (const line of noteLines) {
      if (y < 40) break;
      page.drawText(line, {
        x: MARGIN, y, size: 9, font: regular, color: GRAY,
      });
      y -= 14;
    }
  }

  return doc.save();
}

// ─── PITCH DECK PDF ──────────────────────────────────────────────

export async function generatePitchDeckPdf(data: {
  title: string;
  clientType?: string | null;
  objective?: string | null;
  sections: Array<{ title: string; content: string }>;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts = await getFonts(doc);
  const { regular, bold } = fonts;
  const totalSections = data.sections.length;
  const totalPages = totalSections + 1;

  // Cover page
  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({
    x: 0, y: 0, width: PAGE_W, height: PAGE_H,
    color: DARK,
  });

  const banner = loadBanner();
  if (banner) {
    try {
      const img = doc.embedPng(banner);
      const aspect = img.width / img.height;
      const h = 50;
      const w = h * aspect;
      cover.drawImage(img, {
        x: MARGIN, y: PAGE_H - 70,
        width: Math.min(w, 200), height: h,
      });
    } catch {}
  } else {
    cover.drawText("NexoraAI", {
      x: MARGIN, y: PAGE_H - 55,
      size: 22, font: bold, color: CYAN,
    });
  }

  cover.drawText(data.title, {
    x: MARGIN, y: PAGE_H / 2 + 40,
    size: 30, font: bold, color: WHITE,
  });

  if (data.clientType) {
    cover.drawText(data.clientType, {
      x: MARGIN, y: PAGE_H / 2,
      size: 14, font: regular, color: MID_GRAY,
    });
  }

  if (data.objective) {
    cover.drawText(data.objective, {
      x: MARGIN, y: PAGE_H / 2 - 25,
      size: 11, font: regular, color: GRAY,
    });
  }

  cover.drawText("Generado con NexoraAI — PitchDeck IA", {
    x: MARGIN, y: 40,
    size: 9, font: regular, color: GRAY,
  });

  // Section slides
  for (let i = 0; i < data.sections.length; i++) {
    const section = data.sections[i];
    const page = doc.addPage([PAGE_W, PAGE_H]);
    drawPageFrame(page, fonts, i + 2, totalPages, doc);

    let y = PAGE_H - 90;

    // Section number
    page.drawText(`${String(i + 1).padStart(2, "0")}`, {
      x: MARGIN, y, size: 40, font: bold, color: LIGHT_GRAY,
    });
    y -= 5;

    // Section title
    page.drawText(section.title.toUpperCase(), {
      x: MARGIN + 50, y, size: 18, font: bold, color: DARK,
    });
    y -= 10;

    page.drawLine({
      start: { x: MARGIN, y }, end: { x: MARGIN + 100, y },
      color: CYAN, thickness: 2,
    });
    y -= 30;

    // Content
    const contentLines = wrapText(section.content, CONTENT_W - 20, 11, regular);
    for (const line of contentLines) {
      if (y < 60) {
        // New page
        break;
      }
      page.drawText(line, {
        x: MARGIN, y, size: 11, font: regular, color: rgb(0.15, 0.15, 0.17),
      });
      y -= 18;
    }
  }

  return doc.save();
}

// ─── EBOOK PDF ────────────────────────────────────────────────────

export async function generateEbookPdf(data: {
  title: string;
  content: string;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts = await getFonts(doc);
  const { regular, bold } = fonts;

  // Cover
  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({
    x: 0, y: 0, width: PAGE_W, height: PAGE_H,
    color: DARK,
  });

  const banner = loadBanner();
  if (banner) {
    try {
      const img = doc.embedPng(banner);
      const aspect = img.width / img.height;
      const h = 50;
      const w = h * aspect;
      cover.drawImage(img, {
        x: MARGIN, y: PAGE_H - 70,
        width: Math.min(w, 200), height: h,
      });
    } catch {}
  } else {
    cover.drawText("NexoraAI", {
      x: MARGIN, y: PAGE_H - 55,
      size: 22, font: bold, color: CYAN,
    });
  }

  cover.drawText(data.title, {
    x: MARGIN, y: PAGE_H / 2 + 20,
    size: 28, font: bold, color: WHITE,
  });

  cover.drawText("Generado con NexoraAI — Ebook IA", {
    x: MARGIN, y: 40,
    size: 9, font: regular, color: GRAY,
  });

  // Content
  const paragraphs = data.content.split("\n").filter(Boolean);
  let page = doc.addPage([PAGE_W, PAGE_H]);
  let pageNum = 2;
  const totalPages = Math.max(2, Math.ceil(paragraphs.length / 15) + 1);
  drawPageFrame(page, fonts, pageNum, totalPages, doc);
  let y = PAGE_H - 85;

  for (const para of paragraphs) {
    if (y < 70) {
      pageNum++;
      page = doc.addPage([PAGE_W, PAGE_H]);
      drawPageFrame(page, fonts, pageNum, totalPages, doc);
      y = PAGE_H - 85;
    }

    const isHeader = para.startsWith("#");
    const text = para.replace(/^#+\s*/, "").trim();
    if (!text) continue;

    const fontSize = isHeader ? 16 : 10;
    const font = isHeader ? bold : regular;
    const color = isHeader ? DARK : rgb(0.15, 0.15, 0.17);

    if (isHeader) y -= 8;

    const lines = wrapText(text, CONTENT_W, fontSize, font);
    for (const line of lines) {
      if (y < 70) {
        pageNum++;
        page = doc.addPage([PAGE_W, PAGE_H]);
        drawPageFrame(page, fonts, pageNum, totalPages, doc);
        y = PAGE_H - 85;
      }
      page.drawText(line, {
        x: MARGIN, y, size: fontSize, font, color,
      });
      y -= fontSize + 6;
    }

    if (isHeader) y -= 6;
  }

  return doc.save();
}

// ─── REPORT PDF ───────────────────────────────────────────────────

export async function generateReportPdf(data: {
  title: string;
  metrics: Array<{ label: string; value: string; color?: string }>;
  sections: Array<{ title: string; content: string; metrics?: Array<{ label: string; value: string }> }>;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts = await getFonts(doc);
  const { regular, bold } = fonts;

  // Cover
  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({
    x: 0, y: 0, width: PAGE_W, height: PAGE_H,
    color: DARK,
  });

  const banner = loadBanner();
  if (banner) {
    try {
      const img = doc.embedPng(banner);
      const aspect = img.width / img.height;
      const h = 50;
      const w = h * aspect;
      cover.drawImage(img, {
        x: MARGIN, y: PAGE_H - 70,
        width: Math.min(w, 200), height: h,
      });
    } catch {}
  } else {
    cover.drawText("NexoraAI", {
      x: MARGIN, y: PAGE_H - 55,
      size: 22, font: bold, color: CYAN,
    });
  }

  cover.drawText(data.title, {
    x: MARGIN, y: PAGE_H / 2 + 30,
    size: 26, font: bold, color: WHITE,
  });

  cover.drawText("Informe ejecutivo generado por NexoraAI", {
    x: MARGIN, y: PAGE_H / 2 - 10,
    size: 12, font: regular, color: GRAY,
  });

  let page = doc.addPage([PAGE_W, PAGE_H]);
  const totalPages = data.sections.length + 2;
  drawPageFrame(page, fonts, 2, totalPages, doc);
  let y = PAGE_H - 85;

  // Metrics cards
  page.drawText("RESUMEN", {
    x: MARGIN, y, size: 14, font: bold, color: DARK,
  });
  y -= 30;

  for (const metric of data.metrics) {
    if (y < 80) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      drawPageFrame(page, fonts, 3, totalPages, doc);
      y = PAGE_H - 85;
    }

    page.drawRectangle({
      x: MARGIN, y: y - 40, width: CONTENT_W, height: 45,
      color: DARK_BG,
    });
    page.drawText(metric.label.toUpperCase(), {
      x: MARGIN + 15, y: y - 15,
      size: 8, font: bold, color: CYAN,
    });
    page.drawText(metric.value, {
      x: MARGIN + 15, y: y - 33,
      size: 16, font: bold, color: WHITE,
    });
    y -= 55;
  }

  y -= 15;

  // Sections
  for (const section of data.sections) {
    if (y < 100) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      drawPageFrame(page, fonts, 3, totalPages, doc);
      y = PAGE_H - 85;
    }

    page.drawLine({
      start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y },
      color: LIGHT_GRAY, thickness: 1,
    });
    y -= 22;

    page.drawText(section.title.toUpperCase(), {
      x: MARGIN, y, size: 13, font: bold, color: DARK,
    });
    y -= 5;
    page.drawLine({
      start: { x: MARGIN, y }, end: { x: MARGIN + 60, y },
      color: CYAN, thickness: 2,
    });
    y -= 25;

    const lines = wrapText(section.content, CONTENT_W, 10, regular);
    for (const line of lines) {
      if (y < 60) {
        page = doc.addPage([PAGE_W, PAGE_H]);
        drawPageFrame(page, fonts, 3, totalPages, doc);
        y = PAGE_H - 85;
      }
      page.drawText(line, {
        x: MARGIN, y, size: 10, font: regular, color: rgb(0.15, 0.15, 0.17),
      });
      y -= 16;
    }
    y -= 10;
  }

  return doc.save();
}
