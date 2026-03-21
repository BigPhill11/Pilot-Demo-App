import { CareerStory } from '@/types/career-story';
import { Search } from 'lucide-react';

export const consultingStory: CareerStory = {
  id: 'consulting-turnaround',
  title: 'Management Consulting: The Turnaround Challenge',
  description: 'A struggling retail chain hired McKinsey to save them from bankruptcy. You have one week to diagnose the problem and present recommendations to the CEO.',
  careerType: 'management-consulting',
  difficulty: 'intermediate',
  estimatedTime: '25-35 minutes',
  icon: Search,
  initialMetrics: {
    technicalSkill: 50,
    timeManagement: 50,
    relationships: {
      client: 50,
      team: 50,
      cfo: 50,
      ceo: 50
    },
    stressLevel: 35
  },
  chapters: [
    {
      id: 'intro',
      title: 'Monday Morning, 8:00 AM',
      content: `You're a consultant at McKinsey assigned to StyleMart, a once-successful fashion retailer now losing $50M annually. They have 6 months of cash runway. If you can't fix this, they'll file Chapter 11.

Your engagement manager, Rachel Park, gathered the team: "The CEO, Jennifer Walsh, hired us as a last resort. The board is skeptical of consultants and wants action, not slides. We have exactly one week to diagnose the root cause and present our recommendations Friday."

**The pressure is enormous.** StyleMart has 200 stores and 12,000 employees depending on you.

Rachel continues: "I've reviewed their financials. Revenue is down 25% over 3 years, margins compressed from 8% to -4%, and they're burning $4M monthly. The CEO thinks the problem is their e-commerce strategy, but the CFO thinks it's cost structure."

She turns to you: "I want you to lead the diagnostic phase. Where should we focus first?"

**You have 3 days to diagnose, 2 days to craft solutions. Choose your starting point carefully.**`,
      decisionId: 'diagnostic-focus'
    },
    {
      id: 'revenue-analysis',
      title: 'Monday-Tuesday: Following the Revenue Trail',
      content: `You decided to focus on revenue drivers first. After 20 hours of analysis across customer data, sales trends, and competitive positioning, you discover something crucial:

**The Core Problem: StyleMart's customer base is aging out.**
- Their average customer is 52 years old (up from 38 ten years ago)
- 18-35 demographic (the future) represents only 12% of sales, down from 35%
- Fast fashion competitors (Zara, H&M, Shein) have captured younger customers
- StyleMart's brand is seen as "outdated" and "mom clothes"

But you also find a bright spot: their loyalty program members (2.1M customers) still shop regularly and spend 3x more than average customers. The problem is they're not acquiring new ones—sign-ups dropped 60% in 3 years.

When you share this with Rachel, she's impressed: "This is the insight we needed. But now the harder question: what do we recommend?"

**You have 3 days left until the CEO presentation. Do you recommend:**`,
      decisionId: 'revenue-strategy'
    },
    {
      id: 'cost-analysis',
      title: 'Monday-Tuesday: Dissecting the Cost Structure',
      content: `You decided to focus on costs first. After analyzing their P&L, store-level economics, and operational data, you discover the cost structure is indeed problematic:

**Key Findings:**
- 89 of 200 stores are losing money (average loss: $400K/year each)
- Labor costs are 35% of revenue vs. 28% industry average
- Supply chain costs are 15% higher than competitors due to small order quantities
- Corporate overhead is bloated—they have 800 HQ employees for a $600M revenue business

But here's the complexity: the money-losing stores are often in small towns where StyleMart is the only department store. Closing them would devastate those communities.

The CFO, David Chen, pulls you aside: "I've been saying for 2 years we need to cut costs. But the CEO won't close stores because of the community impact. Can you help me build the case?"

**You're caught between financial logic and social responsibility.** What's your recommendation?`,
      decisionId: 'cost-strategy'
    },
    {
      id: 'ceo-meeting',
      title: 'Wednesday: CEO Reality Check',
      content: `Your team has built a comprehensive recommendation. But before Friday's board presentation, Rachel scheduled a mid-week check-in with CEO Jennifer Walsh to test the recommendations.

You present your findings. Jennifer listens intently, then responds:

"I appreciate the analysis, but I need to be candid with you. Some of what you're recommending... we've tried before and failed."

"We attempted a brand refresh 2 years ago—spent $15M on new marketing and store redesigns. It didn't work. We tried closing underperforming stores 3 years ago—we got killed in the press and saw sales drop 10% as customers worried we were going bankrupt."

"So when you tell me to 'reposition the brand' or 'optimize the store footprint,' I hear solutions that sound good on paper but fail in reality."

**She's pushing back hard on your recommendations. This is a critical moment.**

Rachel looks at you: "How do you respond?"`,
      decisionId: 'ceo-pushback-response'
    },
    {
      id: 'thursday-refinement',
      title: 'Thursday: Refining the Recommendation',
      content: `Your response to Jennifer impressed her. She appreciates that you listened to her concerns and adapted your approach rather than defending your initial work blindly.

Now you have 24 hours to refine the final recommendation. Rachel gathers the team: "We need to go deeper. Jennifer needs to see not just WHAT to do, but exactly HOW to execute and WHY this time will be different."

Your junior analyst, Sam, has been working on the detailed implementation plan: "I've built out a week-by-week execution timeline, identified quick wins, and estimated the investment required. But I'm stuck on one thing—how do we sequence the initiatives? Do we go all-in on one big bet, or hedge with multiple smaller bets?"

**This is a classic consulting dilemma:** Bold transformation vs. pragmatic incrementalism.

You need to decide the recommendation structure for tomorrow's presentation.`,
      decisionId: 'implementation-approach'
    },
    {
      id: 'friday-presentation',
      title: 'Friday, 9:00 AM - Board Presentation',
      content: `It's showtime. The StyleMart board room: Jennifer (CEO), David (CFO), three independent board members, and the Chairman. You have 60 minutes to present, then Q&A.

Your presentation flows smoothly. The analysis is crisp, the recommendations are clear, and the implementation plan is detailed. The board members are nodding.

Then the Chairman, Robert Martinez (former CEO of a successful retail chain), speaks:

"This is excellent work. But I want to test your conviction. You're asking us to invest $35M in a turnaround when we have 6 months of cash. If this doesn't work, we're bankrupt."

"I've seen consultants present beautiful slides, then walk away while we deal with the consequences. So here's my question: **Which single initiative from your plan would you bet the company on? If you could only do ONE thing, what would it be and why?**"

**The entire room is staring at you. This answer will define the engagement.**`,
      decisionId: 'final-recommendation'
    },
    {
      id: 'conclusion',
      title: 'Friday Afternoon - The Decision',
      content: `Your answer was compelling. The board approved the turnaround plan with full funding.

**Six Months Later...**

You're back at StyleMart for a check-in. The results:
- Revenue stabilized and is growing 3% quarter-over-quarter
- They're now cash-flow positive
- Customer acquisition among 18-35 demographic is up 45%
- Employee morale has improved significantly

Jennifer pulls you into her office: "I want to thank you. Not just for the strategy, but for how you approached this. You listened when I pushed back, you adapted when needed, and you showed real conviction when it mattered."

"Most consultants either stick rigidly to their original recommendations or flip-flop with every piece of feedback. You found the right balance."

**StyleMart is going to survive.**

As you reflect on the engagement, you realize management consulting success comes from:
- Rigorous problem diagnosis
- Creative solution development
- Stakeholder management and listening
- Flexibility without losing conviction
- Implementation focus over theoretical perfection

**Engagement complete. Your performance will now be evaluated.**`
    }
  ],
  decisions: [
    {
      id: 'diagnostic-focus',
      chapterIndex: 0,
      prompt: 'Where should you focus your diagnostic effort?',
      context: 'You have 3 days for diagnosis. CEO thinks e-commerce is the problem, CFO thinks it\'s costs. Choose your analytical approach.',
      options: [
        {
          id: 'revenue-focus',
          text: 'Revenue and customer dynamics',
          description: 'Analyze why sales are declining, who\'s buying, competitive positioning',
          timeImpact: 0,
          relationshipImpact: { ceo: +10, cfo: -5 },
          technicalScore: 85,
          stressImpact: 5,
          nextChapterIndex: 1,
          consequence: {
            feedbackText: 'Strong choice. You focused on the customer, which is the heart of retail.',
            positiveAspects: ['Discovered core insight about aging customer base', 'CEO appreciates focus on growth', 'Team found actionable data'],
            negativeAspects: ['CFO feels costs are being ignored', 'Time pressure building'],
            careerInsight: 'In consulting, always start with the customer and market. Cost-cutting is a Band-Aid if you don\'t understand demand.',
            philsComment: 'Smart! Revenue problems are usually about customers, not just marketing. You followed the right thread. 🧵',
            scoreImpact: {
              technicalSkill: +10,
              timeManagement: 0,
              relationships: { ceo: +10, cfo: -5 },
              stressLevel: +5
            }
          }
        },
        {
          id: 'cost-focus',
          text: 'Cost structure and profitability',
          description: 'Analyze store-level economics, overhead, operational efficiency',
          timeImpact: 0,
          relationshipImpact: { cfo: +10, ceo: -5 },
          technicalScore: 75,
          stressImpact: 5,
          nextChapterIndex: 2,
          consequence: {
            feedbackText: 'Solid analysis, but you may have missed the bigger picture.',
            positiveAspects: ['Found significant cost inefficiencies', 'CFO is supportive', 'Clear cost-cutting opportunities'],
            negativeAspects: ['CEO thinks you\'re ignoring growth opportunities', 'Doesn\'t address revenue decline'],
            careerInsight: 'Cost-cutting alone rarely saves struggling companies. You need growth AND efficiency.',
            philsComment: 'Costs matter, but remember: you can\'t cost-cut your way to prosperity. Growth is critical too. 📈',
            scoreImpact: {
              technicalSkill: +8,
              timeManagement: 0,
              relationships: { cfo: +10, ceo: -5 },
              stressLevel: +5
            }
          }
        },
        {
          id: 'holistic-framework',
          text: 'Build holistic issue tree covering all factors',
          description: 'Comprehensive analysis of revenue, costs, competition, operations',
          timeImpact: -15,
          relationshipImpact: { team: -10 },
          technicalScore: 70,
          stressImpact: 15,
          nextChapterIndex: 1,
          consequence: {
            feedbackText: 'Thorough but inefficient. You\'re spreading the team too thin.',
            positiveAspects: ['Comprehensive view', 'No blind spots'],
            negativeAspects: ['Team is overwhelmed', 'Running out of time', 'Analysis lacks depth in key areas', 'Rachel concerned about focus'],
            careerInsight: 'In consulting, "boiling the ocean" is dangerous. Better to go deep on the right problem than shallow on everything.',
            philsComment: 'You tried to analyze everything and lost focus. In limited time, prioritize what matters most. ⏰',
            scoreImpact: {
              technicalSkill: -5,
              timeManagement: -15,
              relationships: { team: -10 },
              stressLevel: +15
            }
          }
        }
      ]
    },
    {
      id: 'revenue-strategy',
      chapterIndex: 1,
      prompt: 'You identified the aging customer base problem. What\'s your strategic recommendation?',
      context: 'StyleMart needs to attract younger customers while keeping loyal older ones. Budget is limited.',
      toolRequired: 'issue-tree',
      options: [
        {
          id: 'brand-refresh',
          text: 'Bold brand repositioning to target 25-40 demo',
          description: 'New brand identity, influencer marketing, modern store experience',
          timeImpact: 0,
          relationshipImpact: { ceo: +15, cfo: -10 },
          technicalScore: 85,
          stressImpact: 10,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Ambitious but risky. This is a big bet on brand transformation.',
            positiveAspects: ['Addresses root cause', 'CEO excited about growth vision', 'Could transform the business'],
            negativeAspects: ['Requires $25M+ investment', 'CFO worried about cash burn', 'High execution risk'],
            careerInsight: 'Bold strategies get attention, but you must back them with realistic execution plans and risk mitigation.',
            philsComment: 'Big swings can win games, but make sure you have a plan B if it doesn\'t work. 🎯',
            scoreImpact: {
              technicalSkill: +12,
              timeManagement: 0,
              relationships: { ceo: +15, cfo: -10 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'loyalty-amplification',
          text: 'Double down on existing loyal customers',
          description: 'Enhance loyalty program, personalization, VIP experiences',
          timeImpact: 0,
          relationshipImpact: { cfo: +10, ceo: -5 },
          technicalScore: 70,
          stressImpact: 5,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Safe but potentially insufficient. You\'re optimizing the existing base.',
            positiveAspects: ['Low investment required ($5M)', 'CFO appreciates capital efficiency', 'Lower risk'],
            negativeAspects: ['Doesn\'t solve aging customer problem', 'CEO wants bolder vision', 'May just slow the decline'],
            careerInsight: 'Sometimes the safe answer is too safe. Clients hire consultants for transformative thinking, not incremental tweaks.',
            philsComment: 'Playing it safe can feel smart, but sometimes you need bold moves to create real change. 🚀',
            scoreImpact: {
              technicalSkill: +5,
              timeManagement: 0,
              relationships: { cfo: +10, ceo: -5 },
              stressLevel: +5
            }
          }
        },
        {
          id: 'two-brand-strategy',
          text: 'Create sub-brand for younger demo, maintain core',
          description: 'Launch "StyleMart Modern" targeting millennials/Gen Z',
          timeImpact: 0,
          relationshipImpact: { ceo: +10, cfo: +5 },
          technicalScore: 90,
          stressImpact: 8,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Creative solution! You found a way to pursue both audiences.',
            positiveAspects: ['Hedges risk across demographics', 'CEO loves the innovation', 'CFO appreciates testing before full commitment', 'Both stakeholders aligned'],
            negativeAspects: ['Operationally complex', 'Requires careful execution'],
            careerInsight: '"And" thinking often beats "or" thinking in consulting. Find ways to solve multiple constraints simultaneously.',
            philsComment: 'Brilliant! You found a creative solution that makes both stakeholders happy. That\'s consulting mastery. ✨',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: 0,
              relationships: { ceo: +10, cfo: +5 },
              stressLevel: +8
            }
          }
        }
      ]
    },
    {
      id: 'cost-strategy',
      chapterIndex: 2,
      prompt: 'You found 89 money-losing stores. What do you recommend?',
      context: 'Closing them makes financial sense but would hurt communities. CFO wants cuts, CEO resists.',
      options: [
        {
          id: 'aggressive-closures',
          text: 'Close all 89 unprofitable stores immediately',
          description: 'Save $35M annually, painful but necessary',
          timeImpact: 0,
          relationshipImpact: { cfo: +15, ceo: -20 },
          technicalScore: 60,
          stressImpact: 15,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Financially logical but politically tone-deaf.',
            positiveAspects: ['CFO strongly supports', 'Massive cost savings', 'Financial math is clear'],
            negativeAspects: ['CEO is furious—this ignores social responsibility', 'PR nightmare likely', 'May accelerate customer loss'],
            careerInsight: 'Pure financial optimization ignores stakeholder realities. Great consultants balance economics with human factors.',
            philsComment: 'Ouch! You followed the spreadsheet but forgot real people are affected. Consulting isn\'t just math. 💔',
            scoreImpact: {
              technicalSkill: -10,
              timeManagement: 0,
              relationships: { cfo: +15, ceo: -20 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'tiered-approach',
          text: 'Tiered approach: close worst 40, pilot new formats for 30, keep 19',
          description: 'Balanced approach with testing and community consideration',
          timeImpact: -10,
          relationshipImpact: { ceo: +15, cfo: +10 },
          technicalScore: 95,
          stressImpact: 10,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Sophisticated solution that balances multiple objectives.',
            positiveAspects: ['CEO appreciates thoughtful approach', 'CFO gets meaningful savings ($18M)', 'Innovation potential in pilot stores', 'Both stakeholders aligned'],
            negativeAspects: ['More complex to execute', 'Moderate time pressure'],
            careerInsight: 'Consulting excellence often means finding nuanced solutions, not binary choices. Test, learn, adapt.',
            philsComment: 'That\'s strategic thinking! You balanced financial reality with human impact. Perfect. 🎯',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -5,
              relationships: { ceo: +15, cfo: +10 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'no-closures',
          text: 'Keep all stores, focus on fixing operations',
          description: 'Improve labor efficiency and supply chain instead',
          timeImpact: 0,
          relationshipImpact: { ceo: +10, cfo: -20 },
          technicalScore: 45,
          stressImpact: 12,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Too idealistic. You\'re avoiding the hard decision.',
            positiveAspects: ['CEO appreciates compassion', 'No community backlash'],
            negativeAspects: ['CFO thinks you\'re naive', 'Doesn\'t address structural unprofitability', 'Board will question your judgment'],
            careerInsight: 'Consultants are hired to make tough recommendations, not to avoid hard choices. Incrementalism won\'t save this company.',
            philsComment: 'Sometimes compassion needs to be balanced with reality. Avoiding tough calls doesn\'t help anyone. 😔',
            scoreImpact: {
              technicalSkill: -12,
              timeManagement: 0,
              relationships: { ceo: +10, cfo: -20 },
              stressLevel: +12
            }
          }
        }
      ]
    },
    {
      id: 'ceo-pushback-response',
      chapterIndex: 3,
      prompt: 'CEO says your recommendations have been tried and failed before. How do you respond?',
      context: 'This is a test of your adaptability and listening skills. CEO is challenging your thinking.',
      options: [
        {
          id: 'listen-adapt',
          text: 'Listen deeply, ask why it failed, adapt recommendations',
          description: 'Understand the history and refine approach',
          timeImpact: -10,
          relationshipImpact: { ceo: +20, team: +10 },
          technicalScore: 95,
          stressImpact: 10,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: 'Excellent response. You showed humility and adapted.',
            positiveAspects: ['CEO deeply appreciates being heard', 'You learned critical context', 'Recommendations now account for past failures', 'Team respects your flexibility'],
            negativeAspects: ['Time pressure to refine', 'More work ahead'],
            careerInsight: 'Great consultants listen as much as they advise. Past failures contain valuable lessons.',
            philsComment: 'Perfect! You showed that listening is just as important as analyzing. That\'s maturity. 👂',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -10,
              relationships: { ceo: +20, team: +10 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'defend-work',
          text: 'Defend your analysis - explain why this time is different',
          description: 'Stand by your recommendations with conviction',
          timeImpact: 0,
          relationshipImpact: { ceo: -15, team: -5 },
          technicalScore: 60,
          stressImpact: 20,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: 'Too rigid. You didn\'t incorporate valuable feedback.',
            positiveAspects: ['Showed confidence in your work'],
            negativeAspects: ['CEO thinks you\'re not listening', 'Relationship damaged', 'Missing key context', 'Team uncomfortable with your defensiveness'],
            careerInsight: 'Consulting isn\'t about being right—it\'s about solving client problems. Defensiveness kills trust.',
            philsComment: 'Oof. Confidence is good, but ignoring client feedback is career-limiting. Listen first. 🛑',
            scoreImpact: {
              technicalSkill: -10,
              timeManagement: 0,
              relationships: { ceo: -15, team: -5 },
              stressLevel: +20
            }
          }
        }
      ]
    },
    {
      id: 'implementation-approach',
      chapterIndex: 4,
      prompt: 'How should you structure the implementation plan?',
      context: 'Board presentation tomorrow. Need to show realistic execution path.',
      options: [
        {
          id: 'sequenced-sprints',
          text: '90-day sprints with milestones and course-correction',
          description: 'Agile approach with quick wins and adaptation',
          timeImpact: 0,
          relationshipImpact: { ceo: +15, cfo: +10 },
          technicalScore: 90,
          stressImpact: 8,
          nextChapterIndex: 5,
          consequence: {
            feedbackText: 'Smart. You\'re de-risking execution with milestones.',
            positiveAspects: ['CEO loves the agility', 'CFO appreciates staged investment', 'Realistic and flexible', 'Shows understanding of execution challenges'],
            negativeAspects: ['Requires strong change management'],
            careerInsight: 'Implementation is where consulting recommendations die. Showing realistic execution plans with checkpoints builds client confidence.',
            philsComment: 'That\'s how you bridge strategy and execution! Agile thinking FTW. 🚀',
            scoreImpact: {
              technicalSkill: +12,
              timeManagement: 0,
              relationships: { ceo: +15, cfo: +10 },
              stressLevel: +8
            }
          }
        },
        {
          id: 'big-bang',
          text: 'All-in transformation over 6 months',
          description: 'Comprehensive change executed simultaneously',
          timeImpact: 0,
          relationshipImpact: { ceo: -5, cfo: -10 },
          technicalScore: 65,
          stressImpact: 15,
          nextChapterIndex: 5,
          consequence: {
            feedbackText: 'Ambitious but unrealistic. Too much change too fast.',
            positiveAspects: ['Shows bold vision'],
            negativeAspects: ['CEO worried about execution risk', 'CFO concerned about cash requirements', 'Organization will be overwhelmed'],
            careerInsight: 'Big bang transformations usually fail. Change management requires sequencing and learning.',
            philsComment: 'Whoa! That\'s too much too fast. Organizations need time to adapt and learn. 📚',
            scoreImpact: {
              technicalSkill: -8,
              timeManagement: 0,
              relationships: { ceo: -5, cfo: -10 },
              stressLevel: +15
            }
          }
        }
      ]
    },
    {
      id: 'final-recommendation',
      chapterIndex: 5,
      prompt: 'Chairman asks: If you could only do ONE thing, what would you bet the company on?',
      context: 'This tests your conviction and strategic prioritization. The whole board is watching.',
      options: [
        {
          id: 'customer-acquisition',
          text: 'Focus everything on acquiring 18-35 demographic',
          description: 'The future of the company depends on younger customers',
          timeImpact: 0,
          relationshipImpact: { ceo: +20, team: +15 },
          technicalScore: 95,
          stressImpact: 10,
          nextChapterIndex: 6,
          consequence: {
            feedbackText: 'Perfect answer. You identified the ONE thing that matters most.',
            positiveAspects: ['Board impressed by strategic clarity', 'CEO loves the conviction', 'Chairman nods approvingly', 'This addresses the root cause'],
            negativeAspects: ['High stakes if it doesn\'t work'],
            careerInsight: 'When forced to prioritize, choose the initiative that addresses the root cause, not symptoms. Customer acquisition solves the long-term problem.',
            philsComment: 'Brilliant! You cut through complexity and identified what truly matters. That\'s strategic thinking. 🎯',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: 0,
              relationships: { ceo: +20, team: +15 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'cost-cutting',
          text: 'Close unprofitable stores to stabilize cash flow',
          description: 'Buy time with immediate cost savings',
          timeImpact: 0,
          relationshipImpact: { cfo: +10, ceo: -10 },
          technicalScore: 70,
          stressImpact: 12,
          nextChapterIndex: 6,
          consequence: {
            feedbackText: 'Financially sound but strategically limited.',
            positiveAspects: ['CFO supportive', 'Reduces immediate cash burn'],
            negativeAspects: ['CEO disappointed—this doesn\'t create growth', 'Chairman thinks it\'s too conservative', 'Doesn\'t solve underlying problem'],
            careerInsight: 'Cost-cutting buys time but doesn\'t build future. When asked for THE priority, choose growth over efficiency.',
            philsComment: 'That\'s playing defense when you need offense. Companies are saved by growth, not just cost cuts. 📉',
            scoreImpact: {
              technicalSkill: +5,
              timeManagement: 0,
              relationships: { cfo: +10, ceo: -10 },
              stressLevel: +12
            }
          }
        }
      ]
    }
  ],
  endings: [
    {
      id: 'partner-track',
      title: '🌟 Outstanding Performance',
      description: 'Your strategic thinking, adaptability, and conviction impressed the client and your team. Rachel is recommending you for early promotion. This is how consulting legends are made.',
      requiredScore: 85,
      badgeUnlocked: 'problem-solver'
    },
    {
      id: 'successful-engagement',
      title: '✅ Strong Delivery',
      description: 'You delivered solid work and the client is happy. Some room for improvement, but this was a successful engagement. Well done.',
      requiredScore: 70
    },
    {
      id: 'mixed-results',
      title: '⚠️ Acceptable with Development Needs',
      description: 'The engagement succeeded but you struggled in some areas. You need to work on strategic thinking or stakeholder management.',
      requiredScore: 50
    },
    {
      id: 'struggled',
      title: '❌ Challenging Engagement',
      description: 'The client was not satisfied with the approach. This is a learning opportunity to improve your consulting skills.',
      requiredScore: 0
    }
  ]
};
