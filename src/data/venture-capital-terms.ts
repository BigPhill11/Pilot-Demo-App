export const vcTerms = {
  level1: [
    {
      term: "Venture Capital",
      definition: "Venture capital is funding for early-stage companies with high growth potential. It involves more risk than traditional lending.",
      category: "basics",
      analogy: "Like investing in a young athlete with potential to become a superstar - high risk but potentially huge rewards.",
      example: "A VC firm investing $1M in a startup app in exchange for 20% ownership."
    },
    {
      term: "Equity",
      definition: "Equity is ownership in a company. VCs receive shares in return for their investment.",
      category: "basics",
      analogy: "Like owning a slice of pizza - the bigger your slice, the more of the pizza you own.",
      example: "Owning 20% equity means you own 20% of the company's value."
    },
    {
      term: "Startup",
      definition: "A startup is a young company designed to scale quickly, often in technology or innovation-driven industries.",
      category: "basics",
      analogy: "Like a seedling that's designed to grow into a giant tree very quickly.",
      example: "Uber started as a small app connecting riders with drivers and scaled globally."
    },
    {
      term: "Return on Investment (ROI)",
      definition: "ROI measures how much profit an investor makes compared to the amount invested.",
      category: "basics",
      analogy: "Like measuring how much money you made from a lemonade stand compared to what you spent on supplies.",
      example: "Investing $1M and getting back $10M is a 10x ROI."
    },
    {
      term: "High Risk, High Reward",
      definition: "VC investments are risky because most startups fail. However, successful ones can return multiples of the original investment.",
      category: "basics",
      analogy: "Like playing in a lottery where most tickets lose, but the winners get huge prizes.",
      example: "9 out of 10 startups might fail, but 1 success can return 100x the investment."
    }
  ],
  level2: [
    {
      term: "Limited Partners (LPs)",
      definition: "LPs are institutions or wealthy individuals who invest in VC funds. They provide capital but don't make decisions.",
      category: "ecosystem",
      analogy: "Like silent investors in a restaurant - they provide the money but let the chef decide what to cook.",
      example: "University endowments, pension funds, and wealthy families who invest in VC funds."
    },
    {
      term: "General Partners (GPs)",
      definition: "GPs manage VC funds, choose startups, and work with founders.",
      category: "ecosystem",
      analogy: "Like the chef in a restaurant - they make the day-to-day decisions and run the business.",
      example: "Partners at firms like Sequoia Capital who decide which startups to fund."
    },
    {
      term: "Accelerator",
      definition: "An accelerator is a program that helps startups grow quickly with mentorship, funding, and networking.",
      category: "ecosystem",
      analogy: "Like a bootcamp for startups - intensive training to get them ready for the big leagues.",
      example: "Y Combinator, which helped launch Airbnb, Dropbox, and hundreds of other startups."
    },
    {
      term: "Fund",
      definition: "A fund is a pool of money raised by a VC firm to invest in startups.",
      category: "ecosystem",
      analogy: "Like a big piggy bank that multiple people contribute to, which is then used to make investments.",
      example: "A $100M fund that invests $2-5M in each of 20-50 startups."
    },
    {
      term: "Entrepreneur",
      definition: "An entrepreneur is someone who starts and grows a business.",
      category: "ecosystem",
      analogy: "Like an explorer who ventures into unknown territory to discover new opportunities.",
      example: "Elon Musk starting Tesla, or college students starting a tech company in their dorm room."
    }
  ],
  level3: [
    {
      term: "Due Diligence",
      definition: "Due diligence is the research process VCs use to evaluate a startup.",
      category: "evaluation",
      analogy: "Like doing homework before buying a used car - checking everything to make sure it's a good investment.",
      example: "Reviewing financial statements, interviewing customers, and analyzing the competition."
    },
    {
      term: "Market Size (TAM)",
      definition: "TAM (Total Addressable Market) is how big the opportunity is. Bigger markets attract more VC interest.",
      category: "evaluation",
      analogy: "Like the size of the ocean you're fishing in - bigger ocean means more potential fish to catch.",
      example: "The global food delivery market being worth $100+ billion annually."
    },
    {
      term: "Product-Market Fit",
      definition: "Product-market fit is when customers strongly want and use a product.",
      category: "evaluation",
      analogy: "Like finding the perfect key for a lock - everything clicks and works smoothly.",
      example: "When Instagram users were sharing millions of photos daily because they loved the app."
    },
    {
      term: "Competitive Advantage",
      definition: "A competitive advantage is what makes a startup better than rivals (technology, brand, network).",
      category: "evaluation",
      analogy: "Like having a secret recipe that makes your restaurant better than all the others.",
      example: "Tesla's battery technology giving them an edge over other electric car companies."
    },
    {
      term: "Scalability",
      definition: "Scalability is the ability to grow quickly without costs rising equally fast.",
      category: "evaluation",
      analogy: "Like a digital music service - adding more users doesn't cost much more than serving fewer users.",
      example: "Netflix can serve millions of customers with the same content library and infrastructure."
    }
  ]
};

export const getAllVCTerms = () => {
  return Object.values(vcTerms).flat();
};

export const getVCTermsByLevel = (level: number) => {
  const levelKey = `level${level}` as keyof typeof vcTerms;
  return vcTerms[levelKey] || [];
};

export const getVCTermsByCategory = (category: string) => {
  return getAllVCTerms().filter(term => term.category === category);
};