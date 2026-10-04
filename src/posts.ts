export type Post = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  dateTime: string;
  readingTime: string;
  paragraphs: string[];
};

export const posts: Post[] = [
  {
    slug: "letting-go-of-the-fishing-game",
    title: "Letting go of the fishing game",
    summary:
      "Nine days, 260 commits, and a game that got better every time I gave something up.",
    publishedAt: "4 October 2026",
    dateTime: "2026-10-04",
    readingTime: "1 min read",
    paragraphs: [
      "Nine days ago I started a cozy fishing game. A little island, a rowboat, and rings on the water where the fish would bite.",
      "Today it's called Starwake. You fly a ship through open space, hunt glowing creatures with a harpoon, and tow salvage home past the edge of a black hole. The folder on my laptop is still called FishingGame.",
      "Getting there meant dropping things that didn't work. What stayed was the loop from day one: leave somewhere safe, catch something, haul it home, get better. The ocean was just the first shape it took.",
      "I really liked some of the ideas I dropped. But liking an idea doesn't make it a good one, and the game only moved forward once I stopped letting that feeling decide what stayed.",
      "I probably won't rename the folder, though.",
    ],
  },
  {
    slug: "engineering-the-feedback-loop",
    title: "Engineering the feedback loop",
    summary:
      "The bottleneck in productivity has shifted away from raw code generation.",
    publishedAt: "22 September 2026",
    dateTime: "2026-09-22",
    readingTime: "1 min read",
    paragraphs: [
      "The new frontier of Engineering is optimising the feedback loop",
      "The bottleneck in productivity has shifted away from raw code generation. With LLMs, writing the first version of something is no longer the slow part. What determines velocity now is how quickly an engineer (or an agent) can find out whether what they just wrote is correct, performant, safe, and aligned with intent.",
      "Every layer of that loop is up for reinvention: test execution speed, preview environments, type systems, observability, eval harnesses, deterministic reproductions of bugs, and the latency between “I changed something” and “I know if it broke.” Teams that compress this loop from minutes to seconds, and from seconds to “the IDE already told me”, get compounding returns, because every downstream activity (debugging, refactoring, agent autonomy, onboarding) is gated by it.",
      "The interesting wrinkle with AI in the mix is that agents are much more sensitive to feedback loop quality than humans are. A human can hold context across a 10-minute CI run; an agent burns tokens, drifts, and hallucinates. So investments in fast, high-signal feedback now pay off twice, once for your engineers, once for the agents working alongside them. The teams that figure this out first will look absurdly productive compared to ones still optimizing the act of typing.",
    ],
  },
  {
    slug: "building-this-blog",
    title: "Building this blog",
    summary: "A short note on simplifying this site into a place for writing.",
    publishedAt: "10 September 2026",
    dateTime: "2026-09-10",
    readingTime: "2 min read",
    paragraphs: [
      `This site started as a portfolio, but the format asked for more attention than the things I actually wanted to share. A simple blog feels like a better fit.`,
      `The new version begins with the writing. There is no introduction to get through and no elaborate navigation. Each post gets a clear title, a date, and enough room to be read comfortably.`,
      `This is only a sample. It is here to test the shape of the archive and the reading experience before the real posts arrive.`,
    ],
  },
];
