import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/shared/context/auth/useAuth";

interface Doctor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialty: string;
  medicalLicense: string;
   photoUrl?: string;
}

interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  weight: number;
  height: number;
  notes: string;
   photoUrl?: string;
}

const Profile = () => {
  const { user, isUserDoctor } = useAuth();
  const [data, setData] = useState<Doctor | Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const url = isUserDoctor()
          ? `/doctors/users/${user.id}`
          : `/patients/users/${user.id}`;

        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isUserDoctor]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading profile...</p>
    );
  if (!data)
    return (
      <p className="text-center mt-10 text-red-500">User data not found.</p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white dark:bg-gray-900 shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>

      {/* Foto de perfil */}
      {"photoUrl" in data && data.photoUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={data.photoUrl}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
          />
        </div>
      )}

      {/* General Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          General Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>First Name:</strong> {data.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {data.lastName}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phoneNumber}
          </p>
        </div>
      </div>

      {/* Doctor Info */}
      {"specialty" in data && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            Doctor Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Specialty:</strong> {data.specialty}
            </p>
            <p>
              <strong>Medical License:</strong> {data.medicalLicense}
            </p>
          </div>
        </div>
      )}

      {/* Patient Info */}
      {"weight" in data && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Weight:</strong> {data.weight} kg
            </p>
            <p>
              <strong>Height:</strong> {data.height} cm
            </p>
            <p className="md:col-span-2">
              <strong>Notes:</strong> {data.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
