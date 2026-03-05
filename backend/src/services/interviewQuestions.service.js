const SKILL_QUESTIONS = {
    javascript: [
        "What is the difference between var, let, and const in JavaScript?",
        "Explain closures in JavaScript with an example.",
        "What is the event loop in Node.js?",
    ],
    typescript: [
        "What are generics in TypeScript and why are they useful?",
        "Explain the difference between interface and type in TypeScript.",
    ],
    react: [
        "What are React hooks and how do they differ from class-based lifecycle methods?",
        "Explain the virtual DOM and reconciliation process in React.",
        "What is the difference between useEffect and useLayoutEffect?",
    ],
    "node.js": [
        "What is the event loop in Node.js and how does it handle concurrency?",
        "Explain middleware in Express.js.",
        "What is the difference between process.nextTick() and setImmediate()?",
    ],
    python: [
        "What is the difference between a list and a tuple in Python?",
        "Explain decorators in Python with an example.",
        "What are Python generators and when would you use them?",
    ],
    java: [
        "What is the difference between an abstract class and an interface in Java?",
        "Explain the Java garbage collection mechanism.",
    ],
    sql: [
        "What are SQL indexes and how do they improve query performance?",
        "Explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN.",
        "What is database normalization? Explain up to 3NF.",
    ],
    mongodb: [
        "What is the difference between SQL and NoSQL databases?",
        "Explain aggregation pipelines in MongoDB.",
    ],
    "machine learning": [
        "What is overfitting and how can you prevent it?",
        "Explain the bias-variance tradeoff.",
        "What is the difference between supervised and unsupervised learning?",
    ],
    "deep learning": [
        "What is backpropagation and how does it work?",
        "Explain the vanishing gradient problem.",
    ],
    tensorflow: [
        "How do you build a neural network using TensorFlow/Keras?",
        "What is a computational graph in TensorFlow?",
    ],
    pytorch: [
        "What is dynamic computation graphs in PyTorch?",
        "How does autograd work in PyTorch?",
    ],
    docker: [
        "What is the difference between a Docker image and a container?",
        "Explain Docker volumes and their use cases.",
    ],
    kubernetes: [
        "What is a Kubernetes Pod and how does it differ from a container?",
        "Explain the concept of Services and Ingress in Kubernetes.",
    ],
    aws: [
        "What is the difference between EC2, Lambda, and ECS in AWS?",
        "Explain the concept of IAM roles and policies in AWS.",
    ],
    git: [
        "What is the difference between git merge and git rebase?",
        "Explain the Git branching strategy you follow.",
    ],
    html: [
        "What are semantic HTML elements and why are they important?",
        "Explain the difference between block and inline elements.",
    ],
    css: [
        "What is the CSS box model?",
        "Explain the difference between Flexbox and CSS Grid.",
    ],
    express: [
        "What is middleware in Express.js and how does it work?",
        "How do you handle errors globally in an Express application?",
    ],
    django: [
        "What is the Django ORM and how does it differ from raw SQL?",
        "Explain the MTV architecture in Django.",
    ],
    flask: [
        "What are Flask blueprints and how do you use them?",
        "How does Flask handle request context?",
    ],
    redis: [
        "What are the primary use cases for Redis?",
        "Explain Redis data structures and when to use each.",
    ],
    graphql: [
        "What is the difference between GraphQL and REST?",
        "Explain resolvers in GraphQL.",
    ],
};

export const generateInterviewQuestions = (detectedSkills, count = 5) => {
    const questions = [];

    for (const skill of detectedSkills) {
        const skillKey = skill.toLowerCase();
        const pool = SKILL_QUESTIONS[skillKey];
        if (pool) {
            // Pick 1 random question from this skill's pool
            const randomQ = pool[Math.floor(Math.random() * pool.length)];
            questions.push(randomQ);
        }
    }

    // If we don't have enough, add generic questions
    const genericQuestions = [
        "Tell me about a challenging project you worked on and how you solved technical problems.",
        "How do you stay updated with the latest technologies?",
        "Describe your experience working in a team environment.",
        "What is your approach to debugging a complex issue?",
        "How do you ensure code quality in your projects?",
    ];

    while (questions.length < count) {
        const q = genericQuestions[questions.length % genericQuestions.length];
        if (!questions.includes(q)) {
            questions.push(q);
        } else {
            break;
        }
    }

    return questions.slice(0, count);
};
