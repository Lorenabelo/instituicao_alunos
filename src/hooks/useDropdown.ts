import { useState, useEffect, useRef } from 'react';

function useDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen !== null) {
        const dropdownElement = dropdownRefs.current[dropdownOpen];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setDropdownOpen(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return { dropdownOpen, toggleDropdown, dropdownRefs };
}

export default useDropdown;
