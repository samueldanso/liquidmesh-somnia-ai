import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageImage, source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(props: any) {
	const params = await props.params
	const slug = params?.slug
	// Skip index page (handled by (home)/page.tsx)
	if (!slug || slug.length === 0) notFound()
	const page = source.getPage(slug)
	if (!page) notFound()

	const MDXContent = page.data.body

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDXContent
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	)
}

export async function generateStaticParams() {
	const params = source.generateParams()
	// Exclude index page (handled by (home)/page.tsx)
	return params.filter((p) => p.slug && p.slug.length > 0)
}

export async function generateMetadata(props: any): Promise<Metadata> {
	const params = await props.params
	const slug = params?.slug
	// Skip index page (handled by (home)/page.tsx)
	if (!slug || slug.length === 0) notFound()
	const page = source.getPage(slug)
	if (!page) notFound()

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			images: getPageImage(page).url,
		},
	}
}
