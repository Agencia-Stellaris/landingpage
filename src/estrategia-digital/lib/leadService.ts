import { leadConfig } from '@/estrategia-digital/config/site'
import type { LeadPayload } from '@/estrategia-digital/types'

/** Envía el lead al endpoint configurado. En modo demo simula la latencia. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (leadConfig.demoMode || !leadConfig.endpoint) {
    console.log('[Stellaris LEAD · DEMO — no se envió a Sheets]', payload)
    await new Promise((resolve) => setTimeout(resolve, 900))
    return
  }

  await fetch(leadConfig.endpoint, {
    method: 'POST',
    // request simple → sin preflight CORS
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
}
