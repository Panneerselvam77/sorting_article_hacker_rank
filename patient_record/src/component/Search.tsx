import React, { useState, useCallback } from "react";
import { medical_records } from "../mock_data/medicalRecords.ts";
import type { MedicalRecord } from "./MedicalRecord.tsx";

interface UniqueUser {
  id: number;
  userName: string;
}

interface SearchProps {
  onSearch?: (userName: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Flatten all records to get all users
  const allUsers: MedicalRecord[] = medical_records.flatMap(
    (record: any) => record.data || [],
  );

  // Get unique users
  const getUniqueUsers = (records: MedicalRecord[]): UniqueUser[] => {
    if (!records || records.length === 0) return [];

    const uniqueUserNames = new Set<string>();
    const result: UniqueUser[] = [];

    for (const record of records) {
      if (!uniqueUserNames.has(record.userName)) {
        uniqueUserNames.add(record.userName);
        result.push({
          id: record.userId,
          userName: record.userName,
        });
      }
    }
    return result;
  };

  const uniqueUsers = getUniqueUsers(allUsers);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        console.log("Searching for user:", searchTerm);
        if (onSearch) {
          onSearch(searchTerm);
        }
      }
    },
    [searchTerm, onSearch],
  );

  // Handle search term change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="search-type">Select User:</label>
        <select
          id="search-type"
          name="search-type"
          value={searchTerm}
          onChange={handleChange}
          required
        >
          <option value="">-Select-</option>
          {uniqueUsers.map((user: UniqueUser) => (
            <option key={user.id} value={user.userName}>
              {user.userName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
