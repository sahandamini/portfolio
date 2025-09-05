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
				'relative flex w-fit items-center justify-between rounded-md border bg-white px-3 py-2 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-100',
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
					<Check className="h-4 w-4 text-green-500" />
				) : (
					<Copy className="h-4 w-4" />
				)}
			</Button>
		</div>
	)
}

export default EmailSnippet
