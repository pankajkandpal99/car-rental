"use client";
import ListingTable from "@/components/general/ListingsTable";
import Loader from "@/components/general/Loader";
import { useAuth } from "@/hooks/use-auth";
import { getListings } from "@/services/listings.service";
import { Listing } from "@/types/db-types";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/general/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ListingsPage() {
  const { isAuthenticated, isLoading: isAuthLoading, userId } = useAuth();

  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState<string>("all");
  const limit = 10;

  useEffect(() => {
    if (isAuthenticated) {
      const fetchListings = async () => {
        try {
          setIsLoading(true);
          const { listings, total } = await getListings(currentPage, limit);

          // Filter listings based on selected filter
          let filteredListings = listings;
          if (filter !== "all") {
            filteredListings = listings.filter(
              (listing) => listing.status === filter
            );
          }

          setListings(filteredListings);
          setTotalItems(total);
          setTotalPages(Math.ceil(total / limit));
        } catch (error) {
          console.error("Failed to fetch listings:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchListings();
    }
  }, [isAuthenticated, currentPage, filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleListingUpdate = (updatedListing: Listing) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === updatedListing.id ? updatedListing : listing
      )
    );
  };

  const handleListingDelete = (deletedId: string) => {
    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== deletedId)
    );
    setTotalItems((prev) => prev - 1);
    setTotalPages(Math.ceil((totalItems - 1) / limit));
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-slate-600 text-sm">
            Loading your listings...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-slate-600 text-sm">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            My Listings
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Manage all your listings in one place
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/listings"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium"
          >
            Listings
          </Link>
          <Link
            href="/dashboard/audit"
            className="px-4 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50"
          >
            Audit Logs
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Filter:
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Listings</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  toast.info(
                    "This feature will be implemented in future, currently we are using mock data."
                  );
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Create New Listing
              </Button>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  All Listings
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  View and manage all your listings
                </p>
              </div>

              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 whitespace-nowrap">
                {totalItems > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-medium text-slate-900">
                      {(currentPage - 1) * limit + 1}
                    </span>
                    -
                    <span className="font-medium text-slate-900">
                      {Math.min(currentPage * limit, totalItems)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-slate-900">
                      {totalItems}
                    </span>{" "}
                    listings
                  </>
                ) : (
                  "No listings found"
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {listings.length > 0 ? (
              <>
                <ListingTable
                  listings={listings}
                  onListingUpdate={handleListingUpdate}
                  onListingDelete={handleListingDelete}
                  userId={userId as number}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No listings found
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  {filter === "all"
                    ? "You haven't created any listings yet. Start by adding your first listing."
                    : `No ${filter} listings found. Try changing the filter or create a new listing.`}
                </p>
                <Link
                  href="/dashboard/listings/create"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Create Your First Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
