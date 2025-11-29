import { useState } from "react";
import API from "../utils/api";

export default function EditProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(storedUser.name);
  const [profession, setProfession] = useState(storedUser.profession);
  const [profilePic, setProfilePic] = useState(null);

  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profession", profession);
    if (profilePic) formData.append("profilePic", profilePic);

    const res = await API.put("/auth/update-profile", formData);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    alert("Profile updated");
  };

  return (
    <form onSubmit={updateProfile}>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <select
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      >
        <option value="Student">Student</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Business Owner">Business Owner</option>
        <option value="Freelancer">Freelancer</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePic(e.target.files[0])}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
}