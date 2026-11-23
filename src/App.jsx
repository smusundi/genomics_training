
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
        text: 'Verify the reported cases, review clinical records and establish whether the reports represent an unusual event.'
      },
      {
        id: 'C',
        text: 'Collect specimens from all reported patients and request whole-genome sequencing.'
      },
      {
        id: 'D',
        text: 'Issue a public warning while waiting for the clinic to provide further information.'
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
        text: 'Wait until the causative agent has been identified before defining and searching for cases.'
      }
    ]
  },
  {
    title: 'Specimen selection',
    briefing: `The investigation has identified additional individuals with similar symptoms. You are now planning specimen collection. The clinical presentation is consistent across several patients, but there is no confirmed explanation for the event.`,
    question: 'Which specimen strategy would provide the most useful evidence at this stage?',
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
        text: 'Collect specimens only from patients with the most severe symptoms to maximise the likelihood of detection.'
      }
    ]
  },
  {
    title: 'Interpreting the epidemiological pattern',
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
        text: 'The pattern warrants investigation of direct contact, shared environments and other common exposures without assuming a single route.'
      },
      {
        id: 'D',
        text: 'The clustering is sufficient to conclude that all cases have the same source.'
      }
    ]
  },
  {
    title: 'Reviewing preliminary laboratory findings',
    briefing: `Specimens from 20 individuals have undergone the initial routine laboratory investigations selected by the clinical team. Eighteen specimens have not produced an explanation for the observed clinical pattern. The remaining findings are inconclusive. The investigation team must decide how best to proceed.`,
    question: 'What should determine the next laboratory strategy?',
    options: [
      {
        id: 'A',
        text: 'Repeat exactly the same investigations on all specimens, regardless of specimen quality or the limitations of the original methods.'
      },
      {
        id: 'B',
        text: 'Review specimen quality, collection and storage conditions, previous test coverage and the possibility that the current methods did not detect the cause.'
      },
      {
        id: 'C',
        text: 'Discard the unresolved specimens and collect samples only from newly reported patients.'
      },
      {
        id: 'D',
        text: 'Select one suspected organism based on the clinical presentation and use only a test designed to detect it.'
      }
    ]
  },
  {
    title: 'Choosing a sequencing strategy',
    briefing: `The investigation team has decided that sequencing may help resolve the unexplained findings. The laboratory has access to an amplicon sequencing workflow, a probe-based target-enrichment panel covering a range of known agents, and an unbiased metagenomic sequencing workflow. Resources, specimen quantity and sequencing capacity are limited. No causative agent has been established.`,
    question: 'Which sequencing strategy would you prioritise, and what evidence would justify your choice?',
    options: [
      {
        id: 'A',
        text: 'Amplicon sequencing, because it can selectively amplify specific genomic regions and is generally efficient when suitable targets and primers are already known.'
      },
      {
        id: 'B',
        text: 'Probe-based target enrichment, because it can enrich sequences matching a defined panel of known targets, although detection depends on panel coverage and sequence similarity.'
      },
      {
        id: 'C',
        text: 'Unbiased metagenomic sequencing, because it does not require a predefined target, although host background, sequencing depth and low pathogen abundance can limit detection.'
      },
      {
        id: 'D',
        text: 'Choose the method with the highest expected read count, without considering target coverage, specimen characteristics or the question being investigated.'
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
              <p>Assess the evidence and make decisions as the investigation develops.</p>
            </div>

            <div className="question-page">
              <div className="question-progress">
                <span className="question-counter">
                  Question {questionIndex + 1} of {questions.length}
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
                    Submit response <ArrowRight size={18} />
                  </button>
                ) : (
                  <>
                    <div className="notice answer-feedback">
                      <div>
                        <strong>Response recorded</strong>
                        <p>
                          Keep your reasoning in mind. You will have an
                          opportunity to review and discuss your decisions
                          as more evidence becomes available.
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
