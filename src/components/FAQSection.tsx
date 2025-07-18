import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "1. What is Text2SQL.my?",
        answer:
        "Text2SQL.my is an AI-powered tool that converts natural language questions into SQL queries. It helps users access data insights without writing code.",
    },
    {
        question: "2. Who can use Text2SQL.my?",
        answer:
        "Text2SQL.my is designed for business analysts, non-technical users, data teams, and developers—basically anyone who wants to query data using plain English.",
    },
    {
        question: "3. What databases does Text2SQL.my support?",
        answer:
        "Currently, Text2SQL.my supports PostgreSQL and MySQL. We plan to expand to other databases like SQLite and Microsoft SQL Server soon.",
    },
    {
        question: "4. Is Text2SQL.my accurate?",
        answer:
        "The tool uses advanced language models to generate SQL queries. While highly accurate for most standard queries, we recommend users review outputs before running them on production databases.",
    },
    {
        question: "5. Is there an API for developers?",
        answer:
        "Yes, Text2SQL.my offers a developer API for integrating natural language query capabilities into your apps or internal dashboards.",
    },
    {
        question: "6. What are the API limits and pricing?",
        answer:
        "We offer a free tier with limited daily usage. Paid plans are available for higher volumes and team access. Full pricing details will be published post-hackathon.",
    },
    {
        question: "7. How is my data handled? Is it secure?",
        answer:
        "We do not store your queries or database credentials. All processing is done securely and transiently for each session. Security and privacy are top priorities.",
    },
    {
        question: "8. What are the use cases of Text2SQL.my?",
        answer: (
        <ul className="list-disc pl-5 space-y-2">
            <li>Internal data analytics</li>
            <li>Ad hoc reporting</li>
            <li>Customer support dashboards</li>
            <li>No-code BI tools</li>
            <li>Educational tools for SQL learners</li>
        </ul>
        ),
    },
    {
        question: "9. Why choose Text2SQL.my over other SQL AI tools?",
        answer: (
        <>
            <p className="mb-2">Text2SQL.my focuses on:</p>
            <ul className="list-disc pl-5 space-y-2">
            <li>Simplicity of use</li>
            <li>Fast and accurate query generation</li>
            <li>Local support and integration</li>
            <li>Secure and lightweight API</li>
            </ul>
        </>
        ),
    },
    {
        question: "10. Is Text2SQL.my free to use?",
        answer:
        "Yes, you can use the basic version for free. For heavy use and API access, consider subscribing to a premium tier.",
    },
];


export default function FAQSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Find answers to common questions about Text2SQL.my, your AI-powered SQL generator.
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 