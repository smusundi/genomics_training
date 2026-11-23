
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
    title: 'Initial outbreak notification',
    briefing: `Early 2024 · Coastal Kenya

Several individuals presenting with redness of the eyes have been reported at health facilities over a short period. The number of cases appears to be increasing, and members of the public are becoming increasingly concerned about how the illness is spreading.

As a public health official, you receive notification of this event.`,
    question: 'What is the first thing you should do?',
    options: [
      {
        id: 'A',
        text: 'Immediately declare a large-scale outbreak and recommend treatment for the entire community.'
      },
      {
        id: 'B',
        text: 'Verify the reported cases by visiting health facilities, reviewing patient records and conducting preliminary investigations.'
      },
      {
        id: 'C',
        text: 'Immediately collect samples and send them for whole-genome sequencing.'
      },
      {
        id: 'D',
        text: 'Issue a public announcement identifying the disease before conducting an investigation.'
      }
    ],
    correct: 'B',
    explanation: 'The first step is to verify the notification and establish whether the reported cases represent an unusual increase. Visit the affected health facilities, review clinical records, interview healthcare workers and begin preliminary case finding. A working case definition can then guide the investigation.'
  },

  {
    title: 'Case investigation and specimen collection',
    briefing: `You visit the affected health facilities and begin investigating the reported cases.

Patients have similar clinical presentations, and you collect information on their symptoms, dates of onset, age, residence and possible contact with other affected individuals.

You now need to collect appropriate clinical specimens to investigate the possible cause.`,
    question: 'Which clinical specimen would be most appropriate to collect from affected patients?',
    options: [
      {
        id: 'A',
        text: 'Blood samples for investigation of bloodstream infections.'
      },
      {
        id: 'B',
        text: 'Conjunctival swabs from the affected eyes for bacterial and viral investigations.'
      },
      {
        id: 'C',
        text: 'Stool samples only, without collecting specimens from the affected eyes.'
      },
      {
        id: 'D',
        text: 'Nasopharyngeal swabs from all patients.'
      }
    ],
    correct: 'B',
    explanation: 'Conjunctival swabs directly sample the affected site and are appropriate for investigating bacterial and viral causes. Additional specimens may be considered depending on the clinical and epidemiological findings.'
  },

  {
    title: 'Possible mode of transmission',
    briefing: `Preliminary interviews indicate that some affected individuals live in the same households, attend the same schools or have interacted with other symptomatic individuals.

You are now considering how the illness may be spreading within the community.`,
    question: 'Which transmission route would you prioritise when investigating this type of eye infection?',
    options: [
      {
        id: 'A',
        text: 'Direct contact with infected eye secretions and indirect contact through contaminated hands or shared objects.'
      },
      {
        id: 'B',
        text: 'Transmission primarily through mosquito bites.'
      },
      {
        id: 'C',
        text: 'Transmission exclusively through contaminated drinking water.'
      },
      {
        id: 'D',
        text: 'Transmission primarily through inhalation of airborne particles over long distances.'
      }
    ],
    correct: 'A',
    explanation: 'Many infectious causes of acute eye infections spread through direct contact with eye secretions or indirectly through contaminated hands, towels and frequently touched surfaces. Enteroviruses may also be shed in stool, so other transmission routes can be investigated where epidemiologically relevant.'
  },

  {
    title: 'Immediate public health intervention',
    briefing: `The number of reported cases continues to increase. While laboratory investigations are being organised, you need to recommend immediate measures to reduce further transmission.

The causative organism has not yet been identified.`,
    question: 'Which immediate intervention would be most appropriate?',
    options: [
      {
        id: 'A',
        text: 'Promote hand hygiene, discourage sharing of towels and personal items, clean frequently touched surfaces and advise symptomatic individuals to limit close contact.'
      },
      {
        id: 'B',
        text: 'Administer antibiotics to everyone in the affected community.'
      },
      {
        id: 'C',
        text: 'Wait for the laboratory results before introducing any infection prevention measures.'
      },
      {
        id: 'D',
        text: 'Recommend mass vaccination against all known viral infections.'
      }
    ],
    correct: 'A',
    explanation: 'Infection prevention measures should begin while the investigation is ongoing. Hand hygiene, avoiding shared personal items, environmental cleaning and reducing contact with eye secretions can help interrupt transmission.'
  },

  {
    title: 'Preliminary laboratory investigation',
    briefing: `The conjunctival specimens have been collected and transported to the laboratory.

The cause of the illness remains unknown. You need to investigate common bacterial and viral causes before considering broader pathogen discovery methods.`,
    question: 'Which preliminary laboratory investigations would you prioritise?',
    options: [
      {
        id: 'A',
        text: 'Bacterial culture and pan-adenovirus PCR testing.'
      },
      {
        id: 'B',
        text: 'Whole-genome sequencing of all samples without preliminary testing.'
      },
      {
        id: 'C',
        text: 'Antibody testing for all known viral infections.'
      },
      {
        id: 'D',
        text: 'Antimicrobial susceptibility testing without first attempting bacterial isolation.'
      }
    ],
    correct: 'A',
    explanation: 'Bacterial culture investigates possible bacterial causes, while pan-adenovirus PCR screens for adenovirus, an important cause of eye infections. If these investigations do not explain the cases, broader pathogen discovery approaches can be considered.'
  },

  {
    title: 'Interpreting preliminary laboratory results',
    briefing: `The laboratory completes the initial investigations on 20 clinical specimens.

The results indicate that 18 of the 20 samples are negative for the preliminary bacterial investigations and pan-adenovirus PCR testing.

The causative agent remains unidentified in these 18 samples. You need to decide how to proceed with the investigation.`,
    question: 'What would be the most appropriate next step to investigate the unexplained cases?',
    options: [
      {
        id: 'A',
        text: 'Repeat the same pan-adenovirus PCR test on all samples indefinitely.'
      },
      {
        id: 'B',
        text: 'Perform unbiased metagenomic sequencing on the unresolved samples to identify potential bacterial, viral or other microbial pathogens.'
      },
      {
        id: 'C',
        text: 'Conclude that the illness is not caused by an infectious agent.'
      },
      {
        id: 'D',
        text: 'Immediately begin antimicrobial treatment without further investigation.'
      }
    ],
    correct: 'B',
    explanation: 'When routine investigations do not identify the cause, unbiased metagenomic sequencing can be used to search for previously unrecognised or unexpected pathogens. Before sequencing, confirm specimen quality, nucleic acid integrity and appropriate controls. The resulting sequencing data can then be analysed using bioinformatics methods for pathogen identification and genome characterisation.'
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
    setMenuOpen(false)
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
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
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
                  <span className="eyebrow">
                    LEARNING ENVIRONMENT
                  </span>
                  <h2>Investigation scenarios</h2>
                  <p>
                    Select a scenario to begin your investigation.
                  </p>
                </div>
              </div>

              <div className="module-grid">
                {scenarios.map((scenario) => (
                  <article
                    className="module-card"
                    key={scenario.id}
                  >
                    <div className="module-top">
                      <div className="module-icon">
                        <Activity size={26} />
                      </div>

                      <span
                        className={`status ${
                          scenario.available ? 'available' : ''
                        }`}
                      >
                        {scenario.available
                          ? 'Available'
                          : 'Coming soon'}
                      </span>
                    </div>

                    <span className="module-category">
                      OUTBREAK INVESTIGATION
                    </span>

                    <h3>{scenario.title}</h3>
                    <p>{scenario.description}</p>

                    <button
                      className={`module-link ${
                        scenario.available ? 'active' : ''
                      }`}
                      disabled={!scenario.available}
                      onClick={openScenario}
                    >
                      {scenario.available
                        ? 'Start scenario'
                        : 'Coming soon'}

                      {scenario.available && (
                        <ArrowRight size={17} />
                      )}
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="about-section" id="about">
              <div>
                <span className="eyebrow">
                  ABOUT THE PLATFORM
                </span>
                <h2>Learn through investigation.</h2>
                <p>
                  Work through realistic outbreak scenarios,
                  interpret evidence and develop your understanding
                  of viral genomic surveillance.
                </p>
              </div>
            </section>
          </>
        ) : (
          <section className="scenario-page">

            <button className="back-button" onClick={goHome}>
              <ArrowLeft size={17} />
              Back to scenarios
            </button>

            <div className="scenario-hero">
              <span className="eyebrow">
                SCENARIO 01 · CASE INVESTIGATION
              </span>
              <h1>
                Investigation of an unexplained disease event
              </h1>
              <p>
                Work through the investigation one question at a time.
              </p>
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
                    width: `${
                      ((questionIndex + 1) / questions.length) * 100
                    }%`
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

                      <span className="option-letter">
                        {option.id}
                      </span>

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
                    Submit answer
                    <ArrowRight size={18} />
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
                        <ArrowLeft size={17} />
                        Previous
                      </button>

                      {questionIndex < questions.length - 1 ? (
                        <button
                          className="primary-button"
                          onClick={nextQuestion}
                        >
                          Next question
                          <ArrowRight size={18} />
                        </button>
                      ) : (
                        <button
                          className="primary-button"
                          onClick={goHome}
                        >
                          Finish scenario
                          <ArrowRight size={18} />
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
        <p>
          Open-access educational resource for genomic surveillance.
        </p>
        <span>© 2026 · Training and research education</span>
      </footer>

    </div>
  )
}

export default App
