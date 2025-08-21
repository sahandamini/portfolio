import Image from "next/image";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/social-links"; // Import the new component

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <header className="flex justify-end mb-10">
        <nav className="flex space-x-4 text-sm">
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            Projects
          </a>
          <a href="#" className="hover:underline">
            Talks
          </a>
          <a href="#" className="hover:underline">
            Sponsors
          </a>
          {/* Placeholder for icons */}
          <span className="ml-4">🎤</span>
          <span>📷</span>
          <span>🦋</span>
          <span>🦉</span>
          <span>⚙️</span>
          <span>☀️</span>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Anthony Fu</h1>

        <p className="mb-4">
          Hey! I'm Anthony Fu, a fanatical open sourceror and design engineer.
        </p>

        <div className="mb-8">
          <p className="mb-2">
            Working at{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              NuxtLabs
            </span>{" "}
            /{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Vercel
            </span>
          </p>
          <p className="mb-2">
            Creator of{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Vitest
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Slidev
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              VueUse
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              UnoCSS
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Elk
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Type Challenges
            </span>
          </p>
          <p className="mb-2">
            Core team of{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Vue
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Nuxt
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Vite
            </span>
          </p>
          <p>
            Maintaining{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Shiki
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Twoslash
            </span>{" "}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              ESLint Stylistic
            </span>
          </p>
        </div>

        <p className="mb-4">
          Dreaming up cool ideas and making them come true is where my passion
          lies. I am an enthusiastic about building tools that help myself and
          others to be more productive and enjoy the process of crafting. You
          can find my{" "}
          <a href="#" className="underline">
            full projects list here
          </a>
          .
        </p>

        <p className="mb-4">
          I give{" "}
          <a href="#" className="underline">
            talks
          </a>{" "}
          and write{" "}
          <a href="#" className="underline">
            blog posts
          </a>{" "}
          about open source, coding, etc. Occasionally, I do live coding streams
          on{" "}
          <a href="#" className="underline">
            YouTube
          </a>{" "}
          and 哔哩哔哩. I am also co-hosting a podcast{" "}
          <a href="#" className="underline">
            No Coding Today
          </a>{" "}
          (in Mandarin), talking about various topics around programming. From
          time to time, I make some generative-art, interactivity experiments on{" "}
          <a href="#" className="underline">
            100.antfu.me
          </a>
          .
        </p>

        <p className="mb-4">
          Outside of programming, I enjoy doing photography and traveling. I
          post{" "}
          <a href="#" className="underline">
            photos on this page
          </a>
          . I also love anime, movies and dramas. I am trying to list my{" "}
          <a href="#" className="underline">
            media consumption
          </a>
          . Also, in case you are interested, here are the{" "}
          <a href="#" className="underline">
            hardware/software I use
          </a>
          .
        </p>

        <p className="mb-8">
          I recently moved to{" "}
          <span className="border-b border-dotted border-gray-400">東京</span>,
          if you are around, please reach out and let's have some coffee or work
          together.
        </p>

        <h2 className="text-xl font-bold mb-4">Find me on</h2>
        <SocialLinks /> {/* Use the new component here */}

        <p className="mb-4">
          Or mail me at{" "}
          <a href="mailto:hi@antfu.me" className="underline">
            hi@antfu.me
          </a>
        </p>

        <p className="mb-8">
          ( Inactive on{" "}
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Mastodon
          </span>{" "}
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Twitter
          </span>{" "}
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            知乎
          </span>{" "}
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            微博
          </span>{" "}
          )
        </p>

        <p className="mb-4">
          If you enjoy my work and find them useful, consider sponsor me and the
          ecosystem to help Open Source sustainable. Thank you!
        </p>

        <div className="flex gap-2">
          <Button className="inline-flex items-center">
            <Image
              src="/sponsor.svg"
              alt="Sponsor"
              width={16}
              height={16}
              className="mr-2"
            />
            <span>Sponsor the Ecosystem</span>
          </Button>
          <Button>
            How does this work?
          </Button>
        </div>
      </main>
    </div>
  );
}
