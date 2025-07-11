/* eslint-disable @typescript-eslint/no-explicit-any */
type AuditLogEntry = {
  id: string;
  action: string;
  listingId: number;
  userId: number;
  previousData?: any;
  newData?: any;
  createdAt: string;
  updatedAt: string;
};

const AUDIT_LOG_KEY = "auditLog";

export const logAction = (
  entry: Omit<AuditLogEntry, "id" | "createdAt" | "updatedAt">
) => {
  if (typeof window === "undefined") return;

  try {
    const logs = getAuditLogs();
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify([newEntry, ...logs]));
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};

export const getAuditLogs = (): AuditLogEntry[] => {
  if (typeof window === "undefined") return [];

  try {
    const logs = localStorage.getItem(AUDIT_LOG_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error("Failed to get audit logs:", error);
    return [];
  }
};

export const clearAuditLogs = () => {
  localStorage.removeItem(AUDIT_LOG_KEY);
};
