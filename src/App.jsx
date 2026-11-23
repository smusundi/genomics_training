
import { useState } from 'react'
import {
  Activity,
  Dna,
  Microscope,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Database,
  Users
} from 'lucide-react'

const modules = [
  {
    id: 'scenario-01',
    name: 'Scenario 01',
    category: 'OUTBREAK INVESTIGATION',
    description: 'Investigating an unexplained disease outbreak using epidemiological and genomic evidence.',
    icon: Dna,
    color: '#087e8b',
    status: 'Available'
  },
  {
    id: 'scenario-02',
    name: 'Scenario 02',
    category: 'OUTBREAK INVESTIGATION',
    description: 'Investigate an emerging infectious disease event.',
    icon: Activity,
    color: '#4b9ed1',
    status: 'Coming soon'
  },
  {
    id: 'scenario-03',
    name: 'Scenario 03',
    category: 'GENOMIC SURVEILLANCE',
    description: 'Explore pathogen identification and genomic surveillance.',
    icon: Microscope,
    color: '#b28be0',
    status: 'Coming soon'
  },
  {
    id: 'scenario-04',
    name: 'Scenario 04',
    category: 'PHYLOGENETIC INVESTIGATION',
    description: 'Investigate genetic diversity and evolutionary relationships.',
    icon: Dna,
    color: '#e27f83',
    status: 'Coming soon'
  },
  {
    id: 'scenario-05',
    name: 'Scenario 05',
    category: 'PUBLIC HEALTH GENOMICS',
    description: 'Interpret genomic evidence to support public health decisions.',
    icon: ShieldCheck,
    color: '#50b99a',
    status: 'Coming soon'
  }
]

const stages = [
  'Initial outbreak notification and response',
  'Clinical and epidemiological investigation',
  'Specimen collection and laboratory investigation',
  'Metagenomic pathogen discovery',
  'Genome characterisation and phylogenetic analysis',
  'Outbreak reconstruction and public health response'
]

function App() {
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function openModule(module) {
    if (module.id !== 'scenario-01') return

    setSelected(module)
    setAnswer('')
    setSubmitted(false)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goHome() {
    setSelected(null)
    setAnswer('')
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const options = [
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
      text: 'Collect samples from all patients and immediately begin whole-genome sequencing.'
    },
    {
      id: 'D',
      text: 'Issue a public alert before investigating the reported cases.'
    }
  ]

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#" onClick={goHome}>
          <div className="brand-icon"><Dna size={25} /></div>
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
          <a href="#modules" onClick={() => setMenuOpen(false)}>Scenarios</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Resources</a>
        </nav>
      </header>

      <main>
        {selected ? (
          <section className="scenario-page">

            <button className="back-button" onClick={goHome}>
              ← Back to scenarios
            </button>

            <div className="scenario-hero">
              <span className="eyebrow">SCENARIO 01 · CASE INVESTIGATION</span>

              <h1>Investigation of an unexplained disease outbreak</h1>

              <p>
                Investigate an unusual disease event using clinical,
                epidemiological, laboratory and genomic evidence.
              </p>

              <span className="tag">INTERMEDIATE LEVEL</span>
            </div>

            <h2>Initial outbreak notification</h2>

            <div className="notice">
              <Activity size={22} />

              <div>
                <strong>Early 2024 · Coastal Kenya</strong>

                <p>
                  An eye clinic in coastal Kenya reports that 13 patients
                  have presented with redness of the eyes over a short
                  period. The similar presentations have raised concern
                  among healthcare workers.

                  The local public health team has been notified.
                  The underlying cause is unknown, and no definitive
                  laboratory diagnosis has been established.
                </p>
              </div>
            </div>

            <h2>Your role</h2>

            <p className="section-intro">
              You are the public health officer assigned to respond
              to this notification.
            </p>

            <div className="stage-card">
              <div>
                <span className="stage-label">YOUR FIRST TASK</span>
                <h3>Determine the appropriate initial outbreak response.</h3>
              </div>
            </div>

            <div className="question-section">
              <span className="eyebrow">QUESTION 01 · OUTBREAK RESPONSE</span>

              <h2>What would you do first?</h2>

              <p className="section-intro">
                Select the most appropriate initial course of action
                as the public health officer.
              </p>

              <div className="answer-options">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className={`answer-option ${
                      answer === option.id ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="question-1"
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

              <button
                className="primary-button"
                disabled={!answer || submitted}
                onClick={() => setSubmitted(true)}
              >
                Submit answer <ArrowRight size={18} />
              </button>

              {submitted && (
                <div className="notice answer-feedback">
                  {answer === 'B' ? (
                    <>
                      <ShieldCheck size={22} />
                      <div>
                        <strong>Correct response</strong>
                        <p>
                          Verification of the notification, investigation
                          of reported cases and development of a working
                          case definition are important initial outbreak
                          response activities.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Activity size={22} />
                      <div>
                        <strong>Review your response</strong>
                        <p>
                          Before deciding on interventions or advanced
                          laboratory investigations, establish whether
                          the reported increase represents a genuine
                          cluster of cases. Consider verifying the
                          notification and investigating the patients.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {submitted && (
                <button
                  className="back-button"
                  onClick={() => {
                    setAnswer('')
                    setSubmitted(false)
                  }}
                >
                  Try again
                </button>
              )}
            </div>

            <h2>Investigation roadmap</h2>

            <p className="section-intro">
              The investigation will progressively introduce new
              information and datasets.
            </p>

            <div className="stage-list">
              {stages.map((stage, index) => (
                <div className="stage-card" key={stage}>
                  <div className="stage-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <span className="stage-label">
                      STAGE {index + 1}
                    </span>
                    <h3>{stage}</h3>
                  </div>

                  <ChevronRight />
                </div>
              ))}
            </div>

            <div className="notice">
              <Database size={22} />
              <div>
                <strong>Training datasets</strong>
                <p>
                  Supporting clinical, epidemiological and genomic
                  datasets will be introduced as the investigation
                  progresses.
                </p>
              </div>
            </div>

          </section>
        ) : (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">
                  GENOMIC SURVEILLANCE · INTERACTIVE LEARNING
                </span>

                <h1>
                  From genomic data<br />
                  to public health action.
                </h1>

                <p>
                  Investigate real-world infectious disease events
                  using genomic datasets, phylogenetic evidence
                  and scenario-based bioinformatics challenges.
                </p>

                <a href="#modules" className="primary-button">
                  Explore scenarios <ArrowRight size={18} />
                </a>

                <div className="hero-stats">
                  <div>
                    <strong>05</strong>
                    <span>Investigation scenarios</span>
                  </div>

                  <div>
                    <strong>06</strong>
                    <span>Investigation stages</span>
                  </div>

                  <div>
                    <strong>100%</strong>
                    <span>Open access</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="orbit orbit-one"></div>
                <div className="orbit orbit-two"></div>

                <div className="virus-symbol">
                  <Dna size={105} />
                </div>

                <div className="floating-card card-top">
                  <Activity size={18} />
                  <span>Pathogen surveillance</span>
                </div>

                <div className="floating-card card-bottom">
                  <Microscope size={18} />
                  <span>Genomic investigation</span>
                </div>
              </div>
            </section>

            <section className="content-section" id="modules">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">LEARNING ENVIRONMENT</span>
                  <h2>Investigation scenarios</h2>
                  <p>
                    Select a scenario and work through the investigation.
                  </p>
                </div>

                <span className="module-count">05 SCENARIOS</span>
              </div>

              <div className="module-grid">
                {modules.map((module) => {
                  const Icon = module.icon
                  const available = module.id === 'scenario-01'

                  return (
                    <article className="module-card" key={module.id}>
                      <div className="module-top">
                        <div
                          className="module-icon"
                          style={{ color: module.color }}
                        >
                          <Icon size={27} />
                        </div>

                        <span className={available ? 'status available' : 'status'}>
                          {module.status}
                        </span>
                      </div>

                      <span className="module-category">
                        {module.category}
                      </span>

                      <h3>{module.name}</h3>

                      <p>{module.description}</p>

                      <button
                        className={available ? 'module-link active' : 'module-link'}
                        disabled={!available}
                        onClick={() => openModule(module)}
                      >
                        {available ? 'Explore scenario' : 'Coming soon'}
                        {available && <ArrowRight size={17} />}
                      </button>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="about-section" id="about">
              <div>
                <span className="eyebrow">ABOUT THE PLATFORM</span>
                <h2>Learn through investigation.</h2>

                <p>
                  This platform provides practical, scenario-based
                  training in pathogen discovery and genomic surveillance.
                  Participants examine datasets, interpret genomic
                  evidence and develop outbreak investigation reports.
                </p>
              </div>

              <div className="about-features">
                <div><Database /><span>Genomic datasets</span></div>
                <div><BookOpen /><span>Progressive scenarios</span></div>
                <div><Users /><span>Collaborative learning</span></div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer id="resources">
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
