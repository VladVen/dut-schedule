export const localisation = (lang) => {
  let language = lang === "English";
  return {
    settings: {
      header: language ? "Settings" : "Налаштування",
      enable: language ? "Enable Notifications" : "Увімкнути сповіщення",
      notify: language ? "Notification Mode" : "Тип сповіщень",
      lang: language ? "Language" : "Мова",
      theme: language ? "Dark Mode" : "Темна тема",
      langOptions: [
        {
          name: language ? "English" : "Aнглійська",
          value: "English",
        },
        {
          name: language ? "Ukrainian" : "Українська",
          value: "Українська",
        },
      ],
      themeOptions: [
        {
          name: language ? "Dark" : "Темна",
          value: language ? "Dark" : "Темна",
        },
        {
          name: language ? "Light" : "Світла",
          value: language ? "Light" : "Світла",
        },
      ],
    },
    login: {
      header: language ? "Choose your side" : "Обери свою сторону",
      student: language ? "Student" : "Студент",
      teacher: language ? "Teacher" : "Викладач",
    },
    student: {
      header: language ? "Student" : "Студент",
      inst: language ? "Select your institute" : "Обери свій інститут",
      course: language ? "Select your course" : "Обери свій курс",
      group: language ? "Select your group" : "Обери свою групу",
    },
    teacher: {
      header: language ? "Teacher" : "Викладач",
      department: language ? "Select your department" : "Обери свою кафедру",
      you: language ? "Select you" : "Знайди себе",
    },
    dayWeek: {
      day: language ? "Day" : "День",
      week: language ? "Week" : "Тиждень",
      daysOfWeek: {
        mon: language ? "Mon" : "ПН",
        tue: language ? "Tue" : "ВТ",
        wed: language ? "Wed" : "СР",
        thu: language ? "Thu" : "ЧТ",
        fri: language ? "Fri" : "ПТ",
        sat: language ? "Sat" : "СБ",
        sun: language ? "Sun" : "НД",
      },
    },
    buttons: {
      goBack: language ? "Go Back" : "Назад",
      settings: language ? "Settings" : "Налаштування",
      logOut: language ? "Logout" : "Вийти",
    },
    schedule: language ? "Schedule" : "Розклад",
    freeDay: language ? 'Today you are free' : 'На сьогодні ти вільний',
    internetAlert: {
      body: language ? "It seems like you haven't internet connection" : "У вас здається не стабільне інтернет з'єднання",
      retry: language ? 'Retry' : 'Повторити спробу',
      cancel: language ? 'Go offline' : 'Оффлайн режим'
    }
  };
};