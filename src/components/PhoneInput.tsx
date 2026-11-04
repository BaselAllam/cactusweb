import React, { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const countryCodes = [
  { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "+213", country: "DZ", flag: "🇩🇿", name: "Algeria" },
  { code: "+973", country: "BH", flag: "🇧🇭", name: "Bahrain" },
  { code: "+964", country: "IQ", flag: "🇮🇶", name: "Iraq" },
  { code: "+962", country: "JO", flag: "🇯🇴", name: "Jordan" },
  { code: "+965", country: "KW", flag: "🇰🇼", name: "Kuwait" },
  { code: "+961", country: "LB", flag: "🇱🇧", name: "Lebanon" },
  { code: "+218", country: "LY", flag: "🇱🇾", name: "Libya" },
  { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "+212", country: "MA", flag: "🇲🇦", name: "Morocco" },
  { code: "+968", country: "OM", flag: "🇴🇲", name: "Oman" },
  { code: "+970", country: "PS", flag: "🇵🇸", name: "Palestine" },
  { code: "+974", country: "QA", flag: "🇶🇦", name: "Qatar" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+211", country: "SS", flag: "🇸🇸", name: "South Sudan" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+249", country: "SD", flag: "🇸🇩", name: "Sudan" },
  { code: "+963", country: "SY", flag: "🇸🇾", name: "Syria" },
  { code: "+216", country: "TN", flag: "🇹🇳", name: "Tunisia" },
  { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+967", country: "YE", flag: "🇾🇪", name: "Yemen" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  showFlag?: boolean;
  defaultCountry?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Phone number",
  className = "",
  required = false,
  showFlag = true,
  defaultCountry = "+20",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const getInitialValues = (value: string) => {
    if (!value) return { code: defaultCountry, number: "" };
    const sortedCodes = [...countryCodes].sort((a, b) => b.code.length - a.code.length);
    const match = sortedCodes.find(c => value.startsWith(c.code));
    
    if (match) {
      return {
        code: match.code,
        number: value.slice(match.code.length),
      };
    }

    return { code: defaultCountry, number: value };
  };

  const { code: initialCode, number: initialNumber } = getInitialValues(value);
  const [countryCode, setCountryCode] = useState(initialCode);
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);

  useEffect(() => {
    const { code, number } = getInitialValues(value);
    setCountryCode(code);
    setPhoneNumber(number);
  }, [value]);

  // Handle country code change
  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode);
    onChange(`${newCode}${phoneNumber}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  // Handle phone number change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, '');
    setPhoneNumber(newNumber);
    onChange(`${countryCode}${newNumber}`);
  };

  // Filter countries based on search query
  const filteredCountries = countryCodes.filter(country => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      country.name.toLowerCase().includes(query) ||
      country.country.toLowerCase().includes(query) ||
      country.code.includes(query)
    );
  });

  // Find the country object for the current code
  const currentCountry = countryCodes.find(c => c.code === countryCode) || countryCodes.find(c => c.code === defaultCountry) || countryCodes[0];

  return (
    <div className={`flex gap-2 ${className}`}>
      <Select 
        value={countryCode} 
        onValueChange={handleCountryCodeChange}
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSearchQuery("");
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue>
            {showFlag ? (
              <span className="flex items-center gap-2">
                <span className="text-lg">{currentCountry.flag}</span>
                <span className="text-sm">{countryCode}</span>
              </span>
            ) : (
              countryCode
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[320px]">
          <div className="sticky top-0 bg-white dark:bg-gray-950 p-2 border-b z-10">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredCountries.length > 0) {
                    handleCountryCodeChange(filteredCountries[0].code);
                  }
                  e.stopPropagation();
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem 
                  key={`${country.code}-${country.country}`} 
                  value={country.code}
                  className="cursor-pointer"
                >
                  {showFlag ? (
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1">{country.name}</span>
                      <span className="text-gray-500 text-sm">{country.code}</span>
                    </span>
                  ) : (
                    `${country.name} (${country.code})`
                  )}
                </SelectItem>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No countries found
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder={placeholder}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="flex-1"
        required={required}
      />
    </div>
  );
};

export default PhoneInput;