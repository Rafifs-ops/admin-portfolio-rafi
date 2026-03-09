import axios from 'axios';

const BASE_URL = 'https://rafi-portofolio.onrender.com/api';

const api = axios.create({
  baseURL: `${BASE_URL}/data`
});

const messageApi = axios.create({
  baseURL: BASE_URL
});

export default {
  // Skills
  getSkills() { return api.get('/skills'); },
  addSkill(data) { return api.post('/skills', data); },
  editSkill(id, data) { return api.put(`/skills/${id}`, data); },
  deleteSkill(id) { return api.delete(`/skills/${id}`); },

  // Projects
  getProjects() { return api.get('/projects'); },
  addProject(data) { return api.post('/projects', data); },
  editProject(id, data) { return api.put(`/projects/${id}`, data); },
  deleteProject(id) { return api.delete(`/projects/${id}`); },

  // Certifications
  getCertifications() { return api.get('/certifications'); },
  addCertification(data) { return api.post('/certifications', data); },
  editCertification(id, data) { return api.put(`/certifications/${id}`, data); },
  deleteCertification(id) { return api.delete(`/certifications/${id}`); },

  // Messages
  getMessages() { return messageApi.get('/message'); },
  deleteMessage(id) { return messageApi.delete(`/message/${id}`); } // In case they want it later
};
