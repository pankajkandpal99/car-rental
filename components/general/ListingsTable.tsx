/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteListing,
  updateListingStatus,
} from "@/services/listings.service";
import { Listing } from "@/types/db-types";
import { logAction } from "@/lib/localStorageAudit";

interface ListingTableProps {
  listings: Listing[];
  onListingUpdate: (updatedListing: Listing) => void;
  onListingDelete: (deletedId: string) => void;
  userId: number;
}

export default function ListingTable({
  listings,
  onListingUpdate,
  onListingDelete,
  userId,
}: ListingTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredListings = listings.filter((listing) =>
    statusFilter === "all" ? true : listing.status === statusFilter
  );

  const handleStatusChange = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const updatedListing = await updateListingStatus(
        Number(id),
        status,
        userId
      );
      onListingUpdate(updatedListing);

      logAction({
        action: status,
        listingId: Number(id),
        userId: userId,
        previousData: listings.find((l) => l.id === id),
        newData: updatedListing,
      });

      toast("Status Changed");
    } catch (error: any) {
      toast(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const listingToDelete = listings.find((l) => l.id === id);
      await deleteListing(Number(id));
      onListingDelete(id);

      // Log the delete action
      logAction({
        action: "deleted",
        listingId: Number(id),
        userId: userId,
        previousData: listingToDelete,
      });

      toast("Listing deleted");
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700">
            Filter by status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="text-sm text-slate-600">
          Showing {filteredListings.length} of {listings.length} listings
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing, index) => (
                  <tr
                    key={listing.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-25"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {listing.title}
                      </div>
                      <div className="text-sm text-slate-500 truncate max-w-xs">
                        {listing.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-900">
                       ${listing.price}
                      </div>
                      <div className="text-xs text-slate-500">per day</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {listing.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          listing.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : listing.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {(listing.status ?? "pending").charAt(0).toUpperCase() +
                          (listing.status ?? "pending").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(listing.id as string, "approved")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(listing.id as string, "rejected")
                          }
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          Reject
                        </button>
                        <Link
                          href={`/dashboard/listings/${listing.id}`}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(listing.id as string)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="text-slate-500">
                      No listings found for the selected filter.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
