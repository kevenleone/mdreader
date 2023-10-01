import { Button } from '@mdreader/interface';
import { LoaderArgs } from '@remix-run/node';
import { V2_MetaFunction } from '@remix-run/react';
import { Github } from 'lucide-react';

export const meta: V2_MetaFunction = ({ data: { origin } }) => {
  return [
    { title: 'Home | MD Reader' },
    {
      name: 'description',
      content: 'Save and Read your favorite markdown documents from Github',
    },
    {
      property: 'og:image',
      content: `${origin}/api/og?template=site&title=MD Reader`,
    },
    {
      property: 'twitter:image',
      content: `${origin}/api/og?template=site&title=MD Reader`,
    },
    {
      property: 'og:image:width',
      content: '800px',
    },
    {
      property: 'og:image:height',
      content: '600px',
    },
  ];
};

export const loader = ({ request }: LoaderArgs) => ({
  origin: new URL(request.url).origin,
});

export default function MarkdownPreview() {
  return (
    <div className="container flex flex-col justify-center overflow-hidden items-center min-h-[800px] gap-6 pb-8 pt-6 md:py-10">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-9xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          MD Reader
        </h1>
        <p className=" text-xl text-muted-foreground">
          Effortlessly organize your favorite Markdown into 'Articles' that are
          both easy to manage and share with others. Say goodbye to cluttered
          notes and hello to a sleek, streamlined system that puts your ideas
          front and center.
        </p>

        <div className="flex gap-3">
          <Button>Start Explore</Button>
          <Button variant="outline">
            <Github className="mr-2" /> Github
          </Button>
        </div>
      </div>
    </div>
  );
}
