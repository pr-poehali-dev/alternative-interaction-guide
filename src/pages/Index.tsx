import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О проекте" },
  { id: "forms", label: "Формы взаимодействия" },
  { id: "recommendations", label: "Рекомендации" },
  { id: "gallery", label: "Галерея" },
  { id: "materials", label: "Материалы" },
  { id: "contacts", label: "Контакты" },
];

const FORMS = [
  {
    icon: "Users",
    title: "Родительские клубы",
    desc: "Неформальные встречи, где родители обмениваются опытом, обсуждают вопросы воспитания и находят единомышленников.",
    color: "terra",
    howItWorks: [
      "Встречи проходят раз в месяц в удобное вечернее время — обычно в 18:00–19:30.",
      "Каждое заседание посвящено одной теме: детские конфликты, режим дня, подготовка к школе и другие актуальные вопросы.",
      "Формат — живое обсуждение в небольшом кругу (8–15 человек), без оценок и лекций.",
      "По итогам встречи педагог формирует краткую «памятку» с выводами и рекомендациями.",
    ],
    howToJoin: "Обратитесь к воспитателю вашей группы или старшему воспитателю ДОУ. В обращении укажите название детского сада, номер группы и имя ребёнка. Запись открывается за 2 недели до встречи.",
    contact: "Воспитатель группы или старший воспитатель",
  },
  {
    icon: "Calendar",
    title: "Семейные мастерские",
    desc: "Совместные творческие занятия детей и родителей под руководством педагога: лепка, рисование, конструирование.",
    color: "sage",
    howItWorks: [
      "Мастерские проводятся по выходным — обычно в субботу с 10:00 до 12:00.",
      "Ребёнок и родитель вместе выполняют творческое задание: создают поделку, рисуют, конструируют.",
      "Педагог направляет процесс, объясняет технику и помогает — без оценок и соревнований.",
      "Готовые работы остаются в семье или украшают выставку в группе.",
    ],
    howToJoin: "Запись ведёт педагог группы. Напишите ему лично или через чат группы. Укажите название детского сада, группу и имя ребёнка, а также удобные даты. Количество мест ограничено — обычно 6–8 семей.",
    contact: "Педагог вашей группы",
  },
  {
    icon: "BookOpen",
    title: "Педагогическая гостиная",
    desc: "Тематические встречи с приглашёнными специалистами — психологами, логопедами, педагогами.",
    color: "gold",
    howItWorks: [
      "Встречи проходят раз в квартал в актовом зале или методическом кабинете ДОУ.",
      "Приглашённый специалист (психолог, логопед, нейропсихолог) делает короткий доклад — 20–30 минут.",
      "Затем следует открытая сессия вопросов и ответов.",
      "Родители получают раздаточный материал с практическими советами по теме встречи.",
    ],
    howToJoin: "Обратитесь к методисту или заведующей ДОУ. В обращении укажите полное название детского сада и ваше имя. Регистрация открывается за 10 дней, участие бесплатное.",
    contact: "Методист или заведующая ДОУ",
  },
  {
    icon: "Smartphone",
    title: "Цифровые форматы",
    desc: "Онлайн-консультации, родительские чаты, видеозаписи занятий — взаимодействие без привязки к расписанию.",
    color: "terra",
    howItWorks: [
      "Педагог публикует короткие видео из жизни группы и краткие советы в закрытом чате.",
      "Раз в месяц проводится онлайн-консультация через видеозвонок — 30–40 минут, по предварительной записи.",
      "Родители могут задавать вопросы в чате в удобное время — ответ приходит в течение суток.",
      "Фотоальбомы занятий обновляются еженедельно в закрытом доступе для семей группы.",
    ],
    howToJoin: "Попросите воспитателя добавить вас в закрытый чат группы. Для записи на онлайн-консультацию напишите педагогу, указав название детского сада, группу и удобное время.",
    contact: "Воспитатель группы (через мессенджер или лично)",
  },
  {
    icon: "Heart",
    title: "Дни открытых дверей",
    desc: "Родители присутствуют на занятиях, наблюдают за развитием ребёнка, общаются с педагогами в живой обстановке.",
    color: "sage",
    howItWorks: [
      "Проводятся 2–3 раза в год — даты утверждаются в начале учебного года.",
      "Родитель приходит на утреннее занятие (9:00–10:30) и наблюдает за ребёнком в привычной обстановке.",
      "После занятия педагог уделяет 10–15 минут для индивидуального разговора с каждой семьёй.",
      "Посещение строго по предварительной записи — не более 2 гостей от одной семьи.",
    ],
    howToJoin: "Запись открывает воспитатель группы за 2 недели до мероприятия. Обратитесь к нему лично или через чат, укажите название детского сада, номер группы и имя ребёнка.",
    contact: "Воспитатель группы",
  },
  {
    icon: "Star",
    title: "Проектная деятельность",
    desc: "Семья включается в образовательные проекты группы: исследования, коллекции, совместные выставки.",
    color: "gold",
    howItWorks: [
      "Проект длится 2–4 недели и объединяет несколько семей вокруг одной темы (например, «Профессии», «Мой город», «Природа»).",
      "Семья получает задание: собрать материалы, провести мини-исследование дома с ребёнком, создать поделку или презентацию.",
      "В финале проекта устраивается выставка или презентация в группе — дети рассказывают о своей работе.",
      "Педагог координирует процесс, помогает с идеями и объединяет результаты в общий продукт группы.",
    ],
    howToJoin: "Сообщите воспитателю о желании участвовать в следующем проекте. Укажите название детского сада и группу. Педагог включит вас в список и выдаст задание в начале проекта.",
    contact: "Воспитатель группы или педагог дополнительного образования",
  },
];

const RECOMMENDATIONS = [
  {
    num: "01",
    title: "Диагностика запросов семей",
    text: "Перед выбором формы взаимодействия проведите анкетирование родителей: какие темы им актуальны, в какое время удобно встречаться, какой формат они предпочитают.",
  },
  {
    num: "02",
    title: "Принцип добровольности",
    text: "Участие в нетрадиционных формах должно быть добровольным. Создавайте интерес через анонсы, отзывы участников и яркое оформление — давление снижает эффект.",
  },
  {
    num: "03",
    title: "Документируйте и рефлексируйте",
    text: "Фотографируйте мероприятия, собирайте отзывы. Анализируйте, что сработало, а что нет — и адаптируйте формат под вашу группу.",
  },
  {
    num: "04",
    title: "Вовлекайте родителей в планирование",
    text: "Спрашивайте заранее: «Какую тему предложите для следующей встречи?» Родитель-соавтор чувствует ответственность и приходит сам, а не по обязанности.",
  },
  {
    num: "05",
    title: "Начинайте с малого",
    text: "Не нужно сразу организовывать грандиозные мероприятия. Начните с одного нового формата в квартал. Небольшой успех вдохновляет на следующий шаг.",
  },
  {
    num: "06",
    title: "Учитывайте занятость родителей",
    text: "Многие семьи не приходят не из-за равнодушия, а из-за нехватки времени. Предлагайте форматы разной длительности: от 15-минутной онлайн-консультации до воскресной мастерской.",
  },
  {
    num: "07",
    title: "Создавайте безопасную атмосферу",
    text: "Родители охотнее открываются, когда чувствуют, что их не оценивают и не сравнивают. Придерживайтесь правила конфиденциальности на каждой встрече и озвучивайте его вслух.",
  },
  {
    num: "08",
    title: "Привлекайте «амбассадоров»",
    text: "Найдите 2–3 активных родителей, которым понравился новый формат, и попросите их поделиться впечатлениями с другими. Сарафанное радио работает эффективнее любого объявления.",
  },
  {
    num: "09",
    title: "Связывайте тему с жизнью группы",
    text: "Выбирайте темы встреч, актуальные прямо сейчас: адаптация в начале года, тревожность перед праздником, конфликты в песочнице. Конкретная проблема собирает больше участников, чем абстрактная тема.",
  },
  {
    num: "10",
    title: "Благодарите и отмечайте участие",
    text: "Выражайте благодарность публично: в чате группы, на стенде, в конце встречи. Простое «спасибо, что пришли» создаёт ощущение ценности и желание вернуться снова.",
  },
];

const GALLERY = [
  {
    img: "https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/d63dc655-7757-4c03-be4b-831ae81e3843.jpg",
    title: "Педагогическая гостиная",
    tag: "Совместная работа",
    desc: "Педагоги и родители группы «Звёздочки» обсуждают образовательные маршруты детей в уютной атмосфере.",
  },
  {
    img: "https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/b172f418-671e-4f10-ac75-b2a0a8372192.jpg",
    title: "Семейная мастерская",
    tag: "Творчество",
    desc: "Дети и родители вместе создают поделки из природного материала — проект «Осенние дары».",
  },
  {
    img: "https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/0840c70d-0ab9-495d-b544-0f22b8f526d7.jpg",
    title: "Семейный праздник",
    tag: "Событие",
    desc: "День открытых дверей с подвижными играми на свежем воздухе объединил 15 семей.",
  },
];

type MaterialContent =
  | { type: "document"; sections: { heading: string; text: string }[] }
  | { type: "journal"; issues: { num: string; title: string; theme: string; articles: string[] }[] }
  | { type: "videos"; items: { title: string; speaker: string; duration: string; desc: string }[] }
  | { type: "questionnaire"; blocks: { title: string; questions: { q: string; options?: string[]; type: "radio" | "checkbox" | "text" | "scale" }[] }[] };

const MATERIALS: { icon: string; title: string; desc: string; tag: string; content: MaterialContent }[] = [
  {
    icon: "FileText",
    title: "ФГОС ДО — официальный текст",
    desc: "Федеральный государственный образовательный стандарт дошкольного образования",
    tag: "Документ",
    content: {
      type: "document",
      sections: [
        {
          heading: "I. Общие положения",
          text: "Федеральный государственный образовательный стандарт дошкольного образования (далее — Стандарт) является совокупностью обязательных требований к дошкольному образованию. Стандарт направлен на достижение следующих целей: повышение социального статуса дошкольного образования; обеспечение государством равенства возможностей для каждого ребёнка в получении качественного дошкольного образования; обеспечение государственных гарантий уровня и качества дошкольного образования.",
        },
        {
          heading: "II. Требования к условиям реализации программы",
          text: "Стандарт устанавливает требования к психолого-педагогическим, кадровым, материально-техническим и финансовым условиям реализации Программы. Психолого-педагогические условия включают: уважение взрослых к человеческому достоинству детей; использование форм и методов работы с детьми, соответствующих их возрастным и индивидуальным особенностям; построение образовательной деятельности на основе взаимодействия взрослых с детьми.",
        },
        {
          heading: "III. Взаимодействие с семьёй (п. 3.2.1)",
          text: "Для успешной реализации Программы должны быть обеспечены следующие условия: взаимодействие с родителями (законными представителями) по вопросам образования ребёнка, непосредственного вовлечения их в образовательную деятельность, в том числе посредством создания образовательных проектов совместно с семьёй на основе выявления потребностей и поддержки образовательных инициатив семьи.",
        },
        {
          heading: "IV. Требования к результатам освоения программы",
          text: "Требования к результатам освоения Программы представлены в виде целевых ориентиров дошкольного образования, которые представляют собой социально-нормативные возрастные характеристики возможных достижений ребёнка на этапе завершения уровня дошкольного образования. Целевые ориентиры не подлежат непосредственной оценке, в том числе в виде педагогической диагностики, и не являются основанием для их формального сравнения с реальными достижениями детей.",
        },
        {
          heading: "V. Партнёрство с семьёй как принцип Стандарта",
          text: "Стандарт основывается на принципе сотрудничества организации с семьёй. Организация обязана обеспечивать психолого-педагогическую поддержку семьи и повышение компетентности родителей в вопросах развития и образования, охраны и укрепления здоровья детей. Консультативная помощь родителям по вопросам воспитания и обучения детей должна быть доступной и бесплатной.",
        },
      ],
    },
  },
  {
    icon: "Globe",
    title: "Журнал «Воспитатель ДОУ»",
    desc: "Профессиональное издание с практическими материалами для педагогов дошкольного образования",
    tag: "Издание",
    content: {
      type: "journal",
      issues: [
        {
          num: "№ 3 / 2024",
          title: "Нетрадиционные формы работы с семьёй",
          theme: "Взаимодействие с родителями",
          articles: [
            "«Родительский клуб как пространство диалога» — опыт МБДОУ «Радуга», Воронеж",
            "«Семейный театр в детском саду: как вовлечь папу» — методические рекомендации",
            "«Педагогическая гостиная: сценарий первой встречи» — готовый план проведения",
            "«Как справиться с тревожным родителем» — советы педагога-психолога",
          ],
        },
        {
          num: "№ 1 / 2024",
          title: "Цифровые инструменты в работе с семьёй",
          theme: "Цифровизация ДОУ",
          articles: [
            "«Мессенджеры как инструмент педагога: правила и границы»",
            "«Электронное портфолио ребёнка: как создать и вести»",
            "«Онлайн-собрание: технические советы и педагогические лайфхаки»",
            "«Видеодневник группы: опыт трёх детских садов»",
          ],
        },
        {
          num: "№ 5 / 2023",
          title: "Проектная деятельность: семья как участник",
          theme: "Совместные проекты",
          articles: [
            "«Семейный проект \u00abМоя профессия\u00bb: от идеи до выставки»",
            "«Как организовать мини-исследование дома: памятка для родителей»",
            "«Совместное создание книги группы: пошаговый алгоритм»",
            "«Оценка эффективности проектной деятельности с семьёй»",
          ],
        },
        {
          num: "№ 9 / 2023",
          title: "Трудные ситуации во взаимодействии с родителями",
          theme: "Сложные случаи",
          articles: [
            "«Родитель против педагога: как выйти из конфликта»",
            "«Семья в кризисе: тактика поведения воспитателя»",
            "«Когда родитель не приходит: альтернативные каналы связи»",
            "«Юридические аспекты взаимодействия ДОУ с семьёй»",
          ],
        },
      ],
    },
  },
  {
    icon: "Video",
    title: "Видеолекции ФИРО",
    desc: "Открытые лекции Федерального института развития образования по вопросам взаимодействия с семьёй",
    tag: "Видео",
    content: {
      type: "videos",
      items: [
        {
          title: "Партнёрство ДОУ и семьи: от теории к практике",
          speaker: "д.п.н. Т.В. Волосовец, директор ФИРО",
          duration: "1 ч 12 мин",
          desc: "Обзорная лекция о современных подходах к организации взаимодействия детского сада с семьёй. Рассматриваются ключевые принципы партнёрства, типичные ошибки педагогов и эффективные модели сотрудничества.",
        },
        {
          title: "Нетрадиционные формы работы с родителями в условиях ФГОС ДО",
          speaker: "к.п.н. О.А. Скоролупова, зам. директора ФИРО",
          duration: "58 мин",
          desc: "Практическая лекция с разбором конкретных форм: родительский клуб, педагогическая гостиная, семейные мастерские. Примеры из практики ДОУ разных регионов России.",
        },
        {
          title: "Психологические основы взаимодействия педагога с родителями",
          speaker: "к.психол.н. И.Е. Валитова, ведущий научный сотрудник ФИРО",
          duration: "1 ч 05 мин",
          desc: "Лекция о психологических барьерах в общении педагогов и родителей, техниках активного слушания, установлении доверительного контакта с семьёй.",
        },
        {
          title: "Цифровые форматы взаимодействия с семьёй: возможности и риски",
          speaker: "к.п.н. А.В. Микляева, старший научный сотрудник ФИРО",
          duration: "44 мин",
          desc: "Разбор цифровых инструментов: мессенджеры, электронные дневники, видеоконференции. Правовые аспекты, этические нормы и практические рекомендации по внедрению.",
        },
        {
          title: "Работа с «трудными» родителями: стратегии и техники",
          speaker: "д.психол.н. Н.Е. Веракса, научный руководитель ФИРО",
          duration: "1 ч 20 мин",
          desc: "Разбор сложных ситуаций: конфликтный родитель, безразличный родитель, гиперопекающий родитель. Конкретные скрипты разговора и стратегии поведения педагога.",
        },
      ],
    },
  },
  {
    icon: "Download",
    title: "Шаблон анкеты для родителей",
    desc: "Готовый бланк диагностики запросов и предпочтений семей для выбора форм взаимодействия",
    tag: "Шаблон",
    content: {
      type: "questionnaire",
      blocks: [
        {
          title: "Блок 1. Общая информация",
          questions: [
            { q: "Ваша роль в семье", options: ["Мама", "Папа", "Бабушка / дедушка", "Другой законный представитель"], type: "radio" },
            { q: "Возраст вашего ребёнка", options: ["2–3 года", "3–4 года", "4–5 лет", "5–6 лет", "6–7 лет"], type: "radio" },
            { q: "Ваша занятость", options: ["Работаю полный день", "Работаю неполный день / удалённо", "Не работаю", "Другое"], type: "radio" },
          ],
        },
        {
          title: "Блок 2. Интересующие темы",
          questions: [
            {
              q: "Какие темы вам наиболее актуальны? (выберите все подходящие)",
              options: ["Развитие речи и общения", "Подготовка к школе", "Детские конфликты и агрессия", "Режим дня и сон", "Питание и здоровье", "Тревожность и страхи", "Отношения между детьми в семье", "Гаджеты и экранное время"],
              type: "checkbox",
            },
          ],
        },
        {
          title: "Блок 3. Предпочитаемые форматы",
          questions: [
            {
              q: "Какие форматы встреч вам подходят? (выберите все подходящие)",
              options: ["Групповые встречи в ДОУ", "Индивидуальные консультации", "Онлайн-консультации", "Мастер-классы вместе с ребёнком", "Лекции с приглашёнными специалистами", "Неформальные клубные встречи", "Выезды и семейные мероприятия"],
              type: "checkbox",
            },
            {
              q: "Удобное время для встреч",
              options: ["Утром (до 9:00)", "Днём (12:00–15:00)", "Вечером в будни (17:00–19:00)", "Вечером в будни (19:00–21:00)", "В выходные дни"],
              type: "checkbox",
            },
            {
              q: "Оптимальная продолжительность встречи",
              options: ["До 30 минут", "30–60 минут", "1–1,5 часа", "Более 1,5 часа"],
              type: "radio",
            },
          ],
        },
        {
          title: "Блок 4. Ваш опыт и пожелания",
          questions: [
            { q: "Насколько вы удовлетворены текущим общением с педагогами? (1 — совсем нет, 5 — полностью)", options: ["1", "2", "3", "4", "5"], type: "scale" },
            { q: "Готовы ли вы сами выступить на встрече и поделиться опытом?", options: ["Да, с удовольствием", "Возможно, если тема близкая", "Нет, предпочитаю слушать"], type: "radio" },
            { q: "Ваши пожелания и предложения педагогам (свободный ответ)", type: "text" },
          ],
        },
      ],
    },
  },
];

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      let current = "home";
      for (const s of sections) {
        if (s && s.getBoundingClientRect().top <= 80) {
          current = s.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy();
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [activeForm, setActiveForm] = useState<number | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF6F0] warm-texture font-body">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-sm border-b border-[#E5D5C5] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-2xl">🌱</span>
            <span className="font-display font-semibold text-xl text-[#5C3D2E] leading-none">
              Мост<span className="text-[#C4622D]">·</span>ДОУ
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-body font-medium transition-colors ${
                  active === item.id
                    ? "text-[#C4622D] active"
                    : "text-[#5C3D2E]/70 hover:text-[#C4622D]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="lg:hidden p-2 text-[#5C3D2E]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#FAF6F0] border-t border-[#E5D5C5] px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.id); setMenuOpen(false); }}
                className={`text-left py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-[#C4622D]/10 text-[#C4622D]"
                    : "text-[#5C3D2E]/80 hover:bg-[#E5D5C5]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#C4622D]/6 blur-3xl" />
          <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-[#5A7A6A]/8 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4622D]/10 text-[#C4622D] rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in-up">
              <span>🌿</span> Педагогический ресурс для ДОУ
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#5C3D2E] leading-[1.1] mb-6 animate-fade-in-up delay-100">
              Строим мост между{" "}
              <em className="text-[#C4622D] not-italic">детским садом</em>{" "}
              и семьёй
            </h1>
            <p className="text-[#5C3D2E]/70 text-lg leading-relaxed mb-8 animate-fade-in-up delay-200 max-w-lg">
              Практические инструменты, кейсы и рекомендации для педагогов, которые хотят выстроить живое, настоящее партнёрство с родителями.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("forms")}
                className="bg-[#C4622D] hover:bg-[#9A4520] text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-[#C4622D]/25 active:scale-95"
              >
                Узнать о формах работы
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="border border-[#C4622D]/30 text-[#C4622D] hover:bg-[#C4622D]/8 px-6 py-3 rounded-xl font-medium transition-all"
              >
                О проекте
              </button>
            </div>
          </div>

          <div className="relative animate-scale-in delay-200">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-[#C4622D]/10 border-2 border-[#C4622D]/15" />
            <img
              src="https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/90f81ec7-9390-4392-bf28-cb4e645bfb41.jpg"
              alt="Взаимодействие педагогов и родителей"
              className="relative w-full h-[400px] object-cover rounded-2xl shadow-2xl shadow-[#5C3D2E]/15"
            />
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-xl border border-[#E5D5C5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5A7A6A]/15 rounded-xl flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-[#5A7A6A]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#5C3D2E]">87% педагогов</div>
                  <div className="text-xs text-[#5C3D2E]/60">отмечают улучшение отношений</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#5A7A6A] text-sm font-medium">
                <div className="w-8 h-0.5 bg-[#5A7A6A]" />
                О проекте
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#5C3D2E] leading-tight">
                Зачем нужен этот ресурс?
              </h2>
              <p className="text-[#5C3D2E]/70 text-base leading-relaxed">
                Традиционные родительские собрания и доски объявлений уже не обеспечивают того качества партнёрства, которого требует современное образование. Педагоги нуждаются в новых инструментах — доступных, проверенных и вдохновляющих.
              </p>
              <p className="text-[#5C3D2E]/70 text-base leading-relaxed">
                Этот ресурс собирает альтернативные формы взаимодействия ДОУ с семьёй: от «Педагогической гостиной» до цифровых форматов. Здесь вы найдёте практические рекомендации, реальные кейсы и готовые шаблоны.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { num: "12+", label: "форм взаимодействия" },
                  { num: "50+", label: "практических советов" },
                  { num: "30+", label: "кейсов из практики" },
                ].map((s) => (
                  <div key={s.num} className="text-center p-4 bg-[#FAF6F0] rounded-xl">
                    <div className="font-display text-3xl font-semibold text-[#C4622D]">{s.num}</div>
                    <div className="text-xs text-[#5C3D2E]/60 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "Target", title: "Цель проекта", text: "Помочь педагогам ДОУ выйти за рамки формального общения с семьёй и выстроить партнёрские отношения, основанные на доверии и уважении." },
                { icon: "Compass", title: "Наш подход", text: "Опираемся на лучшие практики российских ДОУ, рекомендации ФГОС и современные исследования в области педагогики взаимодействия." },
                { icon: "Users", title: "Для кого", text: "Для воспитателей, старших педагогов, методистов и руководителей ДОУ, а также для родителей, которые хотят участвовать в жизни детского сада." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-[#E5D5C5] bg-[#FAF6F0] card-hover">
                  <div className="w-11 h-11 bg-[#C4622D]/12 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={item.icon} fallback="CircleAlert" size={20} className="text-[#C4622D]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#5C3D2E] mb-1">{item.title}</div>
                    <div className="text-sm text-[#5C3D2E]/65 leading-relaxed">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORMS */}
      <section id="forms" className="py-24 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#5A7A6A] text-sm font-medium mb-4">
              <div className="w-8 h-0.5 bg-[#5A7A6A]" />
              Альтернативные форматы
              <div className="w-8 h-0.5 bg-[#5A7A6A]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#5C3D2E] mb-4">
              Формы взаимодействия ДОУ с семьёй
            </h2>
            <p className="text-[#5C3D2E]/65 max-w-xl mx-auto leading-relaxed">
              Каждая семья уникальна. Предлагайте разные форматы — и каждый найдёт свой путь к участию в жизни детского сада.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FORMS.map((form, i) => {
              const colorMap: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
                terra: { bg: "bg-[#C4622D]/10", icon: "text-[#C4622D]", border: "border-[#C4622D]/15", hover: "hover:border-[#C4622D]/40 hover:bg-[#FFF8F5]" },
                sage: { bg: "bg-[#5A7A6A]/10", icon: "text-[#5A7A6A]", border: "border-[#5A7A6A]/15", hover: "hover:border-[#5A7A6A]/40 hover:bg-[#F5FAF7]" },
                gold: { bg: "bg-[#D4A853]/15", icon: "text-[#A07820]", border: "border-[#D4A853]/25", hover: "hover:border-[#D4A853]/50 hover:bg-[#FFFBF2]" },
              };
              const c = colorMap[form.color];
              return (
                <button
                  key={i}
                  onClick={() => setActiveForm(i)}
                  className={`text-left bg-white rounded-2xl p-6 border ${c.border} ${c.hover} card-hover transition-colors w-full group`}
                >
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon name={form.icon} fallback="CircleAlert" size={22} className={c.icon} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#5C3D2E] mb-2">{form.title}</h3>
                  <p className="text-sm text-[#5C3D2E]/65 leading-relaxed mb-4">{form.desc}</p>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${c.icon} opacity-70 group-hover:opacity-100 transition-opacity`}>
                    Подробнее <Icon name="ArrowRight" size={13} className={c.icon} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section id="recommendations" className="py-24 bg-[#5C3D2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C4622D]/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-[#5A7A6A]/20 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8A882] text-sm font-medium mb-4">
              <div className="w-8 h-0.5 bg-[#E8A882]" />
              Практика
              <div className="w-8 h-0.5 bg-[#E8A882]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-4">
              Рекомендации для педагогов
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Проверенные советы, которые помогут сделать взаимодействие с семьями более живым и результативным.
            </p>
          </div>

          <div className="space-y-4">
            {RECOMMENDATIONS.map((r, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition-colors">
                <div className="font-display text-4xl font-semibold text-[#C4622D]/50 shrink-0 leading-none pt-1">
                  {r.num}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{r.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#5A7A6A] text-sm font-medium mb-4">
              <div className="w-8 h-0.5 bg-[#5A7A6A]" />
              Кейсы и примеры
              <div className="w-8 h-0.5 bg-[#5A7A6A]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#5C3D2E] mb-4">
              Галерея практик
            </h2>
            <p className="text-[#5C3D2E]/65 max-w-lg mx-auto">
              Реальные примеры альтернативных форм взаимодействия из практики детских садов.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className="gallery-item rounded-2xl overflow-hidden border border-[#E5D5C5] cursor-pointer card-hover bg-[#FAF6F0]"
                onClick={() => setGalleryOpen(i)}
              >
                <div className="overflow-hidden h-52">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-[#C4622D]/10 text-[#C4622D] text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#5C3D2E] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5C3D2E]/65 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form detail modal */}
      {activeForm !== null && (() => {
        const form = FORMS[activeForm];
        const colorMap: Record<string, { bg: string; icon: string; accent: string; tag: string }> = {
          terra: { bg: "bg-[#C4622D]/10", icon: "text-[#C4622D]", accent: "#C4622D", tag: "bg-[#C4622D]/10 text-[#C4622D]" },
          sage: { bg: "bg-[#5A7A6A]/10", icon: "text-[#5A7A6A]", accent: "#5A7A6A", tag: "bg-[#5A7A6A]/10 text-[#5A7A6A]" },
          gold: { bg: "bg-[#D4A853]/15", icon: "text-[#A07820]", accent: "#A07820", tag: "bg-[#D4A853]/15 text-[#A07820]" },
        };
        const c = colorMap[form.color];
        return (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setActiveForm(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-scale-in overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-7 pb-0">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center`}>
                    <Icon name={form.icon} fallback="CircleAlert" size={22} className={c.icon} />
                  </div>
                  <button
                    onClick={() => setActiveForm(null)}
                    className="w-9 h-9 bg-[#FAF6F0] hover:bg-[#E5D5C5] rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon name="X" size={16} className="text-[#5C3D2E]" />
                  </button>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#5C3D2E] mb-2">{form.title}</h2>
                <p className="text-[#5C3D2E]/65 text-sm leading-relaxed mb-6">{form.desc}</p>

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="PlayCircle" size={16} className={c.icon} />
                    <span className="text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Как проходит</span>
                  </div>
                  <ul className="space-y-2.5">
                    {form.howItWorks.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-[#5C3D2E]/75 leading-relaxed">
                        <span className={`shrink-0 w-5 h-5 rounded-full ${c.bg} ${c.icon} flex items-center justify-center text-xs font-semibold mt-0.5`}>
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mx-7 mb-7 rounded-xl bg-[#FAF6F0] border border-[#E5D5C5] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="UserCheck" size={15} className="text-[#C4622D]" />
                  <span className="text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Как записаться</span>
                </div>
                <p className="text-sm text-[#5C3D2E]/75 leading-relaxed mb-3">{form.howToJoin}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-[#E5D5C5]">
                  <Icon name="Phone" size={13} className="text-[#5A7A6A]" />
                  <span className="text-xs text-[#5C3D2E]/60">К кому обратиться: </span>
                  <span className="text-xs font-medium text-[#5C3D2E]">{form.contact}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Gallery modal */}
      {galleryOpen !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setGalleryOpen(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={GALLERY[galleryOpen].img}
                alt={GALLERY[galleryOpen].title}
                className="w-full h-72 object-cover"
              />
              <button
                onClick={() => setGalleryOpen(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="p-6">
              <span className="inline-block bg-[#C4622D]/10 text-[#C4622D] text-xs font-medium px-3 py-1 rounded-full mb-3">
                {GALLERY[galleryOpen].tag}
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#5C3D2E] mb-2">{GALLERY[galleryOpen].title}</h3>
              <p className="text-[#5C3D2E]/70 leading-relaxed">{GALLERY[galleryOpen].desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* MATERIALS */}
      <section id="materials" className="py-24 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#5A7A6A] text-sm font-medium mb-4">
              <div className="w-8 h-0.5 bg-[#5A7A6A]" />
              Библиотека
              <div className="w-8 h-0.5 bg-[#5A7A6A]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#5C3D2E] mb-4">
              Дополнительные материалы
            </h2>
            <p className="text-[#5C3D2E]/65 max-w-lg mx-auto">
              Полезные ресурсы, документы и шаблоны для педагогов ДОУ.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {MATERIALS.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveMaterial(i)}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-[#E5D5C5] card-hover group text-left w-full hover:border-[#5A7A6A]/40 transition-colors"
              >
                <div className="w-12 h-12 bg-[#5A7A6A]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#5A7A6A]/20 transition-colors">
                  <Icon name={m.icon} fallback="CircleAlert" size={22} className="text-[#5A7A6A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-[#5C3D2E] group-hover:text-[#C4622D] transition-colors">{m.title}</h3>
                    <span className="shrink-0 text-xs bg-[#E5D5C5] text-[#5C3D2E]/70 px-2 py-0.5 rounded-full">{m.tag}</span>
                  </div>
                  <p className="text-sm text-[#5C3D2E]/60 leading-relaxed mb-3">{m.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A7A6A] opacity-70 group-hover:opacity-100 transition-opacity">
                    Открыть <Icon name="ArrowRight" size={13} className="text-[#5A7A6A]" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-[#5A7A6A] text-sm font-medium mb-4">
                <div className="w-8 h-0.5 bg-[#5A7A6A]" />
                Обратная связь
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#5C3D2E] mb-6 leading-tight">
                Есть вопрос или идея?
              </h2>
              <p className="text-[#5C3D2E]/70 leading-relaxed mb-8">
                Напишите нам — мы рады услышать педагогов, которые хотят поделиться своим опытом, задать вопрос или предложить новый материал для ресурса.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Mail", label: "Электронная почта", val: "info@most-dou.ru" },
                  { icon: "Phone", label: "Телефон", val: "+7 (800) 555-00-00" },
                  { icon: "MapPin", label: "Адрес", val: "Москва, Россия" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#C4622D]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={c.icon} fallback="CircleAlert" size={18} className="text-[#C4622D]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C3D2E]/50 mb-0.5">{c.label}</div>
                      <div className="text-[#5C3D2E] font-medium text-sm">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF6F0] rounded-2xl p-8 border border-[#E5D5C5]">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🌿</div>
                  <h3 className="font-display text-2xl font-semibold text-[#5C3D2E] mb-2">Спасибо!</h3>
                  <p className="text-[#5C3D2E]/65">Ваше сообщение отправлено. Мы ответим в течение одного рабочего дня.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-2xl font-semibold text-[#5C3D2E] mb-6">Напишите нам</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5C3D2E]/70 mb-1.5">Имя</label>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5D5C5] bg-white text-[#5C3D2E] placeholder:text-[#5C3D2E]/35 focus:outline-none focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/15 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5C3D2E]/70 mb-1.5">Почта</label>
                      <input
                        type="email"
                        placeholder="email@example.ru"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5D5C5] bg-white text-[#5C3D2E] placeholder:text-[#5C3D2E]/35 focus:outline-none focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/15 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5C3D2E]/70 mb-1.5">Вы</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-[#E5D5C5] bg-white text-[#5C3D2E] focus:outline-none focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/15 transition-all text-sm">
                      <option value="">Выберите роль</option>
                      <option>Воспитатель / педагог</option>
                      <option>Методист / старший воспитатель</option>
                      <option>Руководитель ДОУ</option>
                      <option>Родитель</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5C3D2E]/70 mb-1.5">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Ваш вопрос, предложение или опыт, которым хотите поделиться..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5D5C5] bg-white text-[#5C3D2E] placeholder:text-[#5C3D2E]/35 focus:outline-none focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/15 transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C4622D] hover:bg-[#9A4520] text-white py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-[#C4622D]/25 active:scale-95"
                  >
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Material modal */}
      {activeMaterial !== null && (() => {
        const mat = MATERIALS[activeMaterial];
        const c = mat.content;
        return (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setActiveMaterial(null)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-[#E5D5C5] shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#5A7A6A]/10 rounded-xl flex items-center justify-center">
                    <Icon name={mat.icon} fallback="CircleAlert" size={20} className="text-[#5A7A6A]" />
                  </div>
                  <div>
                    <span className="text-xs bg-[#E5D5C5] text-[#5C3D2E]/70 px-2 py-0.5 rounded-full">{mat.tag}</span>
                    <h2 className="font-display text-xl font-semibold text-[#5C3D2E] mt-0.5">{mat.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMaterial(null)}
                  className="w-9 h-9 bg-[#FAF6F0] hover:bg-[#E5D5C5] rounded-full flex items-center justify-center transition-colors shrink-0 ml-3"
                >
                  <Icon name="X" size={16} className="text-[#5C3D2E]" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto p-6 space-y-6">
                {c.type === "document" && c.sections.map((s, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-[#5C3D2E] mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#C4622D]/10 text-[#C4622D] rounded-full flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                      {s.heading}
                    </h3>
                    <p className="text-sm text-[#5C3D2E]/70 leading-relaxed pl-8">{s.text}</p>
                  </div>
                ))}

                {c.type === "journal" && c.issues.map((issue, idx) => (
                  <div key={idx} className="rounded-xl border border-[#E5D5C5] overflow-hidden">
                    <div className="bg-[#FAF6F0] px-5 py-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#5A7A6A] font-medium">{issue.num} · {issue.theme}</span>
                        <h3 className="font-semibold text-[#5C3D2E] mt-0.5">{issue.title}</h3>
                      </div>
                      <Icon name="BookOpen" size={18} className="text-[#5A7A6A] shrink-0" />
                    </div>
                    <ul className="px-5 py-4 space-y-2">
                      {issue.articles.map((a, ai) => (
                        <li key={ai} className="flex gap-2 text-sm text-[#5C3D2E]/70">
                          <span className="text-[#C4622D] mt-0.5 shrink-0">—</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {c.type === "videos" && c.items.map((v, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-[#E5D5C5] bg-[#FAF6F0]">
                    <div className="w-12 h-12 bg-[#C4622D]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name="PlayCircle" size={22} className="text-[#C4622D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-[#5C3D2E] text-sm leading-snug">{v.title}</h3>
                        <span className="shrink-0 text-xs bg-white border border-[#E5D5C5] text-[#5C3D2E]/60 px-2 py-0.5 rounded-full">{v.duration}</span>
                      </div>
                      <p className="text-xs text-[#5A7A6A] mb-1.5 font-medium">{v.speaker}</p>
                      <p className="text-xs text-[#5C3D2E]/65 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}

                {c.type === "questionnaire" && c.blocks.map((block, bi) => (
                  <div key={bi}>
                    <h3 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#5A7A6A]/10 text-[#5A7A6A] rounded-full flex items-center justify-center text-xs font-bold shrink-0">{bi + 1}</span>
                      {block.title}
                    </h3>
                    <div className="space-y-4 pl-8">
                      {block.questions.map((question, qi) => (
                        <div key={qi} className="rounded-xl border border-[#E5D5C5] p-4 bg-[#FAF6F0]">
                          <p className="text-sm font-medium text-[#5C3D2E] mb-3">{question.q}</p>
                          {question.type === "text" && (
                            <div className="w-full h-16 rounded-lg border border-[#E5D5C5] bg-white px-3 py-2 text-xs text-[#5C3D2E]/40 flex items-start">
                              Место для ответа родителя...
                            </div>
                          )}
                          {question.type === "scale" && question.options && (
                            <div className="flex gap-2">
                              {question.options.map((o) => (
                                <div key={o} className="w-9 h-9 rounded-full border-2 border-[#E5D5C5] bg-white flex items-center justify-center text-sm font-semibold text-[#5C3D2E]/50">{o}</div>
                              ))}
                            </div>
                          )}
                          {(question.type === "radio" || question.type === "checkbox") && question.options && (
                            <div className="space-y-1.5">
                              {question.options.map((o) => (
                                <div key={o} className="flex items-center gap-2.5 text-sm text-[#5C3D2E]/75">
                                  <div className={`w-4 h-4 border-2 border-[#E5D5C5] bg-white shrink-0 ${question.type === "radio" ? "rounded-full" : "rounded"}`} />
                                  {o}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* FOOTER */}
      <footer className="bg-[#5C3D2E] text-white/70 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="font-display font-semibold text-lg text-white">Мост·ДОУ</span>
          </div>
          <p className="text-sm text-center">
            Педагогический ресурс об альтернативных формах взаимодействия ДОУ с семьёй
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {NAV_ITEMS.slice(0, 4).map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-xs hover:text-white transition-colors">
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}