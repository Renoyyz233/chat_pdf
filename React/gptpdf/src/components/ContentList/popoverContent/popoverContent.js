// popoverContent.js
export const popoverData = [
    {
        title: 'Pricing',
        content: 'Pricing details...'
    },
    {
        title: 'FAQ',
        content: [
            '<h4>Can ChatPDF speak my language?</h4>',
            'Yes, ChatPDF can read PDFs and answer questions in any language. You can upload a PDF in one language and ask questions in another. The greeting message will be in the PDF’s language. After that, ChatPDF will answer in the language you ask. If a message isn’t in the language you want, just ask ChatPDF to change it.',
            '<h4>Is ChatPDF free?</h4>',
            'ChatPDF allows you to use it for free with 3 PDFs every day, each up to 120 pages. For more, you can upgrade to the Plus plan for $5 per month. For additional information, check the pricing page.'
        ].join('\n\n')
    },
    {
        title: 'Twitter',
        content: 'Twitter details...'
    },
    {
        title: 'Contact',
        content: [
            '<h4>Contact Us</h4>',
            '<h5>FOR SUPPORT:</h5> Join our discord server',
            '<h5>FOR GENERAL & BUSINESS ENQUIRIES:</h5> Email support@pdfgpt.io'
        ].join('\n\n')
    }
];
