import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "PetCare",
      "nav_features": "Features",
      "nav_about": "About",
      "nav_login": "Log In",
      "nav_signup": "Sign Up",
      "hero_title": "Loving Care for Your Best Friend",
      "hero_subtitle": "Find trusted sitters, manage your pet's health, and join a community of pet lovers.",
      "hero_cta": "Get Started",
      "features_title": "Why Choose Us?",
      "feature_sitters_title": "Find Sitters",
      "feature_sitters_desc": "Connect with verified and reviewed pet sitters in your local area for walking, boarding, or drop-in visits.",
      "feature_health_title": "Health Tracking",
      "feature_health_desc": "Keep track of vaccinations, vet visits, and medical history all in one secure place.",
      "feature_crowd_title": "Crowdfunding",
      "feature_crowd_desc": "Start campaigns for pet emergencies or support other pets in need within our community.",
      "cta_title": "Ready to join?",
      "cta_desc": "Sign up today and give your pet the care they deserve.",
      "cta_button": "Create Free Account",
      "footer_desc": "Connecting pets with people who love them.",
      "footer_links": "Links",
      "footer_contact": "Contact",
      "footer_rights": "All rights reserved."
    }
  },
  fa: {
    translation: {
      "app_name": "پت‌کر",
      "nav_features": "ویژگی‌ها",
      "nav_about": "درباره ما",
      "nav_login": "ورود",
      "nav_signup": "ثبت نام",
      "hero_title": "مراقبت عاشقانه از بهترین دوست شما",
      "hero_subtitle": "پرستاران مورد اعتماد را پیدا کنید، سلامت حیوان خانگی خود را مدیریت کنید و به جامعه دوستداران حیوانات بپیوندید.",
      "hero_cta": "شروع کنید",
      "features_title": "چرا ما را انتخاب کنید؟",
      "feature_sitters_title": "یافتن پرستار",
      "feature_sitters_desc": "با پرستاران تایید شده و دارای امتیاز در منطقه خود برای پیاده‌روی، نگهداری یا بازدید در منزل ارتباط برقرار کنید.",
      "feature_health_title": "پیگیری سلامت",
      "feature_health_desc": "واکسیناسیون‌ها، ویزیت‌های دامپزشکی و سوابق پزشکی را در یک مکان امن پیگیری کنید.",
      "feature_crowd_title": "تامین مالی جمعی",
      "feature_crowd_desc": "کمپین‌هایی برای فوریت‌های حیوانات خانگی ایجاد کنید یا از سایر حیوانات نیازمند در جامعه ما حمایت کنید.",
      "cta_title": "آماده پیوستن هستید؟",
      "cta_desc": "همین امروز ثبت نام کنید و مراقبتی که حیوان خانگی شما شایسته آن است را به او هدیه دهید.",
      "cta_button": "ایجاد حساب رایگان",
      "footer_desc": "ارتباط حیوانات خانگی با کسانی که آنها را دوست دارند.",
      "footer_links": "لینک‌ها",
      "footer_contact": "تماس",
      "footer_rights": "تمامی حقوق محفوظ است."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
