import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterDropdownProps {
  onFilter: (filter: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter }) => {
  return (
    <div className="w-48">
      <Select onValueChange={onFilter} defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          <SelectItem value="first_name">First Name (A-Z)</SelectItem>
          <SelectItem value="last_name">Last Name (A-Z)</SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropdown;
