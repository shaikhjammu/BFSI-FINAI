import { SCENARIOS } from '../data/initialData';

const STORAGE_KEYS = {
  CURRENT_SCENARIO_ID: 'finai_current_scenario_id',
  USER_DATA: 'finai_user_data_v1',
  CHAT_HISTORY: 'finai_chat_history_v1',
  SETTINGS: 'finai_settings_v1'
};

export const storageService = {
  // Load initial data state
  loadAllData() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error('Failed to load data from storage:', e);
    }
    // Return deep cloned initial scenarios
    return JSON.parse(JSON.stringify(SCENARIOS));
  },

  saveAllData(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  },

  getCurrentScenarioId() {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_SCENARIO_ID) || 'scenario_1';
    } catch (e) {
      return 'scenario_1';
    }
  },

  setCurrentScenarioId(id) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SCENARIO_ID, id);
    } catch (e) {}
  },

  getSettings() {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return s ? JSON.parse(s) : { currency: '₹', theme: 'dark', soundEffects: true, autoAiTips: true };
    } catch (e) {
      return { currency: '₹', theme: 'dark', soundEffects: true, autoAiTips: true };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {}
  },

  resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    } catch (e) {}
    return JSON.parse(JSON.stringify(SCENARIOS));
  }
};
