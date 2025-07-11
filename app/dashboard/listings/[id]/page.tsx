import { notFound } from "next/navigation";
import { getListingById } from "@/lib/db";
import EditListingForm from "@/components/forms/EditListingsForm";

async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(Number(id));

  if (!listing) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Listing</h1>
      <div className="rounded-lg shadow-md p-6">
        <EditListingForm listing={listing} />
      </div>
    </div>
  );
}

export default EditListingPage;
