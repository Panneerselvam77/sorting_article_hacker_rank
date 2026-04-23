import React, { useCallback } from "react";
import { medical_records } from "../mock_data/medicalRecords";
import type { MedicalRecord, RecordGroup } from "./MedicalRecord";

interface UniqueUser {
  id: number;
  userName: string;
}

// ✅ Props are clearly typed — searchTerm is read here, setSearchTerm updates parent
interface SearchProps {
  searchTerm: string; // ✅ Added: needed to control the <select> value
  setSearchTerm: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {

  const allUsers: MedicalRecord[] = medical_records.flatMap(
    (record: RecordGroup) => record.data,
  );

  const getUniqueUsers = (records: MedicalRecord[]): UniqueUser[] => {
    if (!records || records.length === 0) return [];

    const uniqueUserNames = new Set<string>();
    const result: UniqueUser[] = [];

    for (const record of records) {
      if (!uniqueUserNames.has(record.userName)) {
        uniqueUserNames.add(record.userName);
        result.push({ id: record.userId, userName: record.userName });
      }
    }
    return result;
  };

  const uniqueUsers = getUniqueUsers(allUsers);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        console.log("Searching for user:", searchTerm);
      }
    },
    [searchTerm],
  );

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="search-type">Select User:</label>
        <select
          id="search-type"
          name="search-type"
          value={searchTerm} // ✅ Controlled input — driven by prop
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
