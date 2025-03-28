import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <Button 
        variant="outline" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        size="sm"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
      </Button>
      
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        size="sm"
      >
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default Pagination;
