import { ListingFormData } from "@/schema/listing-schema";
import { mockListings } from "@/lib/mockListings";
import { Listing } from "@/types/db-types";
import { logAction } from "@/lib/mockAuditLog";

export async function getListings(
  page: number = 1,
  limit: number = 10,
  status?: "pending" | "approved" | "rejected"
) {
  let filteredListings = [...mockListings];

  if (status) {
    filteredListings = filteredListings.filter(
      (listing) => listing.status === status
    );
  }

  const offset = (page - 1) * limit;
  const paginatedListings = filteredListings.slice(offset, offset + limit);

  return {
    listings: paginatedListings,
    total: filteredListings.length,
  };
}

export async function getListingById(id: number) {
  const listing = mockListings.find((listing) => listing.id === String(id));
  if (!listing) throw new Error("Listing not found");

  return {
    ...listing,
    createdAt: listing.createdAt?.toISOString(),
    updatedAt: listing.updatedAt?.toISOString(),
  };
}

export async function updateListing(
  id: number,
  data: Partial<ListingFormData>
) {
  const index = mockListings.findIndex((listing) => listing.id === String(id));
  if (index === -1) throw new Error("Listing not found");

  const updatedListing: Listing = {
    ...mockListings[index],
    ...data,
    updatedAt: new Date(),
    createdAt: new Date(
      typeof mockListings[index].createdAt === "string"
        ? mockListings[index].createdAt
        : mockListings[index].createdAt ?? new Date()
    ),
    userId:
      data.userId !== undefined
        ? Number(data.userId)
        : mockListings[index].userId,
  };

  mockListings[index] = updatedListing;

  return {
    ...updatedListing,
    createdAt: updatedListing.createdAt?.toISOString(),
    updatedAt: updatedListing.updatedAt?.toISOString(),
  };
}

export async function updateListingStatus(
  id: number,
  status: "approved" | "rejected",
  adminId: number
) {
  const index = mockListings.findIndex((listing) => listing.id === String(id));

  if (index === -1) throw new Error("Listing not found");

  const previousStatus = mockListings[index].status;

  logAction(status, String(id), adminId, {
    previousStatus,
    newStatus: status,
  });

  mockListings[index] = {
    ...mockListings[index],
    status,
    updatedAt: new Date(),
  };

  return mockListings[index];
}

export async function deleteListing(id: number) {
  const index = mockListings.findIndex((listing) => listing.id === String(id));
  if (index === -1) throw new Error("Listing not found");

  mockListings.splice(index, 1);
  return true;
}
