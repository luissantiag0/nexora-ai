import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// ─── CONSTANTS ──────────────────────────────────────────────────

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
const GREEN = rgb(0.1, 0.75, 0.35);
const AMBER = rgb(0.9, 0.65, 0.1);

// ─── BANNER ──────────────────────────────────────────────────────

let bannerCache: Uint8Array | null = null;

function loadBanner(): Uint8Array | null {
  if (bannerCache) return bannerCache;
  const paths = [
    join(process.cwd(), "banner-averion.png"),
    join(process.cwd(), "public", "banner-averion.png"),
  ];
  for (const p of paths) {
    try { bannerCache = readFileSync(p); return bannerCache; } catch { }
  }
  console.warn("[pdf] banner-averion.png no encontrado");
  return null;
}

// ─── FONTS ──────────────────────────────────────────────────────

async function getFonts(doc: PDFDocument) {
  return {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    mono: await doc.embedFont(StandardFonts.Courier),
  };
}

// ─── SHARED DRAWING HELPERS ─────────────────────────────────────

function wrapText(text: string, maxWidth: number, fontSize: number, font: PDFFont): string[] {
  const lines: string[] = [];
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, fontSize) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawBannerOnPage(page: PDFPage, doc: PDFDocument, yPos: number) {
  const banner = loadBanner();
  if (!banner) return false;
  try {
    const img = doc.embedPng(banner);
    const aspect = img.width / img.height;
    const h = 40;
    const w = Math.min(h * aspect, 180);
    page.drawImage(img, { x: MARGIN, y: yPos - h, width: w, height: h });
    return true;
  } catch { return false; }
}

function drawHeader(page: PDFPage, fonts: { bold: PDFFont; regular: PDFFont }, doc: PDFDocument, title: string) {
  const { width, height } = page.getSize();
  const barY = height - 56;
  page.drawRectangle({ x: 0, y: barY, width, height: 56, color: DARK_BG });
  page.drawRectangle({ x: 0, y: height - 3, width, height: 3, color: CYAN });
  if (!drawBannerOnPage(page, doc, barY + 48)) {
    page.drawText("AverionAI", { x: MARGIN, y: barY + 20, size: 16, font: fonts.bold, color: CYAN });
    page.drawText("Automatización con IA", { x: MARGIN + 115, y: barY + 23, size: 8, font: fonts.regular, color: MID_GRAY });
  }
  page.drawText(title, { x: width - MARGIN - 120, y: barY + 22, size: 10, font: fonts.bold, color: WHITE });
}

function drawFooter(page: PDFPage, fonts: { regular: PDFFont }, pageNum: number, totalPages: number) {
  const { width } = page.getSize();
  page.drawRectangle({ x: 0, y: 0, width, height: 28, color: DARK_BG });
  page.drawText("AverionAI — Automatización con IA", { x: MARGIN, y: 9, size: 7, font: fonts.regular, color: GRAY });
  page.drawText(`Página ${pageNum}${totalPages > 0 ? ` de ${totalPages}` : ""}`, { x: width - MARGIN - 70, y: 9, size: 7, font: fonts.regular, color: GRAY });
}

function drawDivider(page: PDFPage, y: number) {
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, color: LIGHT_GRAY, thickness: 0.5 });
}

function drawLabeledValue(page: PDFPage, label: string, value: string, x: number, y: number, fonts: { bold: PDFFont; regular: PDFFont }) {
  page.drawText(label, { x, y, size: 7, font: fonts.bold, color: GRAY });
  page.drawText(value, { x, y: y - 14, size: 10, font: fonts.regular, color: DARK });
}

function drawTableRow(page: PDFPage, y: number, cols: { x: number; value: string }[], fonts: { regular: PDFFont; bold: PDFFont }, isTotal = false) {
  const f = isTotal ? fonts.bold : fonts.regular;
  const s = isTotal ? 10 : 9;
  for (const col of cols) {
    page.drawText(col.value, { x: col.x, y, size: s, font: f, color: DARK });
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
  let pn = 1;
  drawHeader(page, fonts, doc, "FACTURA");
  drawFooter(page, fonts, pn, 0);

  let y = PAGE_H - 90;

  // Title
  page.drawText("FACTURA", { x: MARGIN, y, size: 26, font: bold, color: DARK });
  page.drawText(`#${data.invoiceNumber}`, { x: MARGIN + 120, y, size: 12, font: regular, color: GRAY });
  y -= 12;

  // Status badge
  const statusName = data.status === "pagada" ? "PAGADA" : data.status === "borrador" ? "BORRADOR" : "PENDIENTE";
  const badgeColor = data.status === "pagada" ? GREEN : data.status === "borrador" ? GRAY : AMBER;
  page.drawRectangle({ x: MARGIN, y: y - 18, width: 90, height: 18, color: badgeColor });
  page.drawText(statusName, { x: MARGIN + 12, y: y - 14, size: 9, font: bold, color: WHITE });
  y -= 42;

  drawDivider(page, y);
  y -= 28;

  // Client info
  page.drawText("CLIENTE", { x: MARGIN, y, size: 8, font: bold, color: CYAN });
  y -= 16;
  page.drawText(data.clientName, { x: MARGIN, y, size: 11, font: bold, color: DARK });
  y -= 15;
  page.drawText(data.clientEmail, { x: MARGIN, y, size: 10, font: regular, color: GRAY });
  if (data.company) { y -= 15; page.drawText(data.company, { x: MARGIN, y, size: 10, font: regular, color: GRAY }); }
  y -= 10;

  // Due date on right
  if (data.dueDate) {
    drawLabeledValue(page, "VENCIMIENTO", data.dueDate, PAGE_W - MARGIN - 90, y + 33, fonts);
  }
  y -= 25;

  drawDivider(page, y);
  y -= 30;

  // Items table header
  const cols = [
    { x: MARGIN, w: 230, label: "DESCRIPCIÓN" },
    { x: MARGIN + 240, w: 55, label: "CANT." },
    { x: MARGIN + 305, w: 80, label: "PRECIO" },
    { x: MARGIN + 395, w: 90, label: "TOTAL" },
  ];
  page.drawRectangle({ x: MARGIN, y: y - 22, width: CONTENT_W, height: 22, color: DARK_BG });
  for (const c of cols) page.drawText(c.label, { x: c.x, y: y - 16, size: 8, font: bold, color: CYAN });
  y -= 30;

  // Items
  for (const item of data.items) {
    if (y < 90) { pn++; page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, "FACTURA"); drawFooter(page, fonts, pn, 0); y = PAGE_H - 90; }
    const descLines = wrapText(item.description, cols[0].w, 9, regular);
    const rowH = Math.max(descLines.length * 14, 20);
    if (y - rowH < 50) { pn++; page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, "FACTURA"); drawFooter(page, fonts, pn, 0); y = PAGE_H - 90; }
    for (let i = 0; i < descLines.length; i++) page.drawText(descLines[i], { x: cols[0].x, y: y - (i * 14), size: 9, font: regular, color: DARK });
    drawTableRow(page, y, [
      { x: cols[1].x, value: String(item.quantity) },
      { x: cols[2].x, value: `${item.price.toFixed(2)} €` },
      { x: cols[3].x, value: `${item.total.toFixed(2)} €` },
    ], fonts);
    y -= rowH + 6;
    drawDivider(page, y);
    y -= 10;
  }

  // Totals
  if (y < 160) { pn++; page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, "FACTURA"); drawFooter(page, fonts, pn, 0); y = PAGE_H - 130; }
  y += 5;
  const totalX = PAGE_W - MARGIN - 200;
  page.drawLine({ start: { x: totalX, y }, end: { x: PAGE_W - MARGIN, y }, color: DARK, thickness: 0.5 });
  y -= 20;
  [
    { label: "Subtotal", value: `${data.subtotal.toFixed(2)} €` },
    { label: "IVA", value: `${data.tax.toFixed(2)} €` },
  ].forEach(t => {
    page.drawText(t.label, { x: totalX, y, size: 10, font: regular, color: GRAY });
    page.drawText(t.value, { x: totalX + 110, y, size: 10, font: bold, color: DARK });
    y -= 18;
  });
  page.drawLine({ start: { x: totalX, y }, end: { x: PAGE_W - MARGIN, y }, color: CYAN, thickness: 1 });
  y -= 22;
  page.drawText("TOTAL", { x: totalX, y, size: 14, font: bold, color: DARK });
  page.drawText(`${data.total.toFixed(2)} €`, { x: totalX + 110, y, size: 14, font: bold, color: DARK });

  // Notes
  if (data.notes) {
    y -= 40;
    if (y < 60) { pn++; page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, "FACTURA"); drawFooter(page, fonts, pn, 0); y = PAGE_H - 90; }
    page.drawText("NOTAS", { x: MARGIN, y, size: 8, font: bold, color: CYAN });
    y -= 16;
    wrapText(data.notes, CONTENT_W, 9, regular).forEach(line => {
      if (y < 30) return;
      page.drawText(line, { x: MARGIN, y, size: 9, font: regular, color: GRAY });
      y -= 14;
    });
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
  const total = data.sections.length + 1;

  // Cover
  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: DARK });
  if (!drawBannerOnPage(cover, doc, PAGE_H - 60)) {
    cover.drawText("AverionAI", { x: MARGIN, y: PAGE_H - 55, size: 22, font: bold, color: CYAN });
  }
  cover.drawText(data.title, { x: MARGIN, y: PAGE_H / 2 + 40, size: 30, font: bold, color: WHITE });
  if (data.clientType) cover.drawText(data.clientType, { x: MARGIN, y: PAGE_H / 2, size: 14, font: regular, color: MID_GRAY });
  if (data.objective) cover.drawText(data.objective, { x: MARGIN, y: PAGE_H / 2 - 25, size: 11, font: regular, color: GRAY });
  cover.drawText("Generado con AverionAI — PitchDeck IA", { x: MARGIN, y: 40, size: 9, font: regular, color: GRAY });

  // Slides
  for (let i = 0; i < data.sections.length; i++) {
    const sec = data.sections[i];
    const page = doc.addPage([PAGE_W, PAGE_H]);
    drawHeader(page, fonts, doc, `SECCIÓN ${i + 1}`);
    drawFooter(page, fonts, i + 2, total);

    let y = PAGE_H - 95;
    page.drawText(`${String(i + 1).padStart(2, "0")}`, { x: MARGIN, y, size: 40, font: bold, color: LIGHT_GRAY });
    y -= 5;
    page.drawText(sec.title.toUpperCase(), { x: MARGIN + 55, y, size: 18, font: bold, color: DARK });
    y -= 8;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + 80, y }, color: CYAN, thickness: 2 });
    y -= 30;

    const lines = wrapText(sec.content, CONTENT_W - 10, 11, regular);
    for (const line of lines) {
      if (y < 60) break;
      page.drawText(line, { x: MARGIN, y, size: 11, font: regular, color: rgb(0.15, 0.15, 0.17) });
      y -= 18;
    }
  }
  return doc.save();
}

// ─── EBOOK PDF ───────────────────────────────────────────────────

function safeEbookContent(content: string): string {
  if (!content) return "# Sin contenido\n\nEl contenido del ebook está vacío o en formato incorrecto.";
  try {
    const parsed = JSON.parse(content);
    if (parsed.summary || parsed.priority) {
      return [
        "# Resumen",
        parsed.summary || "Sin resumen disponible",
        parsed.opportunity ? `# Oportunidad\n\n${parsed.opportunity}` : "",
        parsed.tags?.length ? `# Etiquetas\n\n${parsed.tags.join(", ")}` : "",
      ].filter(Boolean).join("\n\n");
    }
  } catch {}
  return content;
}

export async function generateEbookPdf(data: { title: string; content: string }): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts = await getFonts(doc);
  const { regular, bold } = fonts;

  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: DARK });
  if (!drawBannerOnPage(cover, doc, PAGE_H - 60)) {
    cover.drawText("AverionAI", { x: MARGIN, y: PAGE_H - 55, size: 22, font: bold, color: CYAN });
  }
  cover.drawText(data.title, { x: MARGIN, y: PAGE_H / 2 + 20, size: 28, font: bold, color: WHITE });
  cover.drawText("Generado con AverionAI — Ebook IA", { x: MARGIN, y: 40, size: 9, font: regular, color: GRAY });

  const safeContent = safeEbookContent(data.content);
  const paragraphs = safeContent.split("\n").filter(Boolean);
  let page = doc.addPage([PAGE_W, PAGE_H]);
  let pn = 2;
  const totalPages = Math.max(2, Math.ceil(paragraphs.length / 15) + 1);
  drawHeader(page, fonts, doc, data.title);
  drawFooter(page, fonts, pn, totalPages);
  let y = PAGE_H - 90;

  for (const para of paragraphs) {
    if (y < 70) { pn++; page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, data.title); drawFooter(page, fonts, pn, totalPages); y = PAGE_H - 90; }
    const isHeader = para.startsWith("#");
    const text = para.replace(/^#+\s*/, "").trim();
    if (!text) continue;
    const sz = isHeader ? 16 : 10;
    const f = isHeader ? bold : regular;
    if (isHeader) y -= 8;
    const lines = wrapText(text, CONTENT_W, sz, f);
    for (const line of lines) {
      if (y < 70) { pn++; page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, data.title); drawFooter(page, fonts, pn, totalPages); y = PAGE_H - 90; }
      page.drawText(line, { x: MARGIN, y, size: sz, font: f, color: isHeader ? DARK : rgb(0.15, 0.15, 0.17) });
      y -= sz + 6;
    }
    if (isHeader) y -= 6;
  }
  return doc.save();
}

// ─── REPORT PDF ──────────────────────────────────────────────────

export async function generateReportPdf(data: {
  title: string;
  metrics: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; content: string }>;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts = await getFonts(doc);
  const { regular, bold } = fonts;
  const total = data.sections.length + 2;

  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: DARK });
  if (!drawBannerOnPage(cover, doc, PAGE_H - 60)) {
    cover.drawText("AverionAI", { x: MARGIN, y: PAGE_H - 55, size: 22, font: bold, color: CYAN });
  }
  cover.drawText(data.title, { x: MARGIN, y: PAGE_H / 2 + 30, size: 26, font: bold, color: WHITE });
  cover.drawText("Informe ejecutivo generado por AverionAI", { x: MARGIN, y: PAGE_H / 2 - 10, size: 12, font: regular, color: GRAY });

  let page = doc.addPage([PAGE_W, PAGE_H]);
  drawHeader(page, fonts, doc, data.title);
  drawFooter(page, fonts, 2, total);
  let y = PAGE_H - 90;

  page.drawText("RESUMEN EJECUTIVO", { x: MARGIN, y, size: 14, font: bold, color: DARK });
  y -= 30;

  // Metrics cards
  const metricsPerRow = 2;
  const cardW = (CONTENT_W - 15) / 2;
  data.metrics.forEach((m, i) => {
    if (y < 100) { page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, data.title); drawFooter(page, fonts, 3, total); y = PAGE_H - 90; }
    const col = i % metricsPerRow;
    const row = Math.floor(i / metricsPerRow);
    const cx = MARGIN + col * (cardW + 15);
    const cy = y - row * 55;
    if (cy < 80) return;
    page.drawRectangle({ x: cx, y: cy - 45, width: cardW, height: 45, color: DARK_BG });
    page.drawText(m.label.toUpperCase(), { x: cx + 15, y: cy - 15, size: 7, font: bold, color: CYAN });
    page.drawText(m.value, { x: cx + 15, y: cy - 35, size: 18, font: bold, color: WHITE });
  });
  y -= 60;

  // Sections
  for (const section of data.sections) {
    if (y < 100) { page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, data.title); drawFooter(page, fonts, 3, total); y = PAGE_H - 90; }
    drawDivider(page, y);
    y -= 22;
    page.drawText(section.title.toUpperCase(), { x: MARGIN, y, size: 14, font: bold, color: DARK });
    y -= 6;
    drawDivider(page, y);
    y -= 28;
    const lines = wrapText(section.content, CONTENT_W, 10, regular);
    for (const line of lines) {
      if (y < 60) { page = doc.addPage([PAGE_W, PAGE_H]); drawHeader(page, fonts, doc, data.title); drawFooter(page, fonts, 3, total); y = PAGE_H - 90; }
      page.drawText(line, { x: MARGIN, y, size: 10, font: regular, color: rgb(0.15, 0.15, 0.17) });
      y -= 16;
    }
    y -= 12;
  }
  return doc.save();
}
