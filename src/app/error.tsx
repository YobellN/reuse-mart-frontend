'use client'

import { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-destructive">Terjadi Kesalahan</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
              Ada sesuatu yang tidak berjalan dengan semestinya. Silakan coba lagi.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => reset()}>
              Coba Lagi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
