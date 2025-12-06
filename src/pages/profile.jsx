import { useState, useEffect } from 'react';
import styles from "./EditableProfileCard.module.css";
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  const location = useLocation();
const orderFromState = location.state?.order;
const orderFromStorage = JSON.parse(localStorage.getItem('latestOrder'));

const order = orderFromState || orderFromStorage;

  const [profile, setProfile] = useState({
    name: storedUser.name,
    location: 'Location',
    bio: 'bio',
    skills: ['Ace warrior', 'Gun Logic', 'A--rank Snipper', 'Captain'],
    messages:order,
  });

   


  // Load profile from localStorage on mount
  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (
    storedUser &&
    typeof storedUser === 'object' &&
    storedUser.name &&
    storedUser.location &&
    storedUser.bio &&
    storedUser.Password &&
    storedUser.email &&
    storedUser.messages &&
    Array.isArray(storedUser.skills)
  ) {
    setProfile(storedUser);
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = value;
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addSkill = () => {
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const removeSkill = (indexToRemove) => {
  setProfile((prev) => ({
    ...prev,
    skills: prev.skills.filter((_, index) => index !== indexToRemove),
  }));
};

  const saveProfile = () => {
    localStorage.setItem('currentUser', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className='profile-container' style={{paddingBottom:'6.8rem'}}>
    <div className={styles.card} >
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
          />
          
          <input
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
         {Array.isArray(profile.skills) &&
  profile.skills.map((skill, index) => (
    <div key={index} className={styles.skillRow}>
      <input
        value={skill}
        onChange={(e) => handleSkillChange(index, e.target.value)}
        placeholder={`Skill ${index + 1}`}
      />
      <button onClick={() => removeSkill(index)} className={styles.removeBtn}>
        ❌
      </button>
    </div>
))}

          <button onClick={addSkill}>Add Skill</button>
          <button onClick={saveProfile}>Save</button>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <h2>{profile.name}</h2>
            <p>{profile.location}</p>
          </div>
          <div className={styles.body}>
            <p className={styles.bio}>{profile.bio}</p>
            <ul className={styles.skills}>
             {Array.isArray(profile.skills) &&
  profile.skills.map((skill, index) => (
    <li key={index}>🔹 {skill}</li>
))}
            </ul>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
          <div>
            <h2 style={{color: 'green'}}>Transaction</h2>
            <p><strong style={{color: 'black'}}>NOTE:</strong> Every new transaction overwrites the old one.This is for security purposes</p>
            {typeof order === 'object' ? (
  <ul>
    {order && Object.entries(order).map(([subKey, subValue]) => (
      <li key={subKey}>
        {subKey}: {typeof subValue === 'object' ? JSON.stringify(subValue) : String(subValue)}
      </li>
    ))}
  </ul>
) : (
  <p style={{color: 'black'}}>No message</p>
)}
          </div>
        </>
      )}
    </div>
</div>
  );
};

export default Profile;