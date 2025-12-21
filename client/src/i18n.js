import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "Wagy",
      "dashboard": "Dashboard",
      "my_pets": "My Pets",
      "find_sitter": "Find Sitter",
      "crowdfunding": "Crowdfunding",
      "wallet": "Wallet",
      "logout": "Logout",
      "welcome_back": "Welcome back!",
      "upcoming_bookings": "Upcoming Bookings",
      "recent_activity": "Recent Activity",
      "no_bookings": "No upcoming bookings.",
      "book_now": "Book Now",
      "balance": "Balance",
      "top_up": "Top Up",
      "pets_list_title": "My Pets",
      "add_pet": "Add Pet",
      "no_pets": "No pets found. Add your first pet!",
      "view": "View",
      "edit": "Edit",
      "delete": "Delete",
      "search_sitters_title": "Find a Sitter",
      "search": "Search",
      "service_type": "Service Type",
      "min_price": "Min Price",
      "max_price": "Max Price",
      "campaigns_title": "Crowdfunding Campaigns",
      "start_campaign": "Start Campaign",
      "raised": "raised",
      "goal": "goal",
      "contribute": "Contribute",
      "wallet_title": "My Wallet",
      "transaction_history": "Transaction History",
      "date": "Date",
      "type": "Type",
      "amount": "Amount",
      "status": "Status"
    }
  },
  fa: {
    translation: {
      "app_name": "واگی",
      "dashboard": "داشبورد",
      "my_pets": "حیوانات من",
      "find_sitter": "یافتن پرستار",
      "crowdfunding": "تامین مالی",
      "wallet": "کیف پول",
      "logout": "خروج",
      "welcome_back": "خوش آمدید!",
      "upcoming_bookings": "رزروهای آینده",
      "recent_activity": "فعالیت‌های اخیر",
      "no_bookings": "هیچ رزروی وجود ندارد.",
      "book_now": "رزرو کنید",
      "balance": "موجودی",
      "top_up": "افزایش موجودی",
      "pets_list_title": "حیوانات من",
      "add_pet": "افزودن حیوان",
      "no_pets": "هیچ حیوانی یافت نشد. اولین حیوان خود را اضافه کنید!",
      "view": "مشاهده",
      "edit": "ویرایش",
      "delete": "حذف",
      "search_sitters_title": "یافتن پرستار",
      "search": "جستجو",
      "service_type": "نوع سرویس",
      "min_price": "حداقل قیمت",
      "max_price": "حداکثر قیمت",
      "campaigns_title": "کمپین‌های تامین مالی",
      "start_campaign": "شروع کمپین",
      "raised": "جمع شده",
      "goal": "هدف",
      "contribute": "مشارکت",
      "wallet_title": "کیف پول من",
      "transaction_history": "تاریخچه تراکنش‌ها",
      "date": "تاریخ",
      "type": "نوع",
      "amount": "مبلغ",
      "status": "وضعیت"
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
