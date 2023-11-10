import React from 'react'
import Link from 'next/link'

export const page = () => {
    return (
        <div>page
            <p><Link href="/dashboard/buyer">
        Pagina prueba buyer </Link>
            </p>
        </div>
    )
}
