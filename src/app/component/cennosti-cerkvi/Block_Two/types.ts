
export type FAQItem = {
    text: string
  }
  
  export type FAQDocument = {
    data: {
      card: {
        text: { type: 'paragraph'; text: string }[]
      }[]
    }
  }
  