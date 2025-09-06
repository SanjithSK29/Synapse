import React, { useState, useEffect } from 'react';

const InitialAssessment = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState(() => {
    // Initialize from localStorage if available
    const savedData = localStorage.getItem('synapse_assessment_data');
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('synapse_assessment_data', JSON.stringify(formData));
  }, [formData]);

  const sections = [
    {
      title: "Sleep & Energy Patterns",
      questions: [
        {
          id: "alert_time",
          text: "When do you naturally feel most alert and productive?",
          type: "mcq",
          options: [
            { value: "early_bird", label: "Early Bird (6-10 AM)", description: "I'm sharpest with my morning coffee, love tackling big tasks before the world wakes up" },
            { value: "mid_morning", label: "Mid-Morning Warrior (10 AM-2 PM)", description: "I need time to ease into my day, but then I'm unstoppable until lunch" },
            { value: "afternoon", label: "Afternoon Powerhouse (2-6 PM)", description: "Post-lunch is when my brain comes alive, I do my best thinking then." },
            { value: "night_owl", label: "Night Owl (6 PM-12 AM)", description: "The quieter the world gets, the more focused I become" }
          ]
        },
        {
          id: "bedtime",
          text: "What time do you usually go to bed?",
          type: "mcq",
          options: [
            { value: "early", label: "Early Sleeper (Before 10 PM)", description: "I'm winding down by 9 PM, ready for tomorrow's early start" },
            { value: "standard", label: "Standard Sleeper (10-11 PM)", description: "I like a consistent routine, lights out around 10:30 PM" },
            { value: "late", label: "Late Sleeper (11 PM-12 AM)", description: "I'm still productive in the evening, bed around 11:30 PM" },
            { value: "very_late", label: "Very Late Sleeper (After 12 AM)", description: "I'm a natural night person, often up past midnight" }
          ]
        },
        {
          id: "wake_time",
          text: "What time do you typically wake up?",
          type: "mcq",
          options: [
            { value: "very_early", label: "Very Early Riser (Before 6 AM)", description: "I love having the morning to myself before the day starts" },
            { value: "early", label: "Early Riser (6-7 AM)", description: "I wake up naturally around 6:30 AM, no alarm needed" },
            { value: "standard", label: "Standard Riser (7-8 AM)", description: "I need that solid 7-8 hours, up around 7:30 AM" },
            { value: "late", label: "Late Riser (After 8 AM)", description: "I'm not a morning person; I need extra time to wake up properly." }
          ]
        },
        {
          id: "sleep_hours",
          text: "How many hours of sleep do you usually get?",
          type: "mcq",
          options: [
            { value: "short", label: "Short Sleeper (Less than 6 hours)", description: "I function well on 5-6 hours, I'm naturally low-sleep." },
            { value: "efficient", label: "Efficient Sleeper (6-7 hours)", description: "6-7 hours is my sweet spot; more feels excessive." },
            { value: "standard", label: "Standard Sleeper (7-8 hours)", description: "I need my full 7-8 hours to function at my best." },
            { value: "long", label: "Long Sleeper (More than 8 hours)", description: "I'm naturally a long sleeper, 8+ hours or I'm groggy." }
          ]
        },
        {
          id: "sleep_consistency",
          text: "How consistent is your sleep schedule on most days?",
          type: "mcq",
          options: [
            { value: "very_consistent", label: "Very Consistent", description: "I go to bed and wake up at roughly the same time every day." },
            { value: "mostly_consistent", label: "Mostly Consistent", description: "There's some variation, but I stick to a general routine." },
            { value: "not_consistent", label: "Not Consistent", description: "My sleep times change often based on my day." }
          ]
        }
      ]
    },
    {
      title: "Sleep Quality & Napping",
      questions: [
        {
          id: "refreshed",
          text: "Do you typically feel refreshed when you wake up?",
          type: "mcq",
          options: [
            { value: "yes", label: "Yes", description: "I usually feel well-rested and ready to start the day." },
            { value: "no", label: "No", description: "I often feel groggy or tired." }
          ]
        },
        {
          id: "napping",
          text: "Do you take naps during the day?",
          type: "mcq",
          options: [
            { value: "never", label: "Never Nap", description: "Napping throws off my sleep schedule, I power through afternoon dips." },
            { value: "rarely", label: "Rarely Nap (1-2 times per week)", description: "Only when I'm really exhausted or didn't sleep well" },
            { value: "sometimes", label: "Sometimes Nap (3-4 times per week)", description: "A short afternoon nap often recharges me perfectly" },
            { value: "daily", label: "Daily Napper", description: "A 20-30 minute nap is part of my daily routine, I'm more productive after." }
          ]
        }
      ]
    },
    {
      title: "Eating & Health Habits",
      questions: [
        {
          id: "breakfast_time",
          text: "What time do you usually eat breakfast?",
          type: "mcq",
          options: [
            { value: "early", label: "Early Breakfast (6-8 AM)", description: "I wake up hungry and need fuel to start my day right." },
            { value: "standard", label: "Standard Breakfast (8-10 AM)", description: "I ease into eating, usually hungry by 9 AM" },
            { value: "late", label: "Late Breakfast (10-12 PM)", description: "I'm not hungry in the morning, brunch timing works better." },
            { value: "skip", label: "Breakfast Skipper", description: "I rarely feel hungry in the morning and prefer to start with lunch." }
          ]
        },
        {
          id: "lunch_time",
          text: "What time do you typically eat lunch?",
          type: "mcq",
          options: [
            { value: "early", label: "Early Luncher (11 AM-12 PM)", description: "I get hungry by 11:30, early lunch keeps me energized" },
            { value: "standard", label: "Standard Luncher (12-1 PM)", description: "Classic lunch hour works perfectly for my schedule" },
            { value: "late", label: "Late Luncher (1-2 PM)", description: "I get absorbed in work, often eat lunch around 1:30 PM" },
            { value: "irregular", label: "Irregular Luncher (After 2 PM or skip)", description: "I often forget to eat lunch or grab something very late." }
          ]
        },
        {
          id: "dinner_time",
          text: "What time do you usually eat dinner?",
          type: "mcq",
          options: [
            { value: "early", label: "Early Dinner (5-6 PM)", description: "I prefer eating early; it gives me time to digest before evening activities." },
            { value: "standard", label: "Standard Dinner (6-7 PM)", description: "Classic dinner time, works well with family/social schedules" },
            { value: "late", label: "Late Dinner (7-8 PM)", description: "I like having dinner after unwinding from the day." },
            { value: "very_late", label: "Very Late Dinner (After 8 PM)", description: "I often work late; dinner is usually my last activity." }
          ]
        },
        {
          id: "caffeine",
          text: "How much caffeine do you typically consume daily?",
          type: "mcq",
          options: [
            { value: "none", label: "Caffeine-Free", description: "I avoid caffeine completely, prefer natural energy" },
            { value: "light", label: "Light User (1 cup)", description: "One morning coffee is enough, more makes me jittery." },
            { value: "moderate", label: "Moderate User (2-3 cups)", description: "I need my morning coffee plus an afternoon pick-me-up" },
            { value: "heavy", label: "Heavy User (4+ cups)", description: "I'm powered by caffeine throughout the day, it doesn't affect my sleep." }
          ]
        },
        {
          id: "meal_consistency",
          text: "How consistent are your meal times?",
          type: "mcq",
          options: [
            { value: "very_consistent", label: "Very Consistent", description: "I eat at almost the same times every day, my body expects it" },
            { value: "mostly_consistent", label: "Mostly Consistent", description: "Generally regular, but weekends or busy days throw me off" },
            { value: "sometimes_irregular", label: "Sometimes Irregular", description: "I try to be consistent, but work/life often disrupts my schedule" },
            { value: "very_irregular", label: "Very Irregular", description: "I eat when I'm hungry or remember to, timing varies wildly" }
          ]
        }
      ]
    },
    {
      title: "Exercise & Physical Activity",
      questions: [
        {
          id: "workout_time",
          text: "What time do you typically work out?",
          type: "mcq",
          options: [
            { value: "early_morning", label: "Early Morning (6-8 AM)", description: "I love starting my day with exercise, it gives me energy for everything else." },
            { value: "late_morning", label: "Late Morning (8 AM-12 PM)", description: "After my morning routine, before the day gets too busy." },
            { value: "afternoon", label: "Afternoon (12-5 PM)", description: "Lunch break or afternoon workouts help break up my day" },
            { value: "evening", label: "Evening (5-9 PM)", description: "Exercise is how I decompress and transition from work mode" }
          ]
        },
        {
          id: "exercise_frequency",
          text: "How many days per week do you usually exercise?",
          type: "mcq",
          options: [
            { value: "rarely", label: "Rarely Active (0-1 days)", description: "I know I should exercise more, but I struggle to make it a habit." },
            { value: "occasionally", label: "Occasionally Active (2-3 days)", description: "I aim for a couple of workouts per week, sometimes more." },
            { value: "regularly", label: "Regularly Active (4-5 days)", description: "Exercise is important to me, I'm consistent most weeks" },
            { value: "highly", label: "Highly Active (6-7 days)", description: "Exercise is a daily non-negotiable, I feel off without it." }
          ]
        },
        {
          id: "workout_duration",
          text: "How long is your typical workout session?",
          type: "mcq",
          options: [
            { value: "quick", label: "Quick Session (15-30 minutes)", description: "I prefer short, intense workouts that fit easily into my day" },
            { value: "standard", label: "Standard Session (30-60 minutes)", description: "45-60 minutes gives me a good workout without taking over my day" },
            { value: "long", label: "Long Session (60-90 minutes)", description: "I like thorough workouts, time to really push myself" },
            { value: "extended", label: "Extended Session (90+ minutes)", description: "When I exercise, I go all in - it's my meditation time" }
          ]
        }
      ]
    },
    {
      title: "Work & Study Patterns",
      questions: [
        {
          id: "work_start_time",
          text: "What time do you typically start your main work/study session?",
          type: "mcq",
          options: [
            { value: "very_early", label: "Very Early Start (6-8 AM)", description: "I love the quiet morning hours, my brain is clearest then" },
            { value: "early", label: "Early Start (8-10 AM)", description: "After my morning routine, I'm ready to tackle the big stuff." },
            { value: "standard", label: "Standard Start (10 AM-12 PM)", description: "Mid-morning is when I hit my stride and focus kicks in" },
            { value: "late", label: "Late Start (After 12 PM)", description: "I'm more of an afternoon/evening person for deep work" }
          ]
        },
        {
          id: "work_hours",
          text: "How many hours do you usually work/study per day?",
          type: "mcq",
          options: [
            { value: "light", label: "Light Schedule (Less than 4 hours)", description: "I prefer focused, efficient work sessions over long hours" },
            { value: "moderate", label: "Moderate Schedule (4-6 hours)", description: "I can maintain good focus for 4-6 hours of quality work" },
            { value: "full", label: "Full Schedule (6-8 hours)", description: "I work a standard full day, with breaks to stay fresh." },
            { value: "intensive", label: "Intensive Schedule (More than 8 hours)", description: "I'm driven and focused, often work 10+ hour days" }
          ]
        },
        {
          id: "project_approach",
          text: "How do you prefer to tackle large projects?",
          type: "mcq",
          options: [
            { value: "breakdown", label: "Task Breakdown Expert", description: "I break everything into small, manageable pieces - it feels less overwhelming." },
            { value: "deep_work", label: "Deep Work Advocate", description: "I like to dive deep and work on projects for hours at a time." },
            { value: "flexible", label: "Flexible Approach", description: "I mix short bursts and long sessions depending on my energy and the task." },
            { value: "dependent", label: "Project-Dependent", description: "It really depends on the type of work - creative vs analytical needs different approaches" }
          ]
        },
        {
          id: "difficult_task_approach",
          text: "When facing a difficult task, you typically:",
          type: "mcq",
          options: [
            { value: "eat_frog", label: "Eat the Frog", description: "I tackle the hardest thing first when my willpower is strongest" },
            { value: "warm_up", label: "Warm-Up Strategy", description: "I ease in with simpler tasks to build momentum and confidence." },
            { value: "energy_optimization", label: "Energy Optimization", description: "I save difficult tasks for when I naturally have the most mental energy." },
            { value: "procrastination", label: "Procrastination Pattern", description: "I'll be honest - I often put difficult tasks off until I have no choice" }
          ]
        }
      ]
    },
    {
      title: "Break & Relaxation Preferences",
      questions: [
        {
          id: "work_session_length",
          text: "How long are your ideal work sessions before taking a break?",
          type: "mcq",
          options: [
            { value: "short", label: "Short Bursts (25-30 minutes)", description: "I work best in focused sprints, then need a reset" },
            { value: "standard", label: "Standard Focus (45-60 minutes)", description: "About an hour of focused work, then I need to step away." },
            { value: "deep_dive", label: "Deep Dive (90+ minutes)", description: "When I'm in the zone, I can go for hours without stopping." },
            { value: "variable", label: "Variable Length", description: "Depends on the task and my energy - I listen to my body and brain" }
          ]
        },
        {
          id: "break_type",
          text: "What type of breaks help you recharge most?",
          type: "mcq",
          options: [
            { value: "movement", label: "Movement Breaks", description: "I need to get my body moving - walks, stretches, quick workouts" },
            { value: "social", label: "Social Recharge", description: "Talking to people energizes me, even brief conversations help." },
            { value: "solitude", label: "Solitude Reset", description: "I need quiet alone time to process and recharge my mental batteries." },
            { value: "creative", label: "Creative Escape", description: "Doing something creative or playful helps reset my brain completely." }
          ]
        }
      ]
    },
    {
      title: "Technology & Social Habits",
      questions: [
        {
          id: "social_media_hours",
          text: "How many hours do you spend on social media daily?",
          type: "mcq",
          options: [
            { value: "minimal", label: "Minimal User (Less than 1 hour)", description: "I check occasionally but prefer to minimize social media time" },
            { value: "light", label: "Light User (1-2 hours)", description: "Some morning and evening scrolling, but I'm pretty disciplined" },
            { value: "moderate", label: "Moderate User (2-4 hours)", description: "I enjoy social media throughout the day, it's part of my routine." },
            { value: "heavy", label: "Heavy User (More than 4 hours)", description: "Social media is a big part of how I connect and get information." }
          ]
        },
        {
          id: "notifications",
          text: "How do you handle notifications during focused work?",
          type: "mcq",
          options: [
            { value: "blocker", label: "Notification Blocker", description: "All notifications off - I check messages when I decide to, not when they arrive" },
            { value: "selective", label: "Selective Filter", description: "Only truly urgent things can interrupt me; everything else waits." },
            { value: "controlled", label: "Controlled Interruptions", description: "Some notifications are okay, I can usually refocus quickly." },
            { value: "open_door", label: "Open Door Policy", description: "I don't mind interruptions, I can multitask and stay productive." }
          ]
        }
      ]
    },
    {
      title: "Learning & Organization",
      questions: [
        {
          id: "learning_style",
          text: "How do you prefer to learn new information?",
          type: "mcq",
          options: [
            { value: "visual", label: "Visual Learner", description: "I need to see it - diagrams, written instructions, visual examples work best" },
            { value: "auditory", label: "Auditory Learner", description: "I learn through listening - podcasts, explanations, talking through ideas" },
            { value: "kinesthetic", label: "Kinesthetic Learner", description: "I learn by doing - hands-on practice and experimentation" },
            { value: "social", label: "Social Learner", description: "I learn best through discussion, teaching others, and collaborative exploration." }
          ]
        },
        {
          id: "organization_style",
          text: "How do you prefer to organize your day?",
          type: "mcq",
          options: [
            { value: "detailed_scheduler", label: "Detailed Scheduler", description: "I time-block everything, a detailed calendar keeps me on track" },
            { value: "list_maker", label: "List Maker", description: "Simple to-do lists work perfectly. I like checking things off." },
            { value: "mental_organizer", label: "Mental Organizer", description: "I keep track of everything in my head; external tools feel restrictive." },
            { value: "flow_follower", label: "Flow Follower", description: "I prefer to stay flexible and respond to what feels right in the moment." }
          ]
        },
        {
          id: "work_environment",
          text: "What's your ideal work environment?",
          type: "mcq",
          options: [
            { value: "silence", label: "Complete Silence", description: "Any noise distracts me; I need total quiet to think clearly." },
            { value: "background_music", label: "Background Music", description: "Instrumental music or familiar songs help me focus and stay energized" },
            { value: "natural_ambience", label: "Natural Ambience", description: "White noise, nature sounds, or coffee shop atmosphere is perfect" },
            { value: "active_environment", label: "Active Environment", description: "I actually focus better with some activity and energy around me" }
          ]
        }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const isCurrentSectionComplete = () => {
    const currentSectionQuestions = sections[currentSection].questions;
    return currentSectionQuestions.every(q => formData[q.id]);
  };

  const totalQuestions = sections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(formData).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const renderQuestion = (question) => {
    if (question.type === 'mcq') {
      return (
        <div key={question.id} className="question">
          <div className="question-text">{question.text}</div>
          <div className="options">
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`option ${formData[question.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <div className="option-label">{option.label}</div>
                <div className="option-description">{option.description}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        Section {currentSection + 1} of {sections.length} • {answeredQuestions} of {totalQuestions} questions answered
      </div>

      <div className="section">
        <h2 className="section-title">{sections[currentSection].title}</h2>
        {sections[currentSection].questions.map(renderQuestion)}
      </div>

      <div className="button-container">
        {currentSection > 0 && (
          <button className="button secondary" onClick={handlePrevious}>
            Previous
          </button>
        )}
        <button 
          className="button" 
          onClick={handleNext}
          disabled={!isCurrentSectionComplete()}
        >
          {currentSection === sections.length - 1 ? 'Complete Assessment' : 'Next Section'}
        </button>
      </div>
    </div>
  );
};

export default InitialAssessment;
