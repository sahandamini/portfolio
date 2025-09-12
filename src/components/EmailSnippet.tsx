'use client'

import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import * as React from 'react'

interface EmailSnippetProps {
	email: string
	className?: string
}

export const EmailSnippet: React.FC<EmailSnippetProps> = ({
	email,
	className,
}) => {
	const { isCopied, copy } = useCopyToClipboard({ timeout: 2000 })

	const handleCopy = () => {
		copy(email)
	}

	return (
		<div
			className={cn(
				'relative flex w-fit items-center justify-between rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground shadow-xs backdrop-blur dark:bg-background/40',
				className,
			)}
		>
			<pre className="pr-2 font-mono text-sm font-light whitespace-nowrap">
				{email}
			</pre>
			<Button
				variant="ghost"
				size="icon"
				className="h-6 w-6 hover:bg-transparent dark:hover:bg-transparent"
				onClick={handleCopy}
				aria-label="Copy email to clipboard"
			>
				{isCopied ? (
					<Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
				) : (
					<Copy className="h-4 w-4 text-muted-foreground" />
				)}
			</Button>
		</div>
	)
}

export default EmailSnippet
