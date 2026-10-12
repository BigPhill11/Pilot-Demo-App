import type { FounderMission } from '@/types/founder-journey';

const panel = (mission: string, number: number, alt: string, text: string) => ({
  imageUrl: `/comic/founder-journey/${mission}/panel-${number}.png`,
  alt,
  text,
});

export const LEGACY_FOUNDER_MISSIONS: FounderMission[] = [
  {
    id: 'idea-to-mvp',
    order: 1,
    title: 'From Idea to MVP',
    shortTitle: 'Test the Idea',
    tagline: 'Turn a big idea into one small experiment.',
    estimatedMinutes: 12,
    icon: '💡',
    comicPanels: [
      panel('idea-to-mvp', 1, 'Phil notices a long lunch line at school', 'Every business starts by noticing a real problem. Phil sees students waiting too long for a quick after-school snack.'),
      panel('idea-to-mvp', 2, 'Phil sketches a simple bamboo snack stand', 'Instead of building a full restaurant, Phil sketches the smallest version that could solve the problem.'),
      panel('idea-to-mvp', 3, 'Phil builds a tiny snack cart prototype', 'That first testable version is an MVP: useful enough for a real customer, but small enough to change quickly.'),
      panel('idea-to-mvp', 4, 'Phil offers samples and watches customer reactions', 'Phil launches early and watches what customers do. Real behavior teaches more than compliments.'),
      panel('idea-to-mvp', 5, 'Phil improves the snack cart using feedback notes', 'The founder loop is simple: build, measure, learn, and improve before spending big.'),
    ],
    simulator: {
      title: 'MVP Launch Lab',
      intro: 'You have $500 and one week to test a snack idea.',
      scenario: 'Make three launch decisions while protecting your cash and increasing proof that customers care.',
      meters: [
        { id: 'runway', label: 'Cash runway', emoji: '💵', initial: 75, color: 'emerald' },
        { id: 'evidence', label: 'Customer evidence', emoji: '🔎', initial: 15, color: 'blue' },
        { id: 'speed', label: 'Learning speed', emoji: '⚡', initial: 30, color: 'amber' },
      ],
      rounds: [
        {
          id: 'mvp-scope',
          situation: 'What will you build first?',
          choices: [
            { id: 'cart', label: 'A one-day snack cart', description: 'Sell one flavor at lunch.', effects: { runway: -10, evidence: 28, speed: 25 }, feedback: 'You reached real buyers quickly without risking much money.' },
            { id: 'store', label: 'A decorated storefront', description: 'Sign a lease before selling.', effects: { runway: -55, evidence: 8, speed: -15 }, feedback: 'The store looks impressive, but most of your cash disappeared before you proved demand.' },
            { id: 'survey', label: 'An online survey only', description: 'Ask what people might buy.', effects: { runway: -2, evidence: 8, speed: 10 }, feedback: 'Surveys are useful, but stated interest is weaker than an actual purchase.' },
          ],
        },
        {
          id: 'mvp-signal',
          situation: 'Students say the sample tastes good. What signal matters next?',
          choices: [
            { id: 'payment', label: 'Ask them to buy it', description: 'Test a real $4 price.', effects: { runway: 8, evidence: 30, speed: 15 }, feedback: 'Payment is strong evidence that the problem and solution matter.' },
            { id: 'likes', label: 'Count social likes', description: 'Post a polished photo.', effects: { runway: -8, evidence: 5, speed: 5 }, feedback: 'Likes feel good, but they do not prove willingness to pay.' },
            { id: 'logo', label: 'Redesign the logo', description: 'Polish the brand first.', effects: { runway: -15, evidence: 0, speed: -10 }, feedback: 'Brand polish cannot replace customer evidence.' },
          ],
        },
        {
          id: 'mvp-iterate',
          situation: 'Most buyers want a smaller, cheaper size. What do you do?',
          choices: [
            { id: 'adapt', label: 'Test the smaller size tomorrow', description: 'Change one thing and measure.', effects: { runway: -5, evidence: 25, speed: 25 }, feedback: 'Fast iteration turns feedback into learning.' },
            { id: 'ignore', label: 'Keep your original plan', description: 'Trust your first instinct.', effects: { runway: -15, evidence: -10, speed: -10 }, feedback: 'Founders need conviction, but evidence should overrule ego.' },
            { id: 'restart', label: 'Build a totally new product', description: 'Abandon the useful signal.', effects: { runway: -25, evidence: -5, speed: -20 }, feedback: 'A full restart wastes the clear clue customers just gave you.' },
          ],
        },
      ],
      endMessage: 'A strong MVP buys learning, not perfection. Prove the smallest useful version before you scale it.',
    },
    quiz: [
      { id: 'mvp-q1', question: 'What is the main purpose of an MVP?', options: [{ id: 'a', text: 'Test the riskiest idea cheaply' }, { id: 'b', text: 'Look like a large company' }, { id: 'c', text: 'Avoid talking to customers' }, { id: 'd', text: 'Build every possible feature' }], correctId: 'a', explanation: 'An MVP is the smallest useful test that creates real customer evidence.' },
      { id: 'mvp-q2', question: 'Which signal best proves demand?', options: [{ id: 'a', text: 'A friend says it is cool' }, { id: 'b', text: 'A customer pays for it' }, { id: 'c', text: 'A post gets likes' }, { id: 'd', text: 'The logo looks professional' }], correctId: 'b', explanation: 'Actual payment is stronger evidence than opinions or attention.' },
      { id: 'mvp-q3', question: 'What should happen after an MVP test?', options: [{ id: 'a', text: 'Ignore all results' }, { id: 'b', text: 'Spend all remaining cash' }, { id: 'c', text: 'Measure, learn, and improve' }, { id: 'd', text: 'Hide it from customers' }], correctId: 'c', explanation: 'The founder loop is build, measure, learn, then iterate.' },
      { id: 'mvp-q4', question: 'Why can building too much too early be dangerous?', options: [{ id: 'a', text: 'It creates too much evidence' }, { id: 'b', text: 'It spends cash before demand is proven' }, { id: 'c', text: 'It makes customers pay sooner' }, { id: 'd', text: 'It always lowers risk' }], correctId: 'b', explanation: 'Overbuilding burns runway while the biggest assumptions remain untested.' },
    ],
    teachBack: {
      conceptName: 'using an MVP to test a business idea',
      keyFacts: ['An MVP is the smallest useful version of an idea that real customers can try.', 'Customer actions and payments are stronger evidence than compliments or likes.', 'Founders build, measure, learn, and iterate before spending heavily.'],
      misconceptions: ['An MVP is not a low-quality final product.', 'An MVP does not mean building every feature.'],
    },
    canvasPrompts: [
      { sectionId: 'idea', title: 'Your Idea', prompt: 'What business idea do you want to test?', placeholder: 'I want to create...', example: 'A low-cost tutoring match service for students at my school.' },
      { sectionId: 'problem', title: 'The Problem', prompt: 'What frustrating problem does it solve?', placeholder: 'Students struggle with...', example: 'Students need quick help before tests but cannot find available tutors.' },
      { sectionId: 'solution', title: 'Smallest Solution', prompt: 'What is the simplest version you could test this week?', placeholder: 'My first small test would be...', example: 'A signup form and one lunchtime tutoring session.' },
    ],
    rewards: { xp: 100, bamboo: 15 },
  },
  {
    id: 'validating-customers',
    order: 2,
    title: 'Validating Customers',
    shortTitle: 'Find Real Customers',
    tagline: 'Learn who needs your idea and what they will pay for.',
    estimatedMinutes: 12,
    icon: '🎯',
    comicPanels: [
      panel('validating-customers', 1, 'Phil holds a target beside several customer cards', 'A product is not for everyone. Phil chooses one specific group with one clear problem.'),
      panel('validating-customers', 2, 'Phil interviews a customer with a notepad', 'He asks about real past behavior, not whether someone might buy someday.'),
      panel('validating-customers', 3, 'Phil watches a customer try his snack cart', 'Observation reveals friction that polite interview answers can hide.'),
      panel('validating-customers', 4, 'Phil compares two simple price tags', 'A price test answers a hard question: is the solution valuable enough to pay for?'),
      panel('validating-customers', 5, 'Phil points from customer evidence to a pivot arrow', 'Evidence tells Phil whether to persevere, adjust the idea, or pivot to a better problem.'),
    ],
    simulator: {
      title: 'Customer Detective',
      intro: 'Find the strongest evidence for a study-planner app.',
      scenario: 'Choose research moves that reveal a real customer and a real need.',
      meters: [
        { id: 'insight', label: 'Customer insight', emoji: '🧠', initial: 20, color: 'blue' },
        { id: 'proof', label: 'Demand proof', emoji: '✅', initial: 10, color: 'emerald' },
        { id: 'bias', label: 'Guessing risk', emoji: '⚠️', initial: 60, color: 'red' },
      ],
      rounds: [
        { id: 'who', situation: 'Who should you interview first?', choices: [
          { id: 'target', label: 'Students who missed recent deadlines', description: 'They experienced the problem.', effects: { insight: 30, proof: 10, bias: -20 }, feedback: 'Specific people with recent experience give useful evidence.' },
          { id: 'friends', label: 'Only your closest friends', description: 'They want to support you.', effects: { insight: 8, proof: 2, bias: 12 }, feedback: 'Friends may protect your feelings instead of challenging the idea.' },
          { id: 'everyone', label: 'Post “Would you use this?”', description: 'Ask a broad audience.', effects: { insight: 5, proof: 3, bias: 10 }, feedback: 'A vague hypothetical question creates weak evidence.' },
        ] },
        { id: 'ask', situation: 'Which interview question is strongest?', choices: [
          { id: 'past', label: '“Tell me about the last missed deadline.”', description: 'Ask about real behavior.', effects: { insight: 28, proof: 12, bias: -18 }, feedback: 'Past actions are more reliable than future promises.' },
          { id: 'leading', label: '“My app would help, right?”', description: 'Invite agreement.', effects: { insight: 2, proof: 0, bias: 18 }, feedback: 'Leading questions produce compliments, not truth.' },
          { id: 'features', label: '“Which colors should it use?”', description: 'Discuss polish first.', effects: { insight: 5, proof: 0, bias: 8 }, feedback: 'Design details do not validate the core problem.' },
        ] },
        { id: 'price', situation: 'Interviews are positive. What test comes next?', choices: [
          { id: 'preorder', label: 'Offer a $3 early-access preorder', description: 'Test willingness to pay.', effects: { insight: 15, proof: 35, bias: -20 }, feedback: 'A purchase decision turns interest into meaningful proof.' },
          { id: 'followers', label: 'Try to gain 1,000 followers', description: 'Measure attention.', effects: { insight: 5, proof: 7, bias: 4 }, feedback: 'Attention can help, but it is not the same as demand.' },
          { id: 'assume', label: 'Start building immediately', description: 'Treat praise as proof.', effects: { insight: 0, proof: -5, bias: 20 }, feedback: 'Positive interviews are a clue, not proof that people will pay.' },
        ] },
      ],
      endMessage: 'Validation replaces guesses with evidence from a specific customer’s behavior, problem, and willingness to pay.',
    },
    quiz: [
      { id: 'customer-q1', question: 'Who is the best first interview candidate?', options: [{ id: 'a', text: 'Someone who recently had the problem' }, { id: 'b', text: 'Anyone who follows you' }, { id: 'c', text: 'Only close friends' }, { id: 'd', text: 'Someone with no interest in the topic' }], correctId: 'a', explanation: 'Recent firsthand experience gives specific, reliable insight.' },
      { id: 'customer-q2', question: 'Which question reduces interview bias?', options: [{ id: 'a', text: '“You love my idea, right?”' }, { id: 'b', text: '“Would you maybe buy someday?”' }, { id: 'c', text: '“What happened the last time you faced this?”' }, { id: 'd', text: '“Which logo is best?”' }], correctId: 'c', explanation: 'Asking about past behavior avoids hypothetical promises.' },
      { id: 'customer-q3', question: 'What is the strongest validation signal?', options: [{ id: 'a', text: 'A compliment' }, { id: 'b', text: 'A preorder or payment' }, { id: 'c', text: 'A page view' }, { id: 'd', text: 'A family vote' }], correctId: 'b', explanation: 'Payment proves enough value to create action.' },
      { id: 'customer-q4', question: 'When should a founder pivot?', options: [{ id: 'a', text: 'Whenever work feels hard' }, { id: 'b', text: 'Before collecting evidence' }, { id: 'c', text: 'When repeated evidence challenges a key assumption' }, { id: 'd', text: 'Never' }], correctId: 'c', explanation: 'A pivot is a reasoned change based on evidence, not a random restart.' },
    ],
    teachBack: {
      conceptName: 'validating a real customer problem',
      keyFacts: ['A target customer is a specific group that experiences the problem.', 'Questions about past behavior are stronger than hypothetical or leading questions.', 'Payment, preorder, or repeated use is stronger demand evidence than compliments.'],
      misconceptions: ['Positive feedback from friends is not enough validation.', 'A large audience is not automatically a target customer.'],
    },
    canvasPrompts: [
      { sectionId: 'customer', title: 'Target Customer', prompt: 'Who has this problem most often?', placeholder: 'My first customer is...', example: 'High school juniors who need last-minute algebra help.' },
      { sectionId: 'validation', title: 'Validation Test', prompt: 'What action would prove they really want it?', placeholder: 'I will test demand by...', example: 'Ask 10 students to reserve a $5 tutoring session.' },
      { sectionId: 'uniqueValue', title: 'Why This One?', prompt: 'Why would this customer choose your solution?', placeholder: 'Unlike other options, mine...', example: 'Matches students with a nearby peer tutor in under ten minutes.' },
    ],
    rewards: { xp: 110, bamboo: 16 },
  },
  {
    id: 'funding-the-business',
    order: 3,
    title: 'Bootstrapping vs. Fundraising',
    shortTitle: 'Fund the Business',
    tagline: 'Balance cash, control, growth, and risk.',
    estimatedMinutes: 13,
    icon: '💵',
    comicPanels: [
      panel('funding-the-business', 1, 'Phil counts a small stack of coins beside his business cart', 'Bootstrapping means growing with your own savings or money the business earns.'),
      panel('funding-the-business', 2, 'Phil carefully waters a small business plant', 'It can grow more slowly, but Phil keeps control and learns to spend carefully.'),
      panel('funding-the-business', 3, 'Phil receives a large watering can marked as investment', 'Outside funding can speed up growth when a proven opportunity needs more fuel.'),
      panel('funding-the-business', 4, 'Phil divides a pie chart into ownership slices', 'Investment is not free money. Phil trades part of his ownership and decision power.'),
      panel('funding-the-business', 5, 'Phil balances a cash jar and ownership shield', 'The best funding choice matches the business model, evidence, goals, and acceptable risk.'),
    ],
    simulator: {
      title: 'Runway & Ownership',
      intro: 'Your tutoring service has 30 paying students and a growth opportunity.',
      scenario: 'Choose how to fund the next stage without losing sight of cash or control.',
      meters: [
        { id: 'cash', label: 'Runway', emoji: '💵', initial: 45, color: 'emerald' },
        { id: 'ownership', label: 'Founder ownership', emoji: '🛡️', initial: 100, color: 'blue' },
        { id: 'growth', label: 'Growth capacity', emoji: '📈', initial: 25, color: 'amber' },
      ],
      rounds: [
        { id: 'first-capital', situation: 'You need $2,000 for scheduling software. How do you fund it?', choices: [
          { id: 'revenue', label: 'Reinvest customer revenue', description: 'Grow from sales.', effects: { cash: -12, ownership: 0, growth: 18 }, feedback: 'Growth is slower, but customers finance the product and you keep control.' },
          { id: 'loan', label: 'Take a small fixed-payment loan', description: 'Keep equity, add debt risk.', effects: { cash: 20, ownership: 0, growth: 20 }, feedback: 'You preserve ownership, but payments continue even if sales slow.' },
          { id: 'investor', label: 'Sell 15% to an investor', description: 'Gain cash and guidance.', effects: { cash: 38, ownership: -15, growth: 28 }, feedback: 'You gained runway and support while giving up a permanent ownership slice.' },
        ] },
        { id: 'growth', situation: 'A second school wants your service. What matters before expanding?', choices: [
          { id: 'economics', label: 'Check profit per student first', description: 'Know whether growth helps.', effects: { cash: 10, ownership: 0, growth: 18 }, feedback: 'Healthy unit economics make every new customer an asset instead of a burden.' },
          { id: 'rush', label: 'Expand immediately', description: 'Growth at any cost.', effects: { cash: -28, ownership: 0, growth: 28 }, feedback: 'Fast growth can drain cash when each sale loses money.' },
          { id: 'deck', label: 'Pause operations to pitch investors', description: 'Focus only on fundraising.', effects: { cash: -12, ownership: -8, growth: 8 }, feedback: 'Fundraising should support the business, not replace serving customers.' },
        ] },
        { id: 'terms', situation: 'An investor offers $25,000 for 35% of the company.', choices: [
          { id: 'model', label: 'Model the dilution and negotiate', description: 'Understand the trade.', effects: { cash: 28, ownership: -20, growth: 22 }, feedback: 'Good founders understand both the cash received and the ownership surrendered.' },
          { id: 'accept', label: 'Accept without reading terms', description: 'Cash is all that matters.', effects: { cash: 35, ownership: -35, growth: 18 }, feedback: 'A rushed deal can permanently change control and future returns.' },
          { id: 'reject', label: 'Reject every investor forever', description: 'Outside money is always bad.', effects: { cash: -8, ownership: 0, growth: -5 }, feedback: 'Funding is a tool. The right answer depends on evidence, goals, and terms.' },
        ] },
      ],
      endMessage: 'Funding is a trade: cash and speed on one side, ownership, obligations, and risk on the other.',
    },
    quiz: [
      { id: 'fund-q1', question: 'What does bootstrapping usually mean?', options: [{ id: 'a', text: 'Using founder savings or business revenue' }, { id: 'b', text: 'Giving away the entire company' }, { id: 'c', text: 'Never earning revenue' }, { id: 'd', text: 'Ignoring costs' }], correctId: 'a', explanation: 'Bootstrapped businesses fund growth internally instead of selling equity.' },
      { id: 'fund-q2', question: 'What is dilution?', options: [{ id: 'a', text: 'A lower product price' }, { id: 'b', text: 'A founder owning a smaller percentage after new shares are issued' }, { id: 'c', text: 'Paying back a loan' }, { id: 'd', text: 'Getting more customers' }], correctId: 'b', explanation: 'Issuing ownership to investors reduces existing owners’ percentage.' },
      { id: 'fund-q3', question: 'Why check unit economics before rapid growth?', options: [{ id: 'a', text: 'To make sure each sale supports the business' }, { id: 'b', text: 'To avoid all customers' }, { id: 'c', text: 'To guarantee investor money' }, { id: 'd', text: 'To design a logo' }], correctId: 'a', explanation: 'Scaling a loss per customer can make losses grow faster.' },
      { id: 'fund-q4', question: 'Which statement about outside funding is accurate?', options: [{ id: 'a', text: 'It is always the best choice' }, { id: 'b', text: 'It is free money' }, { id: 'c', text: 'It can add speed while reducing ownership or control' }, { id: 'd', text: 'It removes every risk' }], correctId: 'c', explanation: 'Investors add resources but receive ownership and often influence.' },
    ],
    teachBack: {
      conceptName: 'choosing between bootstrapping and fundraising',
      keyFacts: ['Bootstrapping uses founder resources or business revenue and preserves ownership.', 'Outside investment can increase runway and growth speed but causes dilution.', 'Good funding choices depend on unit economics, goals, risk, and deal terms.'],
      misconceptions: ['Investment is not free money.', 'Bootstrapping and fundraising are tools, not universally good or bad choices.'],
    },
    canvasPrompts: [
      { sectionId: 'revenue', title: 'How Money Comes In', prompt: 'What will customers pay for, and how much?', placeholder: 'Customers will pay...', example: '$5 per tutoring session, with $18 monthly study passes.' },
      { sectionId: 'costs', title: 'Main Costs', prompt: 'What must you spend to deliver the solution?', placeholder: 'My biggest costs will be...', example: 'Tutor payments, scheduling software, and school flyers.' },
    ],
    rewards: { xp: 120, bamboo: 18 },
  },
  {
    id: 'building-the-team',
    order: 4,
    title: 'Building Your First Team',
    shortTitle: 'Build the Team',
    tagline: 'Choose people, roles, and habits that make the idea stronger.',
    estimatedMinutes: 13,
    icon: '🤝',
    comicPanels: [
      panel('building-the-team', 1, 'Phil juggles many business tools by himself', 'At first Phil does everything, but one founder cannot be excellent at every job forever.'),
      panel('building-the-team', 2, 'Phil maps his strengths and missing skills on a board', 'A strong first teammate fills a real skill gap instead of simply being a close friend.'),
      panel('building-the-team', 3, 'Phil compares role cards with clear responsibilities', 'Clear roles prevent important work from being duplicated, ignored, or argued over.'),
      panel('building-the-team', 4, 'Phil signs a simple values and expectations agreement', 'Teams discuss effort, ownership, decisions, and values before conflict arrives.'),
      panel('building-the-team', 5, 'Phil leads a small row of healthy business plants', 'The first team creates the culture: how people communicate, learn, and treat customers.'),
    ],
    simulator: {
      title: 'First Team Challenge',
      intro: 'Demand is growing and you need help.',
      scenario: 'Build a small team that adds missing skills and protects trust.',
      meters: [
        { id: 'skill', label: 'Skill coverage', emoji: '🧰', initial: 35, color: 'blue' },
        { id: 'trust', label: 'Team trust', emoji: '🤝', initial: 45, color: 'emerald' },
        { id: 'clarity', label: 'Role clarity', emoji: '🗺️', initial: 25, color: 'amber' },
      ],
      rounds: [
        { id: 'hire', situation: 'You are strong at sales but scheduling keeps breaking. Who joins first?', choices: [
          { id: 'operator', label: 'A reliable operations organizer', description: 'Adds the missing skill.', effects: { skill: 30, trust: 12, clarity: 18 }, feedback: 'The hire complements your strengths and solves a proven bottleneck.' },
          { id: 'friend', label: 'Your best friend with no clear role', description: 'Fun, but undefined.', effects: { skill: 3, trust: 8, clarity: -15 }, feedback: 'Friendship alone does not define useful responsibilities.' },
          { id: 'clone', label: 'Another salesperson just like you', description: 'Double your strongest skill.', effects: { skill: 10, trust: 5, clarity: -5 }, feedback: 'Sales improves, but the operational bottleneck remains.' },
        ] },
        { id: 'roles', situation: 'Both founders keep changing the schedule. What do you do?', choices: [
          { id: 'owner', label: 'Assign one decision owner', description: 'Define who decides and who advises.', effects: { skill: 5, trust: 18, clarity: 32 }, feedback: 'Clear ownership speeds decisions without silencing input.' },
          { id: 'avoid', label: 'Hope it works itself out', description: 'Avoid an awkward talk.', effects: { skill: -5, trust: -18, clarity: -20 }, feedback: 'Unspoken expectations usually become repeated conflict.' },
          { id: 'control', label: 'Take every decision back', description: 'Keep total control.', effects: { skill: -8, trust: -22, clarity: 5 }, feedback: 'Micromanagement wastes the teammate’s ability and damages trust.' },
        ] },
        { id: 'conflict', situation: 'Your teammate wants slower growth to protect quality. How do you respond?', choices: [
          { id: 'evidence', label: 'Review shared goals and customer data', description: 'Debate the decision, not the person.', effects: { skill: 12, trust: 24, clarity: 16 }, feedback: 'Shared evidence turns disagreement into better strategy.' },
          { id: 'win', label: 'Use your founder title to win', description: 'End the discussion.', effects: { skill: 0, trust: -30, clarity: 5 }, feedback: 'Authority can settle a choice while weakening the team.' },
          { id: 'split', label: 'Avoid the choice and do both plans', description: 'Spend on competing directions.', effects: { skill: -12, trust: -8, clarity: -20 }, feedback: 'A team needs a clear decision process, not two conflicting strategies.' },
        ] },
      ],
      endMessage: 'The first team should add missing skills, own clear decisions, and build a culture of honest evidence-based work.',
    },
    quiz: [
      { id: 'team-q1', question: 'What makes a strong first teammate?', options: [{ id: 'a', text: 'They fill an important skill gap' }, { id: 'b', text: 'They always agree with you' }, { id: 'c', text: 'They have the most followers' }, { id: 'd', text: 'They need no clear role' }], correctId: 'a', explanation: 'Early hires create the most value when they solve a real bottleneck.' },
      { id: 'team-q2', question: 'Why define decision ownership?', options: [{ id: 'a', text: 'To prevent anyone from sharing ideas' }, { id: 'b', text: 'To make responsibility and final calls clear' }, { id: 'c', text: 'To eliminate disagreement' }, { id: 'd', text: 'To make every decision slower' }], correctId: 'b', explanation: 'Teams can debate openly while still knowing who owns the final call.' },
      { id: 'team-q3', question: 'When should co-founders discuss ownership and expectations?', options: [{ id: 'a', text: 'Only after a major conflict' }, { id: 'b', text: 'Before committing, while the conversation is calm' }, { id: 'c', text: 'Never in writing' }, { id: 'd', text: 'After selling the company' }], correctId: 'b', explanation: 'Early clarity prevents assumptions from becoming damaging conflict.' },
      { id: 'team-q4', question: 'What creates early company culture?', options: [{ id: 'a', text: 'A slogan alone' }, { id: 'b', text: 'How the first team communicates, decides, and treats people' }, { id: 'c', text: 'Office decorations' }, { id: 'd', text: 'Having no values' }], correctId: 'b', explanation: 'Repeated team behavior becomes the culture future teammates inherit.' },
    ],
    teachBack: {
      conceptName: 'building a strong first startup team',
      keyFacts: ['A first teammate should fill a proven skill or capacity gap.', 'Clear roles, decision ownership, effort, and equity expectations prevent conflict.', 'Early team behavior creates company culture.'],
      misconceptions: ['A close friend is not automatically the right co-founder.', 'Healthy disagreement does not mean the team is failing.'],
    },
    canvasPrompts: [
      { sectionId: 'nextStep', title: 'Next Founder Move', prompt: 'What specific action will you take next?', placeholder: 'In the next seven days, I will...', example: 'Interview five students and run one paid tutoring test.' },
    ],
    rewards: { xp: 130, bamboo: 20 },
  },
];
