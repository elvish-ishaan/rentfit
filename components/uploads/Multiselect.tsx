'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, ChevronDown } from 'lucide-react';
import React from 'react';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const Multiselect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select...',
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const displayValue = selected.length > 0 ? selected.join(', ') : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {displayValue}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center space-x-2 rounded px-2 py-1 hover:bg-muted transition"
              onClick={() => toggleOption(option)}
            >
              <Checkbox
                id={option}
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              <Label htmlFor={option} className="cursor-pointer w-full">
                {option}
              </Label>
              {selected.includes(option) && <Check size={16} className="text-primary ml-auto" />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
