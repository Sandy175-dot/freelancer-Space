import { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Briefcase, Award, Save } from 'lucide-react';

const FreelancerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    website: 'www.johndoe.com',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 8+ years of experience in building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
    hourlyRate: '75',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'],
    experience: [
      { id: 1, title: 'Senior Developer', company: 'Tech Corp', period: '2020 - Present' },
      { id: 2, title: 'Full Stack Developer', company: 'StartupXYZ', period: '2017 - 2020' }
    ],
    education: [
      { id: 1, degree: 'BS in Computer Science', school: 'University of Technology', year: '2017' }
    ],
    certifications: [
      { id: 1, name: 'AWS Certified Developer', issuer: 'Amazon', year: '2021' },
      { id: 2, name: 'React Developer Certification', issuer: 'Meta', year: '2022' }
    ]
  });

  const handleSave = () => {
    // Handle profile update
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
            My Profile
          </h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32 bg-gradient-to-br from-pastel-purple to-pastel-pink rounded-full flex items-center justify-center text-white text-5xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-3xl font-bold w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple"
                  />
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="text-xl w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h2>
                  <p className="text-xl text-gray-600 mb-4">{profile.title}</p>
                </>
              )}

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span>{profile.website}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple"
            />
          ) : (
            <p className="text-gray-700">{profile.bio}</p>
          )}
        </div>

        {/* Hourly Rate */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hourly Rate</h3>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-700">$</span>
              <input
                type="number"
                value={profile.hourlyRate}
                onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple text-2xl font-bold"
              />
              <span className="text-gray-600">/hour</span>
            </div>
          ) : (
            <p className="text-3xl font-bold text-pastel-mint">${profile.hourlyRate}/hour</p>
          )}
        </div>

        {/* Skills */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-pastel-purple/20 text-gray-700 rounded-full"
              >
                {skill}
              </span>
            ))}
            {isEditing && (
              <button className="px-4 py-2 bg-pastel-mint/20 text-gray-700 rounded-full hover:bg-pastel-mint/30 transition">
                + Add Skill
              </button>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Work Experience</span>
          </h3>
          <div className="space-y-4">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-pastel-purple pl-4">
                <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 text-sm">{exp.period}</p>
              </div>
            ))}
            {isEditing && (
              <button className="text-pastel-purple hover:text-pastel-pink">
                + Add Experience
              </button>
            )}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
            <div className="space-y-3">
              {profile.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Certifications</span>
            </h3>
            <div className="space-y-3">
              {profile.certifications.map((cert) => (
                <div key={cert.id}>
                  <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
