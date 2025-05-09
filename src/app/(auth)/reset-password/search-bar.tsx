// 'use client'

// import { checkTokenEmail } from '@/services/auth/user-services'
// import { useSearchParams } from 'next/navigation'

// /*
// Logika yg mau kubuat:
// 1. Akan menjadikan ini fungsi yg mencari email dan token dari URL
// 2. langsung masukkan ke api, untuk ngecek di db
// 3. Jika ok, maka lanjut ke halaman ganti password
// 4. Jika tidak, maka redirect ke halaman lupa password
//  */


// export default function SearchBar() {
//     const searchParams = useSearchParams()

//     const token = searchParams.get('token') as string
//     const email = searchParams.get('email') as string

//     // This will not be logged on the server when using static rendering
//     console.log('Token:', token)
//     console.log('Email:', email)

//     checkTokenEmail(token, email).then((response) => {
//         if (response.message === 'Token valid') {
//             return true
//         }
//     }).catch((error) => {
//         return false
//     });
// }

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