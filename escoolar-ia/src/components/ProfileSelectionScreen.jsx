
import React from "react";


const profiles = [
  {
    key: "student",
    name: "Juan Pérez",
    age: 16,
    photo: "https://randomuser.me/api/portraits/lego/7.jpg",
  },
  {
    key: "teacher",
    name: "María López",
    age: 14,
    photo: "https://randomuser.me/api/portraits/lego/4.jpg",
  },
  {
    key: "admin",
    name: "Carlos Ramírez",
    age: 7,
    photo: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
];

const ProfileSelectionScreen = ({ onSelect }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-4 text-info">Selecciona tu perfil</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {profiles.map((profile) => (
          <button
            key={profile.key}
            className="btn btn-outline-info btn-lg d-flex flex-column align-items-center p-3"
            style={{ minWidth: 200, fontSize: 20 }}
            onClick={() => onSelect && onSelect(profile.key)}
          >
            <img
              src={profile.photo}
              alt={profile.name}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 12,
                border: "3px solid #17a2b8",
              }}
            />
            <span className="fw-bold">{profile.name}</span>
            <span className="text-light" style={{ fontSize: 16 }}>
              Edad: {profile.age}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelectionScreen;
