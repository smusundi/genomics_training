import { useEffect, useState } from 'react'
import {
  Dna,
  ArrowLeft,
  ArrowRight,
  Activity,
  Menu,
  X,
  Timer,
  Lock,
} from 'lucide-react'

const QUESTION_TIME = 180

const questions = [
  {
    title: 'Question 01',
    briefing: 'In early 2024, a clinic in coastal Kenya reports an unusual increase in patients presenting with redness of the eyes. Thirteen patients have been reported over a short period. Community concern is increasing, and public health teams have been notified. The cause has not been established.',
    prompt: 'You have received the notification. Which action should take priority?',
    options: [
      'Declare an outbreak immediately and begin population-wide control measures.',
      'Visit the clinic, verify the reported cases, review clinical records and establish whether the reports represent an unusual event.',
      'Collect specimens from all reported patients and request whole-genome sequencing.',
      'Issue a public warning before verifying the reported cases.',
    ],
  },
  {
    title: 'Question 02',
    briefing: 'A visit to the clinic confirms that several patients have similar clinical presentations. However, the records are incomplete, and it is not yet clear whether all reported cases are part of the same event. Additional cases may be occurring in the surrounding community.',
    prompt: 'Which approach would provide the most reliable estimate of the extent of the event?',
    options: [
      'Use eye redness alone as the case definition and include everyone reporting the symptom.',
      'Develop a working case definition using clinical features, time and location, and conduct active case finding.',
      'Limit the investigation to patients already recorded at the reporting clinic.',
      'Wait until the cause is identified before defining or searching for additional cases.',
    ],
  },
  {
    title: 'Question 03',
    briefing: 'Additional individuals with similar symptoms are identified. The investigation team is preparing a specimen collection plan to support laboratory testing.',
    prompt: 'Which specimen collection strategy is likely to provide the most useful initial evidence?',
    options: [
      'Collect blood from every patient because systemic specimens are generally more informative.',
      'Collect specimens directly from the affected anatomical site, considering additional specimens when clinically or epidemiologically justified.',
      'Collect stool only because it contains a wide range of microorganisms.',
      'Collect specimens only from patients with the most severe symptoms.',
    ],
  },
  {
    title: 'Question 04',
    briefing: 'Initial interviews suggest that some patients attend the same schools, live in nearby areas or have had contact with one another. Other patients have no obvious connection.',
    prompt: 'Which interpretation should guide the next stage of the investigation?',
    options: [
      'Shared locations establish that the event is caused by a contaminated water source.',
      'The absence of an obvious connection rules out person-to-person spread.',
      'Investigate direct contact, shared environments and other common exposures without assuming a single route.',
      'The presence of geographic clustering is sufficient to conclude that all cases have the same source.',
    ],
  },
  {
    title: 'Question 05',
    briefing: 'Specimens have been collected, and the clinical team requests initial laboratory investigations before considering more specialised approaches. Routine bacterial culture and molecular assays are available.',
    prompt: 'Which initial combination of investigations would be reasonable to prioritise?',
    options: [
      'Bacterial culture and pan-adenovirus qPCR.',
      'Whole-genome sequencing of every specimen before conducting routine investigations.',
      'A single targeted assay selected without reviewing the clinical or epidemiological information.',
      'Microscopy alone.',
    ],
  },
  {
    title: 'Question 06',
    briefing: 'Initial investigations are performed on 20 specimens. Eighteen specimens do not have an explanation from the methods used, while the remaining findings are inconclusive.',
    prompt: 'What is the most appropriate next step?',
    options: [
      'Conclude that there is no infectious cause because most specimens tested negative.',
      'Review specimen quality and test limitations, and consider whether the methods used may not have covered the cause.',
      'Repeat the same tests indefinitely without reviewing their performance.',
      'Select one suspected organism based only on the clinical presentation.',
    ],
  },
  {
    title: 'Question 07',
    briefing: 'The initial investigations have not established a cause. Specimen volumes are limited, and the range of possible infectious agents remains broad.',
    prompt: 'Which factors should guide the choice of the next laboratory approach?',
    options: [
      'The most expensive sequencing platform available.',
      'The investigation objectives, specimen quality and quantity, range of possible targets, available resources and required sensitivity.',
      'Only the laboratory team’s previous experience with a particular organism.',
      'The platform that produces the longest reads, irrespective of the investigation objective.',
    ],
  },
  {
    title: 'Question 08',
    briefing: 'The team considers three approaches: amplicon sequencing, probe-based target enrichment and untargeted metagenomic sequencing.',
    prompt: 'Which statement describes an important limitation of one of these approaches?',
    options: [
      'Amplicon sequencing can detect any unknown organism because it amplifies all nucleic acids.',
      'Probe-based enrichment depends on the coverage of the probe panel and the degree of sequence similarity to the probes.',
      'Metagenomic sequencing removes the need for quality control and negative controls.',
      'All three approaches have equivalent detection performance regardless of the target.',
    ],
  },
  {
    title: 'Question 09',
    briefing: 'Clinical specimens and negative extraction and library-preparation controls are sequenced. Some reads are also detected in a negative control.',
    prompt: 'What should be investigated before interpreting the sequencing results?',
    options: [
      'Remove every sequence found in the negative control from all clinical samples without further investigation.',
      'Compare taxa, abundance, mapping characteristics and their distribution across controls and clinical specimens.',
      'Ignore the negative control because background reads are always expected.',
      'Discard all clinical results because any reads in a negative control invalidate the entire run.',
    ],
  },
  {
    title: 'Question 10',
    briefing: 'The sequencing run produces read statistics, including total reads, read-length distributions, quality scores and the proportion of classified reads.',
    prompt: 'Which combination of observations best supports proceeding to taxonomic interpretation?',
    options: [
      'A high total read count alone.',
      'Acceptable read quality, sufficient sequencing depth, appropriate controls and usable sequence data.',
      'A high proportion of unclassified reads, irrespective of their quality or origin.',
      'Similar read counts in clinical specimens and negative controls.',
    ],
  },
  {
    title: 'Question 11',
    briefing: 'Taxonomic classification assigns reads at different levels, including kingdom, phylum, family, genus and species. Some reads are assigned only at higher taxonomic levels.',
    prompt: 'How should these taxonomic assignments be interpreted?',
    options: [
      'Every family-level assignment confirms the presence of a specific species.',
      'Interpret each assignment only at the taxonomic level supported by the sequence evidence.',
      'Discard all assignments that do not reach species level.',
      'Assume that the taxon with the greatest number of classified reads is necessarily the cause of the event.',
    ],
  },
  {
    title: 'Question 12',
    visual: 'krona',
    responseType: 'text',
    briefing: 'An interactive Krona plot generated from the classification results is provided. Explore the displayed hierarchy and examine the relative contribution of the groups.',
    prompt: 'Using the provided visual evidence, identify the most represented taxonomic group at the lowest classification level that you consider reliably supported. Record the group and its classification level.',
  },
  {
    title: 'Question 13',
    visual: 'krona',
    responseType: 'text',
    briefing: 'You have examined the taxonomic profile. Several assignments may warrant closer inspection, but read counts alone do not establish a causal relationship.',
    prompt: 'Name the taxon you would prioritise for further investigation and briefly record the observations that support your choice.',
  },
  {
    title: 'Question 14',
    briefing: 'A candidate taxon has been prioritised for further investigation. The next task is to recover sequence data that may support genome reconstruction.',
    prompt: 'Which approach is most appropriate for selecting reads for further analysis?',
    options: [
      'Select all reads and assemble them without considering their taxonomic assignments.',
      'Extract candidate-associated reads, examine their similarity to reference sequences and assess whether additional related reads can be recovered.',
      'Select only the longest reads, regardless of their sequence content.',
      'Select reads based solely on the total abundance of the candidate taxon.',
    ],
  },
  {
    title: 'Question 15',
    briefing: 'Candidate-associated reads are mapped against a suitable reference sequence. Mapping summaries and coverage information are generated.',
    prompt: 'Which set of metrics is most useful when evaluating the mapping results?',
    options: [
      'The total number of mapped reads alone.',
      'Mapping proportion, breadth of coverage, depth of coverage, mapping quality and the distribution of reads across the reference.',
      'The number of reads that map to the first reference segment only.',
      'The total number of reads generated before mapping.',
    ],
  },
  {
    title: 'Question 16',
    briefing: 'The reconstructed sequence has substantial coverage across much of the reference, but several regions are poorly represented or absent.',
    prompt: 'Which interpretation is most appropriate when describing genome completeness?',
    options: [
      'High average depth alone proves that the genome is complete.',
      'Assess breadth and depth of coverage, continuity and missing regions before describing the genome as complete or near-complete.',
      'Any assembled contig can be described as a complete genome.',
      'Missing regions can be assumed to be biologically absent without further investigation.',
    ],
  },
  {
    title: 'Question 17',
    briefing: 'The candidate sequence is detected in more than one clinical specimen. The team is considering additional evidence to assess the reliability and significance of the finding.',
    prompt: 'Which additional evidence would strengthen the investigation?',
    options: [
      'An independent targeted molecular assay, interpreted alongside specimen-level findings and the sequencing controls.',
      'Repeating the same taxonomic classification workflow and treating the repeated output as independent confirmation.',
      'Using the highest read count as the only confirmation criterion.',
      'Removing all specimens with lower read counts from the analysis.',
    ],
  },
  {
    title: 'Question 18',
    briefing: 'A set of sequences is available for phylogenetic analysis. The collection includes sequences from different locations and sampling periods, with variation in completeness and quality.',
    prompt: 'Which strategy is most appropriate when selecting reference sequences?',
    options: [
      'Use only the oldest available sequence.',
      'Include suitable, quality-assessed and representative sequences from relevant locations and time periods, including closely related sequences.',
      'Use only sequences collected from the same clinic.',
      'Include every available sequence without checking quality, completeness or relevance.',
    ],
  },
  {
    title: 'Question 19',
    visual: 'tree',
    briefing: 'A phylogenetic tree is provided with the investigated sequence and selected reference sequences. The tree represents inferred evolutionary relationships among the included sequences.',
    prompt: 'Which conclusion can reasonably be drawn from the tree?',
    options: [
      'Sequences that cluster together are necessarily linked by direct transmission.',
      'The tree can indicate evolutionary relatedness, but it cannot by itself establish direct transmission or the source of infection.',
      'The closest sequence in the tree must be the direct ancestor of the investigated sequence.',
      'A strongly supported cluster proves that all samples came from one transmission event.',
    ],
  },
  {
    title: 'Question 20',
    visual: 'tree',
    briefing: 'The investigation now has epidemiological observations, preliminary laboratory findings, metagenomic results, genome characterisation and phylogenetic analysis.',
    prompt: 'How should the investigation team formulate its overall conclusion?',
    options: [
      'Base the conclusion only on the taxon with the highest read count.',
      'Integrate clinical, epidemiological, laboratory and genomic evidence, while stating the limitations and alternative explanations.',
      'Use the phylogenetic tree alone to identify the transmission route.',
      'Treat every sequencing detection as proof that the detected organism caused the clinical event.',
    ],
  },
]

const scenarios = [
  {
    number: '01',
    title: 'Scenario 01',
    description: 'Examine an emerging event using the information provided.',
    status: 'Available',
    available: true,
  },
  {
    number: '02',
    title: 'Scenario 02',
    description: 'This investigation will be made available in a future release.',
    status: 'Coming soon',
    available: false,
  },
  {
    number: '03',
    title: 'Scenario 03',
    description: 'This investigation will be made available in a future release.',
    status: 'Coming soon',
    available: false,
  },
  {
    number: '04',
    title: 'Scenario 04',
    description: 'This investigation will be made available in a future release.',
    status: 'Coming soon',
    available: false,
  },
  {
    number: '05',
    title: 'Scenario 05',
    description: 'This investigation will be made available in a future release.',
    status: 'Coming soon',
    available: false,
  },
]

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [menuOpen, setMenuOpen] = useState(false)

  const currentQuestion = questions[questionIndex]
  const progress = ((questionIndex + 1) / questions.length) * 100
  const isLastQuestion = questionIndex === questions.length - 1

  useEffect(() => {
    if (!selectedScenario || submitted) return

    if (timeLeft <= 0) {
      setSubmitted(true)
      return
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1))
    }, 1000)

    return () => window.clearTimeout(timerId)
  }, [selectedScenario, submitted, timeLeft])

  function startScenario() {
    setSelectedScenario('01')
    setQuestionIndex(0)
    setAnswer('')
    setSubmitted(false)
    setTimeLeft(QUESTION_TIME)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToQuestion(nextIndex) {
    if (nextIndex < 0 || nextIndex >= questions.length) return
    setQuestionIndex(nextIndex)
    setAnswer('')
    setSubmitted(false)
    setTimeLeft(QUESTION_TIME)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submitAnswer() {
    if (submitted || timeLeft <= 0) return
    setSubmitted(true)
  }

  function returnHome() {
    setSelectedScenario(null)
    setQuestionIndex(0)
    setAnswer('')
    setSubmitted(false)
    setTimeLeft(QUESTION_TIME)
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={returnHome} aria-label="Go to home">
            <span className="brand-icon"><Dna size={25} /></span>
            <span>Viral Genomics <strong>Tabletop</strong></span>
          </button>

          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
            <button onClick={returnHome}>Home</button>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          </nav>

          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {!selectedScenario ? (
        <main>
          <section className="hero">
            <div className="hero-content">
              <div className="eyebrow"><Activity size={15} /> BIOINFORMATICS TRAINING</div>
              <h1>Investigate. Analyse. <span>Discover.</span></h1>
              <p>
                Build practical skills in viral genomic surveillance through realistic,
                evidence-led outbreak investigation scenarios.
              </p>
              <a className="hero-link" href="#scenarios">Explore scenarios <ArrowRight size={17} /></a>
            </div>
            <div className="hero-graphic"><Dna size={150} strokeWidth={0.8} /></div>
          </section>

          <section className="scenario-section" id="scenarios">
            <div className="section-heading">
              <div>
                <p className="eyebrow">PRACTICAL EXERCISES</p>
                <h2>Choose an investigation</h2>
                <p>Work through the information and make decisions as the investigation unfolds.</p>
              </div>
              <span className="scenario-count">05 SCENARIOS</span>
            </div>

            <div className="scenario-grid">
              {scenarios.map((scenario) => (
                <article className={`scenario-card ${!scenario.available ? 'scenario-disabled' : ''}`} key={scenario.number}>
                  <div className="scenario-card-top">
                    <span className="scenario-number">SCENARIO {scenario.number}</span>
                    <span className={`scenario-status ${scenario.available ? 'status-live' : ''}`}>
                      {scenario.status}
                    </span>
                  </div>
                  <h3>{scenario.title}</h3>
                  <p>{scenario.description}</p>
                  <button
                    className="scenario-button"
                    disabled={!scenario.available}
                    onClick={startScenario}
                  >
                    {scenario.available ? 'Start investigation' : 'Coming soon'}
                    {scenario.available ? <ArrowRight size={16} /> : <Lock size={15} />}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="about-section" id="about">
            <div className="about-icon"><Dna size={27} /></div>
            <div>
              <p className="eyebrow">ABOUT THE PLATFORM</p>
              <h2>Learn through investigation</h2>
              <p>
                This open-access tabletop platform is designed for bioinformatics trainees
                and researchers. Participants interpret provided datasets and evidence,
                progressing through an outbreak investigation using epidemiological,
                laboratory and genomic information.
              </p>
            </div>
          </section>
        </main>
      ) : (
        <main className="question-page">
          <button className="back-link" onClick={returnHome}><ArrowLeft size={16} /> All scenarios</button>

          <div className="question-progress">
            <span className="question-counter">SCENARIO 01 · QUESTION {questionIndex + 1} OF {questions.length}</span>
            <div className={`question-timer ${timeLeft <= 30 ? 'timer-warning' : ''}`}>
              <Timer size={17} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="question-meta">
            <span>{Math.round(progress)}% complete</span>
          </div>

          <h1>{currentQuestion.title}</h1>

          <section className="briefing-panel">
            <div className="briefing-label"><Activity size={16} /> CASE INFORMATION</div>
            <p>{currentQuestion.briefing}</p>
          </section>

          {currentQuestion.visual === 'krona' && (
            <section className="evidence-panel">
              <h2>Additional evidence</h2>
              <p>
                The interactive evidence display will appear here when its HTML file
                is added to the project. Until then, this area is reserved for that material.
              </p>
              <p className="file-hint">
                Expected file location: <code>public/krona/scenario01_krona.html</code>
              </p>
            </section>
          )}

          {currentQuestion.visual === 'tree' && (
            <section className="evidence-panel">
              <h2>Additional evidence</h2>
              <p>
                The relevant visual evidence will appear here when the supporting file
                is added to the project.
              </p>
              <p className="file-hint">A supported tree file or high-resolution image can be used.</p>
            </section>
          )}

          <section className="question-content">
            <p className="question-label">RESPONSE</p>
            <h2>{currentQuestion.prompt}</h2>

            {currentQuestion.responseType === 'text' ? (
              <textarea
                className="free-response"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Enter your response..."
                rows={4}
                disabled={submitted}
              />
            ) : (
              <div className="answer-options">
                {currentQuestion.options.map((option, index) => (
                  <label
                    className={`answer-option ${answer === String(index) ? 'selected' : ''}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={index}
                      checked={answer === String(index)}
                      onChange={(event) => setAnswer(event.target.value)}
                      disabled={submitted}
                    />
                    <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </section>

          {submitted && (
            <div className="submission-notice" role="status">
              {timeLeft === 0
                ? 'Time is up. This question is now locked.'
                : 'Response recorded. This question is now locked.'}
            </div>
          )}

          {!submitted && timeLeft <= 30 && timeLeft > 0 && (
            <p className="timer-notice">
              30 seconds or less remaining. Submit your response before time runs out.
            </p>
          )}

          <div className="question-navigation">
            <button
              className="secondary-button"
              onClick={() => goToQuestion(questionIndex - 1)}
              disabled={questionIndex === 0}
            >
              <ArrowLeft size={16} /> Previous
            </button>

            {!submitted ? (
              <button
                className="primary-button"
                onClick={submitAnswer}
                disabled={!answer.trim()}
              >
                Submit response <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={() => isLastQuestion ? returnHome() : goToQuestion(questionIndex + 1)}
              >
                {isLastQuestion ? 'Finish scenario' : 'Next question'} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </main>
      )}

      <footer className="site-footer">
        <span>Viral Genomics Tabletop</span>
        <span>Open-access training resource</span>
      </footer>
    </div>
  )
}
