import { type InferPageType, loader } from "fumadocs-core/source";
import { docs } from "@/.source";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const description = page.data.description ?? "";
  return `# ${page.data.title} (${page.url})\n\n${description}`;
}
