
import { useState, useEffect } from 'react'
import {
  Dna,
  ArrowLeft,
  ArrowRight,
  Activity,
  Menu,
  X,
  Timer
} from 'lucide-react'

const QUESTION_TIME = 120

const questions = [
  {
    title: 'Initial notification',
    briefing: `In early 2024, a clinic in coastal Kenya reports an unusual increase in patients presenting with redness of the eyes. Thirteen patients have been reported over a relatively short period. Community concern is increasing, and the local public health team has been notified. The cause has not been established.`,
    question: 'You have received the notification. Which action should take priority?',
    options: [
      {
        id: 'A',
        text: 'Declare an outbreak immediately and begin population-wide control measures.'
      },
      {
        id: 'B',
        text: 'Visit the clinic, verify the reported cases, review clinical records and establish whether the reports represent an unusual event.'
      },
      {
        id: 'C',
        text: 'Collect specimens from all reported patients and request whole-genome sequencing.'
      },
      {
        id: 'D',
        text: 'Issue a public warning before verifying the reported cases.'
      }
    ]
  },
  {
    title: 'Defining the event',
    briefing: `You visit the clinic and confirm that the reported patients have similar clinical presentations. However, the available records are incomplete, and it is not yet clear whether all patients are part of the same event. You are asked to investigate whether additional people in the community have experienced similar symptoms.`,
    question: 'Which approach would produce the most reliable estimate of the extent of this event?',
    options: [
      {
        id: 'A',
        text: 'Use eye redness alone as the case definition and include every person reporting this symptom.'
      },
      {
        id: 'B',
        text: 'Develop a working case definition using clinical features, time and location, then conduct active case finding.'
      },
      {
        id: 'C',
        text: 'Limit the investigation to patients already recorded at the reporting clinic.'
      },
      {
        id: 'D',
        text: 'Wait until the cause has been identified before defining and searching for cases.'
      }
    ]
  },
  {
    title: 'Specimen selection',
    briefing: `The investigation has identified additional individuals with similar symptoms. You are now planning specimen collection. The clinical presentation is consistent across several patients, but there is no confirmed explanation for the event.`,
    question: 'Which specimen collection strategy would provide the most useful evidence at this stage?',
    options: [
      {
        id: 'A',
        text: 'Collect blood from every patient because systemic specimens are generally more informative than specimens from the affected site.'
      },
      {
        id: 'B',
        text: 'Collect specimens directly from the affected anatomical site, while considering additional specimens where clinically and epidemiologically justified.'
      },
      {
        id: 'C',
        text: 'Collect stool specimens only, because they can contain a wide range of microorganisms.'
      },
      {
        id: 'D',
        text: 'Collect specimens only from patients with the most severe symptoms.'
      }
    ]
  },
  {
    title: 'Investigating possible exposures',
    briefing: `Preliminary interviews suggest that some affected individuals attend the same schools, live in nearby households or have had contact with one another. Other patients do not report an obvious connection. The investigation has not established a common exposure.`,
    question: 'Which interpretation should guide the next stage of the epidemiological investigation?',
    options: [
      {
        id: 'A',
        text: 'The shared locations establish that transmission occurred through contaminated water.'
      },
      {
        id: 'B',
        text: 'The absence of a reported connection in some patients rules out person-to-person spread.'
      },
      {
        id: 'C',
        text: 'Investigate direct contact, shared environments and other common exposures without assuming a single route.'
      },
      {
        id: 'D',
        text: 'The clustering is sufficient to conclude that all cases have the same source.'
      }
    ]
  },
  {
    title: 'Selecting preliminary laboratory investigations',
    briefing: `Specimens have been collected from affected individuals. The clinical team requests an initial laboratory investigation before considering more specialised approaches. You have access to routine culture methods and molecular diagnostic assays.`,
    question: 'Which initial combination of investigations would you prioritise?',
    options: [
      {
        id: 'A',
        text: 'Bacterial culture and pan-adenovirus qPCR.'
      },
      {
        id: 'B',
        text: 'Whole-genome sequencing of every specimen before conducting routine investigations.'
      },
      {
        id: 'C',
        text: 'A single targeted assay selected without reviewing the clinical and epidemiological information.'
      },
      {
        id: 'D',
        text: 'Microscopy alone, without further investigation of specimens with negative findings.'
      }
    ]
  },
  {
    title: 'Interpreting preliminary findings',
    briefing: `Initial investigations have been performed on 20 clinical specimens. Eighteen specimens have not yielded an explanation through the methods used. The remaining findings are inconclusive. The cause of the event remains unresolved.`,
    question: 'What would be the most appropriate next step?',
    options: [
      {
        id: 'A',
        text: 'Conclude that the event is not associated with an infectious agent because most specimens were negative.'
      },
      {
        id: 'B',
        text: 'Review specimen quality, test limitations and the possibility that the current investigations did not cover the causative agent.'
      },
      {
        id: 'C',
        text: 'Repeat exactly the same tests indefinitely without reviewing the initial results.'
      },
      {
        id: 'D',
        text: 'Select one suspected organism based only on the clinical presentation and disregard other possibilities.'
      }
    ]
  },
  {
    title: 'Choosing a sequencing strategy',
    briefing: `The investigation team is considering sequencing to investigate the unresolved cases. The laboratory has access to an amplicon sequencing workflow, a probe-based target-enrichment panel covering a range of known agents, and an unbiased metagenomic sequencing workflow. Resources, specimen quantity and sequencing capacity are limited. No causative agent has been established.`,
    question: 'Which sequencing strategy would you prioritise? Consider the investigation objectives, strengths and limitations of each approach.',
    options: [
      {
        id: 'A',
        text: 'Amplicon sequencing, using specific primers to amplify selected genomic regions.'
      },
      {
        id: 'B',
        text: 'Probe-based target enrichment, using probes to enrich sequences matching targets represented in a predefined panel.'
      },
      {
        id: 'C',
        text: 'Unbiased metagenomic sequencing, without restricting the investigation to a predefined target.'
      },
      {
        id: 'D',
        text: 'Choose the method expected to generate the highest number of reads, without considering the investigation objectives or specimen characteristics.'
      }
    ]
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
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)

  const currentQuestion = questions[questionIndex]

  useEffect(() => {
    if (submitted) return

    const interval = setInterval(() => {
      setTimeLeft(previousTime => {
        if (previousTime <= 1) {
          setSubmitted(true)
          return 0
        }

        return previousTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [questionIndex, submitted])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  function openScenario() {
    setSelectedScenario(true)
    setQuestionIndex(0)
    setAnswer('')
    setSubmitted(false)
    setTimeLeft(QUESTION_TIME)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goHome() {
    setSelectedScenario(false)
    setQuestionIndex(0)
    setAnswer('')
    setSubmitted(false)
    setTimeLeft(QUESTION_TIME)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
      setAnswer('')
      setSubmitted(false)
      setTimeLeft(QUESTION_TIME)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function previousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
      setAnswer('')
      setSubmitted(false)
      setTimeLeft(QUESTION_TIME)
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
          <a
            href="#scenarios"
            onClick={() => {
              goHome()
              setMenuOpen(false)
            }}
          >
            Scenarios
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
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
                  evidence and develop your understanding of genomic
                  surveillance.
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
              <p>
                Assess the evidence and make decisions as the investigation develops.
              </p>
            </div>

            <div className="question-page">
              <div className="question-progress">
                <span className="question-counter">
                  Question {questionIndex + 1} of {questions.length}
                </span>

                <div className={`question-timer ${timeLeft <= 30 ? 'timer-warning' : ''}`}>
                  <Timer size={18} />
                  <span>{formattedTime}</span>
                </div>
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
                    Submit response <ArrowRight size={18} />
                  </button>
                ) : (
                  <>
                    <div className="notice answer-feedback">
                      <div>
                        <strong>
                          {timeLeft === 0 ? 'Time is up' : 'Response recorded'}
                        </strong>
                        <p>
                          {timeLeft === 0
                            ? 'Your time for this question has ended. Continue to the next stage of the investigation.'
                            : 'Your response has been recorded. Keep your reasoning in mind as you review the evidence in the next stage.'}
                        </p>
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
