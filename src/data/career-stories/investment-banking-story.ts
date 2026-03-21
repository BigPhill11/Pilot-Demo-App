import { CareerStory } from '@/types/career-story';
import { Briefcase } from 'lucide-react';

export const investmentBankingStory: CareerStory = {
  id: 'ib-big-deal',
  title: 'Investment Banking: The Big Deal',
  description: 'Experience a high-pressure 72-hour sprint to close a $2B tech merger. Navigate client demands, model complexities, and team dynamics.',
  careerType: 'investment-banking',
  difficulty: 'intermediate',
  estimatedTime: '25-35 minutes',
  icon: Briefcase,
  initialMetrics: {
    technicalSkill: 50,
    timeManagement: 50,
    relationships: {
      client: 50,
      md: 50,
      associate: 50,
      legalTeam: 50
    },
    stressLevel: 30
  },
  chapters: [
    {
      id: 'intro',
      title: 'Thursday Morning, 8:45 AM',
      content: `You're a second-year analyst at Goldman Sachs working on TechCorp's $2 billion acquisition of CloudStart, a fast-growing SaaS company. The deal is scheduled to close Monday morning.

Your Managing Director, Sarah Chen, gathered the team at 8:30 AM: "Alright everyone, we're in the home stretch. The board approved terms last week, lawyers are finalizing documents, and we should be cruising to close."

You're reviewing final valuation models when your phone buzzes. It's David Kumar, TechCorp's CFO.

**Your MD notices the call.** "Is that the client? Put it on speaker."

You answer. David's voice is tense: "We need to talk. Our CEO just reviewed the final purchase price, and frankly, he thinks we're overpaying. The market's been volatile, CloudStart's growth is slowing, and... well, he wants to renegotiate the multiple down from 12x to 10x ARR."

**That's a $400M haircut to the deal value.**

Sarah's face remains calm, but you can see her jaw tighten. She mutes the phone and whispers to you: "We can't let them crater this deal. But we also can't look weak. What's your call?"`,
      decisionId: 'morning-crisis'
    },
    {
      id: 'pushback-path',
      title: 'Standing Firm',
      content: `You unmute and respond: "David, I hear your concerns. But let's look at the data objectively. When we signed the LOI six weeks ago, CloudStart's ARR was $165M growing at 48% YoY. Today it's $168M growing at 46% YoY. That's within normal variance."

"The market comparables we used—SalesForce, ServiceNow, Workday—are all still trading at 10-14x ARR. Our 12x multiple is actually conservative for a company growing this fast with 85% gross margins."

David pauses. "Okay, send me an updated comp set by noon. If the analysis holds, we'll proceed."

Sarah gives you an approving nod. **The client trusts your expertise, but now you need to deliver bulletproof analysis.**`,
      decisionId: 'comp-analysis'
    },
    {
      id: 'escalate-path',
      title: 'Bringing in the Heavy Hitters',
      content: `Sarah takes over the call: "David, I appreciate you flagging this. These concerns deserve senior attention. Let me loop in our Vice Chairman to discuss. Can we set up a call with your CEO at 10 AM?"

After hanging up, Sarah turns to you: "Smart to escalate, but now we're committed to a high-stakes call. I need you to prep a rock-solid defense of our valuation. And pull together scenarios—what if we agree to a modest adjustment?"

**You have 90 minutes to prepare materials that could save or kill a $2B deal.**`,
      decisionId: 'prep-defense'
    },
    {
      id: 'midday-chaos',
      title: 'Thursday, 1:30 PM - Due Diligence Surprise',
      content: `Your valuation defense worked—the client agreed to proceed at 12x. But as you're updating final models, an email from the buyer's legal team lands in your inbox with "URGENT" in the subject.

**The buyer's lawyers found a material issue in CloudStart's customer contracts:** their top 3 customers (representing 28% of ARR) have termination clauses that allow them to exit with only 30 days notice if there's a "change of control."

The buyer's General Counsel is panicking: "This is a massive risk. If these customers leave post-acquisition, we're buying a company that's worth 30% less than we thought."

Your associate, Mike, looks stressed: "This could kill the deal. We need to re-model everything and probably adjust the price."

But your MD challenges you: "Before we panic, let's think. How real is this risk? What's the actual probability these customers leave? What can we negotiate to protect the buyer?"`,
      decisionId: 'due-diligence-response'
    },
    {
      id: 'evening-surprise',
      title: 'Thursday, 6:45 PM - Model Emergency',
      content: `It's been a marathon day. The customer contract issue is resolved—you negotiated a $50M escrow that releases if the top customers stay for 12 months. Brilliant solution.

But now CloudStart's CFO just sent updated Q4 financials, and there's a problem: they missed their revenue target by $2M (about 3%), and their cash burn was higher than expected.

"Not material," the CFO insists, "just timing differences."

Your MD needs an updated DCF model by 11 PM for tomorrow's final board presentation. The problem: incorporating these new financials properly will take 4-5 hours of detailed work.

Your associate Mike offers: "I can take first pass at the model if you want to review. You've been working since 7 AM."

But you also know Mike sometimes makes errors under pressure, and if these numbers go to the board wrong, it could be catastrophic.`,
      decisionId: 'model-work'
    },
    {
      id: 'friday-morning',
      title: 'Friday, 8:00 AM - Team Support',
      content: `You pulled an all-nighter and delivered a flawless model. The board presentation is at 11 AM, and everyone's in final prep mode.

Mike approaches you looking exhausted: "Hey, I'm supposed to finish the 150-slide appendix for the board deck, but I'm completely burned out. I haven't slept in 30 hours. Could you help me with the last 40 slides? It's just formatting and chart cleanup."

You're also exhausted, but you're in better shape than Mike. However, you still need to:
- Print and bind 15 board books (30 min)
- Do a final proofread of the main deck (30 min)  
- Rehearse your section of the presentation with Sarah (30 min)

**If you help Mike, something else might slip.**`,
      decisionId: 'team-help'
    },
    {
      id: 'closing-crisis',
      title: 'Friday, 4:30 PM - The Final Hour',
      content: `The board approved the deal! But at 4:30 PM, as everyone's celebrating, the buyer's CEO drops a bombshell:

"I want a 'no-shop' clause that prevents CloudStart from entertaining other offers for 90 days, even if this deal falls through. And I want the break-up fee increased from $30M to $75M."

CloudStart's CEO is furious: "Absolutely not. We've been negotiating in good faith for 8 weeks. This is last-minute strong-arming."

Both sides are threatening to walk. The deal that seemed done is now imploding.

Your MD pulls you aside: "We need a creative solution in the next 30 minutes or this falls apart. What do you recommend?"`,
      decisionId: 'final-negotiation'
    },
    {
      id: 'conclusion',
      title: 'Monday Morning - Deal Close',
      content: `Your solution worked. After intense negotiations, you structured a compromise: a 45-day no-shop with a $50M break-up fee that steps down to $30M if the buyer terminates for regulatory reasons.

**Both sides agreed. The deal closed Monday at 9 AM.**

Sarah pulls you into her office: "That was exceptional work under pressure. You showed technical skills, judgment, and grace under fire. This is exactly what separates good analysts from great ones."

As you reflect on the 72-hour sprint, you realize you just lived through what makes investment banking both brutal and exhilarating: high stakes, tight timelines, complex problems, and the satisfaction of getting deals done.

**Deal closed. Your performance will be evaluated.**`
    }
  ],
  decisions: [
    {
      id: 'morning-crisis',
      chapterIndex: 0,
      prompt: "The client wants to renegotiate and cut $400M from the deal. How do you respond?",
      context: "This tests your ability to handle client pressure while protecting deal integrity. Push back too hard and you risk souring the relationship. Escalate too quickly and you look unprepared.",
      options: [
        {
          id: 'pushback',
          text: 'Push back diplomatically with data',
          description: 'Use comps and analysis to defend the valuation',
          timeImpact: 0,
          relationshipImpact: { client: -5, md: +15 },
          technicalScore: 85,
          stressImpact: 5,
          nextChapterIndex: 1,
          consequence: {
            feedbackText: "Strong move. You held your ground with facts rather than emotion.",
            positiveAspects: ["Demonstrated technical confidence", "Protected deal integrity", "MD respects your backbone"],
            negativeAspects: ["Client feels slightly pushed", "Now you must deliver bulletproof analysis"],
            careerInsight: "In IB, clients test you constantly. Confidence backed by data earns respect.",
            philsComment: "Nice! You didn't panic. In finance, whoever has the better data usually wins the argument. 📊",
            scoreImpact: {
              technicalSkill: +10,
              timeManagement: 0,
              relationships: { client: -5, md: +15 },
              stressLevel: +5
            }
          }
        },
        {
          id: 'escalate',
          text: 'Immediately escalate to Managing Director',
          description: 'Let senior banker handle the tough conversation',
          timeImpact: -15,
          relationshipImpact: { md: -10, client: +5 },
          technicalScore: 50,
          stressImpact: -5,
          nextChapterIndex: 2,
          consequence: {
            feedbackText: "Safe choice, but you missed a chance to show leadership.",
            positiveAspects: ["Client appreciates senior attention", "Reduced immediate pressure"],
            negativeAspects: ["MD questions your judgment", "Looks like you can't handle tough conversations"],
            careerInsight: "Junior bankers advance by handling pressure, not avoiding it. Know when to escalate vs. when to lead.",
            philsComment: "Playing it safe isn't always bad, but in IB, you need to show you can handle heat. 🔥",
            scoreImpact: {
              technicalSkill: 0,
              timeManagement: -15,
              relationships: { md: -10, client: +5 },
              stressLevel: -5
            }
          }
        },
        {
          id: 'compromise',
          text: 'Offer to meet halfway at 11x ARR',
          description: 'Split the difference to keep momentum',
          timeImpact: 0,
          relationshipImpact: { client: +10, md: -20 },
          technicalScore: 30,
          stressImpact: -10,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: "You just gave away $200M without a fight. Big mistake.",
            positiveAspects: ["Client is happy", "Conflict avoided"],
            negativeAspects: ["MD is furious", "You eroded deal value unnecessarily", "Looks weak and unprepared"],
            careerInsight: "Never compromise on value without understanding WHY the client wants changes. You just cost your client $200M in proceeds.",
            philsComment: "Oof. In negotiations, never split the difference without analyzing first. You need to defend your work! 🛡️",
            scoreImpact: {
              technicalSkill: -15,
              timeManagement: 0,
              relationships: { client: +10, md: -20 },
              stressLevel: -10
            }
          }
        }
      ]
    },
    {
      id: 'comp-analysis',
      chapterIndex: 1,
      prompt: "You need to deliver bulletproof comps analysis by noon. What's your approach?",
      context: "This tests technical execution under time pressure. You have 3.5 hours.",
      toolRequired: 'dcf-calculator',
      options: [
        {
          id: 'deep-dive',
          text: 'Build comprehensive analysis from scratch',
          description: 'Full comp set, trading metrics, acquisition multiples',
          timeImpact: -20,
          relationshipImpact: { md: +10 },
          technicalScore: 95,
          stressImpact: 15,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: "Exceptional work. Your analysis was irrefutable.",
            positiveAspects: ["Client convinced by thoroughness", "MD impressed by quality", "Valuation defended successfully"],
            negativeAspects: ["High stress from time crunch", "Missed lunch"],
            careerInsight: "In high-stakes moments, quality matters more than speed. One great analysis beats three mediocre ones.",
            philsComment: "That's how you do it! When your back's against the wall, excellence is your best defense. 💪",
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -10,
              relationships: { md: +10, client: +10 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'update-existing',
          text: 'Update existing models with fresh data',
          description: 'Refresh your LOI analysis with current metrics',
          timeImpact: 0,
          relationshipImpact: { md: +5 },
          technicalScore: 75,
          stressImpact: 5,
          nextChapterIndex: 3,
          consequence: {
            feedbackText: "Solid and efficient. You made your deadline with quality work.",
            positiveAspects: ["Delivered on time", "Analysis was credible", "Efficient use of existing work"],
            negativeAspects: ["Could have been more comprehensive"],
            careerInsight: "Sometimes 'good enough on time' beats 'perfect but late.' Know your audience and timeline.",
            philsComment: "Smart! You worked efficiently and delivered what was needed. That's real-world finance. ⏰",
            scoreImpact: {
              technicalSkill: +8,
              timeManagement: +10,
              relationships: { md: +5, client: +5 },
              stressLevel: +5
            }
          }
        }
      ]
    },
    {
      id: 'due-diligence-response',
      chapterIndex: 3,
      prompt: "Major customer contract risk discovered. How do you respond?",
      context: "The buyer's legal team found that top customers can leave with 30 days notice after acquisition. This represents 28% of revenue.",
      options: [
        {
          id: 'escrow-solution',
          text: 'Propose escrow structure to protect buyer',
          description: 'Hold back $50M for 12 months, release if customers stay',
          timeImpact: 0,
          relationshipImpact: { legalTeam: +15, client: +10 },
          technicalScore: 90,
          stressImpact: 5,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: "Brilliant solution. You turned a deal-breaker into a reasonable risk allocation.",
            positiveAspects: ["Creative problem-solving", "Both sides feel protected", "Deal momentum preserved"],
            negativeAspects: ["Slight complexity added to structure"],
            careerInsight: "Great bankers don't just identify problems—they architect solutions that let deals happen.",
            philsComment: "Now that's creative thinking! You found a way to make everyone feel safe. That's what top bankers do. 🎯",
            scoreImpact: {
              technicalSkill: +12,
              timeManagement: 0,
              relationships: { legalTeam: +15, client: +10 },
              stressLevel: +5
            }
          }
        },
        {
          id: 'price-reduction',
          text: 'Recommend reducing purchase price',
          description: 'Cut price by 28% to reflect customer risk',
          timeImpact: -10,
          relationshipImpact: { client: -20, md: -15 },
          technicalScore: 40,
          stressImpact: 10,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: "You panicked and suggested cutting $560M from the deal. The seller is furious.",
            positiveAspects: ["Mathematically logical approach"],
            negativeAspects: ["Seller feels betrayed", "MD questions your judgment", "Deal momentum at risk"],
            careerInsight: "Don't jump to worst-case scenarios. Good bankers assess actual risk probability, not just theoretical exposure.",
            philsComment: "Whoa, that's too extreme! You need to think about realistic outcomes, not just worst-case math. 😰",
            scoreImpact: {
              technicalSkill: -10,
              timeManagement: -10,
              relationships: { client: -20, md: -15 },
              stressLevel: +10
            }
          }
        },
        {
          id: 'customer-calls',
          text: 'Request calls with top customers to assess risk',
          description: 'Get direct feedback on their intentions post-acquisition',
          timeImpact: -15,
          relationshipImpact: { client: +5, legalTeam: +5 },
          technicalScore: 70,
          stressImpact: 8,
          nextChapterIndex: 4,
          consequence: {
            feedbackText: "Thoughtful approach. You gathered real data instead of speculating.",
            positiveAspects: ["Evidence-based decision making", "Customers confirmed they're staying", "Reduced uncertainty"],
            negativeAspects: ["Time-consuming process", "Delayed other work"],
            careerInsight: "In DD, direct customer feedback is gold. It turns theoretical risks into concrete data points.",
            philsComment: "Good thinking! When in doubt, go to the source. Real information beats speculation. 📞",
            scoreImpact: {
              technicalSkill: +8,
              timeManagement: -8,
              relationships: { client: +5, legalTeam: +5 },
              stressLevel: +8
            }
          }
        }
      ]
    },
    {
      id: 'model-work',
      chapterIndex: 4,
      prompt: "Updated financials need to be modeled by 11 PM. Delegate or do it yourself?",
      context: "It's a 4-5 hour modeling job. Your associate offers to help but sometimes makes errors under pressure.",
      toolRequired: 'dcf-calculator',
      options: [
        {
          id: 'do-it-yourself',
          text: 'Pull all-nighter and do it yourself',
          description: 'Ensure accuracy, but sacrifice sleep',
          timeImpact: -25,
          relationshipImpact: { associate: -5 },
          technicalScore: 100,
          stressImpact: 20,
          nextChapterIndex: 5,
          consequence: {
            feedbackText: "Exhausting but flawless. Your model was perfect.",
            positiveAspects: ["Zero errors", "Board presentation went smoothly", "Demonstrated dedication"],
            negativeAspects: ["Completely burned out", "Associate feels you don't trust him"],
            careerInsight: "IB requires knowing when perfectionism is worth the personal cost. For board materials, it usually is.",
            philsComment: "That's dedication! Sometimes you have to sacrifice sleep for accuracy. But don't make it a habit. 😴",
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: -15,
              relationships: { associate: -5 },
              stressLevel: +20
            }
          }
        },
        {
          id: 'delegate-review',
          text: 'Have associate build, you review thoroughly',
          description: 'Balance delegation with quality control',
          timeImpact: -10,
          relationshipImpact: { associate: +10 },
          technicalScore: 85,
          stressImpact: 12,
          nextChapterIndex: 5,
          consequence: {
            feedbackText: "Smart leadership. You caught Mike's errors and delivered quality work.",
            positiveAspects: ["Good delegation", "Mike learns from review process", "You got 4 hours of sleep"],
            negativeAspects: ["Caught 2 formula errors that could have been bad", "Still stressful"],
            careerInsight: "Great bankers know how to leverage teams without sacrificing quality. Delegation + review is a powerful combo.",
            philsComment: "Nice balance! You trusted your team but verified the work. That's how you build a career without burning out. 🤝",
            scoreImpact: {
              technicalSkill: +10,
              timeManagement: +5,
              relationships: { associate: +10 },
              stressLevel: +12
            }
          }
        }
      ]
    },
    {
      id: 'team-help',
      chapterIndex: 5,
      prompt: "Your exhausted associate needs help with the appendix. Do you help or focus on your tasks?",
      context: "Mike is burned out. You're in better shape but also have critical tasks. The appendix is important but not presentation-critical.",
      options: [
        {
          id: 'help-teammate',
          text: 'Help Mike finish the appendix',
          description: 'Team player move, but might cause you to rush other tasks',
          timeImpact: -15,
          relationshipImpact: { associate: +20, md: -5 },
          technicalScore: 70,
          stressImpact: 15,
          nextChapterIndex: 6,
          consequence: {
            feedbackText: "You helped your teammate, but had to rush the board book printing. Two small errors slipped through.",
            positiveAspects: ["Mike deeply appreciates the support", "Strong team culture", "Appendix looks great"],
            negativeAspects: ["Minor errors in board book", "MD noticed you looked rushed"],
            careerInsight: "IB rewards both individual excellence and team support. This was the right human choice, even if not optimal for perfection.",
            philsComment: "That's the kind of teammate people remember. Sometimes being a good person matters more than being perfect. 💙",
            scoreImpact: {
              technicalSkill: -5,
              timeManagement: -10,
              relationships: { associate: +20, md: -5 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'focus-tasks',
          text: 'Focus on your own deliverables',
          description: 'Prioritize your responsibilities and perfection',
          timeImpact: 0,
          relationshipImpact: { associate: -10, md: +10 },
          technicalScore: 95,
          stressImpact: 10,
          nextChapterIndex: 6,
          consequence: {
            feedbackText: "Your work was flawless, but Mike struggled and the appendix had issues.",
            positiveAspects: ["Perfect board books", "Smooth presentation", "MD impressed by your preparation"],
            negativeAspects: ["Mike is disappointed", "Appendix had formatting errors", "Team morale hit"],
            careerInsight: "Sometimes you have to prioritize your own deliverables. But remember: banking is a team sport, and people remember how you treat them.",
            philsComment: "Your work was great, but finance is built on relationships. That burned bridge might matter later. 🌉",
            scoreImpact: {
              technicalSkill: +10,
              timeManagement: +5,
              relationships: { associate: -10, md: +10 },
              stressLevel: +10
            }
          }
        }
      ]
    },
    {
      id: 'final-negotiation',
      chapterIndex: 6,
      prompt: "Deal is imploding over last-minute term changes. What's your solution?",
      context: "Buyer wants stronger protections (90-day no-shop, $75M break fee). Seller says it's last-minute strong-arming. You have 30 minutes.",
      options: [
        {
          id: 'creative-compromise',
          text: 'Propose stepped structure: 45-day no-shop, $50M break fee with step-down',
          description: 'Creative middle ground that addresses both concerns',
          timeImpact: 0,
          relationshipImpact: { client: +15, md: +20 },
          technicalScore: 95,
          stressImpact: 5,
          nextChapterIndex: 7,
          consequence: {
            feedbackText: "Brilliant negotiation. You found a solution both sides could accept.",
            positiveAspects: ["Deal saved", "Both sides feel they won", "MD sees you as a future star"],
            negativeAspects: ["Intense pressure in the moment"],
            careerInsight: "The best deals happen when both sides feel they got something. Creative structuring is the secret weapon.",
            philsComment: "WOW! That's master-level negotiation. You found a way to make everyone happy. That's what separates good from great. 🌟",
            scoreImpact: {
              technicalSkill: +15,
              timeManagement: 0,
              relationships: { client: +15, md: +20 },
              stressLevel: +5
            }
          }
        },
        {
          id: 'side-buyer',
          text: 'Support buyer - these protections are reasonable',
          description: 'Advocate for buyer position',
          timeImpact: 0,
          relationshipImpact: { client: -25 },
          technicalScore: 60,
          stressImpact: 15,
          nextChapterIndex: 7,
          consequence: {
            feedbackText: "You sided with the buyer, and CloudStart walked away. Deal dead.",
            positiveAspects: ["Buyer appreciates your support"],
            negativeAspects: ["Your client is furious", "Deal failed", "MD questions your judgment", "You just killed a $2B transaction"],
            careerInsight: "As a banker, you represent BOTH sides' interests in reaching a deal. Taking sides kills transactions.",
            philsComment: "Oh no... you forgot that bankers need to help both sides find common ground, not pick winners. 😬",
            scoreImpact: {
              technicalSkill: -20,
              timeManagement: 0,
              relationships: { client: -25, md: -20 },
              stressLevel: +15
            }
          }
        },
        {
          id: 'side-seller',
          text: 'Support seller - buyer is acting in bad faith',
          description: 'Advocate for seller position',
          timeImpact: 0,
          relationshipImpact: { client: +10 },
          technicalScore: 60,
          stressImpact: 15,
          nextChapterIndex: 7,
          consequence: {
            feedbackText: "You defended your client hard, but the buyer walked. Deal dead.",
            positiveAspects: ["Client appreciates your loyalty"],
            negativeAspects: ["Buyer is offended", "Deal collapsed", "MD is disappointed", "You failed to close the transaction"],
            careerInsight: "Being too aggressive for one side can kill deals. Your job is to find solutions, not win arguments.",
            philsComment: "Loyalty is good, but deal-making requires compromise. You let emotions override deal logic. 💔",
            scoreImpact: {
              technicalSkill: -15,
              timeManagement: 0,
              relationships: { client: +10, md: -20 },
              stressLevel: +15
            }
          }
        }
      ]
    }
  ],
  endings: [
    {
      id: 'perfect-close',
      title: '🌟 Perfect Execution',
      description: 'You navigated every challenge with skill, grace, and intelligence. The deal closed smoothly, and you earned the respect of everyone involved. Sarah is recommending you for early promotion.',
      requiredScore: 85,
      badgeUnlocked: 'deal-maker'
    },
    {
      id: 'strong-close',
      title: '✅ Strong Performance',
      description: 'You had some bumps along the way, but ultimately got the deal done. The client is happy, and your MD recognizes your growth. Solid work for a second-year analyst.',
      requiredScore: 70,
    },
    {
      id: 'rough-close',
      title: '⚠️ Deal Closed, Barely',
      description: 'The deal closed, but it was messy. You made some mistakes under pressure, and relationships are strained. You have work to do to rebuild trust.',
      requiredScore: 50,
    },
    {
      id: 'deal-failed',
      title: '❌ Deal Collapsed',
      description: 'Unfortunately, the deal fell apart. Critical mistakes in judgment and negotiation led to an impasse. This is a tough learning experience, but these lessons will make you better.',
      requiredScore: 0,
    }
  ]
};
