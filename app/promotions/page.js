import { Suspense } from "react";
import LatestPromotions from "@/components/LatestPromotions";

export default function PromotionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LatestPromotions />
    </Suspense>
  );
}
