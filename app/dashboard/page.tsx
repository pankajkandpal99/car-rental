"use client";
import Loader from "@/components/general/Loader";
import { useAuth } from "@/hooks/use-auth";
import { getListings } from "@/services/listings.service";
import { Listing } from "@/types/db-types";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  totalListings: number;
  activeListings: number;
  draftListings: number;
  recentListings: Listing[];
}

export default function DashboardPage() {
  const {
    user: authUser,
    isAuthenticated,
    isLoading: isAuthLoading,
    userId,
  } = useAuth();

  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    activeListings: 0,
    draftListings: 0,
    recentListings: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchDashboardData = async () => {
        try {
          setIsLoading(true);
          const { listings, total } = await getListings(1, 5);

          // Mock data for now - we can replace with actual API calls
          const approvedCount = listings.filter(
            (l) => l.status === "approved"
          ).length;
          const pendingCount = listings.filter(
            (l) => l.status === "pending"
          ).length;

          setStats({
            totalListings: total,
            activeListings: approvedCount,
            draftListings: pendingCount,
            recentListings: listings,
          });
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-slate-600 text-sm">
            Loading your dashboard...
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
            Dashboard
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Overview of your account and recent activity
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/listings"
            className="px-4 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50"
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

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                  Welcome back,{" "}
                  <span className="text-green-600 font-bold">
                    {authUser?.username}!
                  </span>
                </h2>
                <div className="space-y-1 text-sm sm:text-base text-slate-600">
                  {authUser?.email && (
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {authUser.email}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Role:</span>{" "}
                    <span className="capitalize bg-slate-100 px-2 py-1 rounded-full text-xs sm:text-sm">
                      {authUser?.role || "user"}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">User ID: {userId}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Link
                  href="/dashboard/listings"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  View Listings
                </Link>
                {/* <Link
                  href="/dashboard/listings/create"
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
                >
                  Create Listing
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Listings</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.totalListings}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
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
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Listings</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.activeListings}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Draft Listings</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.draftListings}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.764 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  Recent Listings
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Your latest 5 listings
                </p>
              </div>
              <Link
                href="/dashboard/listings"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                View All Listings →
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {stats.recentListings.length > 0 ? (
              <div className="space-y-4">
                {stats.recentListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {listing.description?.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            listing.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900">
                       ${listing.price?.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
                  You haven&apos;t created any listings yet. Start by adding
                  your first listing.
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
