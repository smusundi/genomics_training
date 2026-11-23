
import { useState } from 'react'
import {
  Dna,
  ArrowLeft,
  ArrowRight,
  Activity,
  Menu,
  X
} from 'lucide-react'

const questions = [
  {
    title: 'Initial outbreak response',
    briefing: `Early 2024 · Coastal Kenya

An eye clinic reports that 13 patients have presented with redness of the eyes over a short period. The cause is unknown, and the local public health team has been notified.`,
    question: 'You are the public health officer responding to this notification. What do you do?',
    options: [
      {
        id: 'A',
        text: 'Immediately declare an outbreak and initiate mass treatment of the affected population.'
      },
      {
        id: 'B',
        text: 'Visit the clinic, verify the reported cases, establish a working case definition and initiate preliminary investigations.'
      },
      {
        id: 'C',
        text: 'Immediately collect samples from all patients and begin whole-genome sequencing.'
      },
      {
        id: 'D',
        text: 'Issue a public alert before investigating the reported cases.'
      }
    ],
    correct: 'B',
    explanation: 'The first step is to verify the notification and investigate the reported cases. Establishing a working case definition helps identify additional cases and determine whether the reports represent a genuine cluster. Other response activities can proceed alongside these initial investigations.'
  },
  {
    title: 'Developing a case definition',
    briefing: `You visit the clinic and confirm that the reported patients have similar eye symptoms. You are asked to investigate whether additional people in the community have experienced the same illness.`,
    question: 'What is the most appropriate next step?',
    options: [
      {
        id: 'A',
        text: 'Develop a working case definition based on clinical features, place and time, then actively search for additional cases.'
      },
      {
        id: 'B',
        text: 'Assume that everyone with red eyes in the county has the same infection.'
      },
      {
        id: 'C',
        text: 'Restrict the investigation to the 13 patients already reported.'
      },
      {
        id: 'D',
        text: 'Wait for genomic sequencing results before conducting further epidemiological investigations.'
      }
    ],
    correct: 'A',
    explanation: 'A working case definition provides consistent criteria for identifying and classifying cases. It should include relevant clinical features, a time period and a geographical area. Active case finding can then help determine the extent of the event.'
  }
]

const scenarios = [
  {
    id: '01',
    title: 'Scenario 01',
    description: 'Investigating an unexplained disease event using epidemiological and genomic evidence.',
    available: true
  },
  {
    id: '02',
    title: 'Scenario 02',
    description: 'An emerging infectious disease investigation.',
    available: false
  },
  {
    id: '03',
    title: 'Scenario 03',
    description: 'Pathogen identification and genomic surveillance.',
    available: false
  },
  {
    id: '04',
    title: 'Scenario 04',
    description: 'Genetic diversity and evolutionary relationships.',
    available: false
  },
  {
    id: '05',
    title: 'Scenario 05',
    description: 'Using genomic evidence to support public health decisions.',
    available: false
  }
]

function App() {
  const [selectedScenario, setSelectedScenario] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const currentQuestion = questions[questionIndex]

  function openScenario() {
    setSelectedScenario(true)
    setQuestionIndex(0)
    setAnswer('')
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goHome() {
    setSelectedScenario(false)
    setQuestionIndex(0)
    setAnswer('')
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
      setAnswer('')
      setSubmitted(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function previousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
      setAnswer('')
      setSubmitted(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#" onClick={goHome}>
          <div className="brand-icon">
            <Dna size={25} />
          </div>
          <div>
            <strong>VIRAL GENOMICS</strong>
            <span>TABLETOP TRAINING HUB</span>
          </div>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#scenarios" onClick={() => {
            goHome()
            setMenuOpen(false)
          }}>
            Scenarios
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
      </header>

      <main>
        {!selectedScenario ? (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">
                  GENOMIC SURVEILLANCE · INTERACTIVE LEARNING
                </span>

                <h1>
                  From genomic data
                  <br />
                  to public health action.
                </h1>

                <p>
                  Investigate infectious disease events through
                  interactive questions, epidemiological evidence
                  and genomic data.
                </p>

                <a href="#scenarios" className="primary-button">
                  Explore scenarios <ArrowRight size={18} />
                </a>

                <div className="hero-stats">
                  <div>
                    <strong>05</strong>
                    <span>Scenarios</span>
                  </div>
                  <div>
                    <strong>01</strong>
                    <span>Available now</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Open access</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="content-section" id="scenarios">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">LEARNING ENVIRONMENT</span>
                  <h2>Investigation scenarios</h2>
                  <p>Select a scenario to begin your investigation.</p>
                </div>
              </div>

              <div className="module-grid">
                {scenarios.map((scenario) => (
                  <article className="module-card" key={scenario.id}>
                    <div className="module-top">
                      <div className="module-icon">
                        <Activity size={26} />
                      </div>
                      <span className={`status ${scenario.available ? 'available' : ''}`}>
                        {scenario.available ? 'Available' : 'Coming soon'}
                      </span>
                    </div>

                    <span className="module-category">
                      OUTBREAK INVESTIGATION
                    </span>

                    <h3>{scenario.title}</h3>
                    <p>{scenario.description}</p>

                    <button
                      className={`module-link ${scenario.available ? 'active' : ''}`}
                      disabled={!scenario.available}
                      onClick={openScenario}
                    >
                      {scenario.available ? 'Start scenario' : 'Coming soon'}
                      {scenario.available && <ArrowRight size={17} />}
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="about-section" id="about">
              <div>
                <span className="eyebrow">ABOUT THE PLATFORM</span>
                <h2>Learn through investigation.</h2>
                <p>
                  Work through realistic outbreak scenarios, interpret
                  evidence and develop your understanding of viral
                  genomic surveillance.
                </p>
              </div>
            </section>
          </>
        ) : (
          <section className="scenario-page">
            <button className="back-button" onClick={goHome}>
              <ArrowLeft size={17} /> Back to scenarios
            </button>

            <div className="scenario-hero">
              <span className="eyebrow">SCENARIO 01 · CASE INVESTIGATION</span>
              <h1>Investigation of an unexplained disease event</h1>
              <p>Work through the investigation one question at a time.</p>
            </div>

            <div className="question-page">
              <div className="question-progress">
                <span className="eyebrow">
                  QUESTION {String(questionIndex + 1).padStart(2, '0')}
                </span>
                <span className="question-counter">
                  {questionIndex + 1} of {questions.length}
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((questionIndex + 1) / questions.length) * 100}%`
                  }}
                />
              </div>

              <h2>{currentQuestion.title}</h2>

              <div className="notice">
                <Activity size={22} />
                <div>
                  <strong>Situation update</strong>
                  <p>{currentQuestion.briefing}</p>
                </div>
              </div>

              <div className="question-content">
                <h3>{currentQuestion.question}</h3>

                <div className="answer-options">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.id}
                      className={`answer-option ${
                        answer === option.id ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={option.id}
                        checked={answer === option.id}
                        disabled={submitted}
                        onChange={() => setAnswer(option.id)}
                      />
                      <span className="option-letter">{option.id}</span>
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>

                {!submitted ? (
                  <button
                    className="primary-button"
                    disabled={!answer}
                    onClick={() => setSubmitted(true)}
                  >
                    Submit answer <ArrowRight size={18} />
                  </button>
                ) : (
                  <>
                    <div className="notice answer-feedback">
                      <div>
                        <strong>
                          {answer === currentQuestion.correct
                            ? 'Correct answer!'
                            : 'Not quite. Review the explanation.'}
                        </strong>
                        <p>{currentQuestion.explanation}</p>
                      </div>
                    </div>

                    <div className="question-navigation">
                      <button
                        className="back-button"
                        onClick={previousQuestion}
                        disabled={questionIndex === 0}
                      >
                        <ArrowLeft size={17} /> Previous
                      </button>

                      {questionIndex < questions.length - 1 ? (
                        <button
                          className="primary-button"
                          onClick={nextQuestion}
                        >
                          Next question <ArrowRight size={18} />
                        </button>
                      ) : (
                        <button
                          className="primary-button"
                          onClick={goHome}
                        >
                          Finish scenario <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="footer-brand">
          VIRAL GENOMICS · TABLETOP TRAINING HUB
        </div>
        <p>Open-access educational resource for genomic surveillance.</p>
        <span>© 2026 · Training and research education</span>
      </footer>
    </div>
  )
}

export default App
