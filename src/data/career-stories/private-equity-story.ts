import { CareerStory } from '@/types/career-story';
import { TrendingUp } from 'lucide-react';

export const privateEquityStory: CareerStory = {
  id: 'pe-investment-committee',
  title: 'Private Equity: The Investment Committee',
  description: 'You have 48 hours to defend a $150M buyout to the investment committee. Will your thesis hold under scrutiny?',
  careerType: 'private-equity',
  difficulty: 'advanced',
  estimatedTime: '30-40 minutes',
  icon: TrendingUp,
  initialMetrics: {
    technicalSkill: 50,
    timeManagement: 50,
    relationships: {
      partner: 50,
      associates: 50,
      management: 50,
      competitors: 50
    },
    stressLevel: 40
  },
  chapters: [
    {
      id: 'intro',
      title: 'Monday Morning, 9:00 AM',
      content: `You're a senior associate at Blackstone working on RetailCo, a potential $150M buyout of a regional grocery chain. The investment committee meeting is Wednesday at 2 PM.

Your thesis: RetailCo is undervalued with strong fundamentals (15% EBITDA margins, stable cash flow, real estate upside), trading at just 6.5x EBITDA. With operational improvements, you project 3.5x MOIC and 28% IRR over 5 years.

You've spent 6 weeks on due diligence, and everything checks out. Your partner, James Wu, seems confident: "This is a home run. IC will love it."

But at 9:15 AM, RetailCo's CFO emails you: "Hey, need to share something before IC. Our Q4 results just came in, and we missed our EBITDA target by $2.3M (about 8%). It was all timing—delayed vendor payments, early marketing spend. We're confident we'll make it up in Q1."

**Your model is based on $30M EBITDA. This miss suggests it might only be $27.7M.**

James notices your expression: "What's wrong? Don't tell me there's a problem."`,
      decisionId: 'q4-miss'
    },
    {
      id: 'deep-dive',
      title: 'Monday Afternoon - Following the Numbers',
      content: `You decided to dig deeper into the Q4 miss rather than panic. After 4 hours of analysis, you discover something interesting:

- The $2.3M miss breaks down as: $1.5M in early marketing spend (annual campaign launched in December instead of January), and $800K in delayed vendor payments (new AP system implementation).
- Both are genuinely one-time items
- January results (preliminary) are tracking 12% ahead of plan
- The underlying business is actually solid

**But you also found something concerning:** Two of RetailCo's 8 stores are underperforming badly—losses of $400K each annually. Management hasn't mentioned this.

When you call the CFO, he's defensive: "Those stores are turnaround opportunities. We have plans to fix them."

James asks: "Do we need to remodel this or can we proceed?"`,
      decisionId: 'remodel-decision'
    },
    {
      id: 'due-diligence-drama',
      title: 'Tuesday Morning - The Reference Call',
      content: `Your updated model shows the deal still works at 6.7x EBITDA (slightly higher multiple to reflect the normalized EBITDA). James approves: "Good work. Let's keep moving."

But then you have a scheduled reference call with RetailCo's former VP of Operations, who left 6 months ago. The conversation takes a dark turn:

"Look, I like the CEO personally, but... the company has deep cultural problems. Turnover is brutal—we lost 40% of store managers last year. The CEO is a micromanager who doesn't delegate. When I tried to modernize operations, he blocked every initiative."

"Also, their supply chain is held together with duct tape. One major vendor relationship going bad could crater margins."

**This is alarming.** But when you mention it to James, he's skeptical: "Former employees often exaggerate problems, especially if they left on bad terms. Did you verify these claims?"

You have 24 hours until IC. Do you:`,
      decisionId: 'reference-check-response'
    },
    {
      id: 'competing-bid',
      title: 'Tuesday, 4:00 PM - Competition Emerges',
      content: `Your diligence on the reference concerns revealed they were partially true—turnover is high (35%, not 40%), but the CEO has recently hired a COO to help with delegation. Supply chain has some concentration risk but isn't critical.

Just as you're finalizing your IC materials, RetailCo's banker calls: "I wanted to give you a heads up—Apollo just submitted an IOI at 7.2x EBITDA. They're moving fast."

**That's $21M more than your bid.**

James is frustrated: "Apollo is being aggressive. They're probably underwriting best-case scenarios. But we need to decide: do we bump our bid or stick to our disciplined approach?"

Your investment committee is in 22 hours. Apollo's IC is apparently this Friday.`,
      decisionId: 'competing-bid-response'
    },
    {
      id: 'ic-day',
      title: 'Wednesday, 2:00 PM - Investment Committee',
      content: `You decided to maintain your 6.7x bid but strengthen your operational value-creation plan. Now it's show time.

The IC room is intimidating: your Managing Partner (the final decision-maker), two Senior Partners, and James. You have 45 minutes to present, then Q&A.

Your presentation goes smoothly until the Senior Partner, Michelle, starts grilling you:

**Michelle:** "Walk me through your downside case. What if EBITDA doesn't recover and stays at $27.7M? What's our return?"

You quickly calculate: "At $27.7M, we'd still get about 2.2x MOIC and 17% IRR, which exceeds our hurdle rate."

**Michelle:** "Now assume one of their top 3 customers leaves—that's 18% of revenue. What happens?"

**Managing Partner:** "And explain why you think you can improve margins by 200bps when the industry average is declining."

**Michelle:** "Also, Apollo is bidding higher. Are we sure we're not being too conservative?"

**This is the moment that defines the deal. How you answer will determine if the IC approves.**`,
      decisionId: 'ic-defense'
    },
    {
      id: 'final-decision',
      title: 'Wednesday, 4:30 PM - The Vote',
      content: `Your responses were solid. You defended your thesis with data, acknowledged risks honestly, and showed you'd stress-tested the assumptions.

The Managing Partner turns to the group: "Thoughts?"

James speaks first: "I've worked with this associate for months. The analysis is rigorous, the thesis is sound, and the risk-reward is attractive. I vote yes."

Michelle: "I appreciate the diligence on the reference checks and the honest discussion of risks. But I'm concerned about the competitive dynamics. If Apollo wins this at 7.2x, they might see something we don't."

The Managing Partner looks at you: "Final question: If this were your own money, would you invest at 6.7x?"

**This is it. Your answer will determine if Blackstone invests $150M.**`,
      decisionId: 'final-conviction'
    },
    {
      id: 'conclusion',
      title: 'Friday Morning - Deal Update',
      content: `The investment committee approved your deal at 6.7x EBITDA! Your conviction and rigorous analysis won them over.

RetailCo chose your bid over Apollo's higher offer—your operational value-creation plan and reputation for being a good partner tipped the scales.

**The deal is moving to definitive agreements.**

James pulls you aside: "That was one of the best IC presentations I've seen from a senior associate. You handled pressure beautifully and defended your work without being defensive. This is exactly what partners look for."

Two weeks later, you learn that Apollo's higher bid was contingent on aggressive cost cuts and store closures—RetailCo's CEO didn't want to destroy jobs.

**Your disciplined approach and relationship focus won the day.**

As you reflect on the process, you realize private equity success comes from:
- Rigorous analysis
- Intellectual honesty about risks  
- Conviction based on data
- Creative value creation
- Building trust with management teams

**Deal won. Your performance will now be evaluated.**`
    }
  ],
  decisions: [
    {
      id: 'q4-miss',
      chapterIndex: 0,
      prompt: 'RetailCo missed Q4 EBITDA by 8%. How do you handle this before IC?',
      context: 'The CFO claims it\'s timing issues. You have 48 hours until IC. Your entire thesis is based on current financials.',
      options: [
        {
          id: 'deep-dive',
          text: 'Dig deep into the numbers before reacting',
          description: 'Analyze what drove the miss and whether it\'s truly one-time',
          timeImpact: -15,
          relationshipImpact: { management: +10, partner: +10 },
          technicalScore: 95,
          stressImpact: 10,
          nextChapterIndex: 1,
          consequence: {
            feedbackText: 'Excellent instinct. You avoided a panic response and analyzed the data.',
            positiveAspects: ['Discovered miss is genuinely timing-related', 'Found unreported store underperformance', 'Partner respects your thoroughness'],
            negativeAspects: ['Time pressure increased', 'Need to address new issues'],
            careerInsight: 'In PE, knee-jerk reactions to bad news can kill good deals. Investigate first, then decide.',
            philsComment: 'That\'s how you do it! Always follow the numbers before jumping to conclusions. 🔍',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -10,
              relationships: { management: +10, partner: +10 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'adjust-price',
          text: 'Immediately recommend price adjustment',
          description: 'Lower bid to 6.0x to reflect lower EBITDA',
          timeImpact: 0,
          relationshipImpact: { management: -15, partner: -10 },
          technicalScore: 50,
          stressImpact: 15,
          nextChapterIndex: 2,
          consequence: {
            feedbackText: 'You panicked and cut the bid by $15M without understanding what happened.',
            positiveAspects: ['Conservative approach protects downside'],
            negativeAspects: ['Management feels blindsided', 'Partner questions if you understand the business', 'Didn\'t investigate the cause'],
            careerInsight: 'Reactive price cuts without analysis signal inexperience. PE firms value judgment, not reflexive conservatism.',
            philsComment: 'Whoa, slow down! You just cut $15M without knowing if the problem is real. Investigate first! 🛑',
            scoreImpact: {
              technicalSkill: -10,
              timeManagement: 0,
              relationships: { management: -15, partner: -10 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'proceed',
          text: 'Trust management - proceed with existing model',
          description: 'Accept CFO explanation and continue with 6.5x bid',
          timeImpact: 0,
          relationshipImpact: { management: +5 },
          technicalScore: 30,
          stressImpact: 20,
          nextChapterIndex: 2,
          consequence: {
            feedbackText: 'Dangerous move. You didn\'t verify the CFO\'s explanation.',
            positiveAspects: ['Management appreciates trust'],
            negativeAspects: ['Partner discovers the miss during IC prep—he\'s furious you didn\'t flag it', 'You look unprepared', 'IC could reject the deal'],
            careerInsight: 'Trust but verify. In PE, management teams often downplay problems. Your job is independent validation.',
            philsComment: 'Big mistake! In investing, you can\'t just trust what you\'re told. You need to verify everything. 🚨',
            scoreImpact: {
              technicalSkill: -15,
              timeManagement: 0,
              relationships: { management: +5, partner: -20 },
              stressLevel: +20
            }
          }
        }
      ]
    },
    {
      id: 'remodel-decision',
      chapterIndex: 1,
      prompt: 'You found two underperforming stores losing $800K/year. What do you do?',
      context: 'Management hasn\'t disclosed this issue. It affects your EBITDA assumptions.',
      toolRequired: 'lbo-calculator',
      options: [
        {
          id: 'adjust-model',
          text: 'Adjust model and create turnaround plan',
          description: 'Restate EBITDA, model store closure option',
          timeImpact: -10,
          relationshipImpact: { partner: +15, management: -5 },
          technicalScore: 90,
          stressImpact: 10,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Strong analytical move. You identified the problem and created solutions.',
            positiveAspects: ['Model now reflects reality', 'Built optionality into value creation plan', 'Partner impressed by proactive thinking'],
            negativeAspects: ['Management slightly defensive', 'Reduced headline EBITDA'],
            careerInsight: 'Great PE investors don\'t hide from problems—they model solutions. Optionality is valuable.',
            philsComment: 'Perfect! You found a problem, modeled it, and created a solution. That\'s private equity! 💡',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -5,
              relationships: { partner: +15, management: -5 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'ignore',
          text: 'Proceed - stores are small relative to overall business',
          description: 'Don\'t adjust model, focus on overall thesis',
          timeImpact: 0,
          relationshipImpact: { management: +10 },
          technicalScore: 40,
          stressImpact: 15,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: 'Risky. You swept a material issue under the rug.',
            positiveAspects: ['Maintained headline numbers', 'Management happy'],
            negativeAspects: ['Partner discovers during IC—questions your diligence', 'IC might reject deal for insufficient analysis'],
            careerInsight: 'Hiding problems never works in PE. IC partners will find issues, and they\'ll question why you didn\'t.',
            philsComment: 'Not good! In PE, transparency about problems shows maturity. Hiding them shows inexperience. 😬',
            scoreImpact: {
              technicalSkill: -12,
              timeManagement: 0,
              relationships: { partner: -15, management: +10 },
              stressLevel: +15
            }
          }
        }
      ]
    },
    {
      id: 'reference-check-response',
      chapterIndex: 3,
      prompt: 'Former exec raises red flags about culture and operations. How do you handle this?',
      context: 'You have 24 hours until IC. These are serious allegations but from one potentially biased source.',
      options: [
        {
          id: 'verify-claims',
          text: 'Verify claims through additional diligence',
          description: 'Call other references, review HR data, check supply chain concentration',
          timeImpact: -20,
          relationshipImpact: { management: -5, partner: +15 },
          technicalScore: 95,
          stressImpact: 15,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: 'Excellent judgment. You verified claims and found truth in the middle.',
            positiveAspects: ['Discovered accurate data (35% turnover, not 40%)', 'Identified real supply chain risks', 'Built mitigation plans', 'Partner values your thoroughness'],
            negativeAspects: ['Very tight timeline', 'High stress', 'Management felt scrutinized'],
            careerInsight: 'Reference checks require triangulation. One data point isn\'t enough—verify through multiple sources.',
            philsComment: 'That\'s professional-grade diligence! You didn\'t dismiss or overreact—you verified. 🎯',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -15,
              relationships: { partner: +15, management: -5 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'dismiss-concerns',
          text: 'Dismiss as disgruntled former employee',
          description: 'Proceed without additional verification',
          timeImpact: 0,
          relationshipImpact: { management: +10, partner: -20 },
          technicalScore: 35,
          stressImpact: 10,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: 'Dangerous. You ignored a serious red flag.',
            positiveAspects: ['Saved time', 'Management appreciates trust'],
            negativeAspects: ['IC grills you on culture—you have no answers', 'Partner furious you didn\'t verify', 'Deal at risk of rejection'],
            careerInsight: 'Never dismiss reference check concerns without investigation. IC will ask, and "I didn\'t check" is career-limiting.',
            philsComment: 'Big mistake! Reference checks exist for a reason. Ignoring red flags can cost you millions. 🚩',
            scoreImpact: {
              technicalSkill: -18,
              timeManagement: 0,
              relationships: { partner: -20, management: +10 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'recommend-pass',
          text: 'Recommend passing on the deal',
          description: 'Too much risk given the allegations',
          timeImpact: 0,
          relationshipImpact: { partner: -15 },
          technicalScore: 45,
          stressImpact: 5,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: 'You overreacted to one reference. Partner is disappointed.',
            positiveAspects: ['Conservative approach', 'Avoided potential risk'],
            negativeAspects: ['Partner thinks you\'re too risk-averse', 'One data point killed months of work', 'Didn\'t attempt verification'],
            careerInsight: 'PE requires balanced judgment. Passing based on one unverified source shows poor risk calibration.',
            philsComment: 'Too cautious! One bad reference shouldn\'t kill a deal before you verify the claims. 🤔',
            scoreImpact: {
              technicalSkill: -10,
              timeManagement: 0,
              relationships: { partner: -15 },
              stressLevel: +5
            }
          }
        }
      ]
    },
    {
      id: 'competing-bid-response',
      chapterIndex: 4,
      prompt: 'Apollo bid $21M more than you. Do you increase your bid?',
      context: 'Your IC is in 22 hours. Apollo may be overbidding, or they may see value you missed.',
      options: [
        {
          id: 'maintain-discipline',
          text: 'Maintain bid but strengthen value creation plan',
          description: 'Stick to 6.7x, emphasize operational improvements',
          timeImpact: -5,
          relationshipImpact: { partner: +15 },
          technicalScore: 85,
          stressImpact: 10,
          nextChapterIndex: 5,
          consequence: {
            feedbackText: 'Disciplined and strategic. You didn\'t chase a higher bid emotionally.',
            positiveAspects: ['Partner respects discipline', 'Enhanced value creation plan shows sophistication', 'If you win, returns will be strong'],
            negativeAspects: ['Risk of losing deal to Apollo', 'Moderate stress'],
            careerInsight: 'Top PE firms win by discipline, not by paying the most. Better to lose a deal than overpay.',
            philsComment: 'That\'s real investor discipline! Don\'t let competition force you into bad decisions. 💪',
            scoreImpact: {
              technicalSkill: +12,
              timeManagement: -5,
              relationships: { partner: +15 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'bump-bid',
          text: 'Increase bid to 7.0x to compete',
          description: 'Match Apollo closer but stay below them',
          timeImpact: 0,
          relationshipImpact: { partner: -10 },
          technicalScore: 60,
          stressImpact: 12,
          nextChapterIndex: 5,
          consequence: {
            feedbackText: 'You let competition drive your decision. Partner is concerned.',
            positiveAspects: ['Higher chance of winning', 'Shows competitive spirit'],
            negativeAspects: ['Partner questions if you\'re chasing the deal emotionally', 'Returns now marginal', 'IC will scrutinize the increased price'],
            careerInsight: 'Bidding against yourself destroys returns. Never increase price without new information justifying higher value.',
            philsComment: 'Careful! Competitive bidding is how PE firms overpay. Stick to your numbers. 📊',
            scoreImpact: {
              technicalSkill: -8,
              timeManagement: 0,
              relationships: { partner: -10 },
              stressLevel: +12
            }
          }
        }
      ]
    },
    {
      id: 'ic-defense',
      chapterIndex: 5,
      prompt: 'IC is grilling you on downside scenarios. How do you respond?',
      context: 'This is the moment that determines if the deal gets approved. Your responses need to show rigor and conviction.',
      options: [
        {
          id: 'confident-data',
          text: 'Respond with data and stress tests',
          description: 'Show you\'ve modeled all downside cases thoroughly',
          timeImpact: 0,
          relationshipImpact: { partner: +15 },
          technicalScore: 95,
          stressImpact: 15,
          nextChapterIndex: 6,
          consequence: {
            feedbackText: 'Masterful. You answered every question with confidence and data.',
            positiveAspects: ['IC impressed by preparation', 'Demonstrated stress-testing rigor', 'Showed intellectual honesty about risks'],
            negativeAspects: ['Intense pressure'],
            careerInsight: 'IC is testing whether you\'ve truly stress-tested your thesis. Data-driven confidence earns approvals.',
            philsComment: 'That\'s how you command a room! Data + confidence + humility = respect. 🎯',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: 0,
              relationships: { partner: +15 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'defensive',
          text: 'Defend thesis aggressively',
          description: 'Push back on IC concerns, argue for your view',
          timeImpact: 0,
          relationshipImpact: { partner: -15 },
          technicalScore: 55,
          stressImpact: 20,
          nextChapterIndex: 6,
          consequence: {
            feedbackText: 'Too defensive. IC thinks you\'re not open to alternative perspectives.',
            positiveAspects: ['Showed passion for the deal'],
            negativeAspects: ['IC feels you\'re overconfident', 'Didn\'t acknowledge valid concerns', 'Partner worried about your judgment'],
            careerInsight: 'IC wants conviction + humility, not defensiveness. Being unteachable is a red flag.',
            philsComment: 'Yikes! Confidence is good, but arrogance kills careers in PE. Listen as much as you defend. 👂',
            scoreImpact: {
              technicalSkill: -10,
              timeManagement: 0,
              relationships: { partner: -15 },
              stressLevel: +20
            }
          }
        }
      ]
    },
    {
      id: 'final-conviction',
      chapterIndex: 6,
      prompt: '"If this were your money, would you invest?" What do you say?',
      context: 'This is the ultimate test of conviction. The Managing Partner wants to know if you truly believe.',
      options: [
        {
          id: 'strong-yes',
          text: 'Yes, absolutely. The risk-reward is compelling.',
          description: 'Express strong conviction based on your analysis',
          timeImpact: 0,
          relationshipImpact: { partner: +20 },
          technicalScore: 95,
          stressImpact: 10,
          nextChapterIndex: 7,
          consequence: {
            feedbackText: 'Perfect. Your conviction sealed the deal approval.',
            positiveAspects: ['IC approved', 'Partner sees you as future partner material', 'Deal moving forward'],
            negativeAspects: ['Now you own the outcome'],
            careerInsight: 'At the highest levels of PE, conviction matters. If you don\'t believe in your own deal, no one else will.',
            philsComment: 'That\'s leadership! You stood behind your work when it mattered most. 🌟',
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: 0,
              relationships: { partner: +20 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'hedged-yes',
          text: 'Yes, but with appropriate caveats about risks.',
          description: 'Show conviction while acknowledging uncertainties',
          timeImpact: 0,
          relationshipImpact: { partner: +5 },
          technicalScore: 70,
          stressImpact: 12,
          nextChapterIndex: 7,
          consequence: {
            feedbackText: 'Acceptable, but lacked conviction. IC approved but wasn\'t inspired.',
            positiveAspects: ['Intellectually honest', 'Deal approved'],
            negativeAspects: ['Hedging made IC less confident', 'Partner wanted stronger conviction'],
            careerInsight: 'Balance is good, but at decision time, IC wants to see you believe in your work.',
            philsComment: 'Not bad, but you hedged when you should have shown strength. Know when to be bold. 💼',
            scoreImpact: {
              technicalSkill: +5,
              timeManagement: 0,
              relationships: { partner: +5 },
              stressLevel: +12
            }
          }
        }
      ]
    }
  ],
  endings: [
    {
      id: 'perfect-execution',
      title: '🌟 Partner-Track Performance',
      description: 'Your analytical rigor, judgment under pressure, and conviction impressed everyone. James is recommending you for early partner consideration. This is how legends are made.',
      requiredScore: 85,
      badgeUnlocked: 'investor-extraordinaire'
    },
    {
      id: 'strong-approval',
      title: '✅ Deal Approved',
      description: 'You successfully navigated IC and got the deal approved. Some hiccups along the way, but ultimately your work was solid. Strong performance for a senior associate.',
      requiredScore: 70
    },
    {
      id: 'conditional-approval',
      title: '⚠️ Approved with Conditions',
      description: 'IC approved the deal but with concerns about your process. You need to show better judgment and stress-testing next time.',
      requiredScore: 50
    },
    {
      id: 'deal-rejected',
      title: '❌ IC Pass',
      description: 'The investment committee decided to pass. Critical mistakes in analysis or judgment undermined confidence in the deal. This is a learning opportunity.',
      requiredScore: 0
    }
  ]
};
