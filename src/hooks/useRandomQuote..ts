import { useEffect, useState } from 'react'
import { QUOTE_TAGS } from '../constants'
import type { Quote, QuoteAPI } from '../types'

const baseUrl = import.meta.env.VITE_QUOTES_BASE_URL
const quoteUrl = `${baseUrl}/random?limit=1&maxLength=100&tags=${QUOTE_TAGS.join(
  '|'
)}`

export const useRandomQuote = (): Quote => {
  const [quote, setQuote] = useState<Quote>({
    author: '',
    quote: '',
  })

  useEffect(() => {
    async function getQuoteFromApi(url: string) {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(
            `[quote-api] Error HTTP ${response.status} - ${response.statusText}`
          )
        }

        const quoteArray: QuoteAPI[] = await response.json()

        if (Array.isArray(quoteArray) && quoteArray.length > 0) {
          const { author, content } = quoteArray[0]
          const newQuote = {
            quote: content,
            author,
          }
          console.log(newQuote)

          setQuote(newQuote)
        }
      } catch (error) {
        console.error('Error en la petición de la quote API:', error)
      }
    }

    getQuoteFromApi(quoteUrl)
  }, [])

  return quote
}
