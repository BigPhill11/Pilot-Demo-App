import React, { useState } from 'react';
import { Adventure } from '@/types/adventure';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import StoryChapter from './adventures/story/StoryChapter';
import StoryNavigation from './adventures/story/StoryNavigation';
import StoryProgress from './adventures/story/StoryProgress';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoryReaderProps {
  adventure: Adventure;
  onBack: () => void;
}

const StoryReader: React.FC<StoryReaderProps> = ({ adventure, onBack }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set());
  const { updateQuizScore, updateActivityComplete } = useProgressTracking();
  const isMobile = useIsMobile();

  const storyData = {
    'bamboo-business': {
      chapters: [
        {
          title: "Welcome to Phil's Forest",
          content: [
            "🐼 Hi there! I'm Phil, and welcome to my bamboo forest! Just like how you might want to buy the best toys or snacks with your allowance, I need to choose the best bamboo groves to invest in.",
            "In the business world, companies are like different bamboo groves. Some are healthy and growing, while others might be struggling. Today, I'll teach you how to 'read' a company just like I read the health of bamboo groves!",
            "First, let's learn about what makes a bamboo grove (company) valuable. Just like I look at the soil, water, and growth of bamboo, investors look at a company's assets, cash flow, and growth potential."
          ]
        },
        {
          title: "Reading the Soil (Assets & Liabilities)",
          content: [
            "🌱 When I look at a bamboo grove, the first thing I check is the soil. Rich, healthy soil means the bamboo will grow strong. In business, this is like looking at a company's 'balance sheet'.",
            "A company's assets are like the good soil - these are valuable things the company owns: buildings, equipment, cash in the bank, and even ideas (like patents). The more valuable assets, the stronger the foundation!",
            "But wait! Just like bamboo groves can have problems (like pests or poor drainage), companies have liabilities - money they owe to others. It's like having to share your bamboo with other pandas. We want assets to be much bigger than liabilities!"
          ]
        },
        {
          title: "Checking the Water Flow (Cash Flow)",
          content: [
            "💧 Next, I check if there's good water flowing to my bamboo. No water = no growth! In business, this 'water' is cash flow - money flowing in and out of the company.",
            "When a company sells products or services, money flows IN (like rain feeding my bamboo). When they pay employees, rent, or buy materials, money flows OUT (like water being absorbed by roots).",
            "The best companies are like bamboo groves with a steady stream - more water coming in than going out. This leftover water helps the bamboo (company) grow bigger and stronger over time!"
          ]
        },
        {
          title: "Measuring Growth Potential",
          content: [
            "📈 Now comes the exciting part - figuring out which bamboo groves will grow the most! I look for young, healthy shoots that have lots of room to expand.",
            "In business, this means looking at whether a company is growing its sales, expanding to new places, or creating innovative products. Companies in growing industries (like technology) are like bamboo in perfect growing conditions.",
            "I also check if the company has smart leaders (like experienced panda grove-keepers) and if they're spending money wisely on growth rather than wasteful things."
          ]
        },
        {
          title: "Making the Investment Decision",
          content: [
            "🎯 Finally, it's decision time! Just like I choose the best bamboo grove for my family's future, investors must decide if a company is worth buying shares in.",
            "I compare different groves (companies) and pick the ones with: healthy soil (strong balance sheet), good water flow (positive cash flow), growth potential (expanding business), and reasonable prices (not too expensive).",
            "Remember, investing is like planting seeds for the future. The best investors, like the wisest pandas, are patient and choose carefully. Now you know the basics of reading companies like Phil reads bamboo groves!"
          ]
        }
      ]
    },
    'forest-sentiment': {
      chapters: [
        {
          title: "The Mood of the Forest",
          content: [
            "🐼 Hello again! Today I want to tell you about something really interesting - how the emotions of all us pandas affect bamboo prices in our forest market!",
            "You know how when you're excited about something, your friends get excited too? Or when someone is scared, others start feeling worried? The same thing happens in investing!",
            "When most pandas in our forest feel happy and confident about bamboo growing, they want to buy more bamboo stocks. When they're worried or scared, they want to sell. This creates what humans call 'market sentiment' - the overall mood of all investors."
          ]
        },
        {
          title: "Bull Pandas vs Bear Pandas",
          content: [
            "🐂 In our forest, we have two types of pandas when it comes to bamboo investing: Bull Pandas and Bear Pandas!",
            "Bull Pandas are super optimistic! They think bamboo prices will go UP, UP, UP! They're always buying more bamboo stocks because they believe the forest economy will grow. When lots of Bull Pandas are around, prices tend to rise.",
            "🐻 Bear Pandas are more cautious (and sometimes grumpy). They think bamboo prices will go DOWN. They might sell their bamboo stocks because they're worried about problems coming. When Bear Pandas dominate, prices usually fall.",
            "The funny thing is, both Bull and Bear Pandas can be right at different times! The key is understanding which mood is taking over the forest."
          ]
        },
        {
          title: "Fear and Greed in the Bamboo Market",
          content: [
            "😱 Sometimes, fear spreads through our forest like wildfire. Maybe there's news about a bamboo disease, or rumors that winter will be extra cold. When pandas get scared, they panic-sell their bamboo stocks!",
            "This creates what we call a 'Bear Market' - prices fall quickly because everyone wants to sell, but nobody wants to buy. It's like a bamboo clearance sale that nobody asked for!",
            "💰 Other times, greed takes over. Pandas hear stories about other pandas getting rich from bamboo investments. Everyone wants to get rich quick! They buy, buy, buy without thinking carefully.",
            "This creates a 'Bull Market' where prices go up and up. But sometimes they go up too much, too fast - like a bamboo bubble that eventually pops!"
          ]
        },
        {
          title: "Reading the Forest's Emotions",
          content: [
            "🔍 Smart pandas like me learn to read the forest's emotions. We look for clues about how other pandas are feeling:",
            "📰 News and Rumors: Good news makes pandas happy and willing to buy. Bad news makes them scared and eager to sell. But sometimes pandas overreact to news!",
            "📊 Trading Volume: When lots of pandas are buying and selling (high volume), it means strong emotions are involved. Low volume might mean pandas are calm or uncertain.",
            "💭 Social Media and Forums: Just like human investors, pandas talk online about their investments. We can sense if the mood is positive or negative by listening to panda chatter!"
          ]
        }
      ]
    },
    'weather-forecasting': {
      chapters: [
        {
          title: "Phil's Weather Station",
          content: [
            "🌤️ Welcome to my weather prediction academy! Just like meteorologists predict rain and sunshine, smart pandas like me try to predict what will happen to bamboo prices in the future.",
            "Forecasting in investing is like predicting the weather - we look at patterns, use tools and data, and make educated guesses. But just like weather forecasts, we're not always 100% right!",
            "Today I'll teach you the tools and techniques I use to peer into the future of bamboo markets. Remember, the goal isn't to be perfect, but to be right more often than we're wrong!"
          ]
        },
        {
          title: "Reading the Economic Weather Patterns",
          content: [
            "📊 Just like I watch cloud formations to predict rain, I watch economic 'formations' to predict market movements.",
            "Economic indicators are like weather instruments: GDP growth (temperature of the economy), unemployment rates (storm warnings), inflation (pressure changes), and interest rates (wind direction).",
            "When these indicators show the economy heating up, bamboo companies usually do well. When they show cooling or storms ahead, it might be time to be more careful with investments.",
            "I also watch seasonal patterns - just like bamboo grows better in certain seasons, some investments do better at certain times of the year!"
          ]
        },
        {
          title: "Technical Analysis: Reading the Bamboo Charts",
          content: [
            "📈 Now let me show you something really cool - price charts! These are like tracking the growth patterns of bamboo over time.",
            "Technical analysis is like being a bamboo growth detective. I look at how prices moved in the past to guess where they might go next. Prices often make patterns, just like bamboo grows in predictable ways!",
            "Some patterns I watch for: 'Support levels' (like the minimum height bamboo usually grows), 'Resistance levels' (like a ceiling bamboo struggles to break through), and 'Trends' (the general direction - up, down, or sideways).",
            "Moving averages help me see the big picture - it's like looking at average bamboo growth over different time periods to smooth out daily ups and downs."
          ]
        },
        {
          title: "Fundamental Forecasting",
          content: [
            "🔍 While technical analysis looks at price patterns, fundamental forecasting looks at the actual business - like examining the roots and soil of bamboo groves.",
            "I research: How fast is the company growing? Are they making more money each year? Do they have new products coming out? Are they expanding to new forests?",
            "Industry trends matter too - is the whole bamboo industry growing? Are there new technologies that might help or hurt bamboo companies? What about competition from other food sources?",
            "Economic forecasting helps me understand the big picture: Will pandas have more money to spend? Are interest rates going up or down? These macro factors affect all bamboo investments."
          ]
        },
        {
          title: "Putting It All Together",
          content: [
            "🎯 The best forecasting combines multiple approaches - like using both satellite images AND ground sensors to predict weather!",
            "I use technical analysis for timing (when to buy or sell), fundamental analysis for selection (which bamboo stocks to choose), and economic analysis for context (understanding the big picture).",
            "Remember: forecasting is about probabilities, not certainties. I might say 'there's a 70% chance bamboo prices will rise in the next month' rather than 'prices will definitely go up.'",
            "The key is being prepared for different scenarios. Smart pandas always have a plan for what to do if they're wrong, just like carrying an umbrella even when the forecast says sunny!"
          ]
        }
      ]
    },
    'panda-economics': {
      chapters: [
        {
          title: "Welcome to Panda Valley Economy",
          content: [
            "🏔️ Welcome to the grand tour of Panda Valley's economy! I'm Phil, your economic guide, and today we'll explore how our entire valley's financial system works together.",
            "Think of our valley's economy like a giant ecosystem where everything is connected. The bamboo farms, panda employment, banks, shops, and even the weather all affect each other in fascinating ways!",
            "Understanding economics helps us make better decisions about saving, spending, and investing. It's like understanding how all the parts of our forest work together to keep everyone happy and fed."
          ]
        },
        {
          title: "The Bamboo Supply Chain Empire",
          content: [
            "🎋 Let's start with bamboo - the foundation of our valley's economy! From seed to your dinner plate, bamboo goes through an amazing journey.",
            "First, farmer pandas plant and grow bamboo using land, seeds, water, and their hard work. Then harvester pandas collect the bamboo and transport it to processing facilities where it's cleaned and packaged.",
            "Next, distributor pandas move the bamboo to stores throughout the valley. Finally, retail pandas sell it to families like yours! Each step creates jobs and adds value.",
            "When bamboo is abundant and cheap, pandas have more money for other things. When it's scarce and expensive, families must spend more on food and less on entertainment or savings."
          ]
        },
        {
          title: "Panda Employment and the Labor Market",
          content: [
            "👷 Every adult panda in our valley has a role in keeping our economy running smoothly. Some are bamboo farmers, others are teachers, builders, doctors, or shopkeepers.",
            "When businesses are doing well, they hire more pandas (low unemployment). This means more pandas have paychecks to spend, which helps other businesses succeed too - it's a happy cycle!",
            "But sometimes businesses struggle and have to let pandas go (high unemployment). This means fewer pandas can afford to buy things, which can make other businesses struggle too.",
            "The Panda Valley Employment Office tracks how many pandas are working versus looking for work. This 'unemployment rate' tells us a lot about our economy's health."
          ]
        },
        {
          title: "The Central Bank of Panda Valley",
          content: [
            "🏛️ At the heart of our valley sits the Central Bank of Panda Valley, run by the wisest pandas who make important decisions that affect everyone's money.",
            "One of their biggest jobs is setting 'interest rates' - this is like the price of borrowing money. When rates are low, it's cheap for pandas and businesses to borrow money for houses, cars, or expanding businesses.",
            "When too many pandas are borrowing and spending (causing inflation - prices going up everywhere), the Central Bank raises interest rates to cool things down. When the economy is slow, they lower rates to encourage spending.",
            "They also control how much money is in our valley's system. Too much money can cause inflation (everything gets more expensive). Too little money can cause deflation (everything gets cheaper, but pandas lose jobs)."
          ]
        },
        {
          title: "Global Trade and Panda Valley",
          content: [
            "🌍 Our Panda Valley doesn't exist in isolation - we trade with other valleys and regions around the world! This global connection brings both opportunities and challenges.",
            "We export our premium bamboo to other valleys that don't grow it as well. We import things we can't make ourselves, like certain fruits, metals for tools, and technologies.",
            "When other valleys' economies are strong, they buy more of our bamboo exports, bringing money into our valley. When they struggle, demand for our exports falls, affecting our bamboo farmers and related businesses.",
            "Exchange rates matter too - this is like the 'price' of our valley's currency compared to other valleys' currencies. A strong Panda Dollar means our exports cost more for others to buy, but imports are cheaper for us."
          ]
        },
        {
          title: "Economic Cycles and Your Future",
          content: [
            "📊 Economies naturally go through cycles - periods of growth (expansion) followed by periods of slowing down (recession), then recovery and growth again.",
            "During expansions, businesses grow, pandas find jobs easily, and investments often do well. During recessions, the opposite happens - but these tough times also create opportunities for smart, patient pandas.",
            "Understanding these cycles helps us make better decisions: saving more during good times to prepare for tough times, and recognizing opportunities during downturns when others are too scared to act.",
            "Remember, economics affects every aspect of our lives - from job opportunities to the price of bamboo to investment returns. The more you understand these connections, the better financial decisions you'll make throughout your life!"
          ]
        }
      ]
    },
    'phil-risk-management': {
      chapters: [
        {
          title: "Phil's First Storm",
          content: [
            "🌩️ One dark day, Phil watched storm clouds gather over his favorite bamboo grove. 'Oh no!' he thought, 'What if the storm destroys all my bamboo?' This is when Phil learned about RISK - the chance that bad things could happen to his investments.",
            "Smart pandas like Phil know that investing always has some risk, just like storms can always threaten bamboo groves. But there are ways to protect yourself! Just like Phil learned to prepare for different types of weather.",
            "Today, Phil will teach you the panda way of keeping your investments safe while still growing your bamboo fortune!"
          ]
        },
        {
          title: "The Three Types of Storms",
          content: [
            "🌪️ Phil discovered there are three main types of storms that can affect his bamboo investments:",
            "Market Storms: When ALL bamboo prices go down because pandas get scared. It's like a valley-wide panic where everyone tries to sell their bamboo at once!",
            "Company Storms: When just ONE bamboo grove has problems - maybe the soil got bad or the owner made poor decisions. Other groves stay healthy.",
            "Personal Storms: When Phil himself needs bamboo urgently for an emergency. Sometimes you have to sell even when prices are low!"
          ]
        },
        {
          title: "Phil's Safety Toolkit",
          content: [
            "🛡️ Phil learned to build a safety toolkit to protect his bamboo investments:",
            "Diversification: Instead of putting all his bamboo in one grove, Phil spreads it across many different groves. If one gets damaged, the others keep growing!",
            "Emergency Bamboo Stash: Phil always keeps some bamboo in a safe, easily accessible place for emergencies - just like humans keep emergency savings in a bank account.",
            "Insurance Thinking: For his most important groves, Phil thinks about what could go wrong and makes backup plans. Smart investors do this too!"
          ]
        },
        {
          title: "The Stop-Loss Lesson",
          content: [
            "⚠️ Phil learned about 'stop-loss' - a smart panda rule for when to walk away from a bad investment:",
            "If a bamboo grove starts performing really badly, Phil doesn't wait for it to get worse. He sets a limit: 'If this grove loses 20% of its value, I'll sell and protect the rest of my bamboo.'",
            "This is like having a fire alarm in your house - you don't wait for the whole house to burn down before you leave! Sometimes it's better to take a small loss to prevent a big disaster.",
            "The hardest part is sticking to your plan when emotions run high. Phil practices staying calm and following his safety rules."
          ]
        },
        {
          title: "Growing Safely",
          content: [
            "🌱 Phil discovered the secret to growing wealth safely: it's about balance! Take smart risks, but always protect yourself.",
            "Young pandas can take more risks because they have time to recover from storms. Older pandas should be more careful and focus on protecting what they've already grown.",
            "Remember: The goal isn't to avoid ALL risk (that's impossible!), but to take only the risks that give you good rewards. Phil learned to ask: 'Is this risk worth the potential bamboo reward?'",
            "By following these safety rules, Phil could sleep peacefully even during market storms, knowing his bamboo investments were well-protected!"
          ]
        }
      ]
    },
    'phil-portfolio-building': {
      chapters: [
        {
          title: "Phil's Collection Begins",
          content: [
            "🎯 Phil looked at his single bamboo grove and had a brilliant idea: 'What if I collected different TYPES of bamboo from different places?' This is when Phil discovered the power of building a portfolio!",
            "A portfolio is like Phil's collection of different bamboo investments. Instead of owning just one type, he learned to mix sweet bamboo, strong bamboo, fast-growing bamboo, and steady bamboo.",
            "Just like a panda needs different types of food to stay healthy, investors need different types of investments to build wealth safely and steadily!"
          ]
        },
        {
          title: "The Magic Mix",
          content: [
            "✨ Phil learned the magical formula for a balanced bamboo collection:",
            "Growth Bamboo (40%): Fast-growing bamboo that might become very valuable, like technology companies. Higher risk, higher reward!",
            "Steady Bamboo (40%): Reliable bamboo that grows slowly but surely, like big established companies that pay dividends.",
            "Safety Bamboo (20%): Super-safe bamboo that protects against storms, like government bonds or savings accounts.",
            "By mixing these three types, Phil's collection could grow in good times and stay protected during tough times!"
          ]
        },
        {
          title: "Geographic Diversity",
          content: [
            "🗺️ Phil realized he needed bamboo from different valleys and mountains, not just his local forest:",
            "Local Valley Bamboo: Companies from Phil's home country - familiar but all affected by the same weather (economic conditions).",
            "Foreign Bamboo: Companies from other countries that might do well when Phil's local bamboo struggles.",
            "Different Industry Bamboo: Some bamboo for food, some for construction, some for medicine - different industries do well at different times!",
            "This way, if one area has problems, Phil's other bamboo investments can keep growing."
          ]
        },
        {
          title: "Rebalancing the Collection",
          content: [
            "⚖️ Phil discovered that his bamboo collection needed regular maintenance, just like a garden:",
            "Sometimes his fast-growing bamboo became TOO big a part of his collection (maybe growing from 40% to 60%). This made his collection too risky!",
            "Other times, his steady bamboo grew more slowly, becoming a smaller part of his collection than planned.",
            "Every few months, Phil would 'rebalance' - selling some of what grew too much and buying more of what shrank. This kept his magic mix working properly."
          ]
        },
        {
          title: "The Time Factor",
          content: [
            "📅 Phil learned that time was his secret weapon for portfolio building:",
            "Dollar-Cost Averaging: Instead of buying all his bamboo at once, Phil bought a little bit every month. This way, he got good prices over time instead of worrying about perfect timing.",
            "Compound Growth: Phil's bamboo collection grew not just from new bamboo, but from his existing bamboo making MORE bamboo! Like a bamboo forest that keeps expanding.",
            "Patience Pays: The longer Phil kept his balanced collection, the stronger it became. Time smoothed out the bumps and storms."
          ]
        },
        {
          title: "Phil's Portfolio Rules",
          content: [
            "📋 Phil created simple rules for his bamboo portfolio that any panda could follow:",
            "Start Early: The sooner you start collecting, the more time your bamboo has to grow into a mighty forest!",
            "Stay Consistent: Add a little bamboo to your collection regularly, even if it's just a small amount.",
            "Keep it Simple: Don't make your collection too complicated. A few good types of bamboo are better than trying to collect everything!",
            "Review Regularly: Check your collection every few months, but don't panic during short storms. Think like a patient gardener, not a worried weather-watcher!"
          ]
        }
      ]
    },
    'phil-wealth-building': {
      chapters: [
        {
          title: "Phil's Grand Vision",
          content: [
            "🏔️ Phil climbed to the highest peak in Panda Valley and looked out over all the bamboo forests below. 'Someday,' he dreamed, 'I want to build enough wealth so my family never has to worry about having enough bamboo again!'",
            "This is when Phil learned about WEALTH BUILDING - not just making money, but creating lasting financial security that grows over many, many bamboo seasons.",
            "Wealth building isn't about getting rich quick. It's about making smart choices consistently over time, just like how the mightiest bamboo forests grow slowly but become incredibly strong!"
          ]
        },
        {
          title: "The Compound Magic Forest",
          content: [
            "🌳 Phil discovered the most powerful force in wealth building: compound growth! It's like planting a magical bamboo seed that doesn't just grow - it plants MORE seeds that grow into MORE bamboo!",
            "Year 1: Phil's 100 bamboo shoots grow by 10%, giving him 110 shoots.",
            "Year 2: Those 110 shoots grow by 10%, giving him 121 shoots (not just 120!).",
            "Year 10: Phil's original 100 shoots have become 259 shoots!",
            "Year 20: Those same 100 shoots are now 673 shoots! The magic happens because Phil earns growth on his growth. It starts slow but becomes incredibly powerful over time."
          ]
        },
        {
          title: "Phil's Wealth Pyramid",
          content: [
            "🔺 Phil learned to build wealth like constructing a strong pyramid, one layer at a time:",
            "Foundation Layer: Emergency bamboo stash (3-6 months of living expenses) in a safe, easy-to-reach place.",
            "Security Layer: Steady investments like index funds that grow reliably over time.",
            "Growth Layer: More aggressive investments that could grow faster but have more risk.",
            "Legacy Layer: Investments for the far future - maybe bamboo groves for Phil's great-great-grandpandas!",
            "Each layer must be solid before building the next one. You can't build lasting wealth on a shaky foundation!"
          ]
        },
        {
          title: "The Three Wealth Engines",
          content: [
            "⚙️ Phil discovered three powerful engines that build wealth:",
            "Earned Bamboo: Money from working - Phil's job harvesting bamboo. This is where wealth building starts, but it's limited by time and energy.",
            "Investment Bamboo: Money that makes more money - Phil's bamboo investments growing and paying dividends. This can work 24/7 without Phil doing anything!",
            "Business Bamboo: Money from owning a piece of a business that serves other pandas. This can grow without limits if the business succeeds.",
            "The wealthy pandas Phil studied used ALL three engines, not just one!"
          ]
        },
        {
          title: "Avoiding Wealth Destroyers",
          content: [
            "🚫 Phil learned that building wealth isn't just about making money - it's also about NOT losing it to common traps:",
            "Lifestyle Inflation: As Phil earned more bamboo, he wanted fancier caves and premium bamboo meals. But he learned to live below his means, not spend everything he earned.",
            "Bad Debt: Phil avoided borrowing bamboo to buy things that don't grow in value (like fancy gadgets). Good debt helps buy assets; bad debt just costs money.",
            "FOMO Investing: When other pandas got excited about 'hot' bamboo investments, Phil stuck to his long-term plan instead of chasing trends.",
            "Impatience: Phil's biggest challenge was waiting. Wealth building is like watching bamboo grow - it happens slowly, then suddenly!"
          ]
        },
        {
          title: "Phil's 20-Year Plan",
          content: [
            "📊 Phil created a long-term wealth building plan that any young panda could follow:",
            "Years 1-5: Build the foundation. Save emergency fund, start investing in simple index funds, learn the basics.",
            "Years 6-10: Accelerate growth. Increase investments, maybe add real estate, focus on career advancement.",
            "Years 11-15: Optimize and diversify. Fine-tune the portfolio, consider business opportunities, plan for major goals.",
            "Years 16-20: Prepare for bamboo season retirement. Shift towards more conservative investments while maintaining growth.",
            "The magic happens around year 15-20 when compound growth really kicks in. Phil's wealth starts growing faster than he can spend it!"
          ]
        },
        {
          title: "The Wealthy Panda Mindset",
          content: [
            "🧠 Finally, Phil learned that wealth building is as much about mindset as it is about money:",
            "Think Long-Term: Every decision Phil makes, he asks 'How will this affect my wealth in 10 years?' Wealthy pandas think in decades, not days.",
            "Value Learning: Phil invests in his own education because smart pandas make better financial decisions. Knowledge pays the best interest!",
            "Stay Grateful: Phil appreciates what he has while working toward more. Gratitude keeps him from making emotional money mistakes.",
            "Help Others: Wealthy pandas share knowledge and opportunities. Phil teaches young pandas because wealth shared is wealth multiplied!",
            "Remember: Wealth isn't just about having lots of bamboo - it's about having the freedom to live the life you want!"
          ]
        }
      ]
    }
  };

  const currentStory = storyData[adventure.id as keyof typeof storyData];
  if (!currentStory) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-muted-foreground">Story Coming Soon!</h2>
        <p className="text-muted-foreground">Phil is still writing this adventure. Check back soon!</p>
      </div>
    );
  }
  const currentChapter = currentStory.chapters[currentChapterIndex];
  const canProceed = completedQuizzes.has(currentChapterIndex);

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    updateQuizScore(topicId, isCorrect);
    if (isCorrect) {
      setCompletedQuizzes(prev => new Set([...prev, currentChapterIndex]));
      
      // Check if this completes the adventure
      const newCompletedQuizzes = new Set([...completedQuizzes, currentChapterIndex]);
      if (newCompletedQuizzes.size === currentStory.chapters.length) {
        // Adventure completed!
        updateActivityComplete(`adventure-${adventure.id}`, 50); // 50 points for completing an adventure
      }
    }
  };

  const handleNext = () => {
    if (canProceed && currentChapterIndex < currentStory.chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    } else if (canProceed && currentChapterIndex === currentStory.chapters.length - 1) {
      // Reached the end, check if adventure is complete
      if (completedQuizzes.size === currentStory.chapters.length) {
        updateActivityComplete(`adventure-${adventure.id}`, 50);
      }
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Complete the adventure and award points
      await updateActivityComplete(`adventure-${adventure.id}`, 100);
      // Go back to the adventures list
      onBack();
    } catch (error) {
      console.error('Error completing adventure:', error);
    }
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'px-2' : ''}`}>
      <StoryProgress 
        currentChapter={currentChapterIndex}
        totalChapters={currentStory.chapters.length}
        adventureTitle={adventure.title}
      />

      <StoryChapter 
        chapter={currentChapter}
        chapterIndex={currentChapterIndex}
      />

      <InteractiveQuiz
        topicId={`${adventure.id}-chapter-${currentChapterIndex}`}
        question={getChapterQuiz(adventure.id, currentChapterIndex).question}
        options={getChapterQuiz(adventure.id, currentChapterIndex).options}
        correctAnswerIndex={getChapterQuiz(adventure.id, currentChapterIndex).correctAnswerIndex}
        feedbackForIncorrect={getChapterQuiz(adventure.id, currentChapterIndex).feedback}
        onQuizComplete={handleQuizComplete}
        isCompleted={completedQuizzes.has(currentChapterIndex)}
      />

      <StoryNavigation
        currentChapterIndex={currentChapterIndex}
        totalChapters={currentStory.chapters.length}
        canProceed={canProceed}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBack={onBack}
        onComplete={handleComplete}
      />
    </div>
  );
};

const getChapterQuiz = (adventureId: string, chapterIndex: number) => {
  const quizzes = {
    'bamboo-business': [
      {
        question: "What does Phil compare a company's assets to?",
        options: ["Water sources", "Rich, healthy soil", "Bamboo thickness", "Sunlight"],
        correctAnswerIndex: 1,
        feedback: "Phil compares a company's assets to rich, healthy soil - the foundation that supports growth!"
      },
      {
        question: "What should a healthy company have more of?",
        options: ["Liabilities than assets", "Assets than liabilities", "Equal assets and liabilities", "Neither assets nor liabilities"],
        correctAnswerIndex: 1,
        feedback: "Just like bamboo needs more nutrients than toxins, companies need more assets than liabilities!"
      },
      {
        question: "What does Phil compare cash flow to?",
        options: ["Soil quality", "Water flowing to bamboo", "Sunlight", "Bamboo height"],
        correctAnswerIndex: 1,
        feedback: "Cash flow is like water - money flowing in and out of the company, essential for growth!"
      },
      {
        question: "What indicates a company's growth potential?",
        options: ["Old, established products only", "Young shoots with room to expand", "Declining sales", "High expenses"],
        correctAnswerIndex: 1,
        feedback: "Like young bamboo shoots, companies with innovative products and expanding markets show growth potential!"
      },
      {
        question: "What makes a good investment according to Phil?",
        options: ["High price only", "Strong balance sheet, positive cash flow, growth potential, reasonable price", "Quick profits", "Following the crowd"],
        correctAnswerIndex: 1,
        feedback: "Phil teaches that good investments combine strong fundamentals with reasonable pricing - just like choosing the best bamboo groves!"
      }
    ],
    'forest-sentiment': [
      {
        question: "What are Bull Pandas like?",
        options: ["Always selling stocks", "Optimistic and expect prices to rise", "Worried about everything", "Never invest"],
        correctAnswerIndex: 1,
        feedback: "Bull Pandas are optimistic investors who believe prices will go UP! They're always ready to buy more."
      },
      {
        question: "What happens when Bear Pandas dominate the market?",
        options: ["Prices usually rise", "Prices usually fall", "Nothing changes", "Volume increases"],
        correctAnswerIndex: 1,
        feedback: "When Bear Pandas (cautious investors) dominate, prices typically fall as they sell their holdings."
      },
      {
        question: "What creates a 'Bear Market'?",
        options: ["Everyone wants to buy", "Fear spreads and pandas panic-sell", "Good news", "High profits"],
        correctAnswerIndex: 1,
        feedback: "Fear creates Bear Markets - when scared pandas sell rapidly, prices drop like a bamboo clearance sale!"
      },
      {
        question: "What should smart pandas look for to read market emotions?",
        options: ["Only stock prices", "News, trading volume, and social media sentiment", "Just rumors", "Only charts"],
        correctAnswerIndex: 1,
        feedback: "Smart pandas like Phil watch multiple clues: news reactions, trading activity, and what other pandas are saying!"
      }
    ],
    'weather-forecasting': [
      {
        question: "What are economic indicators like?",
        options: ["Weather instruments", "Bamboo seeds", "Panda emotions", "Tree branches"],
        correctAnswerIndex: 0,
        feedback: "Economic indicators are like weather instruments - they help us predict economic conditions ahead!"
      },
      {
        question: "What does technical analysis focus on?",
        options: ["Company fundamentals", "Price patterns and charts", "Economic news only", "Panda emotions"],
        correctAnswerIndex: 1,
        feedback: "Technical analysis is like being a detective - studying price patterns and charts to predict future movements!"
      },
      {
        question: "What helps Phil see the big picture in price movements?",
        options: ["Daily prices only", "Moving averages", "Single data points", "Rumors"],
        correctAnswerIndex: 1,
        feedback: "Moving averages smooth out daily ups and downs, like looking at average bamboo growth over time!"
      },
      {
        question: "What does fundamental forecasting examine?",
        options: ["Only price charts", "The actual business - growth, profits, new products", "Market sentiment only", "Technical patterns"],
        correctAnswerIndex: 1,
        feedback: "Fundamental forecasting looks at the business itself - like examining the roots and soil of bamboo groves!"
      },
      {
        question: "How should Phil think about forecasting accuracy?",
        options: ["Always 100% certain", "Probabilities and being prepared for different scenarios", "Never making predictions", "Only following others"],
        correctAnswerIndex: 1,
        feedback: "Smart forecasting is about probabilities, not certainties - always have a plan for different outcomes!"
      }
    ],
    'panda-economics': [
      {
        question: "What happens when bamboo is abundant and cheap?",
        options: ["Pandas spend more on food", "Pandas have more money for other things", "The economy slows down", "Nothing changes"],
        correctAnswerIndex: 1,
        feedback: "When bamboo is cheap, pandas can spend their money on other things, boosting the whole economy!"
      },
      {
        question: "What creates a 'happy cycle' in employment?",
        options: ["High unemployment", "Businesses doing well and hiring more pandas", "Pandas spending less", "Companies closing"],
        correctAnswerIndex: 1,
        feedback: "When businesses thrive and hire more pandas, those pandas spend money, helping other businesses succeed too!"
      },
      {
        question: "What happens when the Central Bank raises interest rates?",
        options: ["Borrowing becomes cheaper", "It encourages more spending", "It cools down an overheating economy", "Nothing changes"],
        correctAnswerIndex: 2,
        feedback: "Higher interest rates make borrowing expensive, cooling down an economy with too much spending and inflation!"
      },
      {
        question: "How does global trade affect Panda Valley?",
        options: ["It has no effect", "Strong foreign economies buy more bamboo exports", "Only imports matter", "Trade always hurts"],
        correctAnswerIndex: 1,
        feedback: "When other valleys prosper, they buy more of our premium bamboo, bringing money into our economy!"
      },
      {
        question: "What should pandas do during economic expansions?",
        options: ["Spend everything immediately", "Save more to prepare for tough times", "Stop investing", "Ignore the economy"],
        correctAnswerIndex: 1,
        feedback: "Smart pandas save during good times to prepare for inevitable downturns - like storing bamboo for winter!"
      },
      {
        question: "What affects Panda Valley's currency exchange rate?",
        options: ["Only local weather", "Economic strength compared to other valleys", "The number of pandas", "Bamboo color"],
        correctAnswerIndex: 1,
        feedback: "A strong Panda Dollar means our economy is doing well compared to other valleys, affecting trade!"
      },
      {
        question: "What helps pandas make better financial decisions?",
        options: ["Ignoring economics", "Understanding how economic cycles and connections affect their lives", "Only thinking about today", "Following every trend"],
        correctAnswerIndex: 1,
        feedback: "Understanding economics helps pandas make smarter decisions about saving, spending, and investing throughout their lives!"
      }
    ],
    'phil-risk-management': [
      {
        question: "What is RISK in Phil's investing world?",
        options: ["Free bamboo", "The chance that bad things could happen to investments", "Always making money", "Having too much bamboo"],
        correctAnswerIndex: 1,
        feedback: "Risk is the chance that bad things could happen to your investments - just like storms threatening bamboo groves!"
      },
      {
        question: "What are the three types of storms that can affect investments?",
        options: ["Market, Company, and Personal storms", "Rain, snow, and wind", "Big, medium, and small storms", "Past, present, and future storms"],
        correctAnswerIndex: 0,
        feedback: "Phil learned about Market storms (affecting everything), Company storms (affecting one business), and Personal storms (when you need money urgently)!"
      },
      {
        question: "What is diversification in Phil's safety toolkit?",
        options: ["Putting all bamboo in one grove", "Spreading bamboo across many different groves", "Only buying expensive bamboo", "Never investing"],
        correctAnswerIndex: 1,
        feedback: "Diversification means spreading your investments across different places so if one has problems, others can keep growing!"
      },
      {
        question: "What is a 'stop-loss' rule?",
        options: ["Never selling anything", "Setting a limit for when to sell to prevent bigger losses", "Only buying when prices are high", "Ignoring bad investments"],
        correctAnswerIndex: 1,
        feedback: "A stop-loss is like a fire alarm - you set a limit and sell before small losses become big disasters!"
      },
      {
        question: "What's the secret to growing wealth safely?",
        options: ["Avoid all risks", "Take smart risks but always protect yourself", "Only invest in one thing", "Never save money"],
        correctAnswerIndex: 1,
        feedback: "Phil learned it's about balance - take smart risks that offer good rewards while protecting yourself from disaster!"
      }
    ],
    'phil-portfolio-building': [
      {
        question: "What is a portfolio like for Phil?",
        options: ["One type of bamboo", "A collection of different types of bamboo investments", "Only money in a bank", "Expensive bamboo only"],
        correctAnswerIndex: 1,
        feedback: "A portfolio is like Phil's collection of different bamboo investments - mixing different types for safety and growth!"
      },
      {
        question: "What is Phil's magic mix for a balanced collection?",
        options: ["100% growth bamboo", "40% growth, 40% steady, 20% safety bamboo", "Only safety bamboo", "Whatever is cheapest"],
        correctAnswerIndex: 1,
        feedback: "Phil's magic mix balances growth (40%), steady income (40%), and safety (20%) for the best results!"
      },
      {
        question: "Why does Phil need bamboo from different valleys?",
        options: ["It tastes better", "Different areas might do well when others struggle", "It's more expensive", "Phil likes to travel"],
        correctAnswerIndex: 1,
        feedback: "Geographic diversity helps because when one area has problems, other areas might still do well!"
      },
      {
        question: "What is rebalancing Phil's collection?",
        options: ["Never changing anything", "Selling some of what grew too much and buying more of what shrank", "Only buying new bamboo", "Selling everything"],
        correctAnswerIndex: 1,
        feedback: "Rebalancing keeps Phil's magic mix working by adjusting when some investments grow faster than others!"
      },
      {
        question: "What is dollar-cost averaging?",
        options: ["Buying all at once", "Buying a little bit regularly over time", "Only buying when prices are low", "Never buying anything"],
        correctAnswerIndex: 1,
        feedback: "Dollar-cost averaging means buying a little bit regularly, which helps get good average prices over time!"
      },
      {
        question: "What's Phil's most important portfolio rule?",
        options: ["Start early and stay consistent", "Only invest when you're rich", "Wait for the perfect time", "Copy what others do"],
        correctAnswerIndex: 0,
        feedback: "Starting early gives your investments more time to grow, and staying consistent builds wealth steadily!"
      }
    ],
    'phil-wealth-building': [
      {
        question: "What is wealth building according to Phil?",
        options: ["Getting rich quick", "Creating lasting financial security over time", "Spending all your money", "Only saving money in a bank"],
        correctAnswerIndex: 1,
        feedback: "Wealth building is about creating lasting financial security through smart choices over many years!"
      },
      {
        question: "What makes compound growth so powerful?",
        options: ["It only works for rich pandas", "You earn growth on your growth over time", "It's guaranteed to work", "It happens overnight"],
        correctAnswerIndex: 1,
        feedback: "Compound growth is magical because you earn returns on your returns - growth builds on growth over time!"
      },
      {
        question: "What's the foundation layer of Phil's wealth pyramid?",
        options: ["Risky investments", "Emergency bamboo stash (3-6 months expenses)", "Expensive purchases", "Borrowed money"],
        correctAnswerIndex: 1,
        feedback: "The foundation must be solid - an emergency fund that covers 3-6 months of expenses in case of trouble!"
      },
      {
        question: "What are Phil's three wealth engines?",
        options: ["Earned, Investment, and Business bamboo", "Saving, spending, and borrowing", "Past, present, and future", "Small, medium, and large investments"],
        correctAnswerIndex: 0,
        feedback: "The three engines are Earned bamboo (working), Investment bamboo (money making money), and Business bamboo (owning part of businesses)!"
      },
      {
        question: "What is lifestyle inflation?",
        options: ["Good financial planning", "Spending more as you earn more instead of saving", "Investing in expensive things", "Borrowing money wisely"],
        correctAnswerIndex: 1,
        feedback: "Lifestyle inflation is when you spend more as you earn more, instead of saving the extra money to build wealth!"
      },
      {
        question: "What happens around years 15-20 in Phil's wealth plan?",
        options: ["You start losing money", "Compound growth really kicks in and wealth grows fast", "You stop investing", "Nothing special"],
        correctAnswerIndex: 1,
        feedback: "Around years 15-20, compound growth becomes very powerful and your wealth starts growing faster than you can spend!"
      },
      {
        question: "What's the most important part of the wealthy panda mindset?",
        options: ["Think short-term", "Think long-term and make decisions for 10+ years ahead", "Follow what everyone else does", "Never learn anything new"],
        correctAnswerIndex: 1,
        feedback: "Wealthy pandas think long-term - they make decisions based on how it will affect their wealth in 10+ years!"
      },
      {
        question: "What does Phil say wealth really gives you?",
        options: ["Lots of expensive things", "The freedom to live the life you want", "Power over others", "Nothing important"],
        correctAnswerIndex: 1,
        feedback: "True wealth isn't just about having lots of money - it's about having the freedom to live the life you want!"
      }
    ]
  };

  return quizzes[adventureId as keyof typeof quizzes]?.[chapterIndex] || {
    question: "What did you learn from this chapter?",
    options: ["Important investing concepts", "Market understanding", "Strategic thinking", "All of the above"],
    correctAnswerIndex: 3,
    feedback: "Great! Each chapter teaches valuable lessons about investing and market understanding."
  };
};

export default StoryReader;
