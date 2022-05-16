export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loading-scene");
  }

  preload() {
    const cb = 16; // cache buster

    this.load.spritesheet("player", `assets/sprites/player.png?cb=${cb}`, {
      frameWidth: 284,
      frameHeight: 275,
    });
    this.load.image("quest", `assets/sprites/quest.png?cb=${cb}`);

    this.load.image("floor", `assets/sprites/floor-test.png?cb=${cb}`);
    this.load.image(
      "floor-left",
      `assets/sprites/floor-test--left.png?cb=${cb}`
    );
    this.load.image(
      "floor-right",
      `assets/sprites/floor-test--right.png?cb=${cb}`
    );
    this.load.image("wall-left", `assets/sprites/wall--left.png?cb=${cb}`);
    this.load.image("wall-right", `assets/sprites/wall--right.png?cb=${cb}`);
    this.load.image("wall", `assets/sprites/floor-inner.png?cb=${cb}`);

    this.load.image("mountains", `assets/bg/mountains.png?cb=${cb}`);
    this.load.image("cloud", `assets/sprites/cloud.png?cb=${cb}`);
    this.load.image("cloud2", `assets/sprites/cloud2.png?cb=${cb}`);

    this.load.image("some_place", `assets/sprites/some_place.png?cb=${cb}`);
    this.load.image("doggo", `assets/sprites/doggo.png?cb=${cb}`);
    this.load.image("anek", `assets/sprites/anek.png?cb=${cb}`);
    this.load.image("mountain", `assets/sprites/mountain.png?cb=${cb}`);
    this.load.image("biblioteka", `assets/sprites/biblioteka.png?cb=${cb}`);
    this.load.image("grannies", `assets/sprites/grannies.png?cb=${cb}`);
    this.load.image(
      "domen_ru_1994",
      `assets/sprites/domen.ru_1994.png?cb=${cb}`
    );
    this.load.image("Lebedev_1996", `assets/sprites/Lebedev_1996.png?cb=${cb}`);
    this.load.image(
      "opera.com_1996",
      `assets/sprites/opera.com_1996.png?cb=${cb}`
    );
    this.load.image(
      "yabloko_ru_1996",
      `assets/sprites/yabloko_ru_1996.png?cb=${cb}`
    );
    this.load.image("Rambler_1997", `assets/sprites/Rambler_1997.png?cb=${cb}`);
    this.load.image(
      "Krovatka_1997",
      `assets/sprites/Krovatka_1997.png?cb=${cb}`
    );
    this.load.image("tetris_1997", `assets/sprites/tetris_1997.png?cb=${cb}`);
    this.load.image("ICQ_1997", `assets/sprites/ICQ_1997.png?cb=${cb}`);
    this.load.image(
      "Zvuki_ru_1998",
      `assets/sprites/Zvuki_ru_1998.png?cb=${cb}`
    );
    this.load.image("Rif_1997", `assets/sprites/Rif_1997.png?cb=${cb}`);
    this.load.image(
      "Kaspersky_ru_1997",
      `assets/sprites/Kaspersky_ru_1997.png?cb=${cb}`
    );

    this.load.image("mail_ru_1998", `assets/sprites/mail_ru_1998.png?cb=${cb}`);
    this.load.image("pepsi_1998", `assets/sprites/pepsi_1998.png?cb=${cb}`);
    this.load.image(
      "Webmoney_1998",
      `assets/sprites/Webmoney_1998.png?cb=${cb}`
    );
    this.load.image("fuck_ru_1998", `assets/sprites/fuck_ru_1998.png?cb=${cb}`);
    this.load.image("TV_1999", `assets/sprites/TV_1999.png?cb=${cb}`);

    this.load.image("bazar_1997", `assets/sprites/bazar_1997.png?cb=${cb}`);
    this.load.image("router_1996", `assets/sprites/router_1996.png?cb=${cb}`);
    this.load.image(
      "explorer_1999",
      `assets/sprites/explorer_1999.png?cb=${cb}`
    );
    this.load.image(
      "live-journal-1999",
      `assets/sprites/live-journal-1999.png?cb=${cb}`
    );
    this.load.image("nosik_1999", `assets/sprites/nosik_1999.png?cb=${cb}`);
    this.load.image("hh_2000", `assets/sprites/hh_2000.png?cb=${cb}`);
    this.load.image(
      "ru_center_2000",
      `assets/sprites/ru_center_2000.png?cb=${cb}`
    );
    this.load.image("yandex_2000", `assets/sprites/yandex_2000.png?cb=${cb}`);
    this.load.image("wiki_2001", `assets/sprites/wiki_2001.png?cb=${cb}`);
    this.load.image("mas_2001", `assets/sprites/mas_2001.png?cb=${cb}`);
    this.load.image(
      "kinopoisk_2003",
      `assets/sprites/kinopoisk_2003.png?cb=${cb}`
    );
    this.load.image(
      "rutracker_2004",
      `assets/sprites/rutracker_2004.png?cb=${cb}`
    );
    this.load.image("mamba_2003", `assets/sprites/mamba_2003.png?cb=${cb}`);
    this.load.image(
      "leprosorium_2004",
      `assets/sprites/leprosorium_2004.png?cb=${cb}`
    );
    this.load.image("runet_2004", `assets/sprites/runet_2004.png?cb=${cb}`);
    this.load.image("bash_2004", `assets/sprites/bash_2004.png?cb=${cb}`);
    this.load.image("habr_2006", `assets/sprites/habr_2006.png?cb=${cb}`);
    this.load.image("orly_2006", `assets/sprites/orly_2006.png?cb=${cb}`);
    this.load.image("not_bag_2006", `assets/sprites/not_bag_2006.png?cb=${cb}`);
    this.load.image("durov_2006", `assets/sprites/durov_2006.png?cb=${cb}`);
    this.load.image("ok_2006", `assets/sprites/ok_2006.png?cb=${cb}`);
    this.load.image("tagline_2006", `assets/sprites/tagline_2006.png?cb=${cb}`);
    this.load.image("year_2007", `assets/sprites/year_2007.png?cb=${cb}`);
    this.load.image("raek_2006", `assets/sprites/raek_2006.png?cb=${cb}`);
    this.load.image("youtube_2007", `assets/sprites/youtube_2007.png?cb=${cb}`);
    this.load.image("dvd_2007", `assets/sprites/dvd_2007.png?cb=${cb}`);
    this.load.image("penek_2007", `assets/sprites/penek_2007.png?cb=${cb}`);
    this.load.image("lurk_2007", `assets/sprites/lurk_2007.png?cb=${cb}`);
    this.load.image(
      "who_are_you_2007",
      `assets/sprites/who_are_you_2007.png?cb=${cb}`
    );
    this.load.image("ypychka_2007", `assets/sprites/ypychka_2007.png?cb=${cb}`);
    this.load.image(
      "putin_krab_2008",
      `assets/sprites/putin_krab_2008.png?cb=${cb}`
    );
    this.load.image(
      "must_due_2008",
      `assets/sprites/must_due_2008.png?cb=${cb}`
    );
    this.load.image(
      "demotivator_2008",
      `assets/sprites/demotivator_2008.png?cb=${cb}`
    );
    this.load.image("gos_2009", `assets/sprites/gos_2009.png?cb=${cb}`);
    this.load.image("year_2009", `assets/sprites/year_2009.png?cb=${cb}`);

    // #region Bubbles

    this.load.image("bubble-line", `assets/bubbles/bubble-line.png?cb=${cb}`);
    this.load.image(
      "bubble-medium",
      `assets/bubbles/bubble-medium.png?cb=${cb}`
    );
    this.load.image("bubble-large", `assets/bubbles/bubble-large.png?cb=${cb}`);

    this.load.image("answer-1", `assets/bubbles/answer-1.png?cb=${cb}`);
    this.load.image("answer-2", `assets/bubbles/answer-2.png?cb=${cb}`);
    this.load.image("answer-3", `assets/bubbles/answer-3.png?cb=${cb}`);
    this.load.image("answer-4", `assets/bubbles/answer-4.png?cb=${cb}`);

    this.load.image(
      "answer-1-correct",
      `assets/bubbles/answer-1-correct.png?cb=${cb}`
    );
    this.load.image(
      "answer-2-correct",
      `assets/bubbles/answer-2-correct.png?cb=${cb}`
    );
    this.load.image(
      "answer-3-correct",
      `assets/bubbles/answer-3-correct.png?cb=${cb}`
    );
    this.load.image(
      "answer-4-correct",
      `assets/bubbles/answer-4-correct.png?cb=${cb}`
    );

    this.load.image(
      "answer-1-wrong",
      `assets/bubbles/answer-1-wrong.png?cb=${cb}`
    );
    this.load.image(
      "answer-2-wrong",
      `assets/bubbles/answer-2-wrong.png?cb=${cb}`
    );
    this.load.image(
      "answer-3-wrong",
      `assets/bubbles/answer-3-wrong.png?cb=${cb}`
    );
    this.load.image(
      "answer-4-wrong",
      `assets/bubbles/answer-4-wrong.png?cb=${cb}`
    );

    this.load.image("control-left", `assets/controls/left.png?cb=${cb}`);
    this.load.image("control-right", `assets/controls/right.png?cb=${cb}`);
    this.load.image("control-jump", `assets/controls/jump.png?cb=${cb}`);
    this.load.image("control-speak", `assets/controls/scream.png?cb=${cb}`);

    //#endregion Bubbles
  }

  create() {
    this.scene.start("level-scene");
  }
}
