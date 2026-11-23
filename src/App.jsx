
import { useState } from 'react'
import {
  Activity,
  Dna,
  Bird,
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
    id: 'Disease X',
    name: 'Scenario 1',
    category: 'Scenario 1',
    description: 'Investigating an outbreak of a disease of unknown cause.',
    icon: Dna,
    color: '#e7a83e',
    status: 'Featured scenario'
  },
  {
    id: 'sars',
    name: 'SARS-CoV-2',
    category: 'CORONAVIRUS',
    description: 'Explore viral evolution, genomic clusters and transmission patterns.',
    icon: Activity,
    color: '#4b9ed1',
    status: 'Coming soon'
  },
  {
    id: 'mpox',
    name: 'Mpox',
    category: 'POXVIRUS',
    description: 'Investigate viral clades, mutations and outbreak introductions.',
    icon: Microscope,
    color: '#b28be0',
    status: 'Coming soon'
  },
  {
    id: 'measles',
    name: 'Measles',
    category: 'MORBILLIVIRUS',
    description: 'Explore viral genotypes and molecular surveillance.',
    icon: Dna,
    color: '#e27f83',
    status: 'Coming soon'
  },
  {
    id: 'rsv',
    name: 'Respiratory Syncytial Virus',
    category: 'PNEUMOVIRUS',
    description: 'Investigate genetic diversity and viral evolution.',
    icon: ShieldCheck,
    color: '#50b99a',
    status: 'Coming soon'
  }
]

const stages = [
  'Metagenomic pathogen discovery',
  'H5N1 identification and confirmation',
  'Genome characterisation',
  'Phylogenetic investigation',
  'Reassortment and mammalian adaptation',
  'One Health outbreak investigation'
]

function App() {
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const featured = modules[0]

  function openModule(module) {
    if (module.id === 'h5n1') {
      setSelected(module)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#" onClick={() => setSelected(null)}>
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
          <a href="#modules" onClick={() => setMenuOpen(false)}>Training modules</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Resources</a>
        </nav>
      </header>

      <main>
        {selected ? (
          <section className="scenario-page">
            <button className="back-button" onClick={() => setSelected(null)}>
              ← Back to training modules
            </button>

            <div className="scenario-hero">
              <span className="eyebrow">FEATURED TRAINING SCENARIO</span>
              <h1>Investigating the 2024 H5N1 outbreak</h1>
              <p>
                From metagenomic pathogen discovery to viral evolution,
                reassortment and One Health surveillance.
              </p>
              <span className="tag">INTERMEDIATE LEVEL</span>
            </div>

            <h2>Investigation roadmap</h2>
            <p className="section-intro">
              Progress through six stages of the genomic investigation.
            </p>

            <div className="stage-list">
              {stages.map((stage, index) => (
                <div className="stage-card" key={stage}>
                  <div className="stage-number">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <span className="stage-label">STAGE {index + 1}</span>
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
                  Dataset downloads and interactive stage content will be
                  added as the H5N1 exercise is developed.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">GENOMIC SURVEILLANCE · INTERACTIVE LEARNING</span>
                <h1>From genomic data<br />to public health action.</h1>
                <p>
                  Investigate real-world viral outbreaks using genomic
                  datasets, phylogenetic evidence and scenario-based
                  bioinformatics challenges.
                </p>
                <a href="#modules" className="primary-button">
                  Explore training modules <ArrowRight size={18} />
                </a>
                <div className="hero-stats">
                  <div><strong>05</strong><span>Virus modules</span></div>
                  <div><strong>06</strong><span>H5N1 investigation stages</span></div>
                  <div><strong>100%</strong><span>Open access</span></div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="orbit orbit-one"></div>
                <div className="orbit orbit-two"></div>
                <div className="virus-symbol"><Dna size={105} /></div>
                <div className="floating-card card-top">
                  <Activity size={18} />
                  <span>Viral surveillance</span>
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
                  <h2>Training modules</h2>
                  <p>Choose a viral genomic investigation to explore.</p>
                </div>
                <span className="module-count">05 MODULES</span>
              </div>

              <div className="module-grid">
                {modules.map((module, index) => {
                  const Icon = module.icon
                  const available = index === 0

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
                      <span className="module-category">{module.category}</span>
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
                  This platform provides practical, scenario-based training
                  in viral genomic surveillance. Participants examine
                  previously analysed datasets, interpret genomic evidence
                  and develop outbreak investigation reports.
                </p>
              </div>
              <div className="about-features">
                <div><Database /><span>Real genomic datasets</span></div>
                <div><BookOpen /><span>Progressive scenarios</span></div>
                <div><Users /><span>Collaborative learning</span></div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer id="resources">
        <div className="footer-brand">VIRAL GENOMICS · TABLETOP TRAINING HUB</div>
        <p>Open-access educational resource for viral genomic surveillance.</p>
        <span>© 2026 · Training and research education</span>
      </footer>
    </div>
  )
}

export default App
