export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  lrcPath?: string;
}

export const defaultPlaylist: Track[] = [
  {
    id: "in-a-notebook",
    title: "In A Notebook",
    artist: "Goldmund",
    src: "/music/In a notebook.mp3"
  },
  {
    id: "piano-man",
    title: "Piano Man",
    artist: "Billy Joel",
    src: "/music/Piano Man.mp3",
    lrcPath: "/music/Billy Joel - Piano Man.lrc"
  },
  {
    id: "leaning-arms",
    title: "Leaning On the Everlasting Arms",
    artist: "Iris DeMent",
    src: "/music/Iris DeMent - Leaning On the Everlasting Arms (True Grit Version).mp3"
  },
  {
    id: "dont-fall-in-love",
    title: "I Hope That I Don't Fall In Love With You",
    artist: "Tom Waits",
    src: "/music/I hope that i dont fall in love with you.mp3"
  },
  {
    id: "summer-ocean",
    title: "夏の終わりの海",
    artist: "岸部眞明",
    src: "/music/岸部眞明 - 夏の終わりの海.mp3"
  }
];
