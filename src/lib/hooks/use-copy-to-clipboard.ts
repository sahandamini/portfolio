import { useCallback, useEffect, useState } from 'react'

interface UseCopyToClipboardOptions {
	timeout?: number
}

interface UseCopyToClipboardResult {
	isCopied: boolean
	copy: (text: string) => Promise<boolean>
}

export function useCopyToClipboard(
	options?: UseCopyToClipboardOptions,
): UseCopyToClipboardResult {
	const { timeout = 2000 } = options || {}
	const [isCopied, setIsCopied] = useState(false)

	const copy = useCallback(async (text: string) => {
		if (!navigator.clipboard) {
			console.warn('Clipboard API not available.')
			return false
		}

		try {
			await navigator.clipboard.writeText(text)
			setIsCopied(true)
			return true
		} catch (error) {
			console.error('Failed to copy:', error)
			setIsCopied(false)
			return false
		}
	}, [])

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (isCopied) {
			timer = setTimeout(() => {
				setIsCopied(false)
			}, timeout)
		}
		return () => clearTimeout(timer)
	}, [isCopied, timeout])

	return { isCopied, copy }
}
