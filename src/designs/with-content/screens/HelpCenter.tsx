import { Button } from "@ui/button"
import { Input } from "@ui/input";
import { ChevronLeft, Search } from "lucide-react"
import { useMemo, useState } from "react";
import { Link, Route, Router } from "wouter";

export const categoriesDummyData = [
    { "id": "12f1cf38-238d-4a01-be32-6eebb7450cec", "organization_id": "3ff69d98-422c-4e26-87ce-af78bad79f24", "organization_name": "My First Copilot", "name": "helopp", "description": null, "domain": null, "created_at": "2024-09-15T15:36:36.000Z", "updated_at": "2024-09-15T15:36:36.000Z" },
    { "id": "23f2cf39-239d-4b02-be33-7eebb7460ced", "organization_id": "4ff70d99-423d-4e27-88cf-bf79bad80f25", "organization_name": "Second Copilot", "name": "support", "description": "Support articles", "domain": "support.example.com", "created_at": "2024-10-01T12:00:00.000Z", "updated_at": "2024-10-01T12:00:00.000Z" }
];

export const articlesListDummyData = [
    { "id": "36190670-bcb0-4d9a-b48d-2ee0b47eb4ed", "category_id": "afa6990e-1108-46af-9b9f-b118adf352f0", "title": "Effective Steps to Engage with Customer Support", "slug": "effective-steps-to-engage-with-customer-support", "author_id": 9000002, "created_at": "2024-09-17T17:50:13.000Z", "updated_at": "2024-11-06T22:08:09.000Z", "is_public": true },
    { "id": "47190671-bcb1-4d9b-b48e-3ee0b48eb5ef", "category_id": "bfa7991f-1209-47bf-9c9f-c119adf453f1", "title": "How to Reset Your Password", "slug": "how-to-reset-your-password", "author_id": 9000003, "created_at": "2024-10-05T10:20:30.000Z", "updated_at": "2024-11-07T12:15:45.000Z", "is_public": true },
    { "id": "58190672-bcb2-4d9c-b48f-4ee0b49ec6f2", "category_id": "cfa8992f-130a-48cf-9d9f-d129bdf564f2", "title": "Understanding Your Billing Statement", "slug": "understanding-your-billing-statement", "author_id": 9000004, "created_at": "2024-11-01T14:30:45.000Z", "updated_at": "2024-11-08T16:25:50.000Z", "is_public": true }
];

export const articleContent = [
    { "id": "36190670-bcb0-4d9a-b48d-2ee0b47eb4ed", "category_id": "afa6990e-1108-46af-9b9f-b118adf352f0", "title": "Effective Steps to Engage with Customer Support", "content": "<h1>How to Get Started with Customer Support</h1><p>Welcome to our customer support guide. If you're unsure how to initiate a conversation with our support team or what kind of information to provide, this article will guide you through the process to ensure a smooth and efficient experience.</p><h2>Step 1: Initiating Contact</h2><p>When you need assistance, starting the conversation is as simple as saying \"hi\" or \"hello\" in our support chat. This action signals to our support team that you need help and are ready to describe your issue.</p><h2>Step 2: Describe Your Issue Clearly</h2><p>After your initial greeting, the support agent will respond, typically asking how they can assist you. This is your opportunity to describe your issue or query in detail. Here are a few tips on how to communicate effectively:</p><ul class=\"list-disc list-outside leading-3 -mt-2\"><li class=\"leading-normal -mb-2\"><p><strong>Be Specific:</strong> Clearly describe the problem you are facing. Include any error messages or codes you have encountered.</p></li><li class=\"leading-normal -mb-2\"><p><strong>Provide Context:</strong> Explain what you were trying to do when the issue occurred. This helps in diagnosing the problem more accurately.</p></li><li class=\"leading-normal -mb-2\"><p><strong>Include Relevant Information:</strong> Depending on the issue, you might need to provide account details, device information, or screenshots. However, never share sensitive information such as passwords or credit card numbers.</p></li></ul><h2>Step 3: Follow the Guidance Provided</h2><p>Once you have provided all the necessary information, the support agent will guide you through the steps to resolve your issue. Follow their instructions carefully. If you have any doubts or need further clarification, don't hesitate to ask.</p><h2>Conclusion</h2><p>Reaching out to customer support doesn't have to be daunting. By following these simple steps, you can ensure that your issues are addressed promptly and effectively. Remember, our support team is here to help you make the most of our services.</p>", "slug": "effective-steps-to-engage-with-customer-support", "author_id": 9000002, "created_at": "2024-09-17T17:50:13.000Z", "updated_at": "2024-11-06T22:08:09.000Z", "is_public": true },
    { "id": "47190671-bcb1-4d9b-b48e-3ee0b48eb5ef", "category_id": "bfa7991f-1209-47bf-9c9f-c119adf453f1", "title": "How to Reset Your Password", "content": "<h1>Resetting Your Password</h1><p>If you've forgotten your password or need to reset it for security reasons, follow these steps to regain access to your account.</p><h2>Step 1: Go to the Login Page</h2><p>Navigate to the login page and click on the 'Forgot Password' link.</p><h2>Step 2: Enter Your Email Address</h2><p>Provide the email address associated with your account. We will send you a password reset link.</p><h2>Step 3: Check Your Email</h2><p>Open the email and click on the password reset link. Follow the instructions to create a new password.</p><h2>Conclusion</h2><p>Resetting your password is a simple process. If you encounter any issues, please contact our support team for assistance.</p>", "slug": "how-to-reset-your-password", "author_id": 9000003, "created_at": "2024-10-05T10:20:30.000Z", "updated_at": "2024-11-07T12:15:45.000Z", "is_public": true },
    { "id": "58190672-bcb2-4d9c-b48f-4ee0b49ec6f2", "category_id": "cfa8992f-130a-48cf-9d9f-d129bdf564f2", "title": "Understanding Your Billing Statement", "content": "<h1>Billing Statement Overview</h1><p>Your billing statement provides a detailed summary of your charges and payments. Here's how to understand the key components.</p><h2>Charges</h2><p>This section lists all the charges incurred during the billing period, including subscription fees, usage charges, and any applicable taxes.</p><h2>Payments</h2><p>Here you'll find a record of all payments made during the billing period, including the date and amount of each payment.</p><h2>Balance</h2><p>The balance section shows the total amount due or any credits applied to your account.</p><h2>Conclusion</h2><p>Understanding your billing statement helps you keep track of your expenses and ensures that you are aware of all charges. If you have any questions, please contact our billing support team.</p>", "slug": "understanding-your-billing-statement", "author_id": 9000004, "created_at": "2024-11-01T14:30:45.000Z", "updated_at": "2024-11-08T16:25:50.000Z", "is_public": true }
];


function HelpCenterIndex() {
    const [search, setSearch] = useState('');
    return (
        <div className="flex items-start flex-col h-full">
            <header className="w-full border-b p-2">
                <div className="flex gap-2 items-center">
                    <Button
                        asChild
                        variant='ghost' size='icon'>
                        <Link to='~/' >
                            <ChevronLeft className="size-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h2 className="text-start font-medium text-lg">
                            Help center
                        </h2>
                    </div>
                </div>
                <div className="mt-3 relative">
                    <Search className="absolute start-4 size-4 text-secondary-foreground top-1/2 -translate-y-1/2 -translate-x-1/2" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-auto p-3"
                        style={{
                            paddingLeft: '2rem'
                        }}
                        placeholder="search...."
                    />
                </div>
            </header>
            <main className="flex-1 overflow-auto">
                {
                    articlesListDummyData.map((article) => (
                        <div key={article.id} className="p-3 border-b">
                            <Link
                                to={`/article/${article.slug}`}
                                className="font-medium text-lg">
                                {article.title}
                            </Link>
                        </div>
                    ))
                }
            </main>
        </div>
    )
}
function HelpCenterArticle({ params }: { params: { slug: string } }) {
    const selectedArticle = useMemo(() => {
        return articleContent.find((article) => article.slug === params.slug)
    }, [params])

    if (!selectedArticle) {
        return <div>Article not found</div>
    }

    return (
        <div className="flex items-start flex-col h-full">
            <header className="w-full border-b p-2">
                <div className="flex gap-2 items-center">
                    <Button
                        asChild
                        variant='ghost' size='icon'>
                        <Link to='/'>
                            <ChevronLeft className="size-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h2 className="text-start font-medium text-lg">
                            Help center
                        </h2>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-3 min-h-0">
                <div className="prose-sm" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            </main>
        </div>
    )
}

export function HelpCenter() {
    return <>
        <Route path='/' component={HelpCenterIndex} />
        <Route path='/article/:slug' component={HelpCenterArticle} />
    </>
}