
export type FAQItem = {
    question: string
    answer: string
  }
  
  export type FAQDocument = {
    data: {
      list: {
        question: { type: 'paragraph'; text: string }[]
        answer: { type: 'paragraph'; text: string }[]
      }[]
    }
  }
  