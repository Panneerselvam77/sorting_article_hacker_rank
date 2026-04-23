import React from "react";
import { medical_records } from "../mock_data/medicalRecords";
import type { MedicalRecord, RecordGroup } from "./MedicalRecord";

// ✅ Typed props — Record receives the selected user name from App
interface RecordProps {
  searchTerm: string;
}

const Record: React.FC<RecordProps> = ({ searchTerm }) => {
  // ✅ Flatten all records and filter by the selected user
  const allRecords: MedicalRecord[] = medical_records.flatMap(
    (group: RecordGroup) => group.data,
  );

  const userRecords: MedicalRecord[] = allRecords.filter(
    (record) => record.userName === searchTerm,
  );

  // Nothing selected yet
  if (!searchTerm) {
    return (
      <div className="record-container">
        <p>Please select a patient to view records.</p>
      </div>
    );
  }

  // No records found
  if (userRecords.length === 0) {
    return (
      <div className="record-container">
        <p>No records found for "{searchTerm}".</p>
      </div>
    );
  }

  // ✅ Use first record for static patient info (name, dob, height are constant per user)
  const patient = userRecords[0];

  return (
    <div className="record-container">
      <h2>Patient Records</h2>
      <h5>Patient Name: {patient.userName}</h5>
      <h5>DOB: {patient.userDob}</h5>
      <h5>Height: {patient.meta.height} cm</h5>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Doctor</th>
            <th>Weight (lbs)</th>
            <th>Vitals</th>
          </tr>
        </thead>
        <tbody>
          {userRecords.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.timestamp).toLocaleDateString()}</td>
              <td>
                {record.diagnosis.name} (Severity: {record.diagnosis.severity})
              </td>
              <td>{record.doctor.name}</td>
              <td>{record.meta.weight}</td>
              <td>{record.vitals.bloodPressureSystole}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Render each visit as a separate entry */}
      {/* {userRecords.map((record) => (
        <div key={record.id} className="record-entry">
          <hr />
          <p>
            <strong>Date:</strong>{" "}
            {new Date(record.timestamp).toLocaleDateString()}
          </p>
          <p>
            <strong>Diagnosis:</strong> {record.diagnosis.name} (Severity:{" "}
            {record.diagnosis.severity})
          </p>
          <p>
            <strong>Doctor:</strong> {record.doctor.name}
          </p>
          <p>
            <strong>Weight:</strong> {record.meta.weight} lbs
          </p>
          <p>
            <strong>Vitals:</strong> BP {record.vitals.bloodPressureSystole}/
            {record.vitals.bloodPressureDiastole} mmHg | Pulse:{" "}
            {record.vitals.pulse} bpm | Temp: {record.vitals.bodyTemperature}°F
            | Breathing: {record.vitals.breathingRate} rpm
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default Record;
