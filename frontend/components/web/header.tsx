'use client'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'

const menuItems = [
	{ name: 'Features', href: '#features' },
	{ name: 'How It Works', href: '#how-it-works' },
	{ name: 'FAQ', href: '#faqs' },
	{ name: 'Docs', href: '/docs' },
]

export const HeroHeader = () => {
	const [menuState, setMenuState] = React.useState(false)

	return (
		<header>
			<nav data-state={menuState && 'active'} className="relative z-20 w-full px-2">
				<div className="mx-auto mt-4 max-w-7xl px-6 lg:px-12 rounded-2xl border border-border/50 bg-background/40 supports-[backdrop-filter]:bg-background/20 backdrop-blur-md shadow-sm">
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-2.5 lg:gap-0 lg:py-3">
						<div className="flex w-full justify-between lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="flex items-center space-x-2"
							>
								<Image
									src="/icon.svg"
									alt="LiquidMesh"
									width={24}
									height={24}
									priority
								/>
								<span className="text-xl font-bold">LiquidMesh</span>
							</Link>

							<button
								type="button"
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
							>
								<Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>
						</div>

						<div className="hidden lg:flex lg:items-center lg:gap-8 lg:ml-auto">
							<ul className="flex gap-8 text-base font-medium">
								{menuItems.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className="text-muted-foreground hover:text-accent-foreground block duration-150 font-medium"
											onClick={() => setMenuState(false)}
										>
											<span>{item.name}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base font-medium">
									{menuItems.map((item) => (
										<li key={item.name}>
											<Link
												href={item.href}
												className="text-muted-foreground hover:text-accent-foreground block duration-150 font-medium"
												onClick={() => setMenuState(false)}
											>
												<span>{item.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
								<Button
									asChild
									size="lg"
									variant="gradient"
									className="px-6 py-2 rounded-md"
								>
									<Link href="/dashboard">
										<span className="text-base font-medium">Launch App</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
