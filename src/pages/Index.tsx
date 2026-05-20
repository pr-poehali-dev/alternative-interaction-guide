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
    img: "https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/0c44d6c7-ad03-454f-883a-ed4c047ac7c2.jpg",
    title: "Педагогическая гостиная",
    tag: "Совместная работа",
    desc: "Педагоги и родители группы «Звёздочки» обсуждают образовательные маршруты детей в уютной атмосфере.",
  },
  {
    img: "https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/2e8841b9-6465-46be-9bd0-7124c8cc478a.jpg",
    title: "Семейная мастерская",
    tag: "Творчество",
    desc: "Дети и родители вместе создают поделки из природного материала — проект «Осенние дары».",
  },
  {
    img: "https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/ebbdaec7-fddd-4ef5-870f-e9b0a33f9044.jpg",
    title: "Семейный праздник",
    tag: "Событие",
    desc: "День открытых дверей с подвижными играми на свежем воздухе объединил 15 семей.",
  },
];

const MATERIALS = [
  {
    icon: "FileText",
    title: "ФГОС ДО — официальный текст",
    desc: "Федеральный государственный образовательный стандарт дошкольного образования",
    link: "#",
    tag: "Документ",
  },
  {
    icon: "Globe",
    title: "Журнал «Воспитатель ДОУ»",
    desc: "Профессиональное издание с практическими материалами для педагогов дошкольного образования",
    link: "#",
    tag: "Издание",
  },
  {
    icon: "Video",
    title: "Видеолекции ФИРО",
    desc: "Открытые лекции Федерального института развития образования по вопросам взаимодействия с семьёй",
    link: "#",
    tag: "Видео",
  },
  {
    icon: "Download",
    title: "Шаблон анкеты для родителей",
    desc: "Готовый бланк диагностики запросов и предпочтений семей для выбора форм взаимодействия",
    link: "#",
    tag: "Шаблон",
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
              src="https://cdn.poehali.dev/projects/e62eb3d6-d0a3-48aa-be67-c4d2e5462dee/files/0c44d6c7-ad03-454f-883a-ed4c047ac7c2.jpg"
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
              <a
                key={i}
                href={m.link}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-[#E5D5C5] card-hover group"
              >
                <div className="w-12 h-12 bg-[#5A7A6A]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#5A7A6A]/20 transition-colors">
                  <Icon name={m.icon} fallback="CircleAlert" size={22} className="text-[#5A7A6A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-[#5C3D2E] group-hover:text-[#C4622D] transition-colors">{m.title}</h3>
                    <span className="shrink-0 text-xs bg-[#E5D5C5] text-[#5C3D2E]/70 px-2 py-0.5 rounded-full">{m.tag}</span>
                  </div>
                  <p className="text-sm text-[#5C3D2E]/60 leading-relaxed">{m.desc}</p>
                </div>
                <Icon name="ExternalLink" size={16} className="text-[#5C3D2E]/30 group-hover:text-[#C4622D] transition-colors shrink-0 mt-1" />
              </a>
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