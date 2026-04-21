export interface SiteSettings {
  registration_open: boolean;
  current_cohort: number;
  cohort_message: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  registration_open: true,
  current_cohort: 2026,
  cohort_message:
    'Admissions are open for the next session at ST Brains Modal College.',
};
