
// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Knowledge base about FTC and the website
const knowledgeBase = {
    ftc: {
        keywords: ['ftc', 'first tech challenge', 'tech challenge', 'competition', 'robot'],
        responses: [
            "FIRST Tech Challenge (FTC) is a robotics competition for students in grades 7-12 (ages 12-18). Teams design, build, and program robots to compete in exciting challenges!",
            "FTC competitions have three parts: autonomous period (robot runs on pre-programmed instructions), driver-controlled period, and end game. Teams compete in 2-vs-2 alliance matches on a 12' x 12' field.",
            "Each FTC season starts in September with a new game challenge. Teams work all season to build their robots and compete at local qualifiers, regional championships, and potentially the World Championship in Houston, Texas!"
        ]
    },
    fll: {
        keywords: ['fll', 'first lego league', 'lego', 'younger', 'elementary'],
        responses: [
            "FIRST LEGO League (FLL) is for ages 4-16! It has three divisions: Discover (ages 4-6) with LEGO DUPLO, Explore (ages 6-10) with SPIKE Essential, and Challenge (ages 9-16) with SPIKE Prime.",
            "FLL Challenge includes four components: Robot Game missions, Innovation Project research, Core Values judging, and Robot Design presentation. It's a great way to learn coding and engineering!",
            "The current FLL season is UNEARTHED™ where teams explore archaeology and history, investigating how we discover and preserve the past."
        ]
    },
    team: {
        keywords: ['team', 'join', 'member', 'how to join', 'participate'],
        responses: [
            "We welcome students of all skill levels! Whether you're interested in FTC or FLL, there's a spot for you. Contact us at robotics@friscomasjid.org to learn more about joining.",
            "Our teams focus on innovation, competition, and fierce dedication. We have roles for everyone - programming, building, design, outreach, and more!",
            "Check out our Teams page to learn about our competitive FTC team and our FLL programs. We're always looking for passionate students!"
        ]
    },
    location: {
        keywords: ['location', 'where', 'address', 'meet', 'practice'],
        responses: [
            "We meet at the Islamic Association of North Texas (IANT) Frisco Masjid, located at 8400 Stacy Road, McKinney, TX 75070.",
            "You can find us at IANT Frisco Masjid on Stacy Road in McKinney. Check our Events page for practice schedules and upcoming meetings!"
        ]
    },
    contact: {
        keywords: ['contact', 'email', 'reach', 'phone', 'message'],
        responses: [
            "You can reach us at robotics@friscomasjid.org! We'd love to hear from you whether you're interested in joining, volunteering, or supporting our team.",
            "Contact us through our Contact page or email robotics@friscomasjid.org. We're here to answer any questions you have about our programs!"
        ]
    },
    awards: {
        keywords: ['awards', 'achievements', 'won', 'success'],
        responses: [
            "We've won 10+ awards including the Think Award, Connect Award, Design Award, Motivate Award, Innovate Award, and Control Award!",
            "Our teams have been recognized for outstanding engineering documentation, community outreach, robot design excellence, and programming innovation!"
        ]
    },
    programming: {
        keywords: ['programming', 'code', 'coding', 'java', 'blocks'],
        responses: [
            "In FTC, students can program robots using blocks-based or text-based coding (Java). You'll learn about autonomous programming, sensor integration, and AI technologies!",
            "FLL uses block-based programming with LEGO SPIKE systems. It's a great introduction to coding concepts and computational thinking!"
        ]
    }
};

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotToggle.style.display = 'none';
    chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    chatbotToggle.style.display = 'flex';
});

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Generate bot response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    
    messageDiv.appendChild(bubble);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate response based on keywords
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each category for keyword matches
    for (const category in knowledgeBase) {
        const { keywords, responses } = knowledgeBase[category];
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Default responses for unmatched queries
    const defaultResponses = [
        "That's a great question! You can find more information on our website. Try checking the 'What is Robotics?' page for details about FTC and FLL, or our Teams page to learn about our programs.",
        "I'm here to help with questions about FTC, FLL, and our teams! You can also contact us directly at robotics@friscomasjid.org for more specific information.",
        "Hmm, I'm not sure about that one! But you can explore our website pages - we have info about our programs, teams, events, and how to get involved. Or email us at robotics@friscomasjid.org!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
