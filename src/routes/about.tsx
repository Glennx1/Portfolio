import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Glenn Braggs" },
      {
        name: "description",
        content: "I'm an engineer, researcher and late-night writer based out of Bangalore, India.",
      },
      { property: "og:title", content: "About — Glenn Braggs" },
      {
        property: "og:description",
        content: "I'm an engineer, researcher and late-night writer based out of Bangalore, India.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <p>
        I grew up playing a lot of sports and reading quite a lot. <em>Diary of a Wimpy Kid</em> was my holy grail. I also would tinker around with robotics kits that I turned into bottle boats, an RC car and a mini JCB — while also painting and quilling. Thus came my habit of breaking apart and building things. I'm naturally curious and am inclined to having conversations where I don't know anything. TIL (today I learned) is my fav sub reddit and frequently refer to &ldquo;When breath becomes air&rdquo; that changed the way I valued time (that's a whole other conversation).
      </p>
      <p>
        I am working on optimising the VAC systems that are used in traffic signals throughout India, as part of my internship at the Indian Institute of Science, Bangalore. 
        I previously fine tuned the earlier Llama models for better portfolio and payoff recommendations, and built a Heart disease risk estimator that uses baseline biomarkers, and also pursued a startup idea halfway.
      </p>
      <p>
        I freelance by building websites for small businesses, and write blogs on ideas that interest me. On some nights, a couple lines of poetry flow through me.
      </p>
      <p>
        I am a founding member of the Varsity Tribe — a student led initiative started by Zerodha and Qshala, as part of an effort to spread financial literacy among the younger generation. We have held sessions on finance, public policy, venture capital and invite founders/speakers for chats over breakfast. The access to network is amazing, and would not have been part of this if I wasn't clearing out my spam folder on a random Saturday. 
      </p>
      <p>
        In college I headed the literature club, and helped with the quiz team, podcast team among other things, and played basketball as well.
      </p>
      <p>
        I like reading about startups, public policy, philosophy and consider music to be a great source for poetry. I like all forms of music, and rock music in particular. 
        I play the electric guitar and cannot hold a good solo down.  
      </p>
      <p>
        I spend a couple hours each week at the gym, and also run, swim and play a bunch of hobby sports (basketball, cricket, tennis, pickleball and pool). I am training to compete in the Ironman one day. 
      </p>
      <p>
        I believe the conversations with people from different walks of life have shaped me into the person I am today, and still absolutely love having conversations with people. I'd love to chat, when you're up for it. 
      </p>
    </PageShell>
  );
}

