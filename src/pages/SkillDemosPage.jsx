import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Button, Card, CardBody, CardHeader, RadioGroup, Radio, Divider, Tabs, Tab } from '@nextui-org/react';

const SkillDemosPage = () => {
  const { isConnected, connectWallet } = useWallet();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeTab, setActiveTab] = useState("solidity");
  
  // Sample Solidity quiz questions
  const solidityQuestions = [
    {
      id: 1,
      question: "Which of the following is NOT a valid Solidity event declaration?",
      options: [
        "event Transfer(address indexed from, address indexed to, uint256 value);",
        "event Approval(address owner, address spender, uint256 value);",
        "event NewOwner indexed(address oldOwner, address newOwner);",
        "event Paused(address account);"
      ],
      correctAnswer: 2, // zero-based index
      explanation: "The 'indexed' keyword should be placed before the parameter name, not after the event name."
    },
    {
      id: 2,
      question: "What does the 'memory' keyword indicate in Solidity?",
      options: [
        "Data will be stored permanently on the blockchain",
        "Data is stored temporarily during function execution",
        "Data is stored in calldata and cannot be modified",
        "Data is stored in the stack and has limited size"
      ],
      correctAnswer: 1,
      explanation: "The 'memory' keyword in Solidity indicates that data is stored temporarily during function execution."
    },
    {
      id: 4,
      question: "What's the purpose of the 'payable' modifier in Solidity?",
      options: [
        "It makes functions cheaper to execute",
        "It allows functions to receive Ether",
        "It ensures functions can only be called by the contract owner",
        "It guarantees functions will never revert"
      ],
      correctAnswer: 1,
      explanation: "The 'payable' modifier allows functions to receive Ether when they are called."
    },
    {
      id: 5,
      question: "Which tool is commonly used for Ethereum smart contract testing?",
      options: [
        "Truffle",
        "Webpack",
        "Babel",
        "ESLint"
      ],
      correctAnswer: 0,
      explanation: "Truffle is a popular development framework for Ethereum that includes testing functionality."
    }
  ];
  
  // Sample React quiz questions
  const reactQuestions = [
    {
      id: 1,
      question: "Which React hook would you use to run code only when a component mounts?",
      options: [
        "useEffect(() => {}, [])",
        "useState()",
        "useCallback(() => {}, [])",
        "useEffect(() => {})"
      ],
      correctAnswer: 0,
      explanation: "useEffect with an empty dependency array runs only once when a component mounts."
    },
    {
      id: 2,
      question: "What is the purpose of React.memo?",
      options: [
        "To memorize the entire application state",
        "To optimize performance by skipping re-renders when props don't change",
        "To create a memoized version of a function",
        "To store values that persist across renders"
      ],
      correctAnswer: 1,
      explanation: "React.memo is a higher-order component that optimizes performance by preventing unnecessary re-renders."
    },
    {
      id: 3,
      question: "Which of the following is NOT a React Hook?",
      options: [
        "useEffect",
        "useState",
        "useDispatch",
        "useHistory"
      ],
      correctAnswer: 2,
      explanation: "useDispatch is not a built-in React Hook; it's from the React-Redux library."
    },
    {
      id: 4,
      question: "What's the correct way to conditionally render a component in React?",
      options: [
        "if (condition) { return <Component /> }",
        "{condition && <Component />}",
        "render={condition ? <Component /> : null}",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All of these approaches are valid ways to conditionally render components in React."
    }
  ];
  
  // Get current questions based on active tab
  const getActiveQuestions = () => {
    switch(activeTab) {
      case "solidity":
        return solidityQuestions;
      case "react":
        return reactQuestions;
      default:
        return solidityQuestions;
    }
  };
  
  const questions = getActiveQuestions();
  
  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctAnswers++;
        }
      });
      
      setScore(correctAnswers);
      setIsQuizCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setIsQuizCompleted(false);
    setScore(0);
  };
  
  const handleTabChange = (key) => {
    setActiveTab(key);
    resetQuiz();
  };
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Skill Demonstrations</h1>
      
      {!isConnected ? (
        <div className="bg-background-card rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="mb-6 text-text-secondary">
            Connect your wallet to access interactive skill demonstrations and quizzes.
          </p>
          <Button 
            color="primary" 
            onClick={connectWallet}
            className="bg-primary text-black font-semibold"
          >
            Connect MetaMask
          </Button>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <Tabs 
              selectedKey={activeTab}
              onSelectionChange={handleTabChange}
              variant="bordered"
              classNames={{
                tab: "data-[selected=true]:text-primary data-[selected=true]:border-primary",
                cursor: "bg-primary",
                tabList: "border-gray-800"
              }}
            >
              <Tab key="solidity" title="Solidity Skills">
                <Card className="bg-background-card mt-4">
                  <CardHeader className="border-b border-gray-800 pb-4">
                    <h2 className="text-2xl font-bold">Solidity & Smart Contract Quiz</h2>
                  </CardHeader>
                  <CardBody>
                    <p className="mb-4">
                      Test your knowledge of Solidity, smart contracts, and Ethereum development.
                    </p>
                    {!isQuizCompleted && currentQuestion === 0 && (
                      <Button 
                        color="primary" 
                        onClick={() => setCurrentQuestion(0)}
                        className="w-full bg-primary text-black font-semibold"
                      >
                        Start Quiz
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="react" title="React Skills">
                <Card className="bg-background-card mt-4">
                  <CardHeader className="border-b border-gray-800 pb-4">
                    <h2 className="text-2xl font-bold">React & Frontend Development Quiz</h2>
                  </CardHeader>
                  <CardBody>
                    <p className="mb-4">
                      Test your knowledge of React, state management, and modern frontend development.
                    </p>
                    {!isQuizCompleted && currentQuestion === 0 && (
                      <Button 
                        color="primary" 
                        onClick={() => setCurrentQuestion(0)}
                        className="w-full bg-primary text-black font-semibold"
                      >
                        Start Quiz
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="debugging" title="Debugging Challenge" isDisabled>
                <Card className="bg-background-card mt-4">
                  <CardHeader className="border-b border-gray-800 pb-4">
                    <h2 className="text-2xl font-bold">Code Debugging Challenge</h2>
                  </CardHeader>
                  <CardBody>
                    <p className="mb-4">
                      Find and fix bugs in code snippets - challenge coming soon!
                    </p>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
          
          {/* Quiz Modal/Section */}
          {(currentQuestion > 0 || isQuizCompleted) && (
            <div className="bg-background-card rounded-lg p-6 mb-8">
              {isQuizCompleted ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                  <p className="text-xl mb-6">
                    Your score: <span className="text-primary font-bold">{score}</span> out of {questions.length}
                  </p>
                  
                  {score === questions.length ? (
                    <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-primary font-medium">Congratulations! Perfect score!</p>
                      <p>You've demonstrated excellent knowledge of {activeTab === "solidity" ? "blockchain development" : "React"} concepts.</p>
                    </div>
                  ) : score >= Math.floor(questions.length / 2) ? (
                    <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-primary font-medium">Good job!</p>
                      <p>You have a solid understanding of {activeTab === "solidity" ? "blockchain development" : "React"}.</p>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-background-secondary rounded-lg">
                      <p className="font-medium">Keep learning!</p>
                      <p>You might want to review some {activeTab === "solidity" ? "blockchain development" : "React"} fundamentals.</p>
                    </div>
                  )}
                  
                  <Button 
                    color="primary" 
                    onClick={resetQuiz}
                    className="bg-primary text-black font-semibold"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-bold">Question {currentQuestion}/{questions.length}</h3>
                    <span className="text-text-secondary">
                      {Object.keys(selectedAnswers).length}/{questions.length} answered
                    </span>
                  </div>
                  
                  <div className="mb-6 p-4 bg-background-dark rounded-lg">
                    <p className="text-lg font-medium">{questions[currentQuestion-1].question}</p>
                  </div>
                  
                  <RadioGroup
                    value={selectedAnswers[questions[currentQuestion-1].id]?.toString() || ""}
                    onValueChange={(value) => handleAnswerSelect(questions[currentQuestion-1].id, parseInt(value))}
                    className="mb-8"
                  >
                    {questions[currentQuestion-1].options.map((option, index) => (
                      <Radio key={index} value={index.toString()} className="mb-3">
                        {option}
                      </Radio>
                    ))}
                  </RadioGroup>
                  
                  <div className="flex justify-between">
                    <Button 
                      color="default" 
                      variant="bordered" 
                      onClick={handlePrevious}
                      isDisabled={currentQuestion === 1}
                      className="text-text-secondary border-text-secondary"
                    >
                      Previous
                    </Button>
                    
                    <Button 
                      color="primary" 
                      onClick={handleNext}
                      isDisabled={selectedAnswers[questions[currentQuestion-1].id] === undefined}
                      className="bg-primary text-black font-semibold"
                    >
                      {currentQuestion < questions.length ? 'Next Question' : 'Complete Quiz'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <Divider className="my-8" />
          
          {/* Coming Soon Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">More Demos Coming Soon</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Additional skill demonstrations including code debugging exercises, 
              live coding challenges, and more will be added in future updates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDemosPage;
