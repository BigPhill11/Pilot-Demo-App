export interface CorporateFinanceLevel {
  id: number;
  title: string;
  description: string;
  overview: string;
  flashcards: Array<{
    term: string;
    definition: string;
  }>;
  realLifeExample: string;
  miniGames: Array<{
    name: string;
    description: string;
    learningGoal: string;
    completionSystem: string;
    keyTerms: string[];
  }>;
  quiz: Array<{
    question: string;
    answer: string;
  }>;
  takeHomeActivity: string;
}

export const corporateFinanceLevels: CorporateFinanceLevel[] = [
  {
    id: 1,
    title: "What Is Corporate Finance?",
    description: "Learn the fundamentals of how businesses make money decisions",
    overview: "Corporate finance is the study of how businesses make decisions about money. It looks at where companies get their money, how they spend it, and how they make sure those choices create value for their owners. Unlike personal finance, which focuses on individuals and families, corporate finance involves large sums of money, big investments, and complex trade-offs. Companies often need to decide whether to borrow money, issue shares, or use profits to fund projects. They also decide whether to reinvest profits in the business or return them to shareholders as dividends. At its core, corporate finance is about balancing risk and reward to make a company stronger and more valuable over time.",
    flashcards: [
      {
        term: "Corporate Finance",
        definition: "Corporate finance is how companies raise, manage, and spend money. It focuses on creating value for shareholders by making smart decisions about investments and funding. For example, when Amazon builds new warehouses to speed up delivery, it's practicing corporate finance."
      },
      {
        term: "Debt",
        definition: "Debt is borrowed money that must be repaid with interest. Companies often borrow from banks or sell bonds to raise cash quickly. For instance, a company might borrow $1 million to build a new factory, then pay it back over time with interest."
      },
      {
        term: "Equity",
        definition: "Equity represents ownership in a company. Companies raise equity by selling shares, giving investors a piece of ownership in exchange for money. For example, when Tesla sells stock to raise funds for new production, it is issuing equity."
      },
      {
        term: "Capital",
        definition: "Capital is the total pool of money a company uses to operate and grow. It includes both debt and equity. A startup with $500,000 from investors and a $200,000 loan has $700,000 in capital."
      },
      {
        term: "Goal of Corporate Finance",
        definition: "The goal is to increase the company's overall value for its owners, usually the shareholders. This can be done by investing in profitable projects, cutting unnecessary costs, and managing risk wisely. For example, if Apple invests in a new iPhone model that boosts profits, it achieves this goal."
      }
    ],
    realLifeExample: "A bakery owner wants to open three new shops across town. To do so, she needs $100,000. She can borrow money from a bank (debt) or sell a share of her business to an investor (equity). If she borrows, she must pay interest each month, but she keeps full control. If she sells equity, she avoids loan payments but gives up some ownership. This decision is corporate finance in action — choosing how to fund growth while balancing risk, cost, and control.",
    miniGames: [
      {
        name: "Debt vs Equity",
        description: "Players see scenarios like 'company borrows from a bank' or 'company sells shares' and must identify whether it's debt or equity.",
        learningGoal: "Recognize the two main sources of business funding.",
        completionSystem: "Bronze = 2 correct, Silver = 3–4, Gold = all correct.",
        keyTerms: ["Debt", "Equity"]
      },
      {
        name: "Finance Detective",
        description: "Players read short business stories (like 'wants to grow but avoid sharing control') and choose the best financing method (debt or equity).",
        learningGoal: "Understand how companies match financing choices with goals.",
        completionSystem: "Points awarded for correct answers; leaderboard option.",
        keyTerms: ["Corporate Finance", "Capital"]
      }
    ],
    quiz: [
      {
        question: "What is the main goal of corporate finance?",
        answer: "To increase the company's overall value for its owners (shareholders) by making smart decisions about investments and funding."
      },
      {
        question: "In Debt vs Equity, which option gives ownership: selling shares or borrowing from a bank?",
        answer: "Selling shares gives ownership (equity), while borrowing from a bank does not."
      },
      {
        question: "What does equity mean in simple terms?",
        answer: "Equity represents ownership in a company - when you buy shares, you own a piece of the business."
      },
      {
        question: "In Finance Detective, why might a business avoid equity funding?",
        answer: "To maintain full control and ownership of the business, since equity funding means giving up ownership to investors."
      },
      {
        question: "In the bakery example, what trade-off did the owner face?",
        answer: "Between keeping control (debt) vs avoiding loan payments (equity) - balancing cost, risk, and control."
      }
    ],
    takeHomeActivity: "Pick a small business in your community (like a restaurant, coffee shop, or gym). Imagine they want to expand. Would they use debt, equity, or both? Write 5–6 sentences explaining your reasoning."
  },
  {
    id: 2,
    title: "Understanding Business Money",
    description: "Master simplified financial statements and business accounting basics",
    overview: "Businesses keep track of their money using three main reports: the income statement, the balance sheet, and the cash flow statement. These documents may sound intimidating, but they answer simple questions: How much money came in? How much went out? What's left? Investors and managers use them to see if the company is healthy and whether it can grow. Ratios like profit margin or debt-to-equity make it easier to compare companies. Understanding these basics helps anyone see if a business is profitable, risky, or running smoothly.",
    flashcards: [
      {
        term: "Revenue",
        definition: "Revenue is the total money a company makes from sales. It shows the 'top line' of how much customers are paying. For example, if a lemonade stand sells 200 cups at $2 each, its revenue is $400."
      },
      {
        term: "Expenses",
        definition: "Expenses are the costs of running the business, like wages, rent, or supplies. They reduce profit. For instance, if the lemonade stand spends $100 on lemons and sugar, that's an expense."
      },
      {
        term: "Profit (Net Income)",
        definition: "Profit is what's left after expenses are subtracted from revenue. It's often called the 'bottom line.' If the stand makes $400 in revenue and spends $300 in expenses, its profit is $100."
      },
      {
        term: "Assets",
        definition: "Assets are things a company owns that have value, like cash, buildings, or equipment. For example, a delivery truck is an asset for a logistics company."
      },
      {
        term: "Liabilities",
        definition: "Liabilities are what the company owes, like loans, rent, or unpaid bills. A bank loan for $10,000 is a liability."
      }
    ],
    realLifeExample: "A small clothing store makes $100,000 in revenue in one year. It spends $70,000 on salaries, rent, and supplies. The result is $30,000 in profit. On the balance sheet, the store lists a delivery van as an asset and a $10,000 bank loan as a liability. These basic numbers help the owner understand if the store is financially strong and where improvements are needed.",
    miniGames: [
      {
        name: "Sort the Money",
        description: "Players drag items like 'cash,' 'loan,' 'sales,' or 'rent' into the right bucket: Asset, Liability, Revenue, or Expense.",
        learningGoal: "Learn how to classify business money flows.",
        completionSystem: "Bronze = 50% correct, Silver = 75%, Gold = all correct.",
        keyTerms: ["Assets", "Liabilities", "Revenue", "Expenses"]
      },
      {
        name: "Profit Puzzle",
        description: "Players are given revenue and expenses, then must calculate profit by subtracting.",
        learningGoal: "Practice basic profit calculation.",
        completionSystem: "Score based on correct answers; badges for speed and accuracy.",
        keyTerms: ["Profit", "Revenue", "Expenses"]
      }
    ],
    quiz: [
      {
        question: "What is revenue?",
        answer: "Revenue is the total money a company makes from sales - the 'top line' showing how much customers are paying."
      },
      {
        question: "In Sort the Money, is a loan an asset or a liability?",
        answer: "A loan is a liability because it's money the company owes and must pay back."
      },
      {
        question: "What does profit measure?",
        answer: "Profit measures what's left after all expenses are subtracted from revenue - the 'bottom line' of business success."
      },
      {
        question: "In Profit Puzzle, what is profit if revenue is $50,000 and expenses are $30,000?",
        answer: "$20,000 profit ($50,000 revenue minus $30,000 expenses)."
      },
      {
        question: "In the clothing store example, what was the asset and what was the liability?",
        answer: "The delivery van was an asset (something owned with value) and the $10,000 bank loan was a liability (money owed)."
      }
    ],
    takeHomeActivity: "Track your own 'mini finances' for one week. Write down all the money you receive (revenue) and all the money you spend (expenses). Subtract them to calculate your 'profit.' Then list one asset you own (like a bike or laptop) and one liability (like money you owe a friend)."
  },
  {
    id: 3,
    title: "The Value of Money Over Time",
    description: "Discover why timing matters in financial decisions",
    overview: "One of the most important ideas in corporate finance is that money today is worth more than money tomorrow. This is because money can earn interest if invested or lose value due to inflation. Companies use this principle, called the 'time value of money,' to decide whether future projects are worth the cost today. Managers compare the present value of future cash inflows with the money they must spend now. If the inflows are worth more, the project is a good choice. This idea also helps compare loans, investments, and savings options.",
    flashcards: [
      {
        term: "Time Value of Money (TVM)",
        definition: "TVM means money today is more valuable than the same amount in the future. For example, $100 today can be invested to grow, while $100 five years from now cannot earn anything in the meantime."
      },
      {
        term: "Interest",
        definition: "Interest is the extra money earned when you invest or the cost of borrowing money. If you borrow $100 at 10% interest, you pay back $110. If you invest $100 at 10%, you earn $110."
      },
      {
        term: "Future Value (FV)",
        definition: "Future value is how much money today will be worth in the future after earning interest. For example, $100 invested at 5% annually grows to about $105 after one year."
      },
      {
        term: "Present Value (PV)",
        definition: "Present value is the worth today of money you will receive in the future, discounted back using an interest rate. For instance, $110 next year is worth $100 today at 10%."
      },
      {
        term: "Discounting",
        definition: "Discounting is shrinking the value of future money to see how much it's worth today. Companies use it to evaluate projects. For example, a $1,000 payment in 3 years might be worth only $850 today."
      }
    ],
    realLifeExample: "A company can invest $1,000,000 today in a project expected to return $1,500,000 in 5 years. If the discount rate is 10%, the present value of $1,500,000 is about $930,000. Since this is less than the $1,000,000 cost, the project should be rejected. This shows how companies use the time value of money to avoid investments that look good at first but aren't worth it after discounting.",
    miniGames: [
      {
        name: "Future Value Calculator",
        description: "Players enter starting money and interest rates to see how money grows.",
        learningGoal: "Understand how compounding works over time.",
        completionSystem: "Bronze = 1 correct, Silver = 2–3, Gold = all correct.",
        keyTerms: ["Future Value", "Interest"]
      },
      {
        name: "Present Value Challenge",
        description: "Players compare two choices (money today vs. money in the future) and must pick the smarter financial decision.",
        learningGoal: "Apply discounting to everyday choices.",
        completionSystem: "Points for correct choices; leaderboard available.",
        keyTerms: ["Present Value", "Discounting"]
      }
    ],
    quiz: [
      {
        question: "Why is money today worth more than money tomorrow?",
        answer: "Because money today can be invested to earn interest and grow, while future money cannot earn anything in the meantime. Also, inflation reduces the purchasing power of future money."
      },
      {
        question: "In Future Value Calculator, what happens when interest rates increase?",
        answer: "Higher interest rates make money grow faster over time, so the future value increases."
      },
      {
        question: "What is present value, and why is it useful?",
        answer: "Present value is what future money is worth today after discounting. It's useful for comparing different investment options and making better financial decisions."
      },
      {
        question: "In Present Value Challenge, why might $10,000 today be better than $12,000 in 3 years?",
        answer: "Because $10,000 invested today at a good interest rate might grow to more than $12,000 in 3 years, making the immediate payment more valuable."
      },
      {
        question: "In the $1,000,000 project example, why was the investment rejected?",
        answer: "Because the present value of future returns ($930,000) was less than the initial investment cost ($1,000,000), making it a losing proposition."
      }
    ],
    takeHomeActivity: "If you save $500 today and it earns 8% annual interest, how much will it be worth in 10 years? Then calculate the present value of receiving $2,000 in 10 years if the discount rate is 8%. Write a short paragraph about which choice feels smarter."
  },
  {
    id: 4,
    title: "Capital Budgeting (Choosing Projects)",
    description: "Learn how companies decide which projects are worth funding",
    overview: "Capital budgeting is the process companies use to decide which projects or investments are worth funding. Because businesses cannot afford to pursue every idea, they must compare costs today against future benefits. Tools like net present value (NPV), internal rate of return (IRR), and payback period help determine if projects will create value. These choices are important because bad projects can waste money while good ones can drive growth. Capital budgeting ensures companies grow in ways that are profitable, sustainable, and aligned with long-term goals.",
    flashcards: [
      {
        term: "Capital Budgeting",
        definition: "Capital budgeting is how companies choose which long-term projects to invest in. It helps firms decide between options like opening a new store, building a factory, or launching a product. For example, Walmart may compare store expansion against investing in e-commerce."
      },
      {
        term: "Net Present Value (NPV)",
        definition: "NPV is the difference between the present value of future cash inflows and the cost of a project. A positive NPV means the project adds value; a negative one means it should be rejected. For instance, a $1M project returning $1.3M in present value has an NPV of +$300K."
      },
      {
        term: "Internal Rate of Return (IRR)",
        definition: "IRR is the interest rate that makes a project's cash inflows equal its outflows. A project with an IRR higher than the company's cost of capital is usually good. For example, if a project has a 15% IRR and the cost of capital is 10%, it is attractive."
      },
      {
        term: "Payback Period",
        definition: "The payback period is how long it takes for a project to earn back its initial cost. Shorter payback periods reduce risk because money is recovered faster. For instance, a $200K project earning $50K annually has a 4-year payback."
      },
      {
        term: "Opportunity Cost",
        definition: "Opportunity cost is the value of the next-best option a company gives up when it chooses one project. It ensures managers think about trade-offs. For example, if Amazon invests in cloud services, it cannot use that money for retail expansion."
      }
    ],
    realLifeExample: "A retail chain must choose between opening 10 new physical stores or investing in an online shopping platform. Both projects cost $5 million. The stores are safer and produce steady income, while the online platform is riskier but has higher growth potential. After calculating NPV and IRR, the company decides on the e-commerce platform because its future value outweighs its longer payback period.",
    miniGames: [
      {
        name: "Project Picker",
        description: "Players compare two project options with costs and projected returns, then select the better investment.",
        learningGoal: "Practice evaluating projects using NPV and payback.",
        completionSystem: "Bronze = 50% correct, Silver = 75%, Gold = 100% correct.",
        keyTerms: ["Capital Budgeting", "Net Present Value (NPV)", "Payback Period"]
      },
      {
        name: "Opportunity Trade-Off",
        description: "Players are given multiple projects but only one budget. They must choose the best option, knowing the others are missed opportunities.",
        learningGoal: "Understand opportunity cost in project selection.",
        completionSystem: "Points scored for choosing the highest-value option.",
        keyTerms: ["Opportunity Cost", "Capital Budgeting"]
      }
    ],
    quiz: [
      {
        question: "What is capital budgeting?",
        answer: "Capital budgeting is how companies choose which long-term projects to invest in, helping firms decide between options like opening stores, building factories, or launching products."
      },
      {
        question: "In Project Picker, what does a positive NPV mean?",
        answer: "A positive NPV means the project adds value to the company and should be accepted, as the present value of returns exceeds the initial cost."
      },
      {
        question: "What is the payback period for a $300K project that earns $100K annually?",
        answer: "3 years ($300K ÷ $100K per year = 3 years to recover the initial investment)."
      },
      {
        question: "What does opportunity cost mean in business decisions?",
        answer: "Opportunity cost is the value of the next-best option a company gives up when it chooses one project over another."
      },
      {
        question: "In the retail chain example, why did the company choose e-commerce over physical stores?",
        answer: "Because the e-commerce platform's future value outweighed its longer payback period, despite being riskier than physical stores."
      }
    ],
    takeHomeActivity: "Think of two projects a business in your community might consider (like opening a new café vs. creating a delivery service). Write 5–6 sentences comparing their risks, costs, and possible returns. Decide which one you would pick and why."
  },
  {
    id: 5,
    title: "Cost of Capital (The Price of Money)",
    description: "Understand how companies determine the minimum return needed for projects",
    overview: "Raising money always comes at a cost. Lenders charge interest when companies borrow, and shareholders expect returns when they invest. Together, these costs make up a company's 'cost of capital,' or the minimum return a project must earn to be worthwhile. Debt is usually cheaper because interest is tax-deductible, but it adds risk if payments cannot be made. Equity doesn't require repayment, but shareholders expect higher returns since they take on more risk. Knowing the cost of capital helps businesses set a 'hurdle rate' for projects and avoid losing money.",
    flashcards: [
      {
        term: "Cost of Capital",
        definition: "Cost of capital is the minimum return a company must earn to satisfy lenders and shareholders. It acts as a benchmark for investment decisions. For example, if a firm's cost of capital is 8%, any project must return more than 8% to add value."
      },
      {
        term: "Cost of Debt",
        definition: "Cost of debt is the interest rate a company pays when borrowing money. Debt is often cheaper because interest is tax-deductible. For example, a 6% bank loan effectively costs less after taxes."
      },
      {
        term: "Cost of Equity",
        definition: "Cost of equity is the return shareholders expect in exchange for investing in the company. Since shareholders take on more risk, they usually expect higher returns than lenders. For example, investors might want 12% returns to hold a company's stock."
      },
      {
        term: "Weighted Average Cost of Capital (WACC)",
        definition: "WACC is the blended cost of debt and equity, weighted by how much of each a company uses. It represents the overall hurdle rate for investments. For instance, if a firm is 50% debt and 50% equity, its WACC might be around 9%."
      },
      {
        term: "Hurdle Rate",
        definition: "The hurdle rate is the minimum acceptable return for a project. If a project earns less, it destroys value. For example, if the hurdle is 10% and a project earns only 7%, it should be rejected."
      }
    ],
    realLifeExample: "A company wants to build a new manufacturing plant. Its WACC is 8%. If the plant is expected to earn 6%, it fails to meet the hurdle rate and is rejected. However, if another project earns 12%, it passes the test and gets approved. This shows how cost of capital helps companies avoid bad investments.",
    miniGames: [
      {
        name: "Cost Sorter",
        description: "Players drag financing methods like loans, bonds, and shares into 'debt' or 'equity' categories.",
        learningGoal: "Distinguish between different sources of financing.",
        completionSystem: "Bronze = 2 correct, Silver = 3–4, Gold = all correct.",
        keyTerms: ["Cost of Debt", "Cost of Equity"]
      },
      {
        name: "Hurdle Decision",
        description: "Players are given project returns and hurdle rates, and they must decide whether to accept or reject.",
        learningGoal: "Apply the hurdle rate to project selection.",
        completionSystem: "Points for correct project choices.",
        keyTerms: ["Hurdle Rate", "Cost of Capital"]
      }
    ],
    quiz: [
      {
        question: "What is cost of capital?",
        answer: "Cost of capital is the minimum return a company must earn to satisfy lenders and shareholders, acting as a benchmark for investment decisions."
      },
      {
        question: "In Cost Sorter, what type of financing is issuing shares?",
        answer: "Issuing shares is equity financing, as it gives investors ownership in exchange for money."
      },
      {
        question: "Why is debt usually cheaper than equity?",
        answer: "Debt is usually cheaper because interest payments are tax-deductible, and lenders face less risk than shareholders who get paid after debt obligations."
      },
      {
        question: "In Hurdle Decision, why reject a project earning less than the hurdle rate?",
        answer: "Because projects earning less than the hurdle rate destroy value and fail to meet the minimum return required by investors."
      },
      {
        question: "In the plant example, why was the 6% return project rejected?",
        answer: "Because the 6% return was less than the company's 8% WACC hurdle rate, meaning it would destroy shareholder value."
      }
    ],
    takeHomeActivity: "Pick a well-known company and research whether it uses more debt or equity. Write 5–6 sentences on why you think it balances funding that way, and whether it seems safe or risky."
  },
  {
    id: 6,
    title: "Capital Structure (Balancing Debt and Equity)",
    description: "Learn how companies balance debt and equity financing",
    overview: "Capital structure is the mix of debt and equity a company uses to fund its operations. The right balance matters because too much debt increases the risk of bankruptcy, while too much equity dilutes ownership and control. Some industries, like utilities, can handle higher debt because their cash flows are steady. Others, like technology startups, rely more on equity because their revenues are less predictable. Companies aim for an 'optimal capital structure' that lowers costs while keeping risk manageable.",
    flashcards: [
      {
        term: "Capital Structure",
        definition: "Capital structure is the combination of debt and equity a company uses to fund itself. It shows how a firm balances borrowing with ownership. For example, a company may be 60% equity and 40% debt."
      },
      {
        term: "Leverage",
        definition: "Leverage is the extent to which a company uses debt. High leverage can boost profits in good times but magnify losses in bad times. For instance, airlines often use high leverage, which makes them vulnerable during recessions."
      },
      {
        term: "Optimal Capital Structure",
        definition: "This is the mix of debt and equity that minimizes costs and maximizes firm value. It balances the benefits of debt with the risks of too much borrowing. For example, a retail company may find 50/50 debt-equity is optimal."
      },
      {
        term: "Financial Risk",
        definition: "Financial risk is the danger of not meeting debt payments. Companies with unpredictable cash flows face higher financial risk if they use too much debt. For example, a startup with no steady income has high financial risk if it borrows heavily."
      },
      {
        term: "Trade-Off Theory",
        definition: "This theory explains that companies balance the benefits of debt (like tax savings) against its costs (like bankruptcy risk). For instance, Google may use some debt for tax benefits but rely on equity to avoid excessive risk."
      }
    ],
    realLifeExample: "A hotel chain finances its expansion with 70% debt and 30% equity. When business is booming, leverage increases profits because debt is cheaper than equity. But during COVID-19, travel collapsed, and the company struggled to repay loans. This shows both the upside and downside of debt-heavy capital structures.",
    miniGames: [
      {
        name: "Leverage Ladder",
        description: "Players adjust a debt/equity slider to see how profits, costs, and risks change.",
        learningGoal: "Understand the trade-offs of leverage.",
        completionSystem: "Points for finding the balance with lowest risk and best value.",
        keyTerms: ["Leverage", "Capital Structure", "Financial Risk"]
      },
      {
        name: "Risk Scenario",
        description: "Players face scenarios (economic boom, recession, crisis) and choose whether high or low leverage is better.",
        learningGoal: "Connect leverage decisions with real-world conditions.",
        completionSystem: "Bronze = some correct, Silver = most correct, Gold = all correct.",
        keyTerms: ["Leverage", "Trade-Off Theory"]
      }
    ],
    quiz: [
      {
        question: "What is capital structure?",
        answer: "Capital structure is the combination of debt and equity a company uses to fund itself, showing how a firm balances borrowing with ownership."
      },
      {
        question: "In Leverage Ladder, what happens when leverage is too high?",
        answer: "When leverage is too high, financial risk increases significantly, making the company vulnerable to bankruptcy if it cannot meet debt payments."
      },
      {
        question: "What is the benefit of using debt?",
        answer: "The main benefit of debt is that it's usually cheaper than equity because interest is tax-deductible, and debt doesn't dilute ownership."
      },
      {
        question: "In Risk Scenario, why is high leverage dangerous during a recession?",
        answer: "High leverage is dangerous during recessions because revenues may fall while debt payments remain fixed, increasing bankruptcy risk."
      },
      {
        question: "In the hotel example, how did COVID-19 highlight the risks of leverage?",
        answer: "COVID-19 caused travel to collapse, reducing hotel revenues while debt payments remained the same, showing how leverage magnifies losses during crises."
      }
    ],
    takeHomeActivity: "Pick a company you know (like Starbucks or Ford). Research if it uses more debt or equity. Write 5–6 sentences explaining whether you think its structure is risky or stable."
  },
  {
    id: 7,
    title: "Dividends & Corporate Decisions",
    description: "Understand how companies decide what to do with their profits",
    overview: "Once companies make profits, they must decide what to do with them. They can reinvest in the business, pay down debt, or return money to shareholders. Dividends are regular payments to shareholders, while stock buybacks reduce the number of shares and often raise share value. Some companies, especially in tech, reinvest most profits into growth, while mature companies pay higher dividends. These decisions affect shareholder satisfaction and company growth strategy, tying together all parts of corporate finance.",
    flashcards: [
      {
        term: "Dividends",
        definition: "Dividends are payments companies make to shareholders from profits. They are a way of sharing earnings. For example, Coca-Cola pays steady dividends to investors."
      },
      {
        term: "Retained Earnings",
        definition: "Retained earnings are profits a company keeps instead of paying out. They are used for reinvestment in projects or future growth. For example, Amazon often reinvests its profits rather than paying dividends."
      },
      {
        term: "Stock Buyback",
        definition: "A stock buyback happens when a company repurchases its own shares from the market. This reduces supply and often increases the stock price. For example, Apple regularly buys back billions in stock."
      },
      {
        term: "Payout Ratio",
        definition: "The payout ratio is the percentage of profits given to shareholders as dividends. A high ratio means most profits are paid out; a low one means more reinvestment. For instance, a utility company may have a 70% payout ratio."
      },
      {
        term: "Reinvestment",
        definition: "Reinvestment means putting profits back into the business to grow. It could fund R&D, marketing, or acquisitions. For example, Google reinvests heavily into new technologies."
      }
    ],
    realLifeExample: "Apple makes tens of billions in profit each year. Instead of paying it all out, the company reinvests in new products, buys back stock, and still pays shareholders regular dividends. This mix keeps investors happy while ensuring long-term growth. It shows how dividend policy, reinvestment, and buybacks are all strategic decisions in corporate finance.",
    miniGames: [
      {
        name: "Profit Choice",
        description: "Players decide what to do with profits (dividends, buybacks, reinvestment, debt repayment). They see how investors react.",
        learningGoal: "Learn trade-offs in profit distribution.",
        completionSystem: "Bronze = poor choices, Silver = balanced, Gold = optimal mix.",
        keyTerms: ["Dividends", "Stock Buyback", "Retained Earnings"]
      },
      {
        name: "Dividend Dilemma",
        description: "Players are given company profiles (fast-growing tech vs stable utility) and must choose dividend or reinvestment policies.",
        learningGoal: "Match payout strategies with company types.",
        completionSystem: "Points based on correct matches.",
        keyTerms: ["Payout Ratio", "Reinvestment"]
      }
    ],
    quiz: [
      {
        question: "What are dividends?",
        answer: "Dividends are payments companies make to shareholders from profits as a way of sharing earnings with investors."
      },
      {
        question: "In Profit Choice, why might investors like buybacks?",
        answer: "Investors like buybacks because they reduce the number of shares outstanding, which often increases the stock price and provides returns without taxable dividend income."
      },
      {
        question: "What are retained earnings used for?",
        answer: "Retained earnings are used for reinvestment in projects, future growth, R&D, marketing, acquisitions, or paying down debt."
      },
      {
        question: "In Dividend Dilemma, which company type usually pays higher dividends?",
        answer: "Stable, mature companies (like utilities) usually pay higher dividends, while fast-growing tech companies typically reinvest most profits."
      },
      {
        question: "In the Apple example, how does the company balance reinvestment and shareholder rewards?",
        answer: "Apple reinvests in new products, buys back stock to increase share value, and pays regular dividends, creating a balanced approach that satisfies different investor preferences."
      }
    ],
    takeHomeActivity: "Pick a company you admire. Research whether it pays dividends, buys back stock, or reinvests profits. Write a 6–7 sentence reflection on whether you agree with their strategy and why."
  }
];