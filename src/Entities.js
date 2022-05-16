export default {
  year_1990: {
    x: 400,
    y: 1060,
    sprite: "year_1990",
  },
  doggo: {
    x: 1400,
    y: 960,
    sprite: "doggo",
    quiz: {
      x: 1300,
      y: 960,
      origin: { x: 0, y: 1 },
      area: {
        x: 1300,
        y: 960,
        width: 500,
        height: 350,
        origin: { x: 0, y: 1 },
      },
      quiestion: "Что это за собачка?",
      answers: [
        `Пёс MS DOS`,
        `Собака Фидонета`,
        `символ TDK\nCorporation`,
        `DOGE`,
      ],
      correctNumber: 2,
      correctAnswerLines: [
        "Верно, я — собака Фидонета — маскот американской некоммерческой оффлайновой компьютерной сети.",
        "В 1990 году её первые узлы появились в Новосибирске и распространились по другим городам. В итоге в России сложилась целая субкультура фидошников со своим фольклором, жаргоном и веселыми офлайн-встречами aka фидопойками. Вуф!",
      ],
      wrongAnswerLines: [
        "Неправильно. Я — собака Фидонета — маскот американской некоммерческой оффлайновой компьютерной сети.",
        "В 1990 году её первые узлы появились в Новосибирске и распространились по другим городам. В итоге в России сложилась целая субкультура фидошников со своим фольклором, жаргоном и веселыми офлайн-встречами aka фидопойками. Вуф!",
      ],
    },
  },
  anek: {
    x: 3150,
    y: 330,
    sprite: "anek",
    quiz: {
      x: 3050,
      y: 330,
      origin: { x: 0, y: 1 },
      area: {
        x: 3050,
        y: 330,
        width: 500,
        height: 350,
        origin: { x: 0, y: 1 },
      },
      quiestion: "Что это за Анекдот?",
      answers: [`Хз`, `Хз`, `Хз`, `Хз`],
      correctNumber: 1,
      correctAnswerLines: [
        "Верно, я — собака Фидонета — маскот американской некоммерческой оффлайновой компьютерной сети.",
        "В 1990 году её первые узлы появились в Новосибирске и распространились по другим городам. В итоге в России сложилась целая субкультура фидошников со своим фольклором, жаргоном и веселыми офлайн-встречами aka фидопойками. Вуф!",
      ],
      wrongAnswerLines: [
        "Неправильно. Я — собака Фидонета — маскот американской некоммерческой оффлайновой компьютерной сети.",
        "В 1990 году её первые узлы появились в Новосибирске и распространились по другим городам. В итоге в России сложилась целая субкультура фидошников со своим фольклором, жаргоном и веселыми офлайн-встречами aka фидопойками. Вуф!",
      ],
    },
  },
  some_place: {
    x: 240,
    y: 100,
    sprite: "some_place",
  },
  mountain: {
    x: 10,
    y: 960,
    sprite: "mountain",
    colliders: [
      { x: 35, y: 950, width: 830, height: 165 },
      { x: 75, y: 785, width: 780, height: 50 },
      { x: 100, y: 735, width: 720, height: 50 },
      { x: 140, y: 685, width: 660, height: 50 },
      { x: 170, y: 635, width: 600, height: 50 },
      { x: 200, y: 585, width: 520, height: 20 },
    ],
    quiz: {
      x: 10,
      y: 960,
      origin: { x: 0, y: 1 },
      area: {
        x: 10,
        y: 960,
        width: 930,
        height: 400,
        origin: { x: 0, y: 1 },
      },
      quiestion: "Четвёрка отцов-основателей Рунета? Да это же…",
      answers: [
        `Джоэл Шац, Алексей Солдатов, 
Леонид Егошин, Алексей Руднев`,
        `Алексей Шац, Джоэл Солдатов, 
Леонид Руднев, Алексей Егошин`,
        `Шац-Шац, Егор Летов, 
Солдат Рудев, Джоэл Егошин`,
        `Алексей Рудин, Джон Шац, 
Александр Солдатов, Степан Егошин`,
      ],
      correctNumber: 1,
      correctAnswerLines: [
      "Да, перед вами одни из отцов-основателей Рунета. Джоэл Шац — IT-бизнесмен и психонавт; организатор телемостов СССР-США. Алексей Солдатов — учёный, учредитель первого в стране коммерческого интернет-провайдера «Релком» и инициатор открытия РосНИИРОС. Леонид Егошин и Алексей Руднев — программисты кооператива «ДЕМОС», регистраторы и создатели первых сайтов в доменных зонах .SU и.RU.",
      ],
      wrongAnswerLines: [
      "Как бы не так, перед вами одни из отцов-основателей Рунета. Джоэл Шац — IT-бизнесмен и психонавт; организатор телемостов СССР-США. Алексей Солдатов — учёный, учредитель первого в стране коммерческого интернет-провайдера «Релком» и инициатор открытия РосНИИРОС. Леонид Егошин и Алексей Руднев — программисты кооператива «ДЕМОС», регистраторы и создатели первых сайтов в доменных зонах .SU и.RU.",
      ],
    },
  },
  biblioteka: {
    x: 2430,
    y: 968,
    sprite: "biblioteka",
    colliders: [{ x: 2450, y: 965, width: 380, height: 365 }],
  },
  grannies: {
    x: 1380,
    y: 425,
    sprite: "grannies",
    dialogue: {
      x: 1236,
      y: 130,
      origin: { x: 0, y: 0 },
      area: {
        x: 1200,
        y: 425,
        width: 480,
        height: 280,
        origin: { x: 0, y: 1 },
      },
      lines: [
        { text: "Здарова бабка", player: true },
        { text: "Здоров, внучок", player: false },
        { text: "Пачом бананы", player: true },
        { text: "А всё ёпта", player: false },
      ],
    },
  },
  domen_ru_1994: {
    x: 1650,
    y: 960,
    sprite: "domen_ru_1994",
  },
  Lebedev_1996: {
    x: 3250,
    y: 957,
    sprite: "Lebedev_1996",
    popup: {
      x: 3160,
      y: 637,
      origin: { x: 0, y: 1 },
      text: "Ну [color=#bb00bb]умер[/color] и [color=#00bbbb]умер[/color].",
      area: {
        x: 3140,
        y: 957,
        width: 500,
        height: 350,
        origin: { x: 0, y: 1 },
      },
    },
  },
  year_1995: {
    x: 3370,
    y: 1060,
    sprite: "year_1995",
  },
  opera_com_1996: {
    x: 4200,
    y: 720,
    sprite: "opera.com_1996",
    colliders: [{ x: 4210, y: 720, width: 70, height: 100 }],
  },
  year_1996: {
    x: 4220,
    y: 1060,
    sprite: "year_1996",
  },
  yabloko_ru_1996: {
    x: 3700,
    y: 965,
    sprite: "yabloko_ru_1996",
    colliders: [
      { x: 3700, y: 525, width: 375, height: 200 },
      { x: 3850, y: 930, width: 95, height: 400 },
    ],
  },
  Rambler_1997: {
    x: 4450,
    y: 480,
    sprite: "Rambler_1997",
    colliders: [{ x: 4450, y: 470, width: 275, height: 70 }],
  },
  Krovatka_1997: {
    x: 4600,
    y: 965,
    sprite: "Krovatka_1997",
  },
  tetris_1997: {
    x: 5180,
    y: 225,
    sprite: "tetris_1997",
  },
  ICQ_1997: {
    x: 6100,
    y: 960,
    sprite: "ICQ_1997",
  },
  Zvuki_ru_1998: {
    x: 6200,
    y: 960,
    sprite: "Zvuki_ru_1998",
  },
  Rif_1997: {
    x: 7100,
    y: 967,
    sprite: "Rif_1997",
    colliders: [{ x: 7270, y: 720, width: 30, height: 30 }],
  },
  Kaspersky_ru_1997: {
    x: 6100,
    y: 425,
    sprite: "Kaspersky_ru_1997",
  },
  year_1997: {
    x: 6100,
    y: 1060,
    sprite: "year_1997",
  },

  /* 
  bazar_1997: {
    x: 5100,
    y: 970,
    sprite: "bazar_1997",
  },
  */
  router_1996: {
    x: 5200,
    y: 970,
    sprite: "router_1996",
  },

  pepsi_1998: {
    x: 8200,
    y: 960,
    sprite: "pepsi_1998",
    colliders: [
      { x: 8206, y: 905, width: 375, height: 220 },
      { x: 8330, y: 930, width: 160, height: 330 },
    ],
  },
  mail_ru_1998: {
    x: 7885,
    y: 960,
    sprite: "mail_ru_1998",
  },
  year_1998: {
    x: 7700,
    y: 1060,
    sprite: "year_1998",
  },
  Webmoney_1998: {
    x: 7550,
    y: 375,
    sprite: "Webmoney_1998",
  },
  fuck_ru_1998: {
    x: 8900,
    y: 955,
    sprite: "fuck_ru_1998",
  },
  TV_1999: {
    x: 8800,
    y: 270,
    sprite: "TV_1999",
  },
  explorer_1999: {
    x: 9700,
    y: 470,
    sprite: "explorer_1999",
  },
  year_1999: {
    x: 9700,
    y: 1060,
    sprite: "year_1999",
  },
  live_journal_1999: {
    x: 10450,
    y: 270,
    sprite: "live-journal-1999",
  },
  nosik_1999: {
    x: 10000,
    y: 970,
    sprite: "nosik_1999",
  },
  hh_2000: {
    x: 10500,
    y: 965,
    sprite: "hh_2000",
  },
  ru_center_2000: {
    x: 10920,
    y: 530,
    sprite: "ru_center_2000",
  },
  yandex_2000: {
    x: 11710,
    y: 670,
    sprite: "yandex_2000",
  },
  wiki_2001: {
    x: 12200,
    y: 750,
    sprite: "wiki_2001",
  },
  mas_2001: {
    x: 12900,
    y: 953,
    sprite: "mas_2001",
  },
  kinopoisk_2003: {
    x: 13430,
    y: 660,
    sprite: "kinopoisk_2003",
  },
  mamba_2003: {
    x: 12830,
    y: 377,
    sprite: "mamba_2003",
  },
  rutracker_2004: {
    x: 13800,
    y: 440,
    sprite: "rutracker_2004",
    colliders: [{ x: 13800, y: 440, width: 550, height: 100 }],
  },
  leprosorium_2004: {
    x: 14700,
    y: 675,
    sprite: "leprosorium_2004",
  },
  runet_2004: {
    x: 15300,
    y: 960,
    sprite: "runet_2004",
    colliders: [{ x: 15300, y: 910, width: 115, height: 300 }],
  },
  bash_2004: {
    x: 15750,
    y: 600,
    sprite: "bash_2004",
    colliders: [{ x: 15798, y: 530, width: 200, height: 115 }],
  },
  habr_2006: {
    x: 16500,
    y: 500,
    sprite: "habr_2006",
  },
  orly_2006: {
    x: 16150,
    y: 955,
    sprite: "orly_2006",
  },
  not_bag_2006: {
    x: 16850,
    y: 970,
    sprite: "not_bag_2006",
  },
  durov_2006: {
    x: 17600,
    y: 970,
    sprite: "durov_2006",
    colliders: [{ x: 17620, y: 950, width: 200, height: 300 }],
  },
  ok_2006: {
    x: 18300,
    y: 470,
    sprite: "ok_2006",
  },
  tagline_2006: {
    x: 18850,
    y: 400,
    sprite: "tagline_2006",
  },
  year_2007: {
    x: 19000,
    y: 1060,
    sprite: "year_2007",
  },
  raek_2006: {
    x: 18800,
    y: 820,
    sprite: "raek_2006",
  },
  youtube_2007: {
    x: 19700,
    y: 960,
    sprite: "youtube_2007",
  },
  dvd_2007: {
    x: 20200,
    y: 970,
    sprite: "dvd_2007",
    colliders: [{ x: 20220, y: 1000, width: 300, height: 300 }],
  },
  penek_2007: {
    x: 19670,
    y: 510,
    sprite: "penek_2007",
    dialogue: {
      x: 19600,
      y: 510,
      origin: { x: 0, y: 1 },
      area: {
        x: 19600,
        y: 510,
        width: 320,
        height: 280,
        origin: { x: 0, y: 1 },
      },
      lines: [
        {
          text: "На пенёк сел? Должен был косарь отдать. А тут чего так мало?",
          player: false,
        },
        { text: "Кажется, мне тут не рады", player: true },
      ],
    },
  },
  lurk_2007: {
    x: 21000,
    y: 970,
    sprite: "lurk_2007",
  },
  who_are_you_2007: {
    x: 21650,
    y: 955,
    sprite: "who_are_you_2007",
  },
  ypychka_2007: {
    x: 20700,
    y: 430,
    sprite: "ypychka_2007",
  },
  putin_krab_2008: {
    x: 22530,
    y: 580,
    sprite: "putin_krab_2008",
    popup: {
      x: 22730,
      y: 370,
      origin: { x: 0, y: 1 },
      text: "Восемь лет я пахал, как краб на галерах, с утра до ночи, и делал это с полной отдачей сил!",
      area: {
        x: 22500,
        y: 560,
        width: 320,
        height: 250,
        origin: { x: 0, y: 1 },
      },
    },
  },
  must_due_2008: {
    x: 23200,
    y: 955,
    sprite: "must_due_2008",
  },
  demotivator_2008: {
    x: 24030,
    y: 800,
    sprite: "demotivator_2008",
    colliders: [{ x: 24030, y: 800, width: 190, height: 150 }],
  },
  gos_2009: {
    x: 23500,
    y: 350,
    sprite: "gos_2009",
  },
  year_2009: {
    x: 21120,
    y: 1060,
    sprite: "year_2009",
  },
  medved: {
    x: 24700,
    y: 970,
    sprite: "medved",
    dialogue: {
      x: 24500,
      y: 970,
      origin: { x: 0, y: 1 },
    area: {
      x: 24500,
      y: 970,
      width: 320,
      height: 280,
      origin: { x: 0, y: 1 },
    },
    lines: [
      {
        text: "Превед, медвед",
        player: true,
      },
      { text: "Превед", player: false },
    ],
  }
  },
  ch_2: {
    x: 25800,
    y: 988,
    sprite: "ch_2",
    colliders: [{ x: 25800, y: 975, width: 250, height: 150 }],
  },
  meme_face: {
    x: 24500,
    y: 365,
    sprite: "meme_face",
  },
  tochka_ru_2010: {
    x: 26380,
    y: 530,
    sprite: "tochka_ru_2010",
  },
  afisha_2010: {
    x: 27090,
    y: 955,
    sprite: "afisha_2010",
    colliders: [
      { x: 27100, y: 565, width: 380, height: 220 },
      { x: 27244, y: 900, width: 120, height: 300 }
    ],
  },
  kianu_2010: {
    x: 26900,
    y: 970,
    sprite: "kianu_2010",
  },
  lentach_2011: {
    x: 27760,
    y: 540,
    sprite: "lentach_2011",
    colliders: [
      { x: 27760, y: 540, width: 340, height: 90 },
    ],
  },
  lol: {
    x: 28000,
    y: 956,
    sprite: "lol",
  },
  selfie: {
    x: 28230,
    y: 956,
    sprite: "selfie",
  },
  cat: {
    x: 28400,
    y: 350,
    sprite: "cat",
    colliders: [
      { x: 28400, y: 350, width: 420, height: 90 },
    ],
  },
  reestr_site_2012: {
    x: 30150,
    y: 727,
    sprite: "reestr_site_2012",
  },
  lisa: {
    x: 29950,
    y: 330,
    sprite: "lisa",
  },
  tg_2013: {
    x: 30570,
    y: 930,
    sprite: "tg_2013",
  },
  free_2013: {
    x: 31250,
    y: 700,
    sprite: "free_2013",
    colliders: [
      { x: 31250, y: 700, width: 150, height: 80 },
    ],
  },
  people_internet_2014: {
    x: 31720,
    y: 960,
    sprite: "people_internet_2014",
  },
  meduza_2014: {
    x: 31770,
    y: 360,
    sprite: "meduza_2014",
  },
  gold_site_2014: {
    x: 32520,
    y: 640,
    sprite: "gold_site_2014",
  },
  durov_way_out_2014: {
    x: 33050,
    y: 985,
    sprite: "durov_way_out_2014",
  },
  paket_yrovoy_2016: {
    x: 33650,
    y: 970,
    sprite: "paket_yrovoy_2016",
  },
  alisa_2017: {
    x: 33490,
    y: 350,
    sprite: "alisa_2017",
  },
};


