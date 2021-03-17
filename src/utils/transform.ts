export function serialize(payload: any) {
  const premitives = ['string', 'boolean', 'number', 'undefined']
  if (premitives.includes(typeof payload)) return payload
  else if (typeof payload === 'object') return JSON.stringify(payload)
  else throw new Error('Invalid Payload, Unable to serialize')
}