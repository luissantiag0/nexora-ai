import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const LEAD_STATUSES = ["new", "contacted", "qualified", "proposal_sent", "closed_won", "closed_lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
const FOLLOW_UP_TRIGGER_STATUSES: LeadStatus[] = ["new", "contacted"];

export type LeadNote = {
  id: string;
  text: string;
  createdAt: string;
};

export type LeadFollowUp = {
  shouldFollowUp: boolean;
  preparedAt: string | null;
  subject: string;
  body: string;
};

export type StoredLead = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
  status: LeadStatus;
  notes: LeadNote[];
  followUp: LeadFollowUp;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export const getSuggestedNextAction = (status: LeadStatus): string => {
  const actionMap: Record<LeadStatus, string> = {
    new: "Send intro email and propose a 30-minute automation audit.",
    contacted: "Follow up within 48 hours and confirm decision timeline.",
    qualified: "Prepare scope summary and draft proposal.",
    proposal_sent: "Schedule proposal review call and handle objections.",
    closed_won: "Kick off onboarding and define implementation milestones.",
    closed_lost: "Capture loss reason and set nurture reminder."
  };
  return actionMap[status];
};

export const getSuggestedOutreachMessage = (status: LeadStatus, lead: Pick<StoredLead, "name" | "company">): string => {
  const messageMap: Record<LeadStatus, string> = {
    new: `Hi ${lead.name}, thanks for reaching out. I'd like to share a quick automation audit for ${lead.company} and identify your highest-ROI opportunities.`,
    contacted: `Hi ${lead.name}, following up on our previous message. Are you available this week to review next steps for ${lead.company}?`,
    qualified: `Hi ${lead.name}, based on your goals, we prepared a tailored approach for ${lead.company}. Can we review scope and priorities together?`,
    proposal_sent: `Hi ${lead.name}, checking in on the proposal. Happy to walk through timeline, deliverables, and expected ROI with your team.`,
    closed_won: `Hi ${lead.name}, excited to start with ${lead.company}. We'll send kickoff details and implementation milestones shortly.`,
    closed_lost: `Hi ${lead.name}, thanks for the update. We'd value any feedback and can reconnect when priorities shift at ${lead.company}.`
  };
  return messageMap[status];
};

export const buildFollowUpPayload = (lead: Pick<StoredLead, "name" | "email" | "company" | "status">): LeadFollowUp => {
  if (!FOLLOW_UP_TRIGGER_STATUSES.includes(lead.status)) {
    return {
      shouldFollowUp: false,
      preparedAt: null,
      subject: "",
      body: ""
    };
  }

  const subject =
    lead.status === "new"
      ? `Next steps for ${lead.company} automation audit`
      : `Following up on your NexoraAI request`;
  const body = getSuggestedOutreachMessage(lead.status, {
    name: lead.name,
    company: lead.company
  });

  return {
    shouldFollowUp: true,
    preparedAt: new Date().toISOString(),
    subject,
    body
  };
};

const ensureDataFile = async () => {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const existing = await readFile(LEADS_FILE, "utf-8");
    const normalized = existing.trim();
    if (!normalized) {
      await writeFile(LEADS_FILE, "[]", "utf-8");
      console.warn("[lead-storage] leads.json was empty. Reset to [].");
      return;
    }
    const parsed = JSON.parse(normalized);
    if (!Array.isArray(parsed)) {
      await writeFile(LEADS_FILE, "[]", "utf-8");
      console.warn("[lead-storage] leads.json was not an array. Reset to [].");
    }
  } catch {
    await writeFile(LEADS_FILE, "[]", "utf-8");
    console.warn("[lead-storage] leads.json missing/corrupt. Created fresh [].");
  }
};

export const readLeads = async (): Promise<StoredLead[]> => {
  await ensureDataFile();
  try {
    const raw = await readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        const statusValue = String(item?.status ?? "new");
        const status = (LEAD_STATUSES as readonly string[]).includes(statusValue) ? (statusValue as LeadStatus) : "new";
        return {
          id: String(item?.id ?? randomUUID()),
          name: String(item?.name ?? ""),
          email: String(item?.email ?? ""),
          company: String(item?.company ?? ""),
          message: String(item?.message ?? ""),
          timestamp: String(item?.timestamp ?? ""),
          status,
          notes: Array.isArray(item?.notes)
            ? item.notes
                .map((note: unknown) => ({
                  id: String((note as { id?: string })?.id ?? randomUUID()),
                  text: String((note as { text?: string })?.text ?? "").trim(),
                  createdAt: String((note as { createdAt?: string })?.createdAt ?? new Date().toISOString())
                }))
                .filter((note: LeadNote) => Boolean(note.text))
            : [],
          followUp:
            typeof item?.followUp === "object" && item?.followUp
              ? {
                  shouldFollowUp: Boolean((item.followUp as { shouldFollowUp?: boolean }).shouldFollowUp),
                  preparedAt: String((item.followUp as { preparedAt?: string }).preparedAt ?? ""),
                  subject: String((item.followUp as { subject?: string }).subject ?? ""),
                  body: String((item.followUp as { body?: string }).body ?? "")
                }
              : buildFollowUpPayload({
                  name: String(item?.name ?? ""),
                  email: String(item?.email ?? ""),
                  company: String(item?.company ?? ""),
                  status
                })
        };
      })
      .filter((lead) => lead.id && lead.name && lead.email && lead.company && lead.message && lead.timestamp);
  } catch (error) {
    console.error("[lead-storage] Failed to read leads:", error);
    try {
      await writeFile(LEADS_FILE, "[]", "utf-8");
      console.warn("[lead-storage] leads.json reset to [] after read failure.");
    } catch (resetError) {
      console.error("[lead-storage] Failed to reset leads.json:", resetError);
    }
    return [];
  }
};

let writeQueue: Promise<void> = Promise.resolve();

export const appendLead = async (lead: StoredLead): Promise<void> => {
  writeQueue = writeQueue.then(async () => {
    const currentLeads = await readLeads();
    currentLeads.push(lead);
    await writeFile(LEADS_FILE, JSON.stringify(currentLeads, null, 2), "utf-8");
  });

  return writeQueue;
};

export const updateLeadStatus = async (leadId: string, status: LeadStatus): Promise<boolean> => {
  if (!(LEAD_STATUSES as readonly string[]).includes(status)) return false;

  let updated = false;
  writeQueue = writeQueue.then(async () => {
    const currentLeads = await readLeads();
    const nextLeads = currentLeads.map((lead) => {
      if (lead.id !== leadId) return lead;
      updated = true;
      return {
        ...lead,
        status,
        followUp: buildFollowUpPayload({
          name: lead.name,
          email: lead.email,
          company: lead.company,
          status
        })
      };
    });
    if (updated) {
      await writeFile(LEADS_FILE, JSON.stringify(nextLeads, null, 2), "utf-8");
    }
  });

  await writeQueue;
  return updated;
};

export const addLeadNote = async (leadId: string, noteText: string): Promise<boolean> => {
  const text = noteText.trim();
  if (!text) return false;

  let updated = false;
  writeQueue = writeQueue.then(async () => {
    const currentLeads = await readLeads();
    const nextLeads = currentLeads.map((lead) => {
      if (lead.id !== leadId) return lead;
      updated = true;
      return {
        ...lead,
        notes: [
          ...lead.notes,
          {
            id: randomUUID(),
            text,
            createdAt: new Date().toISOString()
          }
        ]
      };
    });
    if (updated) {
      await writeFile(LEADS_FILE, JSON.stringify(nextLeads, null, 2), "utf-8");
    }
  });

  await writeQueue;
  return updated;
};
