
import React from 'react';
import HostCalendarManager from '@/components/availability/HostCalendarManager';

interface PropertyAvailabilityManagerProps {
  propertyId: string;
}

const PropertyAvailabilityManager = ({ propertyId }: PropertyAvailabilityManagerProps) => {
  return (
    <HostCalendarManager 
      propertyId={propertyId}
      className="w-full"
    />
  );
};

export default PropertyAvailabilityManager;
