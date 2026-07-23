import dance from "@/assets/images/dance.webp";
import garden from "@/assets/images/garden.webp";
import groom from "@/assets/images/groom.webp";
import hero from "@/assets/images/hero.webp";
import rings from "@/assets/images/rings.webp";
import table from "@/assets/images/table.webp";
import veil from "@/assets/images/veil.webp";
import venue from "@/assets/images/venue.webp";
import type { WeddingConfig } from "@/types/wedding";

export const weddingConfig = {
  identity: {
    partnerOne: "Umarxon",
    partnerTwo: "Hadicha",
    monogram: "U · H",
    invitationLine:
      "Ota-onalar duosi bilan, baxtimiz boshlangan oqshomga sizni taklif etamiz.",
  },
  event: {
    date: "2027-09-20T18:30:00+05:00",
    timezone: "Asia/Tashkent",
    locale: "uz-UZ",
    displayDate: "20 · 09 · 2027",
  },
  navigation: [
    { label: "Hikoyamiz", href: "#story" },
    { label: "Lavhalar", href: "#gallery" },
    { label: "To‘y kuni", href: "#schedule" },
    { label: "Manzil", href: "#venue" },
    { label: "Javob yo‘llash", href: "#rsvp" },
  ],
  chapters: {
    opening: {
      eyebrow: "O‘zbekiston · Nikoh oqshomi",
      action: "Muhrni ochish",
      instruction: "Muhrga teging",
      ritualLine: "Ikki qalb · bir niyat · bir umr",
      revealNote: "Yangi bir hikoya boshlanmoqda",
      yearMark: "MMXXVII",
      skip: "Taklifnomaga o‘tish",
      soundNote: "Bu lahza kuy bilan ochiladi",
    },
    hero: {
      eyebrow: "Toshkent · Kuz MMXXVII",
      subtitle: "Bir oqshom. Bir va’da. Bir umrga atalgan yo‘l.",
      scrollCue: "Hikoyamizni kuzating",
      countdownLabel: "Visol oqshomigacha",
    },
    story: {
      eyebrow: "I bob · Hikoyamiz",
      title: "Ba’zi hikoyalar sokin boshlanadi.",
      introduction:
        "Bizning hikoyamiz tasodifiy bir uchrashuvdan, uzoq suhbatdan va go‘yo avvaldan tanishdek tuyulgan iliq hissiyotdan boshlandi.",
      beats: [
        {
          id: "first-light",
          year: "MMXXII",
          title: "Kutilmagan uchrashuv",
          body: "Sokin bir choyxona, yozgi yomg‘ir va atrofdagi butun shaharni unuttirgan suhbat. Vaqt qanday o‘tganini ikkovimiz ham sezmay qoldik.",
          imageId: "garden",
          quote: "Yomg‘ir tindi. Biz esa buni sezmadik.",
          align: "left",
        },
        {
          id: "chosen-days",
          year: "MMXXIV",
          title: "Minglab oddiy mo‘jizalar",
          body: "Tonggi qahva, uzoq yo‘llar, yakshanba sayrlari va bir xonani ham nurga to‘ldiradigan kulgu. Muhabbat bir lahza emas, hayotga qarash tarziga aylandi.",
          imageId: "rings",
          align: "right",
        },
        {
          id: "the-promise",
          year: "MMXXVII",
          title: "Eng oson “ha”",
          body: "Shafaq nuriga cho‘mgan bog‘da kelajak birdan juda sodda bo‘lib qoldi. Bitta savol, bitta nafas va undan keyingi barcha yo‘llar ikkimizniki edi.",
          imageId: "veil",
          quote: "Qayerga borsak ham, birga boramiz.",
          align: "left",
        },
      ],
    },
    gallery: {
      eyebrow: "II bob · Lavhalar",
      title: "Biz haqimizdagi kichik muzey.",
      introduction:
        "Nur, harakat va so‘zlar orasidagi eng go‘zal sukutlardan sakkiz lavha.",
    },
    schedule: {
      eyebrow: "III bob · To‘y kuni",
      title: "Duo bilan boshlanib, raqs bilan davom etadi.",
      introduction:
        "Nikoh ahdiga guvoh bo‘ling. Shamlar nuri, musiqa va yillar davomida eslanadigan suhbatlar uchun biz bilan qoling.",
      events: [
        {
          id: "ceremony",
          time: "18:30",
          title: "Nikoh marosimi",
          description: "Ota-onalar duosi va yaqinlar guvohligida nikoh ahdi.",
          location: "Bog‘ sahnasi",
          icon: "rings",
        },
        {
          id: "dinner",
          time: "20:00",
          title: "To‘y dasturxoni",
          description:
            "Milliy taomlar, samimiy tilaklar, karnay-surnay va mehmonlar uchun yozilgan bayram dasturi.",
          location: "Katta ayvon",
          icon: "dinner",
        },
        {
          id: "dance",
          time: "22:30",
          title: "Bayram davom etadi",
          description:
            "Yoshlarning ilk raqsi, so‘ng barchamiz birga. Eng go‘zal xotiralar aynan shu yerda boshlanadi.",
          location: "Tantanalar zali",
          icon: "dance",
        },
      ],
    },
    venue: {
      eyebrow: "IV bob · Manzil",
      title: "Sizni chiroqlar yongan bog‘da kutamiz.",
      name: "Humo Saroyi",
      address: "Toshkent shahri · O‘zbekiston",
      description:
        "Shahar markazidagi sokin bog‘, naqshinkor ayvon va oqshom nurlariga burkangan tantanalar saroyi. Aniq manzil va yo‘l ko‘rsatmasini xaritada ko‘rishingiz mumkin.",
      mapEmbedUrl:
        "https://www.google.com/maps?q=41.2995,69.2401&z=12&output=embed",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=41.2995,69.2401",
      directionsLabel: "Google Maps’da ochish",
      revealMapLabel: "Xaritani ko‘rish",
    },
    rsvp: {
      eyebrow: "V bob · Javobingiz",
      title: "Bu oqshomni biz bilan baham ko‘rasizmi?",
      introduction:
        "Dasturxonimizda siz uchun joy tayyor. Iltimos, belgilangan muddatgacha javobingizni yo‘llang.",
      deadline: "Iltimos, 01 sentabrgacha javob bering",
      submitLabel: "Javobni yuborish",
      pendingLabel: "Javob yuborilmoqda…",
      labels: {
        name: "Ism-familiyangiz",
        phone: "Telefon raqamingiz",
        attending: "Tashrif buyurasizmi?",
        guests: "Mehmonlar soni",
        message: "Yoshlarga tilagingiz",
        yes: "Albatta boraman",
        no: "Afsuski, bora olmayman",
      },
      placeholders: {
        name: "Masalan, Dilnoza Karimova",
        phone: "+998 90 000 00 00",
        message: "Tilagingiz yoki biz bilishimiz kerak bo‘lgan izoh…",
      },
      maxGuests: 6,
      success: {
        eyebrow: "Javobingiz qabul qilindi",
        title: "Hikoyamizda sizning ham o‘rningiz bor.",
        body: "Rahmat. Javobingiz bizga yetib keldi va mehmonlar ro‘yxatiga ehtiyotkorlik bilan qo‘shildi.",
        close: "Taklifnomaga qaytish",
      },
    },
    closing: {
      eyebrow: "So‘nggi sahifa",
      title: "O‘sha kungacha, ezgu niyat va mehr bilan.",
      body: "Bizni bugungi kunimizga yetaklagan aziz insonlar bilan bir osmon ostida jam bo‘lishni intiqlik bilan kutamiz.",
      replay: "Taklifnomani yana ochish",
      signature: "Umarxon & Hadicha",
    },
  },
  gallery: [
    {
      id: "hero",
      src: hero,
      alt: "Umarxon va Hadicha anor daraxti ostidagi charbog‘da",
      caption: "Ikki qalb tutashgan charbog‘",
      eyebrow: "Toshkent, MMXXVII",
      orientation: "portrait",
      focalPoint: "50% 56%",
    },
    {
      id: "garden",
      src: garden,
      alt: "Umarxon va Hadicha shafaq payti charbog‘ bo‘ylab ketmoqda",
      caption: "Uyga eltuvchi eng go‘zal yo‘l",
      eyebrow: "Shafaq pallasi",
      orientation: "landscape",
      focalPoint: "56% 50%",
    },
    {
      id: "veil",
      src: veil,
      alt: "Hadicha oltin zardo‘zi qirrali mayin parda ostida",
      caption: "Bir umr oldidan sokin nafas",
      eyebrow: "Zardo‘zi nuri",
      orientation: "portrait",
      focalPoint: "50% 38%",
    },
    {
      id: "rings",
      src: rings,
      alt: "Oltin nikoh uzuklari taqilgan ikki qo‘l",
      caption: "Ikki qo‘l · ikki va’da",
      eyebrow: "Ahd",
      orientation: "landscape",
      focalPoint: "50% 52%",
    },
    {
      id: "groom",
      src: groom,
      alt: "Umarxon naqshinkor yog‘och eshik yonida kutmoqda",
      caption: "Marosim boshlanishidan oldin",
      eyebrow: "Marosim oldidan",
      orientation: "portrait",
      focalPoint: "58% 43%",
    },
    {
      id: "table",
      src: table,
      alt: "Rishton sopoli, anor va shamlar bilan bezatilgan dasturxon",
      caption: "Mehmondo‘stlik san’atga aylanganda",
      eyebrow: "Dasturxon",
      orientation: "portrait",
      focalPoint: "50% 56%",
    },
    {
      id: "venue",
      src: venue,
      alt: "Timuriy me’moriy ritmdagi moviy tantana charbog‘i",
      caption: "Suv, tosh va moviy oqshom",
      eyebrow: "Humo Saroyi",
      orientation: "landscape",
      focalPoint: "50% 50%",
    },
    {
      id: "dance",
      src: dance,
      alt: "Yangi turmush qurgan juftlikning ilk raqsi",
      caption: "Keyin esa faqat musiqa",
      eyebrow: "Ilk raqs",
      orientation: "landscape",
      focalPoint: "43% 50%",
    },
  ],
  music: {
    src: "/audio/wedding-theme.mp3",
    title: "Moviy oqshom",
    artist: "bassimat × Yoiyami · CC0",
    creditUrl: "https://freesound.org/people/bassimat/sounds/850283/",
    defaultVolume: 0.36,
    labels: {
      play: "Musiqani yoqish",
      pause: "Musiqani to‘xtatish",
      mute: "Ovozni o‘chirish",
      unmute: "Ovozni yoqish",
      volume: "Musiqa balandligi",
    },
  },
  contacts: [
    {
      label: "To‘y koordinatori",
      value: "+998 90 000 00 00",
      href: "tel:+998900000000",
    },
    {
      label: "Bizga yozing",
      value: "salom@example.com",
      href: "mailto:salom@example.com",
    },
  ],
  socials: [{ label: "Instagram", href: "https://instagram.com/" }],
  theme: {
    light: {
      background: "#f4f0e7",
      surface: "#fffdf6",
      ink: "#102028",
      muted: "#687178",
      gold: "#8c6324",
      blush: "#6d9e9c",
    },
    dark: {
      background: "#041219",
      surface: "#0a2730",
      ink: "#f8f1e2",
      muted: "#a8b8b8",
      gold: "#d5ad6d",
      blush: "#5f9b9a",
    },
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
      accent: "Newsreader",
    },
    motion: { intensity: "cinematic", petalCount: 14 },
  },
  seo: {
    title: "Umarxon & Hadicha · Nikoh taklifnomasi",
    description:
      "Umarxon va Hadichaning nikoh oqshomiga bag‘ishlangan interaktiv taklifnoma.",
    canonicalUrl: "https://example.com",
    imageAlt: "Umarxon va Hadichaning nikoh oqshomi",
    keywords: [
      "Umarxon va Hadicha",
      "nikoh taklifnomasi",
      "Toshkent to‘yi",
      "Humo Saroyi",
    ],
  },
} satisfies WeddingConfig;

export type WeddingConfiguration = typeof weddingConfig;
