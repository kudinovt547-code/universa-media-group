/* global window */
// i18n dictionary + helpers

const I18N = {
  ru: {
    nav: {
      services: "Услуги",
      cases: "Кейсы",
      process: "Процесс",
      quiz: "Бриф",
      contact: "Связаться",
    },
    hero: {
      tag: "AI продукты для бизнеса",
      headline: ["Создаём", "AI-системы,", "которые", "приносят", "[deньги]"],
      // Special: word in brackets becomes accent
      sub: "Universa Media Group — студия AI-разработки. Сайты, мобильные приложения, чат-агенты, внутреннее ПО, Telegram и VK боты, контент-фабрики. От стратегии до запуска и эксплуатации.",
      ctaPrimary: "Запустить проект",
      ctaSecondary: "Смотреть кейсы",
      ticker: [
        "AI Websites", "Mobile Apps", "Chat Agents",
        "Internal Tools", "Telegram Bots", "VK Bots",
        "Content Factories", "AI Consultants",
        "Voice Agents", "Automation", "AI Strategy",
      ],
      stats: [
        { v: "8+", k: "Запущенных AI-продуктов" },
        { v: "2", k: "Сети партнёров" },
        { v: "100%", k: "Заказчиков возвращаются" },
        { v: "24/7", k: "Поддержка" },
      ],
    },
    services: {
      tag: "01 / Услуги",
      title: "Шесть направлений — одна команда",
      desc: "Мы закрываем полный цикл AI-разработки: от стратегии и UX до интеграций, обучения моделей и поддержки. Не продаём абстрактный «искусственный интеллект» — собираем рабочие системы, которые решают конкретные задачи вашего бизнеса.",
      items: [
        {
          n: "01",
          t: "AI-сайты",
          d: "Лендинги, корпоративные сайты и платформы со встроенным AI: умный поиск, персонализация, AI-консьерж, генерация контента.",
          tags: ["Next.js", "RAG", "Personalization", "CMS"],
        },
        {
          n: "02",
          t: "Мобильные приложения",
          d: "iOS и Android приложения с AI-функциональностью: распознавание, генерация, рекомендации, голосовые интерфейсы.",
          tags: ["iOS", "Android", "React Native", "Edge AI"],
        },
        {
          n: "03",
          t: "Чат-агенты и AI-консультанты",
          d: "Голосовые и текстовые агенты для продаж, поддержки, консультаций. RAG на ваших данных, интеграция с CRM, аналитика диалогов.",
          tags: ["GPT-4o", "Claude", "Voice", "RAG"],
        },
        {
          n: "04",
          t: "Внутреннее ПО",
          d: "Инструменты для команды: ассистенты менеджеров, AI-копилоты, базы знаний, автоматизация рутины. Замеряем экономию часов.",
          tags: ["Internal Tools", "Knowledge Base", "Workflows"],
        },
        {
          n: "05",
          t: "Telegram и VK боты",
          d: "От простых ботов-меню до полноценных AI-консультантов с генерацией контента, мини-приложений и платёжных воронок.",
          tags: ["Telegram", "VK", "Mini Apps", "Payments"],
        },
        {
          n: "06",
          t: "Контент-фабрики",
          d: "Конвейерные системы генерации контента: соцсети, email, статьи, изображения. Бренд-tone, человеческая редактура, аналитика.",
          tags: ["Content Ops", "LLM Pipelines", "Brand Voice"],
        },
      ],
    },
    cases: {
      tag: "02 / Кейсы",
      title: "Реальные продукты для реальных клиентов",
      desc: "Каждый кейс — это конкретная бизнес-задача, измеримый результат и продукт, который продолжает работать после сдачи. Раскройте карточку, чтобы увидеть подробности.",
      items: [
        {
          n: "01",
          client: "KEYPORT",
          kind: "Внутренний AI-ассистент менеджеров",
          year: "2025",
          tech: "RAG · Claude · CRM",
          task: "KEYPORT — стратегический партнёр девелоперов, создающих апарт-отели нового поколения. Менеджеры по продажам теряли время и сделки из-за того, что не успевали находить ответы на специфические вопросы клиентов прямо во время звонка.",
          solution: "Собрали внутреннего AI-агента: менеджер во время звонка вводит вопрос клиента — получает готовый ответ на основе базы знаний по проекту (планировки, метражи, юридические детали, сроки, локация). Интеграция в рабочий интерфейс менеджера, авто-обновление базы знаний.",
          result: [
            { v: "4.2×", k: "быстрее ответ клиенту" },
            { v: "−70%", k: "времени на эскалации" },
            { v: "100%", k: "охват менеджеров" },
          ],
        },
        {
          n: "02",
          client: "Сеть отелей «Порт Комфорт»",
          kind: "AI-бот для отзывов с генерацией фото",
          year: "2024",
          tech: "Telegram · Image Gen · Loyalty",
          task: "Сеть апарт-отелей теряла поток органических отзывов. Гости были довольны, но не оставляли публичных отзывов на картах и агрегаторах. Стандартные программы лояльности не вовлекали.",
          solution: "Запустили Telegram-бота с механикой «отзыв → AI-фото с Петром I». Гость пишет отзыв — бот публикует его на нужных площадках и предлагает сгенерировать 3 фото гостя с императором в декорациях отеля. Вирусная механика, эксклюзивный артефакт, никакого скучного «спасибо за отзыв».",
          result: [
            { v: "×6", k: "поток отзывов" },
            { v: "4.9", k: "средняя оценка" },
            { v: "38%", k: "доля шеринга в соцсетях" },
          ],
        },
        {
          n: "03",
          client: "Контент-фабрика · Инвест-апартаменты",
          kind: "AI-автоматизация Telegram + VK",
          year: "2026",
          tech: "Telegram · VK · LLM Pipeline",
          task: "Управляющая компания в сегменте инвестиционных апартаментов хотела вести Telegram-канал и VK-сообщество с регулярным экспертным контентом, но ресурсов на ежедневный продакшен не было. Узкая ниша требует точности по фактам и выдержанного тона.",
          solution: "Собрали контент-конвейер: парсинг профильных источников и новостей по апарт-сегменту → генерация постов в фирменном tone-of-voice → шаблоны под форматы (новости рынка, разборы локаций, инвест-цифры, обзоры лотов) → автопубликация в Telegram и VK с адаптацией под платформу. Редакторская проверка одной кнопкой.",
          result: [
            { v: "30+", k: "дней непрерывной публикации" },
            { v: "2", k: "канала синхронно (TG + VK)" },
            { v: "0", k: "пропущенных дней" },
          ],
        },
      ],
    },
    process: {
      tag: "03 / Процесс",
      title: "Как мы работаем",
      desc: "Прозрачный процесс с понятными артефактами на каждом этапе. Без воды, без бесконечных бриф-сессий, без сюрпризов на запуске.",
      steps: [
        { n: "01", t: "Бриф и аудит", d: "Глубокое погружение в бизнес-задачу, текущие процессы, метрики успеха. На выходе — карта проблемы и гипотеза решения.", meta: "1–2 недели · Discovery doc" },
        { n: "02", t: "Прототип и архитектура", d: "Кликабельный прототип ключевых сценариев + техническая архитектура AI-системы: модели, данные, интеграции, инфраструктура.", meta: "2–3 недели · Figma + Tech spec" },
        { n: "03", t: "MVP-разработка", d: "Спринт-разработка минимально жизнеспособного продукта с реальными интеграциями. Демо каждую неделю, корректировки на лету.", meta: "4–8 недель · Working MVP" },
        { n: "04", t: "Тонкая настройка AI", d: "Промпт-инжиниринг, RAG-оптимизация, файн-тюнинг, прохождение по реальным сценариям, замеры качества ответов.", meta: "2–3 недели · Quality benchmark" },
        { n: "05", t: "Запуск и обучение", d: "Деплой, интеграция с вашими системами, обучение команды, документация. Передача без головной боли.", meta: "1 неделя · Launch + handoff" },
        { n: "06", t: "Поддержка и развитие", d: "Мониторинг, A/B-тесты промптов и моделей, развитие фичей, регулярные созвоны с метриками. Продукт растёт вместе с бизнесом.", meta: "Continuous · SLA 24/7" },
      ],
    },
    quiz: {
      tag: "04 / Бриф",
      title: "Расскажите о задаче",
      desc: "Короткий бриф из 5 шагов. Ответы помогут нам подготовиться к первому созвону. Среднее время — 2 минуты.",
      stepLabel: "Шаг",
      of: "из",
      next: "Дальше",
      back: "Назад",
      submit: "Отправить в Telegram",
      questions: [
        {
          q: "Какой продукт нужен?",
          sub: "Можно выбрать несколько",
          multi: true,
          opts: [
            "AI-сайт или платформа",
            "Мобильное приложение",
            "Чат-агент / AI-консультант",
            "Внутреннее AI ПО",
            "Telegram / VK бот",
            "Контент-фабрика",
            "Ещё не определились",
          ],
        },
        {
          q: "Размер бизнеса",
          sub: "Поможет нам подобрать масштаб решения",
          opts: [
            "Стартап / соло-предприниматель",
            "Малый бизнес (до 50 чел.)",
            "Средний (50–500 чел.)",
            "Корпорация (500+)",
          ],
        },
        {
          q: "Когда хотите запуститься?",
          sub: "Реалистично оцениваем сроки",
          opts: [
            "Вчера — горящий проект",
            "В ближайший квартал",
            "В этом полугодии",
            "Не спешим, исследуем",
          ],
        },
        {
          q: "Ориентир по бюджету",
          sub: "Без него сложно предложить нужный масштаб",
          opts: [
            "до 300 000 ₽",
            "300 000 – 800 000 ₽",
            "800 000 – 2 500 000 ₽",
            "2 500 000 ₽ +",
            "Обсудим в диалоге",
          ],
        },
        {
          q: "Как с вами связаться?",
          sub: "Telegram @username — этого достаточно",
          input: true,
          placeholder: "@your_telegram",
        },
      ],
      finalTitle: "Готово",
      finalDesc: "Открываем Telegram с готовым сообщением — вам остаётся только нажать «Отправить». Ответим в течение рабочего дня.",
      finalCta: "Открыть Telegram",
      stepsCount: 5,
    },
    contact: {
      tag: "05 / Связь",
      lead: "Поговорите",
      mid: "с",
      handle: "@universamgmanagebot",
      end: " — AI-консультант студии, на связи 24/7.",
      meta: [
        { k: "Канал связи", v: "AI-консультант · Telegram" },
        { k: "Часовой пояс", v: "GMT+3 · Москва" },
        { k: "Время ответа", v: "Мгновенно · 24/7" },
        { k: "Языки", v: "Русский · English" },
      ],
    },
    footer: {
      left: "© 2026 Universa Media Group",
      right: "Built with Claude · Crafted in Moscow",
    },
  },

  en: {
    nav: {
      services: "Services",
      cases: "Cases",
      process: "Process",
      quiz: "Brief",
      contact: "Contact",
    },
    hero: {
      tag: "AI products for business",
      headline: ["We", "build", "AI", "systems", "that", "[make]", "[money]"],
      sub: "Universa Media Group is an AI product studio. Websites, mobile apps, chat agents, internal tools, Telegram and VK bots, content factories. From strategy to launch and ongoing operations.",
      ctaPrimary: "Start a project",
      ctaSecondary: "See case studies",
      ticker: [
        "AI Websites", "Mobile Apps", "Chat Agents",
        "Internal Tools", "Telegram Bots", "VK Bots",
        "Content Factories", "AI Consultants",
        "Voice Agents", "Automation", "AI Strategy",
      ],
      stats: [
        { v: "8+", k: "Shipped AI products" },
        { v: "2", k: "Partner networks" },
        { v: "100%", k: "Returning clients" },
        { v: "24/7", k: "Support" },
      ],
    },
    services: {
      tag: "01 / Services",
      title: "Six directions, one team",
      desc: "We cover the full AI development cycle — from strategy and UX to integrations, model tuning and ongoing operations. We don't sell abstract «artificial intelligence»; we build working systems that solve concrete business problems.",
      items: [
        { n: "01", t: "AI websites", d: "Landing pages, corporate sites and platforms with native AI: smart search, personalization, AI concierge, content generation.", tags: ["Next.js", "RAG", "Personalization", "CMS"] },
        { n: "02", t: "Mobile apps", d: "iOS and Android apps with AI built in: recognition, generation, recommendations, voice interfaces.", tags: ["iOS", "Android", "React Native", "Edge AI"] },
        { n: "03", t: "Chat agents & AI consultants", d: "Voice and text agents for sales, support, consulting. RAG on your data, CRM integrations, dialog analytics.", tags: ["GPT-4o", "Claude", "Voice", "RAG"] },
        { n: "04", t: "Internal tooling", d: "Tools for your team: manager copilots, knowledge bases, workflow automation. We measure the hours saved.", tags: ["Internal Tools", "Knowledge Base", "Workflows"] },
        { n: "05", t: "Telegram & VK bots", d: "From simple menu bots to full AI consultants with content generation, mini-apps and payment funnels.", tags: ["Telegram", "VK", "Mini Apps", "Payments"] },
        { n: "06", t: "Content factories", d: "Pipeline content systems: social, email, articles, images. Brand tone, human review, full analytics.", tags: ["Content Ops", "LLM Pipelines", "Brand Voice"] },
      ],
    },
    cases: {
      tag: "02 / Cases",
      title: "Real products for real clients",
      desc: "Every case is a specific business problem, a measurable result and a product that keeps running after handoff. Open a card to see the breakdown.",
      items: [
        {
          n: "01",
          client: "KEYPORT",
          kind: "Internal AI assistant for sales managers",
          year: "2025",
          tech: "RAG · Claude · CRM",
          task: "KEYPORT is a strategic partner for developers building a new generation of apart-hotels. Sales managers were losing time and deals because they couldn't find answers to specific client questions during live calls.",
          solution: "We built an internal AI agent: during a call, the manager types the client's question and gets a ready answer based on the project knowledge base (layouts, square meters, legal details, timing, location). Embedded in the manager's workspace, with auto-updating knowledge base.",
          result: [
            { v: "4.2×", k: "faster client answers" },
            { v: "−70%", k: "less time on escalations" },
            { v: "100%", k: "manager coverage" },
          ],
        },
        {
          n: "02",
          client: "Port Comfort Hotels",
          kind: "AI review bot with photo generation",
          year: "2024",
          tech: "Telegram · Image Gen · Loyalty",
          task: "The apart-hotel network was losing organic reviews. Guests were happy but didn't bother to post on maps and aggregators. Standard loyalty programs failed to engage.",
          solution: "Launched a Telegram bot with a «review → AI photo with Peter the Great» mechanic. The guest writes a review — the bot publishes it across the right platforms and offers to generate 3 photos of the guest with the emperor in the hotel's settings. Viral mechanic, exclusive artifact, no boring «thank you for the review».",
          result: [
            { v: "×6", k: "review flow" },
            { v: "4.9", k: "average score" },
            { v: "38%", k: "social sharing rate" },
          ],
        },
        {
          n: "03",
          client: "Content factory · Investment apartments",
          kind: "Telegram + VK AI automation",
          year: "2026",
          tech: "Telegram · VK · LLM Pipeline",
          task: "A management company in the investment-apartment segment wanted to run a Telegram channel and a VK community with regular expert content but had no team for daily production. The niche is narrow and demands factual precision and a consistent tone.",
          solution: "We built a content pipeline: scraping niche sources and market news → posts generated in the brand's tone of voice → templates per format (market news, location breakdowns, investment numbers, listing reviews) → auto-publishing to Telegram and VK with per-platform adaptation. One-click editorial review.",
          result: [
            { v: "30+", k: "days of continuous publishing" },
            { v: "2", k: "channels in sync (TG + VK)" },
            { v: "0", k: "missed days" },
          ],
        },
      ],
    },
    process: {
      tag: "03 / Process",
      title: "How we work",
      desc: "Transparent process with clear artifacts at every stage. No fluff, no endless briefing sessions, no launch-day surprises.",
      steps: [
        { n: "01", t: "Brief & audit", d: "Deep dive into the business problem, current processes and success metrics. Output: a problem map and a hypothesis.", meta: "1–2 weeks · Discovery doc" },
        { n: "02", t: "Prototype & architecture", d: "Clickable prototype of key scenarios plus the technical architecture of the AI system: models, data, integrations, infrastructure.", meta: "2–3 weeks · Figma + Tech spec" },
        { n: "03", t: "MVP build", d: "Sprint-based build of the minimum viable product with real integrations. Weekly demos, on-the-fly corrections.", meta: "4–8 weeks · Working MVP" },
        { n: "04", t: "AI fine-tuning", d: "Prompt engineering, RAG optimization, fine-tuning, real-scenario testing, answer-quality benchmarks.", meta: "2–3 weeks · Quality benchmark" },
        { n: "05", t: "Launch & training", d: "Deployment, integration with your systems, team training, documentation. Handoff without headaches.", meta: "1 week · Launch + handoff" },
        { n: "06", t: "Support & growth", d: "Monitoring, A/B prompt and model tests, feature growth, regular metric reviews. The product grows with the business.", meta: "Continuous · SLA 24/7" },
      ],
    },
    quiz: {
      tag: "04 / Brief",
      title: "Tell us about the task",
      desc: "A short 5-step brief. Your answers help us prep for the first call. Avg time — 2 minutes.",
      stepLabel: "Step",
      of: "of",
      next: "Next",
      back: "Back",
      submit: "Send to Telegram",
      questions: [
        { q: "What product do you need?", sub: "Multi-select", multi: true, opts: ["AI website or platform","Mobile app","Chat agent / AI consultant","Internal AI tooling","Telegram / VK bot","Content factory","Not sure yet"] },
        { q: "Business size", sub: "Helps us calibrate the scope", opts: ["Startup / solo founder","Small (up to 50)","Medium (50–500)","Enterprise (500+)"] },
        { q: "When do you want to launch?", sub: "We're realistic about timelines", opts: ["Yesterday — urgent","Next quarter","This half-year","No rush, exploring"] },
        { q: "Budget range", sub: "Without it we can't propose the right scope", opts: ["under $3 500","$3 500 – $10 000","$10 000 – $30 000","$30 000 +","Let's discuss"] },
        { q: "How to reach you?", sub: "Telegram @username is enough", input: true, placeholder: "@your_telegram" },
      ],
      finalTitle: "Done",
      finalDesc: "We'll open Telegram with a ready-to-send message — all you have to do is hit Send. We reply within one business day.",
      finalCta: "Open Telegram",
      stepsCount: 5,
    },
    contact: {
      tag: "05 / Contact",
      lead: "Talk",
      mid: "to",
      handle: "@universamgmanagebot",
      end: " — our AI consultant, on duty 24/7.",
      meta: [
        { k: "Channel", v: "AI consultant · Telegram" },
        { k: "Timezone", v: "GMT+3 · Moscow" },
        { k: "Response time", v: "Instant · 24/7" },
        { k: "Languages", v: "Russian · English" },
      ],
    },
    footer: {
      left: "© 2026 Universa Media Group",
      right: "Built with Claude · Crafted in Moscow",
    },
  },
};

window.I18N = I18N;

window.useLang = function useLang() {
  const [lang, setLangState] = React.useState(document.documentElement.dataset.lang || "ru");
  React.useEffect(() => {
    const handler = (e) => setLangState(e.detail);
    window.addEventListener("umg:lang", handler);
    return () => window.removeEventListener("umg:lang", handler);
  }, []);
  const setLang = (l) => {
    document.documentElement.lang = l;
    document.documentElement.dataset.lang = l;
    localStorage.setItem("umg.lang", l);
    window.dispatchEvent(new CustomEvent("umg:lang", { detail: l }));
  };
  const t = I18N[lang] || I18N.ru;
  return { lang, setLang, t };
};

window.useTheme = function useTheme() {
  const [theme, setThemeState] = React.useState(document.documentElement.dataset.theme || "dark");
  React.useEffect(() => {
    const handler = (e) => setThemeState(e.detail);
    window.addEventListener("umg:theme", handler);
    return () => window.removeEventListener("umg:theme", handler);
  }, []);
  const setTheme = (th) => {
    document.documentElement.dataset.theme = th;
    localStorage.setItem("umg.theme", th);
    window.dispatchEvent(new CustomEvent("umg:theme", { detail: th }));
  };
  return { theme, setTheme };
};
