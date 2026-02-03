"use client"

import dynamic from "next/dynamic"
import type { LocationUpdateEvent } from "@/components/admin/location-picker"

// Export dynamic components from this client component
export const DynamicLocationPicker = dynamic(() => import("@/components/admin/location-picker"), { ssr: false })

export const DynamicRealPackageMap = dynamic(() => import("@/components/map/real-package-map"), { ssr: false })

// Wrapper component for LocationPicker that handles the callback internally
export function LocationPickerWrapper({
  initialLocation,
  tracking_number,
}: {
  initialLocation?: { latitude: number; longitude: number; address?: string }
  tracking_number?: string
}) {
  const handleLocationChange = (location: LocationUpdateEvent) => {
    console.log("Location updated:", location)
  }

  return (
    <DynamicLocationPicker
      initialLocation={initialLocation}
      tracking_number={tracking_number}
      onLocationChange={handleLocationChange}
    />
  )
}
