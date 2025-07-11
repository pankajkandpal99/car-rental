const auditLog: Array<{
  id: string;
  action: "approved" | "rejected" | "edited" | "deleted";
  listingId: string;
  adminId: number;
  timestamp: Date;
  details?: Record<string, unknown>;
}> = [];

export const logAction = (
  action: "approved" | "rejected" | "edited" | "deleted",
  listingId: string,
  adminId: number,
  details?: Record<string, unknown>
) => {
  auditLog.push({
    id: Math.random().toString(36).substring(2, 9),
    action,
    listingId,
    adminId,
    timestamp: new Date(),
    details,
  });
};

export const getAuditLogs = () => {
  return [...auditLog].reverse(); // Latest first
};
