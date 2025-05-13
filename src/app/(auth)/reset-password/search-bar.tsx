'use client'

import { checkTokenEmail } from '@/services/auth/user-services'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SearchBar({ onValidation }: { onValidation: (email: string | null) => void }) {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const validateToken = async () => {
            const token = searchParams.get('token')
            const email = searchParams.get('email')

            if (!token || !email) {
                router.replace('/forgot-password')
                return
            }

            try {
                const response = await checkTokenEmail(token, email)
                if (response.message === 'Token valid') {
                    onValidation(email)
                } else {
                    router.replace('/forgot-password')
                }
            } catch (error) {
                router.replace('/forgot-password')
            }
        }

        validateToken()
    }, [searchParams, router, onValidation])

    return null
}