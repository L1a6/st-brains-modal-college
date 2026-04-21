'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SiteSettings {
  registration_open: boolean;
  current_cohort: number;
  cohort_message: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    registration_open: true,
    current_cohort: 15,
    cohort_message: 'Enroll for the next session at ST Brains Modal College',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#E62A2A] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="font-outfit text-2xl sm:text-4xl font-light text-gray-900 dark:text-white mb-2">
            Site Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage registration status and cohort information
          </p>
        </div>

        <div className="space-y-6">
          {/* Registration Toggle Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-outfit text-xl font-medium text-gray-900 dark:text-white mb-2">
                    Registration Status
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    When registration is closed, visitors will see a notice instead of the enrollment form.
                  </p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, registration_open: !settings.registration_open })}
                  className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E62A2A] focus:ring-offset-2 ${
                    settings.registration_open ? 'bg-[#E62A2A]' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.registration_open ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              
              <div className={`mt-4 p-4 rounded-xl ${
                settings.registration_open 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
              }`}>
                <div className="flex items-center gap-3">
                  {settings.registration_open ? (
                    <>
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-green-800 dark:text-green-200 font-medium">Registration is OPEN</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-amber-800 dark:text-amber-200 font-medium">Registration is CLOSED</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cohort Settings Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 sm:p-8">
              <h2 className="font-outfit text-xl font-medium text-gray-900 dark:text-white mb-6">
                Cohort Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Cohort Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={settings.current_cohort}
                    onChange={(e) => setSettings({ ...settings, current_cohort: parseInt(e.target.value) || 1 })}
                    className="w-full sm:w-32 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62A2A] text-center text-2xl font-light"
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    This number appears on the enrollment page (e.g., "15th Cohort")
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cohort Message
                  </label>
                  <textarea
                    value={settings.cohort_message}
                    onChange={(e) => setSettings({ ...settings, cohort_message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62A2A] resize-none"
                    placeholder="Enter a message for the cohort..."
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    This message appears in the home page enroll section
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-br from-[#0A1236] to-[#1a2e5a] rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Preview</h3>
              <p className="font-outfit text-2xl sm:text-3xl font-extralight text-white mb-2">
                Join Our {settings.current_cohort}{getOrdinalSuffix(settings.current_cohort)} Cohort
              </p>
              <p className="text-white/80 font-light">
                {settings.cohort_message}
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-4 rounded-full text-sm font-medium text-white bg-[#E62A2A] hover:bg-[#C91F1F] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Settings saved successfully!</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
