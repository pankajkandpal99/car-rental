"use client";
import { useEffect, useState } from "react";
import { getAuditLogs } from "@/lib/localStorageAudit";
import { AuditLog } from "@/types/db-types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const storedLogs = getAuditLogs();
    const transformedLogs = storedLogs.map((log) => ({
      ...log,
    }));
    setLogs(transformedLogs);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">Audit Logs</h1>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No audit logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Action</th>
                    <th className="py-3 px-4 text-left">Listing ID</th>
                    <th className="py-3 px-4 text-left">Admin ID</th>
                    <th className="py-3 px-4 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            log.action === "approved"
                              ? "bg-green-100 text-green-800"
                              : log.action === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4">{log.listingId}</td>
                      <td className="py-3 px-4">Admin #{log.userId}</td>
                      <td className="py-3 px-4">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
