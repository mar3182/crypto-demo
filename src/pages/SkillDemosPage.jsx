import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Button, Card, CardBody, CardHeader, RadioGroup, Radio, Divider } from '@nextui-org/react';

const SkillDemosPage = () => {
  const { isConnected, connectWallet } = useWallet();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Sample quiz questions
  const questions = [
    {
      id: 1,
      question: "Which of the following is NOT a valid Solidity event declaration?",
      options: [
        "event Transfer(address indexed from, address indexed to, uint256 value);",
        "event Approval(address owner, address spender, uint256 value);",
        "event NewOwner indexed(address oldOwner, address newOwner);",
        "event Paused(address account);"
      ],
      correctAnswer: 2 // zero-based index
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
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Which React hook would you use to run code only when a component mounts?",
      options: [
        "useEffect(() => {}, [])",
        "useState()",
        "useCallback(() => {}, [])",
        "useEffect(() => {})"
      ],
      correctAnswer: 0
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
      correctAnswer: 1
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
      correctAnswer: 0
    }
  ];
  
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-background-card">
              <CardHeader className="border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-bold">Interactive Solidity & React Quiz</h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Test your knowledge of blockchain development concepts, Solidity programming, and React fundamentals.
                </p>
                <Button 
                  color="primary" 
                  onClick={() => setCurrentQuestion(0)}
                  className="w-full bg-primary text-black font-semibold"
                >
                  Start Quiz
                </Button>
              </CardBody>
            </Card>
            
            <Card className="bg-background-card">
              <CardHeader className="border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-bold">Solidity Code Review Challenge</h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Review code snippets, find bugs, and suggest optimizations for smart contract security.
                </p>
                <Button 
                  color="primary" 
                  className="w-full bg-background-secondary text-text-secondary border border-gray-700"
                  isDisabled
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    Coming Soon
                  </span>
                </Button>
              </CardBody>
            </Card>
          </div>
          
          {/* Quiz Modal/Section */}
          {(currentQuestion >= 0 || isQuizCompleted) && (
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
                      <p>You've demonstrated excellent knowledge of blockchain development concepts.</p>
                    </div>
                  ) : score >= Math.floor(questions.length / 2) ? (
                    <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-primary font-medium">Good job!</p>
                      <p>You have a solid understanding of blockchain development.</p>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-background-secondary rounded-lg">
                      <p className="font-medium">Keep learning!</p>
                      <p>You might want to review some blockchain development fundamentals.</p>
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
                    <h3 className="text-xl font-bold">Question {currentQuestion + 1}/{questions.length}</h3>
                    <span className="text-text-secondary">
                      {Object.keys(selectedAnswers).length}/{questions.length} answered
                    </span>
                  </div>
                  
                  <div className="mb-6 p-4 bg-background-dark rounded-lg">
                    <p className="text-lg font-medium">{questions[currentQuestion].question}</p>
                  </div>
                  
                  <RadioGroup
                    value={selectedAnswers[questions[currentQuestion].id]?.toString() || ""}
                    onValueChange={(value) => handleAnswerSelect(questions[currentQuestion].id, parseInt(value))}
                    className="mb-8"
                  >
                    {questions[currentQuestion].options.map((option, index) => (
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
                      isDisabled={currentQuestion === 0}
                      className="text-text-secondary border-text-secondary"
                    >
                      Previous
                    </Button>
                    
                    <Button 
                      color="primary" 
                      onClick={handleNext}
                      isDisabled={selectedAnswers[questions[currentQuestion].id] === undefined}
                      className="bg-primary text-black font-semibold"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
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
