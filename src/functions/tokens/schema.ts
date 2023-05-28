export default {
  type: "object",
  properties: {
    card_number: { type: 'string' },
    cvv: { type: 'string' },
    expiration_month: { type: 'string' },
    expiration_year: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['card_number','cvv','expiration_month','expiration_year','email']
} as const;
