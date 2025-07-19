# Getting Started with Text2SQL.my: A Beginner's Guide

*New to Text2SQL.my? Don't worry – we've got you covered! This step-by-step guide will have you generating SQL queries from plain English in just a few minutes.*

---

## Welcome to the Future of Database Querying

If you've ever felt intimidated by SQL or database queries, you're not alone. Traditional database interaction requires learning complex syntax, understanding table relationships, and memorizing countless commands. Text2SQL.my changes all that by letting you ask questions in plain English (or Bahasa Malaysia!) and automatically generating the SQL code you need.

Whether you're a business analyst, marketing manager, or small business owner, this guide will show you exactly how to get the insights you need from your data – no technical background required.

## Your First Query: A Simple Walkthrough

Let's start with the basics. We'll walk through creating your very first query step by step.

### Step 1: Access the Interface

1. Navigate to [Text2SQL.my](https://text2sql.my)
2. Click **"Try It Now"** or **"Start Generating SQL"**
3. You'll see a clean, simple interface with a text box that says *"Describe what you want to query in plain English..."*

### Step 2: Upload Your Database (Optional)

For this example, let's imagine you have a simple business database with these tables:
- **customers** (id, name, email, city, registration_date)
- **orders** (id, customer_id, total_amount, order_date)
- **products** (id, name, price, category)

If you have your own database file (.csv, .sqlite, etc.), you can upload it using the **"Upload Database"** button. Don't worry if you don't have one – Text2SQL.my works with example databases too!

### Step 3: Ask Your First Question

Let's start with something simple. In the text box, type:

```
Show me all customers from Kuala Lumpur
```

That's it! No complex syntax or table names to remember – just ask like you're talking to a colleague.

### Step 4: Review the Generated SQL

Within seconds, Text2SQL.my will generate clean SQL code like this:

```sql
SELECT * 
FROM customers 
WHERE city = 'Kuala Lumpur';
```

You'll see:
- The **generated SQL query** clearly displayed
- An **explanation** of what the query does
- The **results preview** if you have a database connected

### Step 5: Run and Refine

If the query looks good, click **"Execute Query"** to see your results. If you need to adjust anything, simply modify your question and try again!

## More Examples: Building Your Confidence

Let's try a few more examples to show you the power and flexibility of natural language querying:

### Example 1: Finding Your Best Customers

**Your Question:**
```
Who are my top 5 customers by total spending?
```

**Generated SQL:**
```sql
SELECT c.name, c.email, SUM(o.total_amount) as total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC
LIMIT 5;
```

**What This Does:** Finds your highest-value customers by adding up all their order amounts.

### Example 2: Monthly Sales Analysis

**Your Question:**
```
Show me total sales for each month this year
```

**Generated SQL:**
```sql
SELECT 
    STRFTIME('%Y-%m', order_date) as month,
    SUM(total_amount) as monthly_sales
FROM orders 
WHERE STRFTIME('%Y', order_date) = STRFTIME('%Y', 'now')
GROUP BY STRFTIME('%Y-%m', order_date)
ORDER BY month;
```

**What This Does:** Groups all orders by month and calculates the total sales for each month in the current year.

### Example 3: Product Performance

**Your Question:**
```
Which products have never been ordered?
```

**Generated SQL:**
```sql
SELECT p.name, p.category, p.price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;
```

**What This Does:** Finds products that don't appear in any orders, helping you identify slow-moving inventory.

## Common Issues and How to Fix Them

Even with Text2SQL.my's smart AI, you might occasionally run into small hiccups. Here's how to handle the most common situations:

### Issue 1: "I Don't See the Results I Expected"

**Problem:** Your query runs but the results don't look right.

**Solutions:**
- **Be more specific:** Instead of "show customers," try "show all customer names and emails"
- **Check your data:** Make sure your database actually contains the information you're looking for
- **Verify dates:** If asking about "this month," make sure you have recent data

**Example Fix:**
❌ Vague: "Show me sales"
✅ Better: "Show me total sales amount for each customer last month"

### Issue 2: "The Query Seems Too Complex"

**Problem:** The generated SQL looks overwhelming or uses unfamiliar syntax.

**Solutions:**
- **Start simpler:** Break complex questions into smaller parts
- **Use the explanation:** Text2SQL.my explains what each query does in plain English
- **Build gradually:** Start with basic queries and add complexity as you get comfortable

**Example Progression:**
1. "Show me all customers" 
2. "Show me customers from Penang"
3. "Show me customers from Penang who placed orders this year"

### Issue 3: "I Get an Error Message"

**Problem:** Red error text appears instead of results.

**Common Causes & Fixes:**
- **Table/column doesn't exist:** Double-check that your database contains the information you're asking about
- **Syntax error:** Try rephrasing your question more simply
- **Data type mismatch:** Be specific about dates and numbers (e.g., "January 2024" instead of "last month")

**Quick Troubleshooting:**
1. Try a simpler version of your question first
2. Check if your database is properly connected
3. Look at the sample data to see what's actually available

### Issue 4: "The Query Takes Too Long"

**Problem:** Your query seems to be running forever.

**Solutions:**
- **Add limits:** Include phrases like "top 10" or "first 100 results"
- **Be more specific:** Instead of analyzing all data, focus on recent periods
- **Simplify joins:** Start with single-table queries before combining multiple tables

## Tips for Success

### 1. Start Simple, Then Build
Don't try to create complex analyses on your first try. Start with basic questions and gradually add more complexity as you get comfortable.

### 2. Be Conversational
Write your questions like you're asking a colleague. Text2SQL.my understands natural language, so don't try to sound "technical."

**Good examples:**
- "How many orders did we get last week?"
- "Who are our customers in Johor?"
- "What's our best-selling product this month?"

### 3. Use Specific Time Periods
Instead of vague terms like "recently," be specific:
- "Last 30 days" instead of "recently"
- "January 2024" instead of "last month"
- "This quarter" instead of "lately"

### 4. Include Context in Your Questions
Help the AI understand what you're looking for:
- "Show me customer names and email addresses" (not just "show customers")
- "Total revenue by month" (not just "revenue")
- "Products that sold more than 100 units" (not just "popular products")

### 5. Don't Be Afraid to Iterate
If your first query isn't perfect, refine it! Text2SQL.my learns from your adjustments and gets better at understanding your specific needs.

> **💡 Ready to Level Up?** Once you're comfortable with the basics, check out our advanced guide: **[How to Write Better Prompts for Text2SQL Tools](/blog/better-prompts)** to learn professional techniques that can make your queries 3x faster and more accurate!

## What Makes Text2SQL.my Special

### Built for Malaysian Businesses
- **Bilingual support:** Ask questions in English or Bahasa Malaysia
- **Local context:** Understands Malaysian business terms and conventions
- **Time zone aware:** Handles Malaysian dates and time periods correctly

### Security First
- **Your data stays private:** Queries are processed securely without storing your business data
- **Enterprise-grade:** Built with the same security standards used by banks and government agencies
- **Local compliance:** Meets Malaysian data protection requirements

### Always Learning
- **Continuous improvement:** The AI gets smarter with each query
- **Industry-specific:** Learns terminology specific to your business sector
- **Custom optimization:** Adapts to your database structure and naming conventions

## Ready to Get Started?

You now have everything you need to start generating powerful SQL queries from plain English! Remember:

1. **Start simple** with basic questions
2. **Be specific** about what you want to see
3. **Don't worry about mistakes** – you can always refine and try again
4. **Explore gradually** as you build confidence

Text2SQL.my is designed to grow with you. As you become more comfortable, you'll find yourself asking more sophisticated questions and getting deeper insights from your data.

### Your Next Steps

1. **Try the examples** from this guide with your own data
2. **Experiment** with different ways of asking the same question
3. **Save your favorite queries** for quick access later
4. **Share insights** with your team – they'll be amazed at how easy it is!
5. **🚀 Level up your skills** with our [Advanced Prompting Guide](/blog/better-prompts) to save even more time and get better results

---

**Ready to transform how you work with data?** [Start your first query now →](https://text2sql.my/app)

**Want to become a prompting expert?** [Read our Advanced Prompting Guide →](/blog/better-prompts)

*Have questions about getting started? Our support team is here to help! Contact us at support@text2sql.my or check out our FAQ section for quick answers.*
