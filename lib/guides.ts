export type GuideContentBlock =
    | { type: 'header'; level: 2 | 3; content: string }
    | { type: 'text'; content: string }
    | { type: 'alert'; title?: string; content: string; variant: 'info' | 'warning' | 'success' | 'destructive' }
    | { type: 'chart'; title: string; data: { label: string; value: number; color: string }[]; chartType: 'bar' }
    | { type: 'list'; items: string[] };

export interface Guide {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags: string[];
    blocks: GuideContentBlock[];
}

export const guides: Guide[] = [
    {
        slug: "automated-change-orders-freelancers",
        title: "The Freelancer's Guide to Automated Change Orders",
        description: "Stop losing revenue to scope creep. Learn how contract enforcement AI can help you handle scope creep and generate automated change orders instantly.",
        date: "2025-12-10",
        readTime: "5 min read",
        tags: ["Scope Creep", "Automation", "Freelancing"],
        blocks: [
            {
                type: 'header',
                level: 2,
                content: 'The Hidden Cost of "Just One Small Tweak"'
            },
            {
                type: 'text',
                content: `If you're a freelancer or consultant, you know the phrase. "Hey, can we just add this one small thing?" It seems harmless, but these requests accumulate. This is **scope creep**, and it silently eats anywhere from **15% to 30% of your billable revenue**.`
            },
            {
                type: 'chart',
                title: "Annual Revenue Lost to Scope Creep (Avg Freelancer)",
                chartType: 'bar',
                data: [
                    { label: "Billed Revenue", value: 70000, color: "bg-indigo-500" },
                    { label: "Unbilled Scope Creep", value: 30000, color: "bg-rose-500" },
                ]
            },
            {
                type: 'header',
                level: 2,
                content: "How to Handle Scope Creep Without Ruining Relationships"
            },
            {
                type: 'text',
                content: "The biggest challenge isn't identifying scope creep—it's calling it out without sounding petty or aggressive. Most freelancers fear that enforcing their contract will damage the client relationship."
            },
            {
                type: 'alert',
                variant: 'info',
                title: "The Psychology of 'No'",
                content: "By relying on objective data and automated systems, you can depersonalize the 'no' and turn it into a business transaction. Contract enforcement AI serves as a neutral third party."
            },
            {
                type: 'header',
                level: 2,
                content: "The Power of Automated Change Orders"
            },
            {
                type: 'text',
                content: "Imagine if every time a client sent a request that fell outside the original agreement, a system automatically flagged it and drafted a professional response. This is the reality of **automated change orders**."
            },
            {
                type: 'list',
                items: [
                    "**Speed**: You catch the scope creep the moment it happens, not weeks later.",
                    "**Objectivity**: 'The system flagged this as out-of-scope' is easier to say than 'I don't want to do this'.",
                    "**Revenue Recovery**: Turning free work into billable hours is the fastest way to increase your margins."
                ]
            },
            {
                type: 'header',
                level: 2,
                content: "Contract Enforcement AI: Your Digital Bad Cop"
            },
            {
                type: 'text',
                content: "New tools like ScopeGuard serve as your \"Bad Cop.\" They scan your client communications, compare them against your Rulebooks (contracts), and alert you when boundaries are crossed."
            },
            {
                type: 'alert',
                variant: 'success',
                title: "Try This Script",
                content: "\"I'd love to help with that! Since this feature wasn't in our original scope, I've generated a quick Change Order for your approval so we can get started right away.\""
            },
            {
                type: 'header',
                level: 2,
                content: "Conclusion"
            },
            {
                type: 'text',
                content: "You don't have to be the bad guy. Use automated change orders to protect your time and income. Handle scope creep proactively, and turn those smal tweaks into significant revenue."
            }
        ]
    }
];

export function getGuideBySlug(slug: string): Guide | undefined {
    return guides.find(curr => curr.slug === slug);
}
