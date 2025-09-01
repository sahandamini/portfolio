'use client'

import FloatingButtons from '@/components/FloatingButtons'

export default function ContactHeader() {
	return (
		<div className="absolute top-4 right-4 flex items-center space-x-4">
			<FloatingButtons isAboutVisible={true} />
		</div>
	)
}
