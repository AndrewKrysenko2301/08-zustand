import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];

  return {
    title: `Notes: ${category}`,
    description: `List of notes filtered by category: ${category}`,
    openGraph: {
      title: `Notes: ${category}`,
      description: `Browse your ${category} notes on Note Hub.`,
      url: `https://08-zustand-red-six.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub notes preview",
        },
      ],
    },
  };
}
const topic = "";
const page = 1;

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", topic, page, category],
    queryFn: () => fetchNotes(topic, page, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
